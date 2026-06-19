import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-3 bg-transparent select-none">
      {/* Floating Floating Curved Wrapper */}
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between rounded-full border border-[#E8E5F5] bg-white/80 backdrop-blur-xl shadow-md shadow-[#99ccff]">
        
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-black">
            Mentor
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#2563EB] bg-clip-text text-transparent">
              Sala
            </span>
          </h1>
        </Link>

        {/* Right-aligned Navigation Links and Buttons */}
        <div className="flex items-center gap-4 lg:gap-10">
          
          {/* Nav Links (Shifted right next to login) */}
          <div className="hidden lg:flex items-center gap-10 text-black">
            {[
              {
                label: "Courses",
                href: "#courses",
              },
              {
                label: "Mentors",
                href: "#mentors",
              },
              {
                label: "Success Stories",
                href: "#hero",
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[15px] font-medium text-[#64748B] transition hover:text-[#2563EB]"
              >
                {item.label}
              </a>
            ))}
          </div>

          <Link
            to="/login"
            className="text-[15px] font-medium !text-black hover:text-[#2563EB] transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-full bg-gradient-to-r from-[#85a6ff] to-[#6600ff] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 active:scale-[0.98]"
          >
            Start Free
          </Link>
        </div>

      </div>
    </header>
  );
}