import { useAuthStore } from "../../store/auth.store";
import { 
  Target, 
  Flame, 
  Zap, 
  Award,
  Camera,
  Sparkles,
  Mail,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import { useRef } from "react";
import api from "../../lib/axios";
import toast from "react-hot-toast";

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5 MB.");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG and WEBP images are allowed.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await api.patch("/user/avatar", formData);
      setUser({
        ...user!,
        ...res.data.user,
      });
      toast.success("Profile picture updated!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 p-3 sm:p-6 lg:p-8 select-none relative overflow-hidden space-y-6">
      {/* Soft Ambient Purple & Indigo Glows */}
      <div className="pointer-events-none absolute -top-32 left-1/4 w-[500px] h-[300px] bg-purple-200/40 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute top-1/2 -right-20 w-[450px] h-[350px] bg-indigo-200/30 blur-[140px] rounded-full" />

      <div className="max-w-5xl mx-auto space-y-6 relative z-10">
        
        {/* ==================================================
            PROFILE HEADER CARD
            ================================================== */}
        <div className="rounded-2xl sm:rounded-3xl border border-purple-100/90 bg-white p-5 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
          <div className="pointer-events-none absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-100/60 to-transparent rounded-full blur-2xl" />

          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-7 relative z-10 text-center sm:text-left">
            
            {/* Avatar Container with Upload Overlay */}
            <div 
              className="relative shrink-0 group cursor-pointer" 
              onClick={() => fileInputRef.current?.click()}
              title="Click to update profile photo"
            >
              <img
                src={
                  user?.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user?.name || "Student"
                  )}&background=9333ea&color=fff`
                }
                alt="profile"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl object-cover border-2 border-purple-100 shadow-md group-hover:border-purple-400 group-hover:scale-[1.02] transition-all duration-300"
              />

              {/* Hover Camera Overlay */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-purple-950/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-white backdrop-blur-[2px]">
                <Camera size={24} className="scale-90 group-hover:scale-100 transition-transform duration-300" />
                <span className="text-[10px] font-bold mt-1">Change</span>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarUpload}
              />
            </div>

            {/* User Meta Information */}
            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/70 text-purple-700 text-[11px] font-bold uppercase tracking-wider shadow-2xs">
                <Sparkles size={12} className="text-purple-600" />
                Student Profile
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight truncate">
                {user?.name || "Unverified Student"}
              </h1>

              <p className="text-xs sm:text-sm font-medium text-slate-500 flex items-center justify-center sm:justify-start gap-1.5 truncate">
                <Mail size={14} className="text-slate-400 shrink-0" />
                <span>{user?.email || "No email linked"}</span>
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-purple-600 text-white text-xs font-black uppercase tracking-wider shadow-sm shadow-purple-600/25">
                  <ShieldCheck size={13} />
                  {user?.level || "Rookie"}
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  Active Learner
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================
            PERFORMANCE STATS GRID
            ================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard
            title="Total Experience"
            value={`${user?.xp || 0} XP`}
            subtitle="Earned across mocks & POTD"
            accent="purple"
            icon={<Zap size={18} className="fill-current" />}
          />

          <StatCard
            title="Current Streak"
            value={`${user?.streak || 0} Days`}
            subtitle="Continuous problem solving"
            accent="amber"
            icon={<Flame size={18} className="fill-current animate-pulse" />}
          />

          <StatCard
            title="Current Tier"
            value={user?.level || "Rookie"}
            subtitle="Global ranking classification"
            accent="emerald"
            icon={<Award size={18} />}
          />
        </div>

        {/* ==================================================
            ACADEMIC TRACK & ROADMAP
            ================================================== */}
        <div className="rounded-2xl sm:rounded-3xl border border-purple-100/90 bg-white p-5 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-900">
                Academic Track
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                Your examination target and curated study roadmap
              </p>
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200/70 px-2.5 py-1 rounded-lg">
              Active Syllabus
            </span>
          </div>

          <div className="w-full">
            <InfoCard
              label="Target Examination"
              value={user?.targetExam ? user.targetExam.replace(/_/g, " ") : "Not Selected"}
              description="Mock tests, AI analytics, and personalized problems are mapped to this curriculum."
              icon={<Target size={20} />}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

/* ======================================================
   INNER HELPER CARDS
   ====================================================== */

const InfoCard = ({
  label,
  value,
  description,
  icon,
}: {
  label: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}) => (
  <div className="rounded-2xl border border-purple-100/80 bg-gradient-to-r from-purple-50/60 via-indigo-50/30 to-white p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all duration-200 hover:border-purple-200">
    <div className="text-purple-600 p-3 bg-white border border-purple-200/80 rounded-2xl shrink-0 shadow-2xs">
      {icon}
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-[10px] sm:text-[11px] font-bold text-purple-700 uppercase tracking-wider">
        {label}
      </p>
      <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight mt-0.5 truncate">
        {value}
      </h3>
      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  accent,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  accent: "purple" | "amber" | "emerald";
}) => {
  const accentStyles = {
    purple: {
      border: "border-purple-200/80",
      bgIcon: "bg-purple-50 text-purple-600 border-purple-200/80",
      valText: "text-purple-700",
    },
    amber: {
      border: "border-amber-200/80",
      bgIcon: "bg-amber-50 text-amber-600 border-amber-200/80",
      valText: "text-amber-800",
    },
    emerald: {
      border: "border-emerald-200/80",
      bgIcon: "bg-emerald-50 text-emerald-600 border-emerald-200/80",
      valText: "text-emerald-800",
    },
  }[accent];

  return (
    <div className="rounded-2xl sm:rounded-3xl border border-purple-100/90 bg-white p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div className="flex justify-between items-center gap-2">
        <p className="text-slate-500 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
          {title}
        </p>
        <div className={`p-2 sm:p-2.5 rounded-xl border shrink-0 ${accentStyles.bgIcon}`}>
          {icon}
        </div>
      </div>

      <div className="mt-4">
        <h3 className={`text-2xl sm:text-3xl font-black tracking-tight ${accentStyles.valText}`}>
          {value}
        </h3>
        <p className="text-[11px] font-medium text-slate-400 mt-0.5">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default Profile;