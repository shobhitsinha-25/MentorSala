import { useEffect, useState } from "react";
import api from "../../lib/axios";
import { 
  CreditCard, 
  PlusCircle, 
  FileText, 
  Activity, 
  IndianRupee, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Headphones, 
  Layers 
} from "lucide-react";

interface Plan {
  id: string;
  title: string;
  description?: string;
  examType: string;
  price: number;
  durationInDays: number;
}

const Plans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [examType, setExamType] = useState("JEE");
  const [price, setPrice] = useState("");
  const [durationInDays, setDurationInDays] = useState("");
  const [sessionsPerMonth, setSessionsPerMonth] = useState("");
  const [practiceQuestionsLimit, setPracticeQuestionsLimit] = useState("");
  const [unlimitedPractice, setUnlimitedPractice] = useState(false);
  const [prioritySupport, setPrioritySupport] = useState(false);
  const [mentorSelectionEnabled, setMentorSelectionEnabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const payload = {
        title,
        description,
        examType,
        price: Number(price),
        durationInDays: Number(durationInDays),
        sessionsPerMonth: Number(sessionsPerMonth),
        practiceQuestionsLimit: practiceQuestionsLimit ? Number(practiceQuestionsLimit) : null,
        unlimitedPractice,
        prioritySupport,
        mentorSelectionEnabled,
      };

      await api.post("/plans", payload);
      alert("Plan Created Successfully");

      setTitle("");
      setDescription("");
      setPrice("");
      setDurationInDays("");
      setSessionsPerMonth("");
      setPracticeQuestionsLimit("");
      setUnlimitedPractice(false);
      setPrioritySupport(false);
      setMentorSelectionEnabled(true);
      fetchPlans();
    } catch (error) {
      console.error(error);
      alert("Failed to create plan");
    } finally {
      setLoading(false);
    }
  };

  const fetchPlans = async () => {
    try {
      const res = await api.get("/plans");
      setPlans(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="space-y-6 bg-[#020617] text-slate-200 min-h-screen p-6 w-full select-none">
      
      {/* HEADER SECTION */}
      <div className="text-center sm:text-left border-b border-white/[0.04] pb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 mb-3">
          <CreditCard size={12} className="text-indigo-400" />
          <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400">Billing Core</span>
        </div>
        <h1 className="text-4xl font-black text-white tracking-tight leading-none">
          Subscription Plans
        </h1>
        <p className="text-sm font-medium text-slate-400 mt-2.5">
          Create and monitor system product rates for JEE, WBJEE, and Boards architectures.
        </p>
      </div>

      {/* CORE ADMINISTRATIVE split GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto sm:mx-0">
        
        {/* LEFT COLUMN: FORM FACTORY CREATOR */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-7 bg-[#0F172A]/40 border border-white/[0.04] p-6 rounded-[24px] backdrop-blur-md shadow-2xl space-y-4"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            <PlusCircle size={14} className="text-slate-500" />
            <span>Plan Layout Configurator</span>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Plan Product Title (e.g., Premium Pro)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 pl-3 pr-10 rounded-xl bg-[#1E293B]/40 border border-white/[0.04] focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 text-white text-sm outline-none transition-all font-semibold placeholder:text-slate-600"
            />
          </div>

          <div className="relative">
            <textarea
              placeholder="Provide a brief summary detailing the feature limits of this access pass..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full p-3 rounded-xl bg-[#1E293B]/40 border border-white/[0.04] focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 text-white text-sm outline-none transition-all placeholder:text-slate-600 font-medium resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative flex items-center">
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#1E293B]/60 border border-white/[0.04] focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 text-white text-xs font-bold outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="JEE" className="bg-[#0f172a]">JEE Stream Matrix</option>
                <option value="WBJEE" className="bg-[#0f172a]">WBJEE Stream Matrix</option>
                <option value="BOARDS" className="bg-[#0f172a]">BOARDS Matrix</option>
              </select>
              <div className="absolute right-4 pointer-events-none text-slate-500"><Layers size={14} /></div>
            </div>

            <div className="relative flex items-center">
              <input
                type="number"
                placeholder="Price (INR)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-3 pl-9 rounded-xl bg-[#1E293B]/40 border border-white/[0.04] focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 text-white text-xs font-bold outline-none transition-all placeholder:text-slate-600"
              />
              <div className="absolute left-3.5 text-slate-500 pointer-events-none"><IndianRupee size={13} /></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative flex items-center">
              <input
                type="number"
                placeholder="Duration (Days)"
                value={durationInDays}
                onChange={(e) => setDurationInDays(e.target.value)}
                className="w-full p-3 pl-8 rounded-xl bg-[#1E293B]/40 border border-white/[0.04] focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 text-white text-xs outline-none transition-all font-bold placeholder:text-slate-600"
              />
              <div className="absolute left-3 text-slate-500 pointer-events-none"><Clock size={13} /></div>
            </div>

            <div className="relative flex items-center">
              <input
                type="number"
                placeholder="Sessions / Mo"
                value={sessionsPerMonth}
                onChange={(e) => setSessionsPerMonth(e.target.value)}
                className="w-full p-3 pl-8 rounded-xl bg-[#1E293B]/40 border border-white/[0.04] focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 text-white text-xs outline-none transition-all font-bold placeholder:text-slate-600"
              />
              <div className="absolute left-3 text-slate-500 pointer-events-none"><Activity size={13} /></div>
            </div>

            <div className="relative flex items-center">
              <input
                type="number"
                placeholder="Practice Limit"
                value={practiceQuestionsLimit}
                onChange={(e) => setPracticeQuestionsLimit(e.target.value)}
                className="w-full p-3 pl-8 rounded-xl bg-[#1E293B]/40 border border-white/[0.04] focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 text-white text-xs outline-none transition-all font-bold placeholder:text-slate-600"
              />
              <div className="absolute left-3 text-slate-500 pointer-events-none"><FileText size={13} /></div>
            </div>
          </div>

          {/* PERMISSION CHECK TOGGLES BOX */}
          <div className="p-4 bg-[#1E293B]/20 border border-white/[0.02] rounded-xl space-y-3.5">
            <label className="flex items-center gap-3 text-slate-300 text-xs font-bold tracking-wide cursor-pointer group">
              <input
                type="checkbox"
                checked={unlimitedPractice}
                onChange={(e) => setUnlimitedPractice(e.target.checked)}
                className="rounded border-white/[0.08] bg-[#0f172a] text-indigo-600 focus:ring-0 focus:ring-offset-0 w-4 h-4 accent-indigo-500"
              />
              <Sparkles size={14} className="text-amber-400 opacity-80" />
              <span className="group-hover:text-white transition-colors">Grant Unlimited Practice Engine Access</span>
            </label>

            <label className="flex items-center gap-3 text-slate-300 text-xs font-bold tracking-wide cursor-pointer group">
              <input
                type="checkbox"
                checked={prioritySupport}
                onChange={(e) => setPrioritySupport(e.target.checked)}
                className="rounded border-white/[0.08] bg-[#0f172a] text-indigo-600 focus:ring-0 focus:ring-offset-0 w-4 h-4 accent-indigo-500"
              />
              <Headphones size={14} className="text-sky-400 opacity-80" />
              <span className="group-hover:text-white transition-colors">Route Account to Priority Support Queue</span>
            </label>

            <label className="flex items-center gap-3 text-slate-300 text-xs font-bold tracking-wide cursor-pointer group">
              <input
                type="checkbox"
                checked={mentorSelectionEnabled}
                onChange={(e) => setMentorSelectionEnabled(e.target.checked)}
                className="rounded border-white/[0.08] bg-[#0f172a] text-indigo-600 focus:ring-0 focus:ring-offset-0 w-4 h-4 accent-indigo-500"
              />
              <ShieldCheck size={14} className="text-emerald-400 opacity-80" />
              <span className="group-hover:text-white transition-colors">Permit Custom Instructor Selection</span>
            </label>
          </div>

          {/* CREATION ACTION SUBMIT TRIGGER */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider py-3.5 rounded-xl disabled:opacity-50 transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <div className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Configuring Node...</span>
                </>
              ) : (
                <span>Publish Subscription Plan</span>
              )}
            </button>
          </div>
        </form>

        {/* RIGHT COLUMN: RECTANGULAR METRIC CATALOGUE ROSTER */}
        <div className="lg:col-span-5 space-y-5">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <span>Live Registry Catalogue</span>
            <span className="px-1.5 py-0.5 text-[10px] bg-slate-800 text-slate-400 rounded-full font-black">{plans.length}</span>
          </h2>

          <div className="grid gap-3.5 max-h-[580px] overflow-y-auto pr-1">
            {plans.length === 0 ? (
              <div className="text-xs font-semibold text-slate-500 bg-white/[0.01] border border-dashed border-white/[0.04] p-8 rounded-xl text-center">
                No subscription packages indexed inside database.
              </div>
            ) : (
              plans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-[#0F172A]/70 border border-white/[0.04] hover:border-indigo-500/20 rounded-2xl p-4.5 shadow-xl transition-all relative overflow-hidden group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5 min-w-0">
                      <h3 className="text-white text-sm font-black truncate group-hover:text-indigo-400 transition-colors">
                        {plan.title}
                      </h3>
                      
                      <div className="inline-flex items-center text-[10px] font-black uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md">
                        {plan.examType}
                      </div>

                      {plan.description && (
                        <p className="text-[11px] text-slate-500 line-clamp-1 font-medium pt-1">
                          {plan.description}
                        </p>
                      )}
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-emerald-400 text-lg font-black tracking-tight flex items-center justify-end">
                        <span className="text-xs font-bold mr-0.5">₹</span>
                        <span>{plan.price}</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mt-0.5">
                        {plan.durationInDays} Day Term
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Plans;