import m1 from "../../assets/m1.jpeg";
import m2 from "../../assets/m2.jpeg";
import m3 from "../../assets/m3.jpeg";

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
        style: "bg-blue-100/80 text-blue-700 border border-blue-200/50",
      },
      {
        name: "JEE",
        style: "bg-purple-100/80 text-purple-700 border border-purple-200/50",
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
        style: "bg-emerald-100/80 text-emerald-700 border border-emerald-200/50",
      },
      {
        name: "WBJEE",
        style: "bg-pink-100/80 text-pink-700 border border-pink-200/50",
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
        style: "bg-amber-100/80 text-amber-800 border border-amber-200/50",
      },
      {
        name: "WBJEE",
        style: "bg-cyan-100/80 text-cyan-700 border border-cyan-200/50",
      },
    ],
  },
];

export default function MentorsSection() {
  return (
    <section
      id="mentors"
      className="relative overflow-hidden bg-[#F8F9FE] py-20 px-6"
    >
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 h-[350px] w-[350px] rounded-full bg-purple-300/20 blur-[130px]" />
        <div className="absolute bottom-10 right-10 h-[350px] w-[350px] rounded-full bg-indigo-300/20 blur-[130px]" />
      </div>

      <div className="relative max-w-6xl mx-auto z-10">

        {/* Heading */}
        <div className="text-center mb-14">
          <div className="relative inline-flex items-center justify-center rounded-full mb-5">
            <div className="absolute inset-0 rounded-full animate-pulse ring-2 ring-purple-400/50 bg-purple-200/40 blur-xs"></div>
            <div className="relative z-10 inline-flex items-center gap-2 rounded-full border border-purple-200/80 bg-white/80 backdrop-blur-md px-4 py-2 text-[11px] font-bold tracking-[0.18em] text-purple-700 shadow-sm">
              🧑‍🏫 TOP MENTORS
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            Learn From
            <br />
            The Best
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-base text-slate-600 leading-relaxed font-medium">
            Learn directly from IITians, WBJEE achievers, and expert educators guiding thousands of aspirants.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MENTORS_DATA.map((mentor) => (
            <div
              key={mentor.name}
              className="group relative rounded-[28px] border border-purple-200/60 bg-white/70 backdrop-blur-xl p-6 shadow-lg shadow-purple-500/5 transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10"
            >
              {/* Top */}
              <div className="flex items-center gap-4 mb-6">
                
                {/* Image Avatar */}
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="h-16 w-16 rounded-2xl object-cover border border-purple-100 bg-white shadow-md shadow-purple-500/10 shrink-0"
                />

                {/* Info */}
                <div>
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-purple-900 transition-colors">
                    {mentor.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-slate-500 leading-relaxed">
                    {mentor.role}
                  </p>
                </div>
              </div>

              {/* Subject Tags */}
              <div className="flex flex-wrap gap-2 mb-7">
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
                  <p className="text-[11px] font-semibold text-purple-700/80 mb-0.5">
                    Experience
                  </p>
                  <h4 className="text-base font-black text-slate-900">
                    {mentor.experience}
                  </h4>
                </div>

                {/* Rating */}
                <div className="rounded-2xl border border-purple-100/80 bg-purple-50/40 p-3.5 text-center backdrop-blur-xs">
                  <p className="text-[11px] font-semibold text-purple-700/80 mb-0.5">
                    Rating
                  </p>
                  <h4 className="text-base font-black text-slate-900 flex items-center justify-center gap-1">
                    <span className="text-amber-500">★</span>
                    <span>{mentor.rating}</span>
                  </h4>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}