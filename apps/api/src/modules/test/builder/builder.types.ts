export interface AttachQuestionItem {

  questionId: string;

  displayOrder: number;

}

export interface AttachQuestionsInput {

  testId: string;

  questions: AttachQuestionItem[];

}

export interface ReorderQuestionItem {

  questionId: string;

  displayOrder: number;

}

export interface ReorderQuestionsInput {

  testId: string;

  questions: ReorderQuestionItem[];

}