import {
  Video,
  Plus,
  Clock3,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

export default function Lectures() {

  const lectures = [

    {

      id: 1,

      title:
        "Kinematics - Motion in 1D",

      subject:
        "Physics",

      duration:
        "48 mins",

      status:
        "Published",

      views:
        1284,

    },

    {

      id: 2,

      title:
        "Chemical Bonding Basics",

      subject:
        "Chemistry",

      duration:
        "36 mins",

      status:
        "Pending",

      views:
        842,

    },

    {

      id: 3,

      title:
        "Limits & Continuity",

      subject:
        "Mathematics",

      duration:
        "54 mins",

      status:
        "Published",

      views:
        1940,

    },

  ];

  return (

    <div className="space-y-8">

      {/* ==========================================
      HEADER
      ========================================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>

          <h1 className="text-3xl font-bold text-white">

            Lectures

          </h1>

          <p className="text-slate-400 mt-2">

            Upload and manage your teaching content.

          </p>

        </div>

        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition-all px-5 py-3 rounded-2xl text-white font-medium">

          <Plus size={18} />

          Upload Lecture

        </button>

      </div>

      {/* ==========================================
      TABLE
      ========================================== */}

      <div className="bg-[#0f172a] border border-slate-800 rounded-3xl overflow-hidden">

        {/* TABLE HEADER */}

        <div className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-slate-800 text-sm text-slate-400 font-medium">

          <div className="col-span-5">

            Lecture

          </div>

          <div className="col-span-2">

            Subject

          </div>

          <div className="col-span-2">

            Duration

          </div>

          <div className="col-span-1">

            Views

          </div>

          <div className="col-span-2 text-right">

            Actions

          </div>

        </div>

        {/* TABLE BODY */}

        <div>

          {lectures.map((lecture) => (

            <div
              key={lecture.id}
              className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-slate-800 last:border-none hover:bg-slate-900/40 transition-all"
            >

              {/* LECTURE */}

              <div className="col-span-5 flex items-center gap-4">

                <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center">

                  <Video
                    className="text-indigo-400"
                    size={24}
                  />

                </div>

                <div>

                  <h3 className="font-semibold text-white">

                    {lecture.title}

                  </h3>

                  <span
                    className={`inline-flex mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                      lecture.status ===
                      "Published"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >

                    {lecture.status}

                  </span>

                </div>

              </div>

              {/* SUBJECT */}

              <div className="col-span-2 flex items-center text-slate-300">

                {lecture.subject}

              </div>

              {/* DURATION */}

              <div className="col-span-2 flex items-center gap-2 text-slate-300">

                <Clock3 size={16} />

                {lecture.duration}

              </div>

              {/* VIEWS */}

              <div className="col-span-1 flex items-center gap-2 text-slate-300">

                <Eye size={16} />

                {lecture.views}

              </div>

              {/* ACTIONS */}

              <div className="col-span-2 flex items-center justify-end gap-3">

                <button className="h-10 w-10 rounded-xl bg-slate-800 hover:bg-indigo-600 transition-all flex items-center justify-center">

                  <Pencil size={18} />

                </button>

                <button className="h-10 w-10 rounded-xl bg-slate-800 hover:bg-red-600 transition-all flex items-center justify-center">

                  <Trash2 size={18} />

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* ==========================================
      EMPTY STATE
      ========================================== */}

      {lectures.length === 0 && (

        <div className="bg-[#0f172a] border border-dashed border-slate-700 rounded-3xl p-16 text-center">

          <div className="h-20 w-20 rounded-full bg-indigo-500/10 flex items-center justify-center mx-auto mb-6">

            <Video
              className="text-indigo-400"
              size={36}
            />

          </div>

          <h2 className="text-2xl font-bold text-white mb-3">

            No Lectures Uploaded

          </h2>

          <p className="text-slate-400 max-w-md mx-auto">

            Start building your course library by uploading your first lecture.

          </p>

        </div>

      )}

    </div>

  );

}