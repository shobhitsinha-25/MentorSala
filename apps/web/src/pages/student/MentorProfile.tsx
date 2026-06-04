import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  Star,
  ArrowLeft,
  Users,
  GraduationCap,
} from "lucide-react";

import toast from "react-hot-toast";
import api from "../../lib/axios";

interface Mentor {
  id: string;
  bio: string;
  qualification: string;
  experienceYears: number;
  expertise: string[];
  rating: number;
  totalStudents: number;
  availableForMentorship: boolean;
  user: {
    id: string;
    name: string;
    avatar: string | null;
    email: string;
  };
}

const MentorProfile = () => {
  const navigate = useNavigate();
  const { mentorId } = useParams();

  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [slotsLoading, setSlotsLoading] = useState(false);

  // ======================================
  // FETCH MENTOR
  // ======================================

  const fetchMentor = async () => {
    try {
      const res = await api.get(`/mentors/${mentorId}`);
      setMentor(res.data.mentor);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to load mentor"
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================
  // FETCH SLOTS
  // ======================================

  const fetchSlots = async (date: string) => {
    try {
      setSlotsLoading(true);
      const res = await api.get(`/slots/${mentorId}?date=${date}`);
      setSlots(res.data.slots || []);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to fetch slots"
      );
    } finally {
      setSlotsLoading(false);
    }
  };

  // ======================================
  // BOOK SESSION
  // ======================================

  const handleBookSession = async () => {
    try {
      await api.post("/sessions/book", {
        mentorId,
        scheduledAt: selectedSlot,
      });

      toast.success("Session booked successfully");
      setSelectedSlot("");
      fetchSlots(selectedDate);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Booking failed"
      );
    }
  };

  useEffect(() => {
    fetchMentor();
  }, [mentorId]);

  // ======================================
  // LOADING
  // ======================================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] bg-[#020617]">
        <div className="h-8 w-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  // ======================================
  // NO MENTOR
  // ======================================

  if (!mentor) {
    return (
      <div className="text-center text-red-400 mt-20 font-semibold select-none">
        Mentor not found
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 bg-[#020617] text-slate-200 min-h-screen select-none">
      
      {/* BACK NAVIGATION ACTION BUTTON */}
      <button
        onClick={() => navigate("/student/book-session")}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors px-1"
      >
        <ArrowLeft size={14} />
        <span>Back to Mentors</span>
      </button>

      {/* ✅ REFINED HEADER PROFILE BANNER */}
      <div className="bg-[#0F172A]/70 border border-white/[0.05] rounded-[24px] p-8 sm:p-10 relative overflow-hidden shadow-xl backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
          
          {/* AVATAR BOX BLOCK */}
          <div className="shrink-0">
            <img
              src={
                mentor.user.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.user.name)}&background=4f46e5&color=fff`
              }
              alt={mentor.user.name}
              className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl object-cover border border-white/[0.08] shadow-md transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>

          {/* IDENTITY TEXT CORE BLOCK */}
          <div className="flex-1 min-w-0 w-full">
            <h1 className="text-3xl font-black text-white tracking-tight truncate">
              {mentor.user.name}
            </h1>
            
            <p className="text-sm font-semibold text-indigo-400 mt-1">
              {mentor.qualification}
            </p>

            {/* EXPERTISE KEY TAGS SCROLLER STRIP */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
              {mentor.expertise.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-lg bg-[#1E293B]/60 border border-white/[0.04] text-indigo-300 text-xs font-bold shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* ANALYTICS HUD BLOCKS */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              
              <div className="bg-[#1E293B]/40 border border-white/[0.02] rounded-xl p-3 text-center shadow-sm">
                <Star size={16} className="mx-auto text-amber-400" fill="currentColor" />
                <div className="text-white text-base font-black mt-2 leading-none">
                  {mentor.rating}
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1.5">
                  Rating
                </div>
              </div>

              <div className="bg-[#1E293B]/40 border border-white/[0.02] rounded-xl p-3 text-center shadow-sm">
                <Users size={16} className="mx-auto text-cyan-400" />
                <div className="text-white text-base font-black mt-2 leading-none">
                  {mentor.totalStudents}
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1.5">
                  Students
                </div>
              </div>

              <div className="bg-[#1E293B]/40 border border-white/[0.02] rounded-xl p-3 text-center shadow-sm">
                <GraduationCap size={18} className="mx-auto text-emerald-400" />
                <div className="text-white text-base font-black mt-2 leading-none">
                  {mentor.experienceYears}
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1.5">
                  Years
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ✅ REFINED ABOUT DESCRIPTION MODULE */}
      <div className="bg-[#0F172A]/70 border border-white/[0.05] rounded-[24px] p-6 sm:p-8 shadow-md backdrop-blur-md">
        <h2 className="text-sm font-black text-white uppercase tracking-wider">
          About Mentor
        </h2>
        <p className="text-xs text-slate-400 mt-3 leading-relaxed font-medium">
          {mentor.bio || "No bio available."}
        </p>
      </div>

      {/* ✅ REFINED SCHEDULING DISCOVERY LAYOUT WORKSPACE */}
      <div className="bg-[#0F172A]/70 border border-white/[0.05] rounded-[24px] p-6 sm:p-8 shadow-xl space-y-6 backdrop-blur-md">
        <div>
          <h2 className="text-sm font-black text-white uppercase tracking-wider">
            Book Session
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Select a date and available slot.
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="date"
            value={selectedDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => {
              const date = e.target.value;
              setSelectedDate(date);
              setSelectedSlot("");
              fetchSlots(date);
            }}
            className="w-full h-12 bg-[#131926] border border-white/[0.08] rounded-xl px-4 text-xs font-bold text-white outline-none focus:border-indigo-500/50 focus:bg-[#0D1321] transition-all scheme-dark cursor-pointer shadow-inner"
          />

          <div className="pt-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Available Slots
            </h3>

            {slotsLoading ? (
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 py-2">
                <div className="w-3.5 h-3.5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <span>Loading slots...</span>
              </div>
            ) : slots.length === 0 ? (
              <div className="text-xs font-semibold text-slate-500 bg-white/[0.01] border border-dashed border-white/[0.04] p-4 rounded-xl text-center">
                No slots available
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                {slots.map((slot) => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`h-11 rounded-xl border text-xs font-bold transition-all active:scale-[0.98] ${
                        isSelected
                          ? "bg-gradient-to-r from-indigo-600 to-indigo-500 border-transparent text-white shadow-lg shadow-indigo-500/10"
                          : "bg-[#131926] border-white/[0.06] hover:border-white/[0.12] text-slate-300"
                      }`}
                    >
                      {new Date(slot).toLocaleTimeString("en-IN", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* BOOK SUBMIT ACTION CTA */}
        <button
          disabled={!selectedSlot}
          onClick={handleBookSession}
          className="w-full h-12 mt-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white text-sm font-bold transition-all shadow-lg shadow-indigo-500/10 hover:opacity-95 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] active:scale-[0.99] disabled:opacity-40 flex items-center justify-center gap-2"
        >
          <span>Book Session</span>
        </button>

      </div>
    </div>
  );
};

export default MentorProfile;