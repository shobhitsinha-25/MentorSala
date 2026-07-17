// ======================================================
// TYPES
// ======================================================

export interface ScoreResult {

  score: number;

  correct: number;

  wrong: number;

  unanswered: number;

}

interface EvaluateAnswerInput {

  questionType: string;

  correctAnswer: any;

  studentAnswer: any;

}

// ======================================================
// EVALUATE ANSWER
// ======================================================

export const evaluateAnswer = ({

  questionType,

  correctAnswer,

  studentAnswer,

}: EvaluateAnswerInput): boolean => {

  // ==========================================
  // UNANSWERED
  // ==========================================

  if (

    studentAnswer === null ||

    studentAnswer === undefined

  ) {

    return false;

  }

  switch (questionType) {

    // ======================================
    // SINGLE CORRECT
    // ======================================

    case "SINGLE_CORRECT":

      return studentAnswer === correctAnswer;

    // ======================================
    // MULTIPLE CORRECT
    // ======================================

    case "MULTIPLE_CORRECT": {

      if (

        !Array.isArray(studentAnswer) ||

        !Array.isArray(correctAnswer)

      ) {

        return false;

      }

      const student =
        [...studentAnswer].sort();

      const correct =
        [...correctAnswer].sort();

      return (

        JSON.stringify(student) ===

        JSON.stringify(correct)

      );

    }

    // ======================================
    // INTEGER
    // ======================================

    case "INTEGER":

      return Number(studentAnswer)

        ===

        Number(correctAnswer);

    // ======================================
    // NUMERICAL
    // ======================================

    case "NUMERICAL":

      return (

        Number(studentAnswer)

        ===

        Number(correctAnswer)

      );

    default:

      return false;

  }

};

// ======================================================
// CALCULATE SCORE
// ======================================================

export const calculateScore = (

  questions: any[],

  answers: Map<string, any>

): ScoreResult => {

  let score = 0;

  let correct = 0;

  let wrong = 0;

  let unanswered = 0;

  for (const question of questions) {

    const answer =
      answers.get(

        question.question.id

      );

    if (

      !answer ||

      answer.selectedAnswer === null

    ) {

      unanswered++;

      continue;

    }

    const isCorrect =
      evaluateAnswer({

        questionType:

          question.question.questionType,

        correctAnswer:

          question.question.answer,

        studentAnswer:

          answer.selectedAnswer,

      });

    if (isCorrect) {

      correct++;

      score +=

        question.marks ?? 0;

    } else {

      wrong++;

      score -=

        question.negativeMarks ?? 0;

    }

  }

  return {

    score,

    correct,

    wrong,

    unanswered,

  };

};