import type { Exam } from "../types/exam";

import CandidateInfo from "../components/CandidateInfo";
import SubjectTabs from "../components/SubjectTabs";
import Timer from "../utils/timer";

import { useAuthStore } from "../../../../store/auth.store";

interface HeaderProps {
  exam: Exam;
  onTimeUp: () => void;

  currentQuestionIndex: number;

  onSubjectChange: (
    questionIndex: number
  ) => void;
}

const Header = ({
  exam,
  onTimeUp,
  currentQuestionIndex,
  onSubjectChange,
}: HeaderProps) => {
  const { user } = useAuthStore();

  const subjects = [
    ...new Set(exam.questions.map((q) => q.subject)),
  ];

  const showSubjectTabs =
    exam.test.type === "MOCK" &&
    subjects.length > 1;

  const activeSubject =
    exam.questions[currentQuestionIndex]
      ?.subject ?? "";

  const handleSubjectChange = (
    subjectName: string
  ) => {
    const questionIndex =
      exam.questions.findIndex(
        (q) => q.subject === subjectName
      );

    if (questionIndex !== -1) {
      onSubjectChange(questionIndex);
    }
  };

  return (
    <header className="bg-gradient-to-r from-[#2A0080] via-[#3B0764] to-[#1E005A] text-white shadow-md">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Brand & Test Information */}
        <div className="flex items-center gap-6">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 border-r border-white/10 pr-6">
            
            <div>
              <h1 className="text-xl font-black tracking-tight text-white">
                MentorSala
              </h1>
              <p className="text-[10px] font-bold text-purple-200/70 uppercase tracking-widest mt-0.5">
                AI Powered Learning Platform
              </p>
            </div>
          </div>

          {/* Test Title & Meta */}
          <div className="flex items-center gap-3">
            <h1 className="text-base font-semibold text-white">
              {exam.test.title}
            </h1>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-purple-200 border border-white/10">
              Question {currentQuestionIndex + 1} / {exam.questions.length}
            </span>
          </div>
        </div>

        {/* Candidate + Timer Section */}
        <div className="flex items-center gap-4">
          {/* Timer Card */}
          <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-1.5 text-slate-800 shadow-sm border border-purple-100">
            <Timer
              expiresAt={exam.expiresAt}
              onTimeUp={onTimeUp}
            />
          </div>

          {/* Candidate Profile */}
          <div className="border-l border-white/10 pl-4 text-white">
            <CandidateInfo
              name={user?.name ?? "Student"}
              avatar={user?.avatar}
            />
          </div>
        </div>
      </div>

      {/* Subject Tabs Section */}
      {showSubjectTabs && (
        <div className="bg-black/10 backdrop-blur-sm px-6 py-1 border-t border-white/5">
          <SubjectTabs
            subjects={subjects}
            activeSubject={activeSubject}
            onChange={handleSubjectChange}
          />
        </div>
      )}
    </header>
  );
};

export default Header;