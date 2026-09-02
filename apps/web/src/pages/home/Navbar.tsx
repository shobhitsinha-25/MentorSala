import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import mentorsalalogo from "../../assets/logo1.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-2 sm:p-3 bg-transparent select-none">
      {/* Floating Curved Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between rounded-full border border-[#E8E5F5] bg-white/90 backdrop-blur-xl shadow-md shadow-[#99ccff]">
        
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-1.5 sm:gap-2"
        >
          <img
            src={mentorsalalogo}
            alt="Mentor Sala Logo"
            className="h-7 sm:h-8 w-auto object-contain"
          />

          <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight !text-slate-900">
            Mentor
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#2563EB] bg-clip-text text-transparent">
              Sala
            </span>
          </h1>
        </Link>

        {/* Desktop Navigation Links & Action Buttons */}
        <div className="hidden lg:flex items-center gap-10">
          
          {/* Navigation Links */}
          <div className="flex items-center gap-10">
            <a
              href="#courses"
              className="text-[15px] font-medium !text-black transition hover:!text-[#2563EB]"
            >
              Courses
            </a>

            <a
              href="#mentors"
              className="text-[15px] font-medium !text-black transition hover:!text-[#2563EB]"
            >
              Mentors
            </a>

            <Link
              to="/success-stories"
              className="text-[15px] font-medium !text-black transition hover:!text-[#2563EB]"
            >
              Success Stories
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-6">
            <Link
              to="/login"
              className="text-[15px] font-medium !text-black hover:!text-[#2563EB] transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="rounded-full bg-gradient-to-r from-[#85a6ff] to-[#6600ff] px-6 py-2.5 text-sm font-semibold !text-white shadow-md transition-all duration-300 hover:scale-105 active:scale-[0.98]"
            >
              Start Free
            </Link>
          </div>
        </div>

        {/* Mobile / Tablet Quick CTA & Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2 sm:gap-3">
          
          {/* Mobile Start Free */}
          <Link
            to="/signup"
            onClick={closeMenu}
            className="rounded-full bg-gradient-to-r from-[#85a6ff] to-[#6600ff] px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold !text-white shadow-sm transition-all hover:opacity-95 active:scale-95"
          >
            Start Free
          </Link>

          {/* Hamburger / Close Button */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full !text-slate-800 hover:bg-slate-100 transition"
          >
            {isOpen ? (
              <X
                size={20}
                className="!text-slate-800 stroke-[2.5]"
              />
            ) : (
              <Menu
                size={20}
                className="!text-slate-800 stroke-[2.5]"
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Slide-Down Menu */}
      {isOpen && (
        <div className="lg:hidden mx-auto mt-2 max-w-sm sm:max-w-md rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/15 flex flex-col gap-2 text-center">
          
          {/* Courses */}
          <a
            href="#courses"
            onClick={closeMenu}
            className="block w-full rounded-xl px-4 py-2.5 text-base font-bold !text-slate-900 hover:bg-slate-100 hover:!text-[#2563EB] transition-colors"
          >
            Courses
          </a>

          {/* Mentors */}
          <a
            href="#mentors"
            onClick={closeMenu}
            className="block w-full rounded-xl px-4 py-2.5 text-base font-bold !text-slate-900 hover:bg-slate-100 hover:!text-[#2563EB] transition-colors"
          >
            Mentors
          </a>

          {/* Success Stories */}
          <Link
            to="/success-stories"
            onClick={closeMenu}
            className="block w-full rounded-xl px-4 py-2.5 text-base font-bold !text-slate-900 hover:bg-slate-100 hover:!text-[#2563EB] transition-colors"
          >
            Success Stories
          </Link>

          {/* Divider + Auth */}
          <div className="mt-2 flex flex-col gap-2.5 border-t border-slate-200 pt-3">
            
            {/* Login */}
            <Link
              to="/login"
              onClick={closeMenu}
              className="w-full rounded-full border border-slate-300 bg-slate-50 py-2.5 text-sm font-bold !text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Login
            </Link>

            {/* Start Free */}
            <Link
              to="/signup"
              onClick={closeMenu}
              className="w-full rounded-full bg-gradient-to-r from-[#85a6ff] to-[#6600ff] py-2.5 text-sm font-semibold !text-white shadow-md shadow-indigo-500/20 active:scale-95 transition"
            >
              Start Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}