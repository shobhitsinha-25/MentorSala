export interface CreateChapterInput {

  title: string;

  order: number;

  subjectId: string;

}

export interface GetChaptersInput {

  subjectId: string;

  search?: string;

  page?: number;

  limit?: number;

}

export interface UpdateChapterInput {

  chapterId: string;

  title: string;

  order: number;

  subjectId: string;

}