import { Link } from "react-router-dom";

export default function FeaturedCoursesSection() {
  return (
    <section
      id="courses"
      className="py-16 px-6 bg-[#F7F5FF]"
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="flex flex-col items-center text-center gap-6 mb-14">
          <div>
            <div className="relative inline-flex items-center justify-center rounded-full mb-5">
  {/* The Ring Animation Layer (Stays behind, text won't fade) */}
  <div className="absolute inset-0 rounded-full animate-pulse ring-3 ring-[#4d4dff] bg-[#ccccff]"></div>

  {/* Your Original Div Layer (Text and background remain completely solid) */}
  <div className="relative z-10 inline-flex items-center gap-2 rounded-full border border-[#D9D4FF] bg-white px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-[#7C3AED] shadow-sm">
    FEATURED COURSES
  </div>
</div>
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] leading-tight">
              Crack Your Dream College
              <br />
              With Expert Mentorship
            </h2>
          </div>

          {/* View All Button - Animation Scales & Shifts Removed */}
          
        </div>

        {/* Non-Responsive Explicitly Adjusted Grid System */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center max-w-5xl mx-auto">
          {[
            {
              icon: "⚡",
              title: "JEE 2027",
              rating: "4.8",
              price: "₹1,999",
              badge: "For JEE Aspirants",
              color: "from-[#2563EB] to-[#06B6D4]",
            },
            {
              icon: "📘",
              title: "WBJEE 2027",
              rating: "4.6",
              price: "₹999",
              badge: "For WBJEE Aspirants",
              color: "from-[#7C3AED] to-[#2563EB]",
            },
            {
              icon: "📚",
              title: "CBSE Boards",
              rating: "4.5",
              price: "₹999",
              badge: "For Boards Aspirants",
              color: "from-[#F59E0B] to-[#EF4444]",
            },
          ].map((course) => (
            <Link
              key={course.title}
              to={`/courses/${course.title
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="w-full max-w-[320px] mx-auto rounded-[24px] border border-[#E8E5F5] bg-white p-6 shadow-sm flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Top Row layout info */}
                <div className="flex items-start justify-between gap-2 mb-6">
                  {/* Icon Wrapper */}
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl shadow-md ${course.color}`}
                  >
                    {course.icon}
                  </div>

                  {/* Badge */}
                  <div className="rounded-full border border-[#D9D4FF] bg-[#F8FAFF] px-2.5 py-1 text-[10px] font-bold text-[#7C3AED] tracking-wide whitespace-nowrap">
                    {course.badge}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-black text-[#0F172A] mb-3 tracking-tight">
                  {course.title}
                </h3>

                {/* Rating Metrics Block */}
                <div className="flex items-center gap-1.5 mb-6">
                  <span className="text-yellow-400 text-xs select-none">
                    ⭐
                  </span>
                  <span className="text-sm font-bold text-[#0F172A]">
                    {course.rating}
                  </span>
                  
                </div>
              </div>

              {/* Pricing Base Action Area - Relocation Effects Stripped */}
              <div className="mt-4 pt-4 border-t border-[#F1EFFB] flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-0.5">
                    Starting from
                  </p>
                  <h4 className="text-2xl font-black text-[#0F172A] tracking-tight leading-none">
                    {course.price}
                  </h4>
                </div>

                {/* Completely Static Navigation Link Indicator Badge */}
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF2FF] text-sm font-black text-[#2563EB] select-none">
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