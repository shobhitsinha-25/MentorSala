import { useAuthStore } from "../../store/auth.store";
import { 
  Mail, 
  Briefcase, 
  Calendar 
} from "lucide-react";

const MentorDashboardProfile = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-6 bg-[#020617] text-slate-200 min-h-screen p-6 w-full select-none">
      
      {/* Profile Header Card */}
      <div className="bg-[#0F172A]/40 border border-white/[0.04] rounded-[24px] p-8 backdrop-blur-md shadow-2xl relative overflow-hidden max-w-5xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.01] via-transparent to-transparent pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10 text-center sm:text-left">
          <div className="relative shrink-0">
            <img
              src={
                user?.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user?.name || "Mentor"
                )}&background=4f46e5&color=fff`
              }
              alt="mentor"
              className="w-24 h-24 rounded-2xl object-cover border border-white/[0.08] shadow-xl"
            />
          </div>

          <div className="flex-1 space-y-1">
            <h1 className="text-3xl font-black text-white tracking-tight leading-none">
              {user?.name || "Unverified Profile"}
            </h1>
            <p className="text-sm font-medium text-slate-400">
              {user?.email || "N/A"}
            </p>
            
          </div>
        </div>
      </div>

      {/* Mentor Information Grid Section */}
      <div className="bg-[#0F172A]/40 border border-white/[0.04] rounded-[24px] p-8 backdrop-blur-md shadow-2xl max-w-5xl mx-auto">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">
          Credentials & Registry
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoCard
            label="Email Identity"
            value={user?.email || "N/A"}
            icon={<Mail size={16} />}
          />

          <InfoCard
            label="System Role"
            value={user?.role || "MENTOR"}
            icon={<Briefcase size={16} />}
          />

          <InfoCard
            label="Joined On"
            value={
              user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"
            }
            icon={<Calendar size={16} />}
          />
        </div>
      </div>

    </div>
  );
};

/* INNER CORE HELPERS */
const InfoCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) => (
  <div className="bg-[#1E293B]/30 border border-white/[0.02] rounded-xl p-4 flex items-center gap-4">
    <div className="text-indigo-400 p-2.5 bg-white/[0.02] border border-white/[0.04] rounded-lg shrink-0">
      {icon}
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
        {label}
      </p>
      <h3 className="text-white font-bold tracking-tight mt-0.5 truncate">
        {value}
      </h3>
    </div>
  </div>
);

export default MentorDashboardProfile;