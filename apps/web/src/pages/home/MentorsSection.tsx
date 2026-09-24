import m1 from "../../assets/m1.jpeg";
import m2 from "../../assets/m2.jpeg";
import m3 from "../../assets/m3.jpeg";

import { Link } from "react-router-dom";

interface SubjectTag {
  name: string;
  style: string;
}

interface MentorConfig {
  name: string;
  role: string;
  experience: string;
  rating: string;
  avatar: string;
  subjects: SubjectTag[];
}

const MENTORS_DATA: MentorConfig[] = [
  {
    name: "Aditya Pratap",
    role: "IIT Jammu • Chemistry Mentor",
    experience: "3+ Years",
    rating: "4.9",
    avatar: m1,
    subjects: [
      {
        name: "Chemistry",
        style:
          "bg-blue-100/80 text-blue-700 border border-blue-200/50",
      },
      {
        name: "JEE",
        style:
          "bg-purple-100/80 text-purple-700 border border-purple-200/50",
      },
    ],
  },
  {
    name: "Radhika",
    role: "Jalpaiguri Government Engineering College • Wbjee (All Subjects) Mentor",
    experience: "2+ Years",
    rating: "4.8",
    avatar: m3,
    subjects: [
      {
        name: "All Subjects",
        style:
          "bg-emerald-100/80 text-emerald-700 border border-emerald-200/50",
      },
      {
        name: "WBJEE",
        style:
          "bg-pink-100/80 text-pink-700 border border-pink-200/50",
      },
    ],
  },
  {
    name: "Monu Thakur",
    role: "Jadavpur • Wbjee (All Subjects) Mentor",
    experience: "1.5+ Years",
    rating: "4.6",
    avatar: m2,
    subjects: [
      {
        name: "All Subjects",
        style:
          "bg-amber-100/80 text-amber-800 border border-amber-200/50",
      },
      {
        name: "WBJEE",
        style:
          "bg-cyan-100/80 text-cyan-700 border border-cyan-200/50",
      },
    ],
  },
];

export default function MentorsSection() {
  return (
    <section
      id="mentors"
      className="relative overflow-hidden bg-[#F8F9FE] px-6 py-20"
    >
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-10 top-1/4 h-[350px] w-[350px] rounded-full bg-purple-300/20 blur-[130px]" />

        <div className="absolute bottom-10 right-10 h-[350px] w-[350px] rounded-full bg-indigo-300/20 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-14 text-center">
          <div className="relative mb-5 inline-flex items-center justify-center rounded-full">
            <div className="absolute inset-0 animate-pulse rounded-full bg-purple-200/40 blur-xs ring-2 ring-purple-400/50" />

            <div className="relative z-10 inline-flex items-center gap-2 rounded-full border border-purple-200/80 bg-white/80 px-4 py-2 text-[11px] font-bold tracking-[0.18em] text-purple-700 shadow-sm backdrop-blur-md">
              🧑‍🏫 TOP MENTORS
            </div>
          </div>

          <h2 className="text-4xl font-black leading-tight text-slate-900 md:text-5xl">
            Learn From
            <br />
            The Best
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-slate-600">
            Learn directly from IITians, WBJEE achievers,
            and expert educators guiding thousands of
            aspirants.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MENTORS_DATA.map((mentor) => (
            <div
              key={mentor.name}
              className="group relative rounded-[28px] border border-purple-200/60 bg-white/70 p-6 shadow-lg shadow-purple-500/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10"
            >
              {/* Top */}
              <div className="mb-6 flex items-center gap-4">
                {/* Image Avatar */}
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="h-16 w-16 shrink-0 rounded-2xl border border-purple-100 bg-white object-cover shadow-md shadow-purple-500/10"
                />

                {/* Info */}
                <div>
                  <h3 className="text-xl font-black text-slate-900 transition-colors group-hover:text-purple-900">
                    {mentor.name}
                  </h3>

                  <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">
                    {mentor.role}
                  </p>
                </div>
              </div>

              {/* Subject Tags */}
              <div className="mb-7 flex flex-wrap gap-2">
                {mentor.subjects.map((subject) => (
                  <div
                    key={subject.name}
                    className={`rounded-full px-3 py-1 text-[11px] font-bold shadow-xs ${subject.style}`}
                  >
                    {subject.name}
                  </div>
                ))}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* Experience */}
                <div className="rounded-2xl border border-purple-100/80 bg-purple-50/40 p-3.5 text-center backdrop-blur-xs">
                  <p className="mb-0.5 text-[11px] font-semibold text-purple-700/80">
                    Experience
                  </p>

                  <h4 className="text-base font-black text-slate-900">
                    {mentor.experience}
                  </h4>
                </div>

                {/* Rating */}
                <div className="rounded-2xl border border-purple-100/80 bg-purple-50/40 p-3.5 text-center backdrop-blur-xs">
                  <p className="mb-0.5 text-[11px] font-semibold text-purple-700/80">
                    Rating
                  </p>

                  <h4 className="flex items-center justify-center gap-1 text-base font-black text-slate-900">
                    <span className="text-amber-500">
                      ★
                    </span>

                    <span>
                      {mentor.rating}
                    </span>
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* =================================================
            VIEW ALL MENTORS BUTTON
        ================================================= */}

        <div className="mt-12 flex justify-center">
  <Link
    to="/mentors"
    className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-zinc-800 bg-zinc-950 px-7 py-3.5 text-sm font-semibold text-zinc-100 shadow-md shadow-zinc-950/20 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900 hover:text-white hover:shadow-lg hover:shadow-zinc-950/30 active:scale-[0.98]"
  >
    <span>View All Mentors</span>

    <span className="text-sm text-zinc-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-white">
      →
    </span>
  </Link>
</div>
      </div>
    </section>
  );
}