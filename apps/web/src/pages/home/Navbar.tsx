import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E8E5F5] bg-[#c2c2f0]/80 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center"
        >

          <h1 className="text-3xl font-black tracking-tight text-[#0F172A]">
  Mentor
  <span className="bg-gradient-to-r from-[#7C3AED] to-[#2563EB] bg-clip-text text-transparent">
    Sala
  </span>
</h1>

        </Link>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-10">

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

        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-4">

          <Link
              to="/admin/login"
              className="text-[15px] font-medium text-red-500 hover:text-red-600 transition"
            >

              Admin Login

            </Link>

          <Link
            to="/login"
            className="text-[15px] font-medium text-[#64748B] hover:text-[#2563EB] transition"
          >

            Login

          </Link>

          <Link
            to="/signup"
            className="rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition-all duration-300 hover:scale-105"
          >

            Start Free

          </Link>

        </div>

      </div>

    </header>
  );
}   