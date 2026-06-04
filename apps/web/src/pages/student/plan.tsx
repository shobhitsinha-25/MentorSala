import { useEffect, useState } from "react";
import api from "../../lib/axios";
import { 
  CreditCard, 
  Sparkles, 
  Clock, 
  Activity, 
  CheckCircle2, 
  ShoppingBag, 
  ArrowUpCircle,
  Calendar,
  AlertCircle
} from "lucide-react";

interface Plan {
  id: string;
  title: string;
  description?: string;
  examType: string;
  price: number;
  durationInDays: number;
  sessionsPerMonth: number;
}

interface Subscription {
  id: string;
  status: string;
  expiresAt: string;
  plan: {
    id: string;
    title: string;
    price: number;
  };
}

const Subscriptions = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const purchasePlan = async (planId: string) => {
    try {
      const res = await api.post("/plans/purchase", {
        planId,
      });

      alert("Plan Purchased Successfully");
      window.location.reload();
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || "Purchase Failed");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plansRes, subscriptionRes] = await Promise.all([
          api.get("/plans/student"),
          api.get("/plans/my-subscription"),
        ]);

        setPlans(plansRes.data.data || []);
        setSubscription(subscriptionRes.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="h-10 w-10 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
        <p className="text-slate-400 font-medium text-sm animate-pulse">Loading package terminal...</p>
      </div>
    );
  }

  return (
    
    <div className="space-y-6 bg-[#020617] text-slate-200 min-h-screen p-6 w-full select-none">
      
      {/* HEADER BLOCK */}
      <div className="text-center sm:text-left border-b border-white/[0.04] pb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 mb-3">
          <CreditCard size={12} className="text-indigo-400" />
          <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400">Student Pass</span>
        </div>
        <h1 className="text-4xl font-black text-white tracking-tight leading-none">
          Subscription Plans
        </h1>
        <p className="text-sm font-medium text-slate-400 mt-2.5">
          Plans available for your exam
        </p>
      </div>

      <div className="max-w-6xl mx-auto sm:mx-0 space-y-8">
        
        {/* ACTIVE RUNTIME SUBSCRIPTION BANNER */}
        {subscription && (
          <div className="relative rounded-[24px] overflow-hidden bg-gradient-to-r from-indigo-600/30 via-purple-600/20 to-slate-900/40 border border-indigo-500/30 p-6 backdrop-blur-md shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Active Account Matrix</span>
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight leading-none">
                {subscription.plan.title}
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-slate-400 pt-1">
                <span className="flex items-center gap-1.5 capitalize"><AlertCircle size={13} className="text-indigo-400" /> State: {subscription.status.toLowerCase()}</span>
                <span className="flex items-center gap-1.5"><Calendar size={13} className="text-purple-400" /> Terminus: {new Date(subscription.expiresAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="shrink-0">
              <div className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-center">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Assigned Rate</span>
                <span className="text-white font-black text-lg">₹{subscription.plan.price}</span>
              </div>
            </div>
          </div>
        )}

        {/* SUBSCRIPTION PLAN MARKET GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isCurrentPlan = subscription?.plan?.id === plan.id;
            return (
              <div
                key={plan.id}
                className={`rounded-[24px] p-6 backdrop-blur-md shadow-xl relative flex flex-col justify-between transition-all duration-300 border ${
                  isCurrentPlan 
                    ? "bg-slate-900/80 border-indigo-500/40 ring-1 ring-indigo-500/20 shadow-indigo-500/[0.02]" 
                    : "bg-[#0F172A]/40 border-white/[0.04] hover:border-indigo-500/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                }`}
              >
                <div>
                  {/* CARD TITLE LAYER */}
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-xl font-black text-white tracking-tight leading-tight">
                      {plan.title}
                    </h2>
                    {isCurrentPlan && (
                      <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md">
                        <Sparkles size={10} /> Active
                      </span>
                    )}
                  </div>

                  {/* PLAN DESCRIPTION */}
                  <p className="text-xs font-medium text-slate-400 mt-2 line-clamp-2 min-h-[32px] leading-relaxed">
                    {plan.description || "Comprehensive syllabus coverage and customized mentor access routes."}
                  </p>

                  {/* PRICING DIGIT CORE */}
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-emerald-400">₹</span>
                    <span className="text-4xl font-black text-emerald-400 tracking-tight">{plan.price}</span>
                  </div>

                  {/* FEATURE LOGISTICS SPEC SHEET */}
                  <div className="mt-5 space-y-2.5 pt-4 border-t border-white/[0.03]">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Clock size={13} className="text-slate-500" />
                        <span>Access Term</span>
                      </div>
                      <span className="text-slate-200 font-bold bg-white/[0.02] border border-white/[0.04] px-2 py-0.5 rounded-md">
                        {plan.durationInDays} Days
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-medium">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Activity size={13} className="text-slate-500" />
                        <span>Interactive Mentoring</span>
                      </div>
                      <span className="text-slate-200 font-bold bg-white/[0.02] border border-white/[0.04] px-2 py-0.5 rounded-md">
                        {plan.sessionsPerMonth} Sessions / Mo
                      </span>
                    </div>
                  </div>
                </div>

                {/* ACTION CONTEXT SUBMIT FLOW BUTTON */}
                <div className="mt-8">
                  {isCurrentPlan ? (
                    <button
                      disabled
                      className="w-full flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/20 py-3 rounded-xl text-emerald-400 text-xs font-black uppercase tracking-wider cursor-not-allowed select-none"
                    >
                      <CheckCircle2 size={14} />
                      <span>Current Active Plan</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => purchasePlan(plan.id)}
                      className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white text-xs font-black uppercase tracking-wider transition-all shadow-lg active:scale-[0.98] ${
                        subscription 
                          ? "bg-slate-800 hover:bg-slate-700 border border-white/[0.04] hover:border-white/[0.08] shadow-black/10" 
                          : "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/10"
                      }`}
                    >
                      {subscription ? (
                        <>
                          <ArrowUpCircle size={14} />
                          <span>Upgrade Plan</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={14} />
                          <span>Buy Access Pass</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    
  );
};

export default Subscriptions;