import {
  PrismaClient,
  ExamType,
  TestType,
  PlanLimitType,
  PlanLimitPeriod,
} from "@prisma/client";

const prisma = new PrismaClient();

const TRIAL_PLANS = [
  {
    title: "FREE TRIAL - JEE",
    examType: ExamType.JEE,
  },
  {
    title: "FREE TRIAL - WBJEE",
    examType: ExamType.WBJEE,
  },
  {
    title: "FREE TRIAL - BOARDS",
    examType: ExamType.BOARDS,
  },
];

async function upsertTrialPlan(
  examType: ExamType,
  title: string
) {
  const plan =
    await prisma.subscriptionPlan.upsert({
      where: {
        // If your current schema does not have a
        // unique title, use findFirst/create instead.
        id: `trial-${examType.toLowerCase()}`,
      },

      update: {
        title,
        description:
          "7-day free trial for MentorSala students.",
        examType,
        price: 0,
        durationInDays: 7,
        sessionsPerMonth: 1,
        practiceQuestionsLimit: 0,
        unlimitedPractice: false,
        prioritySupport: false,
        mentorSelectionEnabled: true,
        isPopular: false,
        isActive: true,
        level: 0,
      },

      create: {
        id: `trial-${examType.toLowerCase()}`,
        title,
        description:
          "7-day free trial for MentorSala students.",
        examType,
        price: 0,
        durationInDays: 7,
        sessionsPerMonth: 1,
        practiceQuestionsLimit: 0,
        unlimitedPractice: false,
        prioritySupport: false,
        mentorSelectionEnabled: true,
        isPopular: false,
        isActive: true,
        level: 0,
      },
    });

  const limits = [
    {
      testType: TestType.CHAPTER,
      limitType: PlanLimitType.LIMITED,
      limit: 1,
      period: PlanLimitPeriod.SUBSCRIPTION,
    },
    {
      testType: TestType.SUBJECT,
      limitType: PlanLimitType.LIMITED,
      limit: 1,
      period: PlanLimitPeriod.SUBSCRIPTION,
    },
    {
      testType: TestType.MOCK,
      limitType: PlanLimitType.LIMITED,
      limit: 1,
      period: PlanLimitPeriod.SUBSCRIPTION,
    },
    {
      testType: TestType.PYQ,
      limitType: PlanLimitType.NOT_ALLOWED,
      limit: null,
      period: PlanLimitPeriod.SUBSCRIPTION,
    },
    {
      testType: TestType.PRACTICE,
      limitType: PlanLimitType.NOT_ALLOWED,
      limit: null,
      period: PlanLimitPeriod.SUBSCRIPTION,
    },
  ];

  for (const limit of limits) {
    await prisma.planTestLimit.upsert({
      where: {
        planId_testType: {
          planId: plan.id,
          testType: limit.testType,
        },
      },

      update: {
        limitType: limit.limitType,
        limit: limit.limit,
        period: limit.period,
      },

      create: {
        planId: plan.id,
        testType: limit.testType,
        limitType: limit.limitType,
        limit: limit.limit,
        period: limit.period,
      },
    });
  }

  return plan;
}

async function main() {
  for (const trialPlan of TRIAL_PLANS) {
    await upsertTrialPlan(
      trialPlan.examType,
      trialPlan.title
    );
  }

  console.log("Trial plans configured.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });