import {
  ExamType,
  TestType,
} from "@prisma/client";

export interface GetTestsInput {

  page?: number;

  limit?: number;

  examType?: ExamType;

  type?: TestType;

  subjectId?: string;

  chapterId?: string;

  search?: string;

}