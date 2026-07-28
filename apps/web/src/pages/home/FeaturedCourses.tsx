import { Link } from "react-router-dom";

export default function FeaturedCoursesSection() {
  return (
    <section
      id="courses"
      className="relative py-16 px-6 overflow-hidden bg-[#F8F9FE]"
    >
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-10 h-[350px] w-[350px] rounded-full bg-purple-300/20 blur-[130px]" />
        <div className="absolute bottom-10 left-10 h-[350px] w-[350px] rounded-full bg-indigo-300/20 blur-[130px]" />
      </div>

      <div className="relative max-w-6xl mx-auto z-10">

        {/* Heading */}
        <div className="flex flex-col items-center text-center gap-6 mb-14">
          <div>
            <div className="relative inline-flex items-center justify-center rounded-full mb-5">
              {/* Ring Animation Layer */}
              <div className="absolute inset-0 rounded-full animate-pulse ring-2 ring-purple-400/50 bg-purple-200/40 blur-xs"></div>

              {/* Glass Badge Layer */}
              <div className="relative z-10 inline-flex items-center gap-2 rounded-full border border-purple-200/80 bg-white/80 backdrop-blur-md px-4 py-2 text-[11px] font-bold tracking-[0.18em] text-purple-700 shadow-sm">
                FEATURED COURSES
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              Crack Your Dream College
              <br />
              With Expert Mentorship
            </h2>
          </div>

          {/* View All Button Area */}
        </div>

        {/* Grid System */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center max-w-5xl mx-auto">
          {[
            {
              icon: "⚡",
              title: "JEE 2027",
              rating: "4.8",
              price: "₹1,999",
              badge: "For JEE Aspirants",
              color: "from-indigo-600 to-blue-500",
            },
            {
              icon: "📘",
              title: "WBJEE 2027",
              rating: "4.6",
              price: "₹999",
              badge: "For WBJEE Aspirants",
              color: "from-purple-600 to-indigo-600",
            },
            {
              icon: "📚",
              title: "CBSE Boards",
              rating: "4.5",
              price: "₹999",
              badge: "For Boards Aspirants",
              color: "from-amber-500 to-purple-600",
            },
          ].map((course) => (
            <Link
              key={course.title}
              to={`/courses/${course.title
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="group w-full max-w-[320px] mx-auto rounded-[24px] border border-purple-200/60 bg-white/70 backdrop-blur-xl p-6 shadow-lg shadow-purple-500/5 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10"
            >
              <div>
                {/* Top Row Layout */}
                <div className="flex items-start justify-between gap-2 mb-6">
                  {/* Icon Wrapper */}
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl text-white shadow-md shadow-purple-500/20 ${course.color}`}
                  >
                    {course.icon}
                  </div>

                  {/* Badge */}
                  <div className="rounded-full border border-purple-200/70 bg-purple-50/80 px-2.5 py-1 text-[10px] font-bold text-purple-700 tracking-wide whitespace-nowrap">
                    {course.badge}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight group-hover:text-purple-900 transition-colors">
                  {course.title}
                </h3>

                {/* Rating Metrics Block */}
                <div className="flex items-center gap-1.5 mb-6">
                  <span className="text-amber-500 text-xs select-none">
                    ★
                  </span>
                  <span className="text-sm font-bold text-slate-800">
                    {course.rating}
                  </span>
                </div>
              </div>

              {/* Pricing Base Action Area */}
              <div className="mt-4 pt-4 border-t border-purple-100/80 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-purple-700/80 mb-0.5">
                    Starting from
                  </p>
                  <h4 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                    {course.price}
                  </h4>
                </div>

                {/* Navigation Arrow */}
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100/80 border border-purple-200/50 text-sm font-black text-purple-700 select-none group-hover:bg-purple-600 group-hover:text-white transition-all">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}