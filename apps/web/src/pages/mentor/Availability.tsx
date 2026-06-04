import {
  useEffect,
  useState,
} from "react";

import api from "../../lib/axios";
import toast from "react-hot-toast";

import {
  Calendar,
  Clock,
  Trash2,
  Edit3,
  X,
} from "lucide-react";

const Availability = () => {

  // =====================================================
  // STATES
  // =====================================================

  const [dayOfWeek, setDayOfWeek] = useState(1);
  const [startTime, setStartTime] = useState("16:00");
  const [endTime, setEndTime] = useState("18:00");
  const [loading, setLoading] = useState(false);
  const [availability, setAvailability] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStartTime, setEditStartTime] = useState("");
  const [editEndTime, setEditEndTime] = useState("");

  // =====================================================
  // FETCH AVAILABILITY
  // =====================================================

  const fetchAvailability = async () => {
    try {
      const res = await api.get("/mentor/availability");
      setAvailability(res.data.availability);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to fetch availability"
      );
    }
  };

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {
    fetchAvailability();
  }, []);

  // =====================================================
  // CREATE AVAILABILITY
  // =====================================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/mentor/availability", {
        dayOfWeek,
        startTime,
        endTime,
      });
      toast.success("Availability created successfully");
      fetchAvailability();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to create availability"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // DELETE AVAILABILITY
  // =====================================================

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/mentor/availability/${id}`);
      toast.success("Availability deleted successfully");
      fetchAvailability();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Delete failed"
      );
    }
  };

  // =====================================================
  // START UPDATE
  // =====================================================

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setEditStartTime(item.startTime);
    setEditEndTime(item.endTime);
  };

  // =====================================================
  // UPDATE AVAILABILITY
  // =====================================================

  const handleUpdate = async (id: string) => {
    try {
      await api.patch(`/mentor/availability/${id}`, {
        startTime: editStartTime,
        endTime: editEndTime,
      });
      toast.success("Availability updated successfully");
      setEditingId(null);
      fetchAvailability();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Update failed"
      );
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-[85vh] flex flex-col items-center select-none bg-[#020617] text-slate-200 py-4">
      <div className="w-full max-w-2xl space-y-8">

        {/* HEADER SECTION */}
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-black text-white tracking-tight leading-none">
            Mentor Availability
          </h1>
          <p className="text-xs font-medium text-slate-400 mt-2.5">
            Set your weekly mentorship schedule timing
          </p>
        </div>

        {/* CREATE FORM CARD COMPONENT */}
        <div className="bg-[#0B0F19] border border-white/[0.06] rounded-[24px] p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent pointer-events-none" />

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {/* DAY */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">
                Select Day
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none" size={16} />
                <select
                  value={dayOfWeek}
                  onChange={(e) => setDayOfWeek(Number(e.target.value))}
                  className="w-full h-12 rounded-xl border border-white/[0.08] bg-[#131926] pl-11 pr-4 text-sm font-semibold text-white outline-none focus:border-indigo-500/50 focus:bg-[#161D2B] transition-all cursor-pointer appearance-none"
                >
                  <option className="bg-[#0B0F19]" value={1}>Monday</option>
                  <option className="bg-[#0B0F19]" value={2}>Tuesday</option>
                  <option className="bg-[#0B0F19]" value={3}>Wednesday</option>
                  <option className="bg-[#0B0F19]" value={4}>Thursday</option>
                  <option className="bg-[#0B0F19]" value={5}>Friday</option>
                  <option className="bg-[#0B0F19]" value={6}>Saturday</option>
                  <option className="bg-[#0B0F19]" value={0}>Sunday</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 border-l border-white/[0.08] pl-2.5 text-[10px] font-bold uppercase tracking-wider">
                  Pick
                </div>
              </div>
            </div>

            {/* TIME */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* START */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">
                  Start Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none" size={16} />
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full h-12 rounded-xl border border-white/[0.08] bg-[#131926] pl-11 pr-4 text-sm font-semibold text-white outline-none focus:border-indigo-500/50 focus:bg-[#161D2B] transition-colors scheme-dark"
                  />
                </div>
              </div>

              {/* END */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">
                  End Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none" size={16} />
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full h-12 rounded-xl border border-white/[0.08] bg-[#131926] pl-11 pr-4 text-sm font-semibold text-white outline-none focus:border-indigo-500/50 focus:bg-[#161D2B] transition-colors scheme-dark"
                  />
                </div>
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 mt-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white text-sm font-bold transition-all shadow-lg shadow-indigo-500/10 hover:opacity-95 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating Block...</span>
                </div>
              ) : (
                <>
                  
                  <span>Create New Availability</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* AVAILABILITY LIST */}
        <div className="space-y-4">
          {availability.length > 0 && (
            <div className="px-1">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Your Active Availability
              </h3>
            </div>
          )}

          {availability.map((item) => (
            <div
              key={item.id}
              className="bg-[#0B0F19] border border-white/[0.06] hover:border-white/[0.12] rounded-[24px] p-6 shadow-xl transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/10 shrink-0">
                    <Calendar size={18} className="text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white tracking-tight">
                      {[
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                      ][item.dayOfWeek]}
                    </h2>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1 font-medium">
                      <Clock size={12} className="text-slate-500" />
                      <span>{item.startTime} — {item.endTime}</span>
                    </div>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="flex items-center gap-2.5 sm:self-center self-end shrink-0">
                  <button
                    onClick={() => handleEdit(item)}
                    className="h-9 px-3.5 rounded-xl bg-[#1A2333] border border-white/[0.04] text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 active:scale-[0.97]"
                  >
                    <Edit3 size={13} />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="h-9 px-3.5 rounded-xl bg-red-500/5 border border-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 active:scale-[0.97]"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              {/* UPDATE SECTION */}
              {editingId === item.id && (
                <div className="mt-5 pt-5 border-t border-white/[0.04] grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* START */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Update Start Time
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                      <input
                        type="time"
                        value={editStartTime}
                        onChange={(e) => setEditStartTime(e.target.value)}
                        className="w-full h-11 rounded-xl border border-white/[0.08] bg-[#131926] pl-10 pr-4 text-xs font-semibold text-white outline-none focus:border-indigo-500/40 scheme-dark"
                      />
                    </div>
                  </div>

                  {/* END */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Update End Time
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                      <input
                        type="time"
                        value={editEndTime}
                        onChange={(e) => setEditEndTime(e.target.value)}
                        className="w-full h-11 rounded-xl border border-white/[0.08] bg-[#131926] pl-10 pr-4 text-xs font-semibold text-white outline-none focus:border-indigo-500/40 scheme-dark"
                      />
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-2 sm:col-span-2 mt-2">
                    <button
                      onClick={() => handleUpdate(item.id)}
                      className="h-10 px-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white text-xs font-bold transition-opacity hover:opacity-95 active:scale-[0.98]"
                    >
                      Save Changes
                    </button>

                    <button
                      onClick={() => setEditingId(null)}
                      className="h-10 px-4 rounded-xl bg-[#131926] border border-white/[0.06] text-slate-400 hover:text-white transition-colors text-xs font-bold flex items-center gap-1.5"
                    >
                      <X size={14} />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Availability;