import { Link } from "react-router-dom";

export default function AboutNavbar() {
  return (
    <header className="fixed top-0 w-full z-50 border-b border-[#E8E5F5] bg-white backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-3xl font-black tracking-tight text-black">
            Mentor
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#2563EB] bg-clip-text text-transparent">
              Sala
            </span>
          </h1>
        </Link>

        {/* Right-aligned Navigation Links and Buttons */}
        <div className="flex items-center gap-4 lg:gap-10">
          
          <Link
            to="/login"
            className="text-[15px] font-medium text-[#64748B] hover:text-[#2563EB] transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-2xl bg-gradient-to-r from-[#85a6ff] to-[#6600ff] px-6 py-3 text-sm font-semibold !text-black shadow-lg shadow-[] transition-all duration-300 hover:scale-105"
          >
            Start Free
          </Link>
        </div>

      </div>
    </header>
  );
}