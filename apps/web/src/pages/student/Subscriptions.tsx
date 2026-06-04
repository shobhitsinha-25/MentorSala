import { 
  CreditCard, 
  Clock, 
  ShoppingBag, 
  Sparkles,
  Zap,
  GraduationCap
} from "lucide-react";

interface PlanConfig {
  id: string;
  title: string;
  price: number;
  durationInDays: number;
  description: string;
}

const JEE_PLANS: PlanConfig[] = [
  {
    id: "jee-starter",
    title: "Starter",
    price: 1999,
    durationInDays: 365,
    description: "Fundamental resources designed for standard annual engineering preparation."
  },
  {
    id: "jee-scholar",
    title: "Scholar",
    price: 4999,
    durationInDays: 365,
    description: "Deep content tracking, core strategies, and intermediate mentor alignment."
  },
  {
    id: "jee-elite",
    title: "Elite",
    price: 7999,
    durationInDays: 365,
    description: "Premium access blueprint with advanced problem sets and high-frequency testing."
  }
];

const WBJEE_PLANS: PlanConfig[] = [
  {
    id: "wbjee-starter",
    title: "Starter",
    price: 999,
    durationInDays: 365,
    description: "Targeted fundamental syllabus breakdown customized for state engineering parameters."
  },
  {
    id: "wbjee-scholar",
    title: "Scholar",
    price: 1999,
    durationInDays: 365,
    description: "Enhanced evaluation tracks with intensive conceptual mock reviews."
  },
  {
    id: "wbjee-elite",
    title: "Elite",
    price: 3999,
    durationInDays: 365,
    description: "Comprehensive state tier indexing with direct premium mentor workspaces."
  }
];

const BOARDS_PLANS: PlanConfig[] = [
  {
    id: "boards-starter",
    title: "Starter",
    price: 999,
    durationInDays: 365,
    description: "Structured foundational guide for clearing board curriculum parameters."
  },
  {
    id: "boards-scholar",
    title: "Scholar",
    price: 1999,
    durationInDays: 365,
    description: "Thorough continuous descriptive testing containing detailed answer sheet audits."
  },
  {
    id: "boards-elite",
    title: "Elite",
    price: 2999,
    durationInDays: 365,
    description: "High-tier performance track mapping structured to max target percentages."
  }
];

