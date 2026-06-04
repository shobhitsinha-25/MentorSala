import {
  BookOpen,
  Users,
  Video,
  ChevronRight,
} from "lucide-react";

export default function Subjects() {

  const subjects = [

    {

      id: 1,

      name:
        "Physics",

      course:
        "JEE 2027 Ultimate Batch",

      students:
        842,

      lectures:
        48,

      chapters:
        12,

    },

    {

      id: 2,

      name:
        "Chemistry",

      course:
        "JEE 2027 Ultimate Batch",

      students:
        791,

      lectures:
        36,

      chapters:
        9,

    },

    {

      id: 3,

      name:
        "Mathematics",

      course:
        "JEE 2027 Ultimate Batch",

      students:
        910,

      lectures:
        54,

      chapters:
        15,

    },

  ];

  return (

    <div className="space-y-8">

      {/* ==========================================
      HEADER
      ========================================== */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-white">

            Assigned Subjects

          </h1>

          <p className="text-slate-400 mt-2">

            Manage lectures, chapters and student progress.

          </p>

        </div>

      </div>

      {/* ==========================================
      SUBJECT GRID
      ========================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

        {subjects.map((subject) => (

          <div
            key={subject.id}
            className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6 hover:border-indigo-500/40 transition-all group"
          >

            {/* TOP */}

            <div className="flex items-start justify-between mb-6">

              <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center">

                <BookOpen
                  className="text-indigo-400"
                  size={28}
                />

              </div>

              <button className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center group-hover:bg-indigo-600 transition-all">

                <ChevronRight
                  size={18}
                />

              </button>

            </div>

            {/* TITLE */}

            <h2 className="text-2xl font-bold text-white mb-2">

              {subject.name}

            </h2>

            <p className="text-sm text-slate-400 mb-6">

              {subject.course}

            </p>

            {/* STATS */}

            <div className="grid grid-cols-3 gap-4">

              {/* STUDENTS */}

              <div className="bg-slate-900/60 rounded-2xl p-4 border border-slate-800">

                <Users
                  className="text-cyan-400 mb-3"
                  size={20}
                />

                <h3 className="text-xl font-bold text-white">

                  {subject.students}

                </h3>

                <p className="text-xs text-slate-400 mt-1">

                  Students

                </p>

              </div>

              {/* LECTURES */}

              <div className="bg-slate-900/60 rounded-2xl p-4 border border-slate-800">

                <Video
                  className="text-indigo-400 mb-3"
                  size={20}
                />

                <h3 className="text-xl font-bold text-white">

                  {subject.lectures}

                </h3>

                <p className="text-xs text-slate-400 mt-1">

                  Lectures

                </p>

              </div>

              {/* CHAPTERS */}

              <div className="bg-slate-900/60 rounded-2xl p-4 border border-slate-800">

                <BookOpen
                  className="text-pink-400 mb-3"
                  size={20}
                />

                <h3 className="text-xl font-bold text-white">

                  {subject.chapters}

                </h3>

                <p className="text-xs text-slate-400 mt-1">

                  Chapters

                </p>

              </div>

            </div>

            {/* ACTIONS */}

            <div className="mt-6 flex gap-3">

              <button className="flex-1 bg-indigo-600 hover:bg-indigo-500 transition-all py-3 rounded-2xl font-medium text-white">

                Manage Subject

              </button>

              <button className="flex-1 bg-slate-800 hover:bg-slate-700 transition-all py-3 rounded-2xl font-medium text-white">

                Upload Lecture

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}