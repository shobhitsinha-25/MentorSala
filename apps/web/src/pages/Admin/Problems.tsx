import { useState } from "react";
import api from "../../lib/axios";
import { PlusCircle, HelpCircle, FileText, Layers, CheckCircle2 } from "lucide-react";
import {
  MathJax,
  MathJaxContext,
} from "better-react-mathjax";
import MathField from "../../components/MathField";
const PracticeQuestions = () => {
  const [question, setQuestion] = useState("");

  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");

  const [answer, setAnswer] = useState("");

  const [difficulty, setDifficulty] = useState("EASY");

  const [examType, setExamType] = useState("JEE");

  const [subject, setSubject] = useState("");

  const [chapter, setChapter] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !question ||
      !optionA ||
      !optionB ||
      !optionC ||
      !optionD ||
      !answer ||
      !subject ||
      !chapter
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        question,

        options: [
          optionA,
          optionB,
          optionC,
          optionD,
        ],

        answer,

        difficulty,

        examType,

        subject,

        chapter,
      };

      console.log(payload);

      const res = await api.post("/questions", payload);

      console.log(res.data);

      alert("Question created successfully");

      // Reset Form
      setQuestion("");

      setOptionA("");
      setOptionB("");
      setOptionC("");
      setOptionD("");

      setAnswer("");

      setDifficulty("EASY");

      setExamType("JEE");

      setSubject("");

      setChapter("");

    } catch (error) {
      console.error(error);
      alert("Failed to create question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MathJaxContext>
    <div className="space-y-6 bg-[#020617] text-slate-200 min-h-screen p-6 w-full select-none">
      
      {/* HEADER BLOCK */}
      <div className="text-center sm:text-left border-b border-white/[0.04] pb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 mb-3">
          <PlusCircle size={12} className="text-indigo-400" />
          <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400">Content Engine</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight leading-none">
          Practice Questions
        </h1>
        <p className="text-xs font-medium text-slate-400 mt-2.5">
          Populate, tag, and publish complex curriculum parameters into the test deployment core.
        </p>
      </div>

      {/* COMPACT ADMINISTRATIVE GRID FORM */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 bg-[#0F172A]/40 border border-white/[0.04] p-6 rounded-[24px] backdrop-blur-md shadow-2xl max-w-6xl space-y-6 mx-auto sm:mx-0"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT CONTENT COLUMN: QUESTION DETAILS */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <HelpCircle size={14} className="text-slate-500" />
              <span>Prompt & Options</span>
            </div>

           <div className="space-y-2">
  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
    Question
  </label>

  <MathField
    value={question}
    onChange={setQuestion}
  />
</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-xs font-black text-indigo-400/70">A</span>
                <MathField
                    value={optionA}
                    onChange={setOptionA}
                    />
              </div>

              <div className="relative">
                <span className="absolute left-3.5 top-3 text-xs font-black text-indigo-400/70">B</span>
                <MathField
                    value={optionB}
                    onChange={setOptionB}
                />
              </div>

              <div className="relative">
                <span className="absolute left-3.5 top-3 text-xs font-black text-indigo-400/70">C</span>
                <MathField
                    value={optionC}
                    onChange={setOptionC}
                />
              </div>

              <div className="relative">
                <span className="absolute left-3.5 top-3 text-xs font-black text-indigo-400/70">D</span>
                <MathField
                    value={optionD}
                    onChange={setOptionD}
                />
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: TAXONOMY TARGETING METADATA */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <Layers size={14} className="text-slate-500" />
              <span>Target Taxonomy</span>
            </div>

            <div className="space-y-3">
              <div className="relative flex items-center">
                <select
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#1E293B]/60 border border-white/[0.04] focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 text-white text-xs font-bold outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#0f172a]">Select Correct Answer Option Key</option>
                  {optionA && <option value={optionA} className="bg-[#0f172a]">Option A content</option>}
                  {optionB && <option value={optionB} className="bg-[#0f172a]">Option B content</option>}
                  {optionC && <option value={optionC} className="bg-[#0f172a]">Option C content</option>}
                  {optionD && <option value={optionD} className="bg-[#0f172a]">Option D content</option>}
                </select>
                <div className="absolute right-4 pointer-events-none text-slate-400 text-[10px] uppercase font-black tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">Key</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#1E293B]/40 border border-white/[0.04] focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 text-slate-300 text-xs font-bold outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="EASY" className="bg-[#0f172a]">Easy Tier</option>
                  <option value="MEDIUM" className="bg-[#0f172a]">Medium Tier</option>
                  <option value="HARD" className="bg-[#0f172a]">Hard Tier</option>
                </select>

                <select
                  value={examType}
                  onChange={(e) => setExamType(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#1E293B]/40 border border-white/[0.04] focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 text-slate-300 text-xs font-bold outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="JEE" className="bg-[#0f172a]">JEE Matrix</option>
                  <option value="WBJEE" className="bg-[#0f172a]">WBJEE Matrix</option>
                  <option value="BOARDS" className="bg-[#0f172a]">BOARDS Matrix</option>
                </select>
              </div>

              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#1E293B]/40 border border-white/[0.04] focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 text-slate-300 text-xs font-bold outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="" className="bg-[#0f172a]">Select Subject Core</option>
                <option value="Physics" className="bg-[#0f172a]">Physics</option>
                <option value="Chemistry" className="bg-[#0f172a]">Chemistry</option>
                <option value="Mathematics" className="bg-[#0f172a]">Mathematics</option>
              </select>

              <div className="relative">
                <input
                  placeholder="Chapter Module (e.g., Kinematics)"
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#1E293B]/40 border border-white/[0.04] focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 text-white text-xs outline-none transition-all placeholder:text-slate-600 font-bold"
                />
                <div className="absolute right-4 top-3 pointer-events-none"><FileText size={14} className="text-slate-600" /></div>
              </div>
            </div>
          </div>
        </div>

        {/* COMPREHENSIVE ACTION DISPATCH FOOTER */}
        <div className="flex justify-end pt-4 border-t border-white/[0.03]">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider px-6 py-3 rounded-xl disabled:opacity-50 transition-colors shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
          >
            {loading ? (
              <>
                <div className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Deploying...</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={14} />
                <span>Publish Question</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
    </MathJaxContext>
  );
};

export default PracticeQuestions;