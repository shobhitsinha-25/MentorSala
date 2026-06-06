
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
  rating: string; // Replaced students count string with a rating metric
  avatar: string;
  subjects: SubjectTag[];
}

// Dataset mapped to include top-tier instructor ratings safely
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
        style: "bg-blue-100 text-blue-600",
      },
      {
        name: "JEE",
        style: "bg-purple-100 text-purple-600",
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
        style: "bg-green-100 text-green-600",
      },
      {
        name: "WBJEE",
        style: "bg-pink-100 text-pink-600",
      },
    ],
  },
  {
    name: "Monu Thakur",
    role: "Jadavpur •  Wbjee (All Subjects) Mentor",
    experience: "1.5+ Years",
    rating: "4.6",
    avatar: m2,
    subjects: [
      {
        name: "All Subjects",
        style: "bg-yellow-100 text-yellow-700",
      },
      {
        name: "WBJEE",
        style: "bg-cyan-100 text-cyan-600",
      },
    ],
  },
];

export default function MentorsSection() {
  return (
    <section
      id="mentors"
      className="py-20 px-6 bg-[#F7F5FF]"
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
            <div className="relative inline-flex items-center justify-center rounded-full mb-5">
  {/* The Ring Animation Layer (Stays behind, text won't fade) */}
  <div className="absolute inset-0 rounded-full animate-pulse ring-3 ring-[#4d4dff] bg-[#ccccff]"></div>

  {/* Your Original Div Layer (Text and background remain completely solid) */}
  <div className="relative z-10 inline-flex items-center gap-2 rounded-full border border-[#D9D4FF] bg-white px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-[#7C3AED] shadow-sm">
    🧑‍🏫 TOP MENTORS
  </div>
</div>

  
          
          <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] leading-tight">
            Learn From
            <br />
            The Best
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-base text-[#64748B] leading-relaxed">
            Learn directly from IITians, WBJEE achievers, and expert educators guiding thousands of aspirants.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MENTORS_DATA.map((mentor) => (
            <div
              key={mentor.name}
              className="group rounded-[28px] border border-[#b380ff] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6666ff] hover:shadow-xl"
            >
              {/* Top */}
              <div className="flex items-center gap-4 mb-6">
                
                {/* Image Avatar */}
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="h-16 w-16 rounded-2xl object-cover border border-[#E8E5F5] bg-slate-100 shadow-lg shadow-blue-100/40 shrink-0"
                />

                {/* Info */}
                <div>
                  <h3 className="text-xl font-black text-[#0F172A]">
                    {mentor.name}
                  </h3>
                  <p className="mt-1 text-sm text-[#64748B] leading-relaxed">
                    {mentor.role}
                  </p>
                </div>
              </div>

              {/* Subject Tags */}
              <div className="flex flex-wrap gap-2 mb-7">
                {mentor.subjects.map((subject) => (
                  <div
                    key={subject.name}
                    className={`rounded-full px-3 py-1 text-[11px] font-semibold ${subject.style}`}
                  >
                    {subject.name}
                  </div>
                ))}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Experience */}
                <div className="rounded-2xl border border-[#EEF0F7] bg-[#FAFBFF] p-4 text-center">
                  <p className="text-[11px] text-[#64748B] mb-1">
                    Experience
                  </p>
                  <h4 className="text-lg font-black text-[#0F172A]">
                    {mentor.experience}
                  </h4>
                </div>

                {/* Rating (Replacing Students Taught) */}
                <div className="rounded-2xl border border-[#EEF0F7] bg-[#FAFBFF] p-4 text-center">
                  <p className="text-[11px] text-[#64748B] mb-1">
                    Rating
                  </p>
                  <h4 className="text-lg font-black text-[#0F172A] flex items-center justify-center gap-1">
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