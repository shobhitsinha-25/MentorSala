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
    <div className="min-h-[85vh] flex flex-col items-center select-none bg-white text-slate-800 py-6 px-4">
      <div className="w-full max-w-2xl space-y-8">

        

        {/* CREATE FORM CARD COMPONENT */}
        <div className="bg-white border border-purple-100 rounded-[28px] p-8 shadow-xl shadow-purple-500/5 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-purple-100/40 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-100/30 rounded-full blur-2xl pointer-events-none" />

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {/* DAY */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block">
                Select Day
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-600 pointer-events-none" size={16} />
                <select
                  value={dayOfWeek}
                  onChange={(e) => setDayOfWeek(Number(e.target.value))}
                  className="w-full h-12 rounded-xl border border-purple-200/80 bg-purple-50/40 pl-11 pr-14 text-sm font-semibold text-slate-800 outline-none focus:border-purple-600 focus:bg-white focus:ring-2 focus:ring-purple-600/15 transition-all cursor-pointer appearance-none"
                >
                  <option className="bg-white text-slate-800" value={1}>Monday</option>
                  <option className="bg-white text-slate-800" value={2}>Tuesday</option>
                  <option className="bg-white text-slate-800" value={3}>Wednesday</option>
                  <option className="bg-white text-slate-800" value={4}>Thursday</option>
                  <option className="bg-white text-slate-800" value={5}>Friday</option>
                  <option className="bg-white text-slate-800" value={6}>Saturday</option>
                  <option className="bg-white text-slate-800" value={0}>Sunday</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-purple-600 border-l border-purple-200 pl-2.5 text-[10px] font-bold uppercase tracking-wider">
                  Pick
                </div>
              </div>
            </div>

            {/* TIME */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* START */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block">
                  Start Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-600 pointer-events-none" size={16} />
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full h-12 rounded-xl border border-purple-200/80 bg-purple-50/40 pl-11 pr-4 text-sm font-semibold text-slate-800 outline-none focus:border-purple-600 focus:bg-white focus:ring-2 focus:ring-purple-600/15 transition-all"
                  />
                </div>
              </div>

              {/* END */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block">
                  End Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-600 pointer-events-none" size={16} />
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full h-12 rounded-xl border border-indigo-200/80 bg-indigo-50/40 pl-11 pr-4 text-sm font-semibold text-slate-800 outline-none focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-600/15 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 mt-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 text-white text-sm font-bold transition-all shadow-md shadow-purple-600/25 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
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
            <div className="px-1 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Your Active Availability
              </h3>
              <span className="text-[10px] font-bold text-purple-700 bg-purple-100/80 px-2.5 py-0.5 rounded-full border border-purple-200">
                {availability.length} {availability.length === 1 ? "Slot" : "Slots"}
              </span>
            </div>
          )}

          {availability.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-purple-100 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10 rounded-[24px] p-6 shadow-sm transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-50/70 rounded-full blur-xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
                    <Calendar size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 tracking-tight">
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
                    <div className="flex items-center gap-2 text-xs text-slate-700 mt-1 font-semibold bg-purple-50/50 px-2.5 py-1 rounded-lg border border-purple-100/60 w-fit">
                      <Clock size={13} className="text-indigo-600 shrink-0" />
                      <span>{item.startTime} — {item.endTime}</span>
                    </div>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="flex items-center gap-2 sm:self-center self-end shrink-0">
                  <button
                    onClick={() => handleEdit(item)}
                    className="h-9 px-3.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all text-xs font-bold flex items-center gap-1.5 active:scale-[0.97] cursor-pointer"
                  >
                    <Edit3 size={13} />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="h-9 px-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all text-xs font-bold flex items-center gap-1.5 active:scale-[0.97] cursor-pointer"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              {/* UPDATE SECTION */}
              {editingId === item.id && (
                <div className="mt-5 pt-5 border-t border-purple-100 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                  {/* START */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-700 uppercase tracking-wider block">
                      Update Start Time
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-600" size={14} />
                      <input
                        type="time"
                        value={editStartTime}
                        onChange={(e) => setEditStartTime(e.target.value)}
                        className="w-full h-11 rounded-xl border border-purple-200 bg-purple-50/30 pl-10 pr-4 text-xs font-semibold text-slate-800 outline-none focus:border-purple-600 focus:bg-white focus:ring-2 focus:ring-purple-600/15"
                      />
                    </div>
                  </div>

                  {/* END */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-700 uppercase tracking-wider block">
                      Update End Time
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-600" size={14} />
                      <input
                        type="time"
                        value={editEndTime}
                        onChange={(e) => setEditEndTime(e.target.value)}
                        className="w-full h-11 rounded-xl border border-indigo-200 bg-indigo-50/30 pl-10 pr-4 text-xs font-semibold text-slate-800 outline-none focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-600/15"
                      />
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-2 sm:col-span-2 mt-2">
                    <button
                      onClick={() => handleUpdate(item.id)}
                      className="h-10 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                    >
                      Save Changes
                    </button>

                    <button
                      onClick={() => setEditingId(null)}
                      className="h-10 px-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors text-xs font-bold flex items-center gap-1.5 cursor-pointer"
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