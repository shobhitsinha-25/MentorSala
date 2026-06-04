import { useEffect, useState } from "react";
import api from "../../lib/axios";
import { 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Layers, 
  Award, 
  Send, 
  Info, 
  ChevronLeft, 
  ChevronRight,
} from "lucide-react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

interface Question {
  id: string;
  question: string;
  options: string[];
  difficulty: string;
  subject: string;
  chapter: string;
  attempts?: {
    isCorrect: boolean;
    selectedAnswer: string;
  }[];
}

interface FeedbackState {
  status: "CORRECT" | "WRONG" | "ERROR";
  correctAnswer?: string;
}

const PracticeProblems = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  
  // Track in-card inline results instead of global window alerts
  const [submissionFeedback, setSubmissionFeedback] = useState<Record<string, FeedbackState>>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchQuestions = async () => {
    try {
      const res = await api.get("/questions/student", {
        params: {
          page,
        },
      });
      setQuestions(res.data.data);
      setQuestions(res.data.questions);
      setTotalPages(
      res.data.totalPages || 1
    );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [page]);

  const submitAnswer = async (questionId: string) => {
    try {
      const answer = selectedAnswers[questionId];

      if (!answer) {
        setSubmissionFeedback((prev) => ({
          ...prev,
          [questionId]: { status: "ERROR" }
        }));
        return;
      }

      const res = await api.post("/questions/submit", {
        questionId,
        answer,
      });

      if (res.data.isCorrect) {
        setSubmissionFeedback((prev) => ({
          ...prev,
          [questionId]: { status: "CORRECT" }
        }));
      } else {
        setSubmissionFeedback((prev) => ({
          ...prev,
          [questionId]: { 
            status: "WRONG", 
            correctAnswer: res.data.correctAnswer 
          }
        }));
      }

      await fetchQuestions();
    } catch (err) {
      console.error(err);
      setSubmissionFeedback((prev) => ({
        ...prev,
        [questionId]: { status: "ERROR" }
      }));
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="h-10 w-10 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
        <p className="text-slate-400 font-medium text-sm animate-pulse">Loading problem bank...</p>
      </div>
    );
  }

  return (
    <MathJaxContext>
      <div className="space-y-6 bg-[#020617] text-slate-200 min-h-screen p-6 w-full select-none flex flex-col justify-between">
        
        <div className="space-y-6">
          {/* HEADER BLOCK */}
          <div className="text-center sm:text-left border-b border-white/[0.04] pb-6">
            
            <h1 className="text-4xl font-black text-white tracking-tight leading-none">
              Practice Problems
            </h1>
            <p className="text-sm font-medium text-slate-400 mt-2.5">
              Questions based on your enrolled exam
            </p>
          </div>

          {/* QUESTIONS CONTAINER */}
          <div className="space-y-6 mt-8 max-w-4xl mx-auto sm:mx-0">
            {questions.length === 0 ? (
              <div className="text-sm font-semibold text-slate-500 bg-white/[0.01] border border-dashed border-white/[0.04] p-12 rounded-2xl text-center">
                No questions found.
              </div>
            ) : (
              questions.map((question) => {
                const currentFeedback = submissionFeedback[question.id];

                return (
                  <div
                    key={question.id}
                    className="bg-[#0F172A]/40 border border-white/[0.04] rounded-[22px] p-6 shadow-xl backdrop-blur-md relative flex flex-col justify-between transition-all"
                  >
                    <div>
                      {/* ATTEMPT BADGE BLOCK */}
                      <div className="flex items-center justify-between mb-4">
                        {question.attempts?.length ? (
                          question.attempts[0].isCorrect ? (
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-wide">
                              <CheckCircle2 size={11} />
                              <span>Correct ✓</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-black uppercase tracking-wide">
                              <XCircle size={11} />
                              <span>Attempted ✗</span>
                            </div>
                          )
                        ) : (
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/60 border border-white/[0.04] text-slate-400 text-[10px] font-black uppercase tracking-wide">
                            <span>Not Attempted</span>
                          </div>
                        )}
                      </div>

                      {/* QUESTION HEADLINE */}
                      <h2 className="text-white text-base font-bold tracking-tight leading-relaxed mb-5">
                        <MathJax>{question.question}</MathJax>
                      </h2>

                      {/* OPTIONS STACK */}
                      <div className="grid grid-cols-1 gap-3">
                        {question.options?.map((option, index) => {
                          const prefix = ["A", "B", "C", "D"][index] || String(index + 1);
                          const isSelected = selectedAnswers[question.id] === option;
                          return (
                            <button
                              key={index}
                              onClick={() => {
                                setSelectedAnswers((prev) => ({
                                  ...prev,
                                  [question.id]: option,
                                }));
                                if (currentFeedback) {
                                  setSubmissionFeedback((prev) => {
                                    const updated = { ...prev };
                                    delete updated[question.id];
                                    return updated;
                                  });
                                }
                              }}
                              className={`text-left px-4 py-3 rounded-xl transition-all duration-200 outline-none flex items-center gap-3 text-sm font-medium active:scale-[0.99] border ${
                                isSelected
                                  ? "bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-600/5"
                                  : "bg-[#1E293B]/40 border-white/[0.03] hover:bg-[#1E293B]/70 hover:border-white/[0.08] text-slate-300"
                              }`}
                            >
                              <span className={`w-6 h-6 rounded-lg text-[11px] font-black flex items-center justify-center transition-colors ${
                                isSelected 
                                  ? "bg-indigo-500 text-white" 
                                  : "bg-slate-800 text-slate-400"
                              }`}>
                                {prefix}
                              </span>
                              <span className="flex-1 leading-snug">
                                <MathJax>{option}</MathJax>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* INLINE LIVE CARD SUBMISSION FEEDBACK OVERLAYS */}
                    {currentFeedback && (
                      <div className="mt-4 transition-all duration-300">
                        {currentFeedback.status === "CORRECT" && (
                          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                            <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold">Correct Answer.</p>
                            </div>
                          </div>
                        )}

                        {currentFeedback.status === "WRONG" && (
                          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
                            <XCircle size={16} className="shrink-0 mt-0.5" />
                            <div className="space-y-1">
                              <p className="font-bold">Incorrect submission.</p>
                              <div className="text-[11px] text-slate-400 mt-1 bg-black/20 p-2 rounded-lg border border-white/[0.02]">
                                <span className="font-black text-rose-300 mr-1">Correct Solution:</span>
                                <MathJax inline>{currentFeedback.correctAnswer || "N/A"}</MathJax>
                              </div>
                            </div>
                          </div>
                        )}

                        {currentFeedback.status === "ERROR" && (
                          <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
                            <Info size={14} />
                            <span>Action Denied: You must register an active selection choice key before evaluation dispatch.</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* BOTTOM COMPONENT METADATA BAR */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-6 pt-5 border-t border-white/[0.03]">
                      
                      {/* TAG CORES */}
                      <div className="flex flex-wrap gap-2">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
                          <BookOpen size={12} className="opacity-80" />
                          <span>{question.subject}</span>
                        </div>

                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
                          <Layers size={12} className="opacity-80" />
                          <span>{question.chapter}</span>
                        </div>

                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold">
                          <Award size={12} className="opacity-80" />
                          <span>{question.difficulty}</span>
                        </div>
                      </div>

                      {/* ACTION SUBMIT CONTAINER */}
                      <button
                        onClick={() => submitAnswer(question.id)}
                        className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-xl transition-colors shadow-lg shadow-emerald-600/10 active:scale-[0.98]"
                      >
                        <Send size={12} />
                        <span>Submit Answer</span>
                      </button>
                    </div>

                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* REFINED SYSTEM PAGINATION DISPATCH LAYER */}
        {questions.length > 0 && (
          <div className="flex justify-center items-center gap-2 mt-12 border-t border-white/[0.04] pt-6 max-w-4xl mx-auto w-full sm:mx-0">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="flex items-center justify-center p-2.5 rounded-xl bg-[#0F172A]/80 border border-white/[0.04] text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="px-4 py-1.5 bg-[#0F172A]/40 border border-white/[0.03] rounded-xl text-xs font-bold text-slate-400 select-none tracking-wide">
              Page <span className="text-white font-black px-0.5">{page}</span> of <span className="text-slate-500 font-black px-0.5">{totalPages}</span>
            </div>

            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="flex items-center justify-center p-2.5 rounded-xl bg-[#0F172A]/80 border border-white/[0.04] text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
        
      </div>
    </MathJaxContext>
  );
};

export default PracticeProblems;