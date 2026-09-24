import prisma from "../../../config/prisma";
import { Prisma } from "@prisma/client";

type FulfillCapturedPaymentInput = {
  paymentId: string;
  razorpayPaymentId: string;
  method?: string | null;
  email?: string | null;
  contact?: string | null;
};

export const fulfillCapturedPayment = async (
  data: FulfillCapturedPaymentInput
) => {

  // ====================================================
  // TRANSACTION
  // ====================================================

  const result =
    await prisma.$transaction(
      async (tx) => {

        // ==============================================
        // LOCK PAYMENT ROW
        // ==============================================

        /*
         * IMPORTANT:
         *
         * We use PostgreSQL FOR UPDATE here.
         *
         * This prevents two concurrent requests from
         * fulfilling the same payment simultaneously.
         *
         * Example:
         *
         * Request A -> locks payment
         * Request B -> waits
         *
         * Request A -> fulfills payment
         * Request A -> COMMIT
         *
         * Request B -> gets lock
         * Request B -> sees CAPTURED
         * Request B -> returns alreadyProcessed
         */

        const paymentRows =
          await tx.$queryRaw<
            Array<{
              id: string;
              userId: string;
              planId: string;
              idempotencyKey: string;
              razorpayOrderId: string;
              razorpayPaymentId: string | null;
              amount: number;
              currency: string;
              status: string;
              method: string | null;
              email: string | null;
              contact: string | null;
              description: string | null;
              errorCode: string | null;
              errorDescription: string | null;
              capturedAt: Date | null;
              failedAt: Date | null;
              createdAt: Date;
              updatedAt: Date;
            }>
          >(
            Prisma.sql`
              SELECT *
              FROM "Payment"
              WHERE "id" = ${data.paymentId}
              FOR UPDATE
            `
          );

        const payment =
          paymentRows[0];


        // ==============================================
        // PAYMENT NOT FOUND
        // ==============================================

        if (!payment) {

          throw new Error(
            "Payment not found."
          );
        }


        // ==============================================
        // ALREADY CAPTURED
        // ==============================================

        if (
          payment.status ===
          "CAPTURED"
        ) {

          const existingSubscription =
            await tx.userSubscription.findUnique({
              where: {
                paymentId:
                  payment.id,
              },
            });

          if (!existingSubscription) {

            throw new Error(
              "Payment is captured but subscription was not created."
            );
          }

          return {
            alreadyProcessed:
              true,

            payment,

            subscription:
              existingSubscription,
          };
        }


        // ==============================================
        // GET TARGET PLAN
        // ==============================================

        const plan =
          await tx.subscriptionPlan.findUnique({
            where: {
              id:
                payment.planId,
            },
          });


        if (
          !plan ||
          !plan.isActive
        ) {

          throw new Error(
            "Subscription plan is no longer available."
          );
        }


        // ==============================================
        // TRIAL PLAN CANNOT BE FULFILLED AS PAYMENT
        // ==============================================

        /*
         * Trial plans are assigned by the free-trial
         * service and are never purchased through
         * Razorpay.
         */

        if (plan.isTrial) {

          throw new Error(
            "Trial plans cannot be purchased."
          );
        }


        // ==============================================
        // GET CURRENT ACTIVE PAID SUBSCRIPTION
        // ==============================================
        //
        // IMPORTANT:
        //
        // Trial subscriptions are deliberately excluded.
        //
        // Therefore:
        //
        // ACTIVE TRIAL
        //      +
        // PAID PLAN PURCHASE
        //      ↓
        // FULL PAID PLAN PRICE
        //
        // Only an existing PAID subscription can be
        // considered for upgrade pricing.
        //

        const currentSubscription =
          await tx.userSubscription.findFirst({
            where: {

              userId:
                payment.userId,

              isTrial:
                false,

              status:
                "ACTIVE",

              startsAt: {
                lte:
                  new Date(),
              },

              expiresAt: {
                gt:
                  new Date(),
              },
            },

            include: {
              plan: {
                select: {
                  id: true,

                  title: true,

                  level: true,

                  price: true,
                },
              },
            },

            orderBy: {
              expiresAt:
                "desc",
            },
          });


        // ==============================================
        // CALCULATE EXPECTED AMOUNT
        // ==============================================

        let expectedAmount: number;

        let isUpgrade = false;


        // ==============================================
        // NORMAL PURCHASE
        // ==============================================
        //
        // This happens when:
        //
        // 1. Student has no subscription
        // 2. Student has only an active trial
        //
        // Trial is NOT considered for upgrade pricing.
        //

        if (!currentSubscription) {

          expectedAmount =
            Math.round(
              plan.price * 100
            );
        }


        // ==============================================
        // UPGRADE
        // ==============================================

        else {

          const currentPlan =
            currentSubscription.plan;


          // --------------------------------------------
          // SAME PLAN
          // --------------------------------------------

          if (
            currentPlan.id ===
            plan.id
          ) {

            throw new Error(
              "You already have an active subscription for this plan."
            );
          }


          // --------------------------------------------
          // DOWNGRADE / SAME LEVEL
          // --------------------------------------------

          if (
            plan.level <=
            currentPlan.level
          ) {

            throw new Error(
              "You can only upgrade to a higher-level plan. Downgrading is not supported."
            );
          }


          // --------------------------------------------
          // UPGRADE PRICE
          // --------------------------------------------

          const upgradePrice =
            plan.price -
            currentPlan.price;


          if (
            upgradePrice <= 0
          ) {

            throw new Error(
              `Invalid pricing configuration for plan "${plan.title}". ` +
              `A higher-level plan must have a higher price than the current plan.`
            );
          }


          expectedAmount =
            Math.round(
              upgradePrice * 100
            );

          isUpgrade = true;
        }


        // ==============================================
        // VERIFY PAYMENT AMOUNT
        // ==============================================

        if (
          payment.amount !==
          expectedAmount
        ) {

          throw new Error(
            "Payment amount is no longer valid for this plan."
          );
        }


        // ==============================================
        // VERIFY PAYMENT ID
        // ==============================================

        /*
         * A captured payment should be associated with
         * the Razorpay payment ID supplied by the caller.
         *
         * Because this transaction is protected by the
         * payment row lock, we can safely establish this
         * association here.
         */

        if (
          payment.razorpayPaymentId &&
          payment.razorpayPaymentId !==
            data.razorpayPaymentId
        ) {

          throw new Error(
            "Payment is already associated with a different Razorpay payment ID."
          );
        }


        // ==============================================
        // UPDATE PAYMENT
        // ==============================================

        const updatedPayment =
          await tx.payment.update({
            where: {
              id:
                payment.id,
            },

            data: {

              razorpayPaymentId:
                data.razorpayPaymentId,

              status:
                "CAPTURED",

              method:
                data.method
                  ? data.method.toUpperCase() as any
                  : undefined,

              email:
                data.email ??
                undefined,

              contact:
                data.contact ??
                undefined,

              capturedAt:
                new Date(),
            },
          });


        // ==============================================
        // FIND ACTIVE TRIAL
        // ==============================================
        //
        // The trial is NOT considered in the pricing
        // calculation above.
        //
        // It is only handled now because the payment has
        // been successfully captured.
        //

        const activeTrial =
          await tx.userSubscription.findFirst({
            where: {

              userId:
                payment.userId,

              isTrial:
                true,

              status:
                "ACTIVE",

              startsAt: {
                lte:
                  new Date(),
              },

              expiresAt: {
                gt:
                  new Date(),
              },
            },

            orderBy: {
              expiresAt:
                "desc",
            },
          });


        // ==============================================
        // UPGRADE EXISTING PAID SUBSCRIPTION
        // ==============================================

        if (
          isUpgrade &&
          currentSubscription
        ) {

          /*
           * If an unexpected active trial also exists,
           * successful paid purchase cancels it.
           *
           * The paid subscription remains the subscription
           * being upgraded.
           */

          if (activeTrial) {

            await tx.userSubscription.update({
              where: {
                id:
                  activeTrial.id,
              },

              data: {
                status:
                  "CANCELLED",
              },
            });
          }


          const upgradedSubscription =
            await tx.userSubscription.update({
              where: {
                id:
                  currentSubscription.id,
              },

              data: {
                planId:
                  plan.id,

                paymentId:
                  payment.id,

                isTrial:
                  false,
              },
            });


          return {
            alreadyProcessed:
              false,

            payment:
              updatedPayment,

            subscription:
              upgradedSubscription,
          };
        }


        // ==============================================
        // NORMAL PAID PURCHASE
        // ==============================================
        //
        // This includes:
        //
        // NO SUBSCRIPTION
        //      ↓
        // create paid subscription
        //
        // ACTIVE TRIAL
        //      ↓
        // cancel trial
        //      ↓
        // create paid subscription
        //
        // The trial does NOT affect paid price.
        //

        if (activeTrial) {

          await tx.userSubscription.update({
            where: {
              id:
                activeTrial.id,
            },

            data: {
              status:
                "CANCELLED",
            },
          });
        }


        // ==============================================
        // CREATE PAID SUBSCRIPTION
        // ==============================================

        const startsAt =
          new Date();

        const expiresAt =
          new Date(
            startsAt
          );

        expiresAt.setDate(
          expiresAt.getDate() +
          plan.durationInDays
        );


        const subscription =
          await tx.userSubscription.create({
            data: {

              userId:
                payment.userId,

              planId:
                payment.planId,

              paymentId:
                payment.id,

              isTrial:
                false,

              startsAt,

              expiresAt,

              status:
                "ACTIVE",
            },
          });


        // ==============================================
        // RESPONSE
        // ==============================================

        return {
          alreadyProcessed:
            false,

          payment:
            updatedPayment,

          subscription,
        };
      }
    );


  return result;
};