import { useAuthStore } from "../../store/auth.store";
import { 
  Target, 
  Flame, 
  Zap, 
  Award,
  Camera, 
} from "lucide-react";

import { useRef } from "react";
import api from "../../lib/axios";
import toast from "react-hot-toast";

const Profile = () => {
  const user = useAuthStore((state) => state.user);

const setUser = useAuthStore(
  (state) => state.setUser
);

const fileInputRef =
  useRef<HTMLInputElement>(null);

const handleAvatarUpload = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {

  const file = e.target.files?.[0];

  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {

    toast.error("Image must be under 5 MB.");

    return;

  }

  const allowedTypes = [

    "image/jpeg",

    "image/png",

    "image/webp",

  ];

  if (!allowedTypes.includes(file.type)) {

    toast.error(
      "Only JPG, PNG and WEBP images are allowed."
    );

    return;

  }

  const formData = new FormData();

  formData.append("avatar", file);

  try {

    const res = await api.patch(
      "/user/avatar",
      formData
    );

    setUser({
  ...user!,
  ...res.data.user,
});

    toast.success(
      "Profile picture updated!"
    );

  } catch (error: any) {

    toast.error(

      error.response?.data?.message ||

      "Upload failed"

    );

  }

};

  return (
    <div className="space-y-6 bg-[#020617] text-slate-200 min-h-screen p-6 w-full select-none">
      
      {/* Profile Header */}
      <div className="bg-[#0F172A]/40 border border-white/[0.04] rounded-[24px] p-8 backdrop-blur-md shadow-2xl relative overflow-hidden max-w-5xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.01] via-transparent to-transparent pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10 text-center sm:text-left">
          <div className="relative shrink-0">
            <img
              src={
                  user?.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user?.name || "Student"
                )}&background=4f46e5&color=fff`
              }
              alt="profile"
              className="w-24 h-24 rounded-2xl object-cover border border-white/[0.08] shadow-xl"
            />

            <div
  onClick={() =>
    fileInputRef.current?.click()
  }
  className="
    absolute
    inset-0
    rounded-2xl
    bg-black/60
    opacity-0
    group-hover:opacity-100
    transition-all
    duration-300
    flex
    items-center
    justify-center
  "
>
  <Camera
    size={28}
    className="text-white"
  />
</div>

<input
  ref={fileInputRef}
  type="file"
  accept="image/*"
  hidden
  onChange={handleAvatarUpload}
/>
          </div>

          <div className="flex-1 space-y-1">
            <h1 className="text-3xl font-black text-white tracking-tight leading-none">
              {user?.name || "Unverified Student"}
            </h1>
            <p className="text-sm font-medium text-slate-400">
              {user?.email || "N/A"}
            </p>
            <div className="mt-3 inline-flex px-3 py-1 rounded-lg bg-indigo-600 text-white text-xs font-black uppercase tracking-wider shadow-md">
              {user?.level || "Rookie"}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        <StatCard
          title="Total Experience"
          value={`${user?.xp || 0} XP`}
          icon={<Zap size={18} fill="currentColor" />}
        />

        <StatCard
          title="Current Streak"
          value={`${user?.streak || 0} Days`}
          icon={<Flame size={18} />}
        />

        <StatCard
          title="Current Tier"
          value={user?.level || "Rookie"}
          icon={<Award size={18} />}
        />
      </div>

      {/* Target Roadmap Information Card */}
      <div className="bg-[#0F172A]/40 border border-white/[0.04] rounded-[24px] p-8 backdrop-blur-md shadow-2xl max-w-5xl mx-auto">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
          Academic Track
        </h2>

        <div className="w-full">
          <InfoCard
            label="Target Examination Matrix"
            value={user?.targetExam || "Not Selected"}
            icon={<Target size={18} />}
          />
        </div>
      </div>

    </div>
  );
};

/* INNER HELPER STATIC CARDS */
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
    <div>
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
        {label}
      </p>
      <h3 className="text-white font-bold tracking-tight mt-0.5">
        {value}
      </h3>
    </div>
  </div>
);

const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) => (
  <div className="bg-[#0F172A]/40 border border-white/[0.04] rounded-2xl p-5 backdrop-blur-md shadow-lg">
    <div className="flex justify-between items-center">
      <p className="text-slate-400 text-xs font-bold uppercase tracking-wide">
        {title}
      </p>
      <div className="text-indigo-400 bg-indigo-500/10 p-2 rounded-lg border border-indigo-500/20 shrink-0">
        {icon}
      </div>
    </div>
    <h3 className="text-2xl font-black text-white mt-4 tracking-tight">
      {value}
    </h3>
  </div>
);

export default Profile;