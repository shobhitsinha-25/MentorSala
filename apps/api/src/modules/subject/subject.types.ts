import { ExamType } from "@prisma/client";

export interface CreateSubjectInput {

  name: string;

  examType: ExamType;

}

export interface GetSubjectsInput {

  examType?: string;

  search?: string;

  page?: number;

  limit?: number;

}

export interface UpdateSubjectInput {

  subjectId: string;

  name: string;

  examType: ExamType;

}