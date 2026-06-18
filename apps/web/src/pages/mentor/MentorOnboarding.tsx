import { useState } from "react";
import api from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import {  
  Phone, 
  GraduationCap, 
  Briefcase, 
  Cpu, 
  UploadCloud, 
  Loader2, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export default function MentorOnboarding() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); 

  const [formData, setFormData] = useState({
    phoneNumber: "",
    qualification: "",
    experienceYears: "",
    expertise: "",
    bio: "",
    linkedinUrl: "",
    examType: "JEE",
  });

  const [resume, setResume] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMsg("");

      const data = new FormData();
      data.append("phoneNumber", formData.phoneNumber);
      data.append("qualification", formData.qualification);
      data.append("experienceYears", formData.experienceYears);
      data.append(
        "expertise",
        JSON.stringify(
          formData.expertise
            .split(",")
            .map((item) => item.trim())
        )
      );
      data.append("bio", formData.bio);
      data.append("linkedinUrl", formData.linkedinUrl);
      data.append("examType", formData.examType);

      if (resume) {
        data.append("resume", resume);
      }

      await api.post("/mentors/onboarding", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/mentor/under-review");
    } catch (error: any) {
      console.error("Mentor onboarding failed", error);
      // FIXED HERE: Replaced technical message leak with a generic, safe user-facing message
      setErrorMsg(error?.response?.data?.message || "Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex items-center justify-center px-4 py-12 relative select-none">
      {/* Aesthetic Context Glow Matrix */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      
      <div className="w-full max-w-2xl bg-[#0B0F19] border border-white/[0.06] rounded-[24px] p-8 md:p-10 shadow-2xl relative z-10 transition-all">
        
        <h1 className="text-3xl font-black tracking-tight text-white leading-tight">
          Mentor Verification 
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          
          {/* Main Grid: Info Section Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Phone Entry Row */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Contact Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/[0.08] bg-[#131926] pl-11 pr-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-[#6366F1] focus:bg-[#161D2B] transition-all"
                  required
                />
              </div>
            </div>

            {/* Academic Degrees Row */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Highest Qualification
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  name="qualification"
                  placeholder="e.g. B.Tech CSE, IIT Kharagpur"
                  value={formData.qualification}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/[0.08] bg-[#131926] pl-11 pr-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-[#6366F1] focus:bg-[#161D2B] transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Exam Type
              </label>

              <select
                name="examType"
                value={formData.examType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    examType: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-white/[0.08] bg-[#131926] px-4 py-3 text-sm text-slate-200 outline-none focus:border-[#6366F1]"
              >
                <option value="JEE">JEE</option>
                <option value="WBJEE">WBJEE</option>
                <option value="BOARDS">BOARDS</option>
              </select>
            </div>

            {/* Scale Track Row */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Years of Experience
              </label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
                <input
                  type="number"
                  name="experienceYears"
                  placeholder="e.g. 5"
                  value={formData.experienceYears}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/[0.08] bg-[#131926] pl-11 pr-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-[#6366F1] focus:bg-[#161D2B] transition-all"
                  required
                />
              </div>
            </div>

            {/* LinkedIn Connection Row */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                LinkedIn Profile URL
              </label>
              <div className="relative">
                <svg 
                  className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
                <input
                  type="url"
                  name="linkedinUrl"
                  placeholder="https://linkedin.com/in/username"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/[0.08] bg-[#131926] pl-11 pr-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-[#6366F1] focus:bg-[#161D2B] transition-all"
                />
              </div>
            </div>

          </div>

          {/* Special Expertise Subject Track Inputs */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Areas of Expertise
            </label>
            <div className="relative">
              <Cpu className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                name="expertise"
                placeholder="Physics, Organic Chemistry, Calculus (Comma Separated)"
                value={formData.expertise}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/[0.08] bg-[#131926] pl-11 pr-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-[#6366F1] focus:bg-[#161D2B] transition-all"
                required
              />
            </div>
          </div>

          {/* Professional Narrative Biographies Textarea */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Professional Biography Summary
            </label>
            <textarea
              name="bio"
              placeholder="Tell us about yourself"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-xl border border-white/[0.08] bg-[#131926] p-4 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-[#6366F1] focus:bg-[#161D2B] transition-all resize-none leading-relaxed"
              required
            />
          </div>

          {/* Interactive Custom Document Drop Upload Container */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Upload Resume / CV
            </label>
            
            <div className="relative group rounded-xl border border-dashed border-white/[0.1] bg-[#131926] hover:border-indigo-500/40 hover:bg-[#151D2D] transition-all overflow-hidden p-6 text-center flex flex-col items-center justify-center cursor-pointer">
              <input
                type="file"
                id="resume-upload"
                accept=".pdf"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setResume(e.target.files[0]);
                  }
                }}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20"
                required={!resume}
              />
              
              {resume ? (
                <div className="space-y-2 text-emerald-400 relative z-10 animate-fade-in">
                  <CheckCircle2 className="h-10 w-10 mx-auto text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.2)]" />
                  <p className="text-sm font-bold text-white">{resume.name}</p>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                    {(resume.size / (1024 * 1024)).toFixed(2)} MB • Ready for delivery
                  </p>
                </div>
              ) : (
                <div className="space-y-2 text-slate-400 relative z-10">
                  <UploadCloud className="h-10 w-10 mx-auto text-indigo-400 group-hover:scale-105 transition-transform" />
                  <p className="text-sm font-semibold text-slate-200">
                    Click or drag file to attach documentation asset
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                    Supports secure Adobe PDF extensions up to 10MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Error Message Layout Overlay */}
          {errorMsg && (
            <p className="text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-3.5 transition-all">
              {errorMsg}
            </p>
          )}

          {/* Action Call Interactor Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/10 hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.99]"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Registering Infrastructure Context...</span>
              </>
            ) : (
              <>
                <span>Submit Verification Application</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
}