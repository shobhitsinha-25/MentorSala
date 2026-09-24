import prisma from "../../../config/prisma";

import type {
  StudentSubscriptionStateResponse,
} from "./student.subscription.types";

import {
  getSubscriptionUsageSummary,
} from "./entitlement/entitlement.service";

/*
 * ======================================================
 * GET STUDENT SUBSCRIPTION STATE
 * ======================================================
 *
 * Possible states:
 *
 * TRIAL_NOT_STARTED
 * TRIAL_ACTIVE
 * TRIAL_EXPIRED
 * PAID_ACTIVE
 * NO_ACCESS
 *
 * Rules:
 *
 * 1. Only currently active subscriptions are considered.
 * 2. Paid subscription gets priority over trial.
 * 3. Trial dates are taken from the actual trial
 *    UserSubscription when the trial is active.
 * 4. No trial duration is hardcoded here.
 * 5. Subscription expiry is checked using:
 *       startsAt <= now < expiresAt
 * ======================================================
 */

export const getStudentSubscriptionState =
  async (
    userId: string
  ): Promise<StudentSubscriptionStateResponse> => {

    const now = new Date();

    const user =
      await prisma.user.findUnique({
        where: {
          id: userId,
        },

        select: {
          trialStartedAt: true,
          trialExpiresAt: true,

          subscriptions: {
            where: {
              status: "ACTIVE",

              startsAt: {
                lte: now,
              },

              expiresAt: {
                gt: now,
              },
            },

            /*
             * Paid subscription gets priority over trial.
             *
             * isTrial:
             *   false -> first
             *   true  -> second
             *
             * expiresAt desc provides deterministic selection
             * if multiple subscriptions of the same type overlap.
             */
            orderBy: [
              {
                isTrial: "asc",
              },
              {
                expiresAt: "desc",
              },
            ],

            take: 1,

            include: {
              plan: true,
            },
          },
        },
      });

    if (!user) {
      throw new Error("Student not found.");
    }

    const activeSubscription =
      user.subscriptions[0];

    /*
     * ==================================================
     * 1. ACTIVE SUBSCRIPTION
     * ==================================================
     */

    if (activeSubscription) {

      /*
       * ================================================
       * 1A. PAID SUBSCRIPTION ACTIVE
       * ================================================
       */

      if (!activeSubscription.isTrial) {
        return {
          status: "PAID_ACTIVE",

          trial: {
            startedAt:
              user.trialStartedAt,

            expiresAt:
              user.trialExpiresAt,
          },

          subscription: {
            id:
              activeSubscription.id,

            planId:
              activeSubscription.planId,

            paymentId:
              activeSubscription.paymentId,

            status:
              activeSubscription.status,

            startsAt:
              activeSubscription.startsAt,

            expiresAt:
              activeSubscription.expiresAt,
          },

          plan: {
            id:
              activeSubscription.plan.id,

            title:
              activeSubscription.plan.title,

            description:
              activeSubscription.plan.description,

            examType:
              activeSubscription.plan.examType,

            price:
              activeSubscription.plan.price,

            durationInDays:
              activeSubscription.plan.durationInDays,

            sessionsPerMonth:
              activeSubscription.plan.sessionsPerMonth,

            practiceQuestionsLimit:
              activeSubscription.plan
                .practiceQuestionsLimit,

            unlimitedPractice:
              activeSubscription.plan
                .unlimitedPractice,

            prioritySupport:
              activeSubscription.plan
                .prioritySupport,

            mentorSelectionEnabled:
              activeSubscription.plan
                .mentorSelectionEnabled,

            isPopular:
              activeSubscription.plan
                .isPopular,
          },
        };
      }

      /*
       * ================================================
       * 1B. TRIAL ACTIVE
       * ================================================
       *
       * The actual UserSubscription is the source of
       * truth for the currently active trial.
       */

      return {
        status: "TRIAL_ACTIVE",

        trial: {
          startedAt:
            activeSubscription.startsAt,

          expiresAt:
            activeSubscription.expiresAt,
        },

        subscription: {
          id:
            activeSubscription.id,

          planId:
            activeSubscription.planId,

          paymentId:
            activeSubscription.paymentId,

          status:
            activeSubscription.status,

          startsAt:
            activeSubscription.startsAt,

          expiresAt:
            activeSubscription.expiresAt,
        },

        plan: {
          id:
            activeSubscription.plan.id,

          title:
            activeSubscription.plan.title,

          description:
            activeSubscription.plan.description,

          examType:
            activeSubscription.plan.examType,

          price:
            activeSubscription.plan.price,

          durationInDays:
            activeSubscription.plan.durationInDays,

          sessionsPerMonth:
            activeSubscription.plan.sessionsPerMonth,

          practiceQuestionsLimit:
            activeSubscription.plan
              .practiceQuestionsLimit,

          unlimitedPractice:
            activeSubscription.plan
              .unlimitedPractice,

          prioritySupport:
            activeSubscription.plan
              .prioritySupport,

          mentorSelectionEnabled:
            activeSubscription.plan
              .mentorSelectionEnabled,

          isPopular:
            activeSubscription.plan
              .isPopular,
        },
      };
    }

    /*
     * ==================================================
     * 2. TRIAL EXPIRED
     * ==================================================
     *
     * No active subscription exists and the persisted
     * trial period has ended.
     */

    if (
      user.trialStartedAt &&
      user.trialExpiresAt &&
      user.trialExpiresAt <= now
    ) {
      return {
        status: "TRIAL_EXPIRED",

        trial: {
          startedAt:
            user.trialStartedAt,

          expiresAt:
            user.trialExpiresAt,
        },

        subscription: null,

        plan: null,
      };
    }

    /*
     * ==================================================
     * 3. TRIAL NOT STARTED
     * ==================================================
     *
     * This normally represents a user who has not yet
     * completed onboarding / had their trial created.
     */

    if (
      !user.trialStartedAt &&
      !user.trialExpiresAt
    ) {
      return {
        status: "TRIAL_NOT_STARTED",

        trial: {
          startedAt: null,
          expiresAt: null,
        },

        subscription: null,

        plan: null,
      };
    }

    /*
     * ==================================================
     * 4. NO ACCESS
     * ==================================================
     *
     * Fallback for an inconsistent or transitional state.
     */

    return {
      status: "NO_ACCESS",

      trial: {
        startedAt:
          user.trialStartedAt,

        expiresAt:
          user.trialExpiresAt,
      },

      subscription: null,

      plan: null,
    };
  };

/*
 * ======================================================
 * GET STUDENT SUBSCRIPTION USAGE
 * ======================================================
 *
 * Delegates all entitlement-period and usage calculation
 * logic to the entitlement service.
 *
 * Trial:
 *   Uses the trial subscription period.
 *
 * Paid:
 *   Uses the current Asia/Kolkata calendar month through
 *   the entitlement service.
 * ======================================================
 */

export const getStudentSubscriptionUsage =
  async (
    userId: string
  ) => {

    return getSubscriptionUsageSummary(
      userId
    );
  };