const Subscriptions = () => {
  return (
    <div className="space-y-12 bg-[#020617] text-slate-200 min-h-screen p-6 w-full select-none">
      
      {/* HEADER SECTION */}
      <div className="text-center sm:text-left border-b border-white/[0.04] pb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 mb-3">
          <CreditCard size={12} className="text-indigo-400" />
          <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400">Catalogue Terminal</span>
        </div>
        <h1 className="text-4xl font-black text-white tracking-tight leading-none">
          Subscription Plans
        </h1>
        <p className="text-sm font-medium text-slate-400 mt-2.5">
          Select a targeted operational tier explicitly structured to match your stream timeline.
        </p>
      </div>

      <div className="max-w-6xl mx-auto sm:mx-0 space-y-14">
        
        {/* ==========================================
            SECTION: JEE MATRIX TRACK
           ========================================== */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-l-2 border-amber-500 pl-3">
            <h2 className="text-xl font-black text-white tracking-tight uppercase">JEE Main & Advanced</h2>
            <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-md font-bold tracking-wide">National Matrix</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {JEE_PLANS.map((plan) => (
              <div key={plan.id} className="rounded-[24px] p-6 bg-[#0F172A]/40 border border-white/[0.04] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-white capitalize tracking-tight">{plan.title}</h3>
                    <Sparkles size={14} className="text-amber-400/60" />
                  </div>
                  <p className="text-xs font-medium text-slate-400 mt-2 min-h-[32px] leading-relaxed">{plan.description}</p>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-xl font-bold text-emerald-400">₹</span>
                    <span className="text-3xl font-black text-emerald-400 tracking-tight">{plan.price}</span>
                    <span className="text-xs font-bold text-slate-500 ml-1">/ yr</span>
                  </div>
                  <div className="mt-5 space-y-2 pt-4 border-t border-white/[0.02] text-xs font-medium text-slate-400">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1.5"><Clock size={13} className="text-slate-500" /> Access Duration</span>
                      <span className="text-slate-200 font-bold bg-white/[0.02] border border-white/[0.04] px-2 py-0.5 rounded-md">{plan.durationInDays} Days</span>
                    </div>
                  </div>
                </div>
                {/* Static indicator badge replacing the active clickable button button */}
                <div className="w-full mt-6 py-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/20 text-indigo-300 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-default select-none">
                  <ShoppingBag size={14} />
                  <span>Access Pass Protected</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            SECTION: WBJEE MATRIX TRACK
           ========================================== */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-l-2 border-cyan-500 pl-3">
            <h2 className="text-xl font-black text-white tracking-tight uppercase">WBJEE </h2>
            <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-md font-bold tracking-wide">State Matrix</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {WBJEE_PLANS.map((plan) => (
              <div key={plan.id} className="rounded-[24px] p-6 bg-[#0F172A]/40 border border-white/[0.04] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-white capitalize tracking-tight">{plan.title}</h3>
                    <Zap size={14} className="text-cyan-400/60" />
                  </div>
                  <p className="text-xs font-medium text-slate-400 mt-2 min-h-[32px] leading-relaxed">{plan.description}</p>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-xl font-bold text-emerald-400">₹</span>
                    <span className="text-3xl font-black text-emerald-400 tracking-tight">{plan.price}</span>
                    <span className="text-xs font-bold text-slate-500 ml-1">/ yr</span>
                  </div>
                  <div className="mt-5 space-y-2 pt-4 border-t border-white/[0.02] text-xs font-medium text-slate-400">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1.5"><Clock size={13} className="text-slate-500" /> Access Duration</span>
                      <span className="text-slate-200 font-bold bg-white/[0.02] border border-white/[0.04] px-2 py-0.5 rounded-md">{plan.durationInDays} Days</span>
                    </div>
                  </div>
                </div>
                {/* Static indicator badge replacing the active clickable button button */}
                <div className="w-full mt-6 py-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/20 text-indigo-300 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-default select-none">
                  <ShoppingBag size={14} />
                  <span>Access Pass Protected</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            SECTION: BOARDS MATRIX TRACK
           ========================================== */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-l-2 border-indigo-500 pl-3">
            <h2 className="text-xl font-black text-white tracking-tight uppercase">Boards</h2>
            <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-md font-bold tracking-wide">Academic Matrix</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {BOARDS_PLANS.map((plan) => (
              <div key={plan.id} className="rounded-[24px] p-6 bg-[#0F172A]/40 border border-white/[0.04] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-white capitalize tracking-tight">{plan.title}</h3>
                    <GraduationCap size={15} className="text-indigo-400/60" />
                  </div>
                  <p className="text-xs font-medium text-slate-400 mt-2 min-h-[32px] leading-relaxed">{plan.description}</p>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-xl font-bold text-emerald-400">₹</span>
                    <span className="text-3xl font-black text-emerald-400 tracking-tight">{plan.price}</span>
                    <span className="text-xs font-bold text-slate-500 ml-1">/ yr</span>
                  </div>
                  <div className="mt-5 space-y-2 pt-4 border-t border-white/[0.02] text-xs font-medium text-slate-400">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1.5"><Clock size={13} className="text-slate-500" /> Access Duration</span>
                      <span className="text-slate-200 font-bold bg-white/[0.02] border border-white/[0.04] px-2 py-0.5 rounded-md">{plan.durationInDays} Days</span>
                    </div>
                  </div>
                </div>
                {/* Static indicator badge replacing the active clickable button button */}
                <div className="w-full mt-6 py-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/20 text-indigo-300 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-default select-none">
                  <ShoppingBag size={14} />
                  <span>Access Pass Protected</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Subscriptions;