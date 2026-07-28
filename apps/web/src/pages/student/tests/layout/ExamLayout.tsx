import type { ReactNode } from "react";

import Header from "./Header";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Footer from "./Footer";

import type { Exam } from "../types/exam";

interface Props {
  exam: Exam;
  children: ReactNode;
  onTimeUp: () => void;

  currentQuestion: number;
  totalQuestions: number;

  onPrevious: () => void;
  onNext: () => void;
  onClear: () => void;
  onMarkForReview: () => void;

  onQuestionSelect: (index: number) => void;

  onSubjectChange: (index: number) => void;

  onSubmit: () => void;

  isMarkedForReview: boolean;
}

const ExamLayout = ({
    exam,
    children,
    onTimeUp,

    currentQuestion,

    totalQuestions,
    onPrevious,
    onNext,
    onClear,
    onMarkForReview,
    onQuestionSelect,

    onSubjectChange,

    onSubmit,
    isMarkedForReview,
}: Props) => {
  return (
    <div className="flex h-screen flex-col bg-slate-100">
      <Header
  exam={exam}
  onTimeUp={onTimeUp}
  currentQuestionIndex={currentQuestion}
  onSubjectChange={onSubjectChange}
/>

      <main className="flex flex-1 overflow-hidden">
        <LeftSidebar>{children}</LeftSidebar>

        <RightSidebar
          questions={exam.questions}
          currentQuestion={currentQuestion}
          onQuestionSelect={onQuestionSelect}
        />
      </main>

      <Footer
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
        isMarkedForReview={isMarkedForReview}
        onPrevious={onPrevious}
        onNext={onNext}
        onClear={onClear}
        onMarkForReview={onMarkForReview}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default ExamLayout;