import {
  ExamType,
  TestType,
  TestStatus,
} from "@prisma/client";

export interface CreateTestInput {

  title: string;

  description?: string;

  examType: ExamType;

  type: TestType;

  subjectId?: string;

  chapterId?: string;

  duration: number;

  negativeMarks?: number;

  instructions?: string;

  startsAt?: Date;

  endsAt?: Date;

  subscriptionPlanId?: string;

  createdBy: string;

}

export interface GetTestsInput {

  page?: number;

  limit?: number;

  search?: string;

  examType?: string;

  type?: string;

  status?: string;

  subjectId?: string;

  chapterId?: string;

}

export interface UpdateTestInput {

  testId: string;

  title: string;

  description?: string;

  examType: ExamType;

  type: TestType;

  subjectId?: string;

  chapterId?: string;

  duration: number;

  negativeMarks?: number;

  instructions?: string;

  startsAt?: Date;

  endsAt?: Date;

  subscriptionPlanId?: string;

  status?: TestStatus;

}