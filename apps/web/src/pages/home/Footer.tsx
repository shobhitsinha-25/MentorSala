import React from "react";
import { Link } from "react-router-dom";
import igLogo from "../../assets/iglogo.jpg";
import inlogo from "../../assets/inlogo.jpg";
import youtube from "../../assets/utube.png";

export default function Footer() {
  return (
    <footer className="relative border-t border-zinc-800/80 bg-[#07090E] px-4 sm:px-6 md:px-8 pt-12 sm:pt-14 md:pt-16 pb-6 sm:pb-8 select-none overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[320px] sm:w-[500px] md:w-[650px] h-[200px] sm:h-[260px] bg-purple-600/10 blur-[100px] sm:blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 w-[260px] sm:w-[380px] md:w-[450px] h-[160px] sm:h-[220px] bg-blue-600/10 blur-[90px] sm:blur-[120px] rounded-full" />

      

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 pb-8 sm:pb-10">

          {/* Brand Info */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-start">
            <Link to="/" className="inline-block">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white hover:opacity-90 transition-opacity">
                Mentor
                <span className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent">
                  Sala
                </span>
              </h2>
            </Link>

            <p className="mt-3 sm:mt-4 max-w-sm lg:max-w-xs text-xs leading-relaxed text-zinc-400">
              AI-powered mentorship platform for competitive exam preparation.
            </p>

            {/* Admin Login Link */}
            <Link
              to="/admin/login"
              className="mt-3 sm:mt-4 text-xs sm:text-[13px] font-semibold text-purple-400 hover:text-purple-300 transition-colors inline-block"
            >
              Admin Login &rarr;
            </Link>
          </div>

          {/* Platform Links */}
          <div className="flex flex-col">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-200 mb-3 sm:mb-4">
              Platform
            </h3>

            <div className="space-y-2 sm:space-y-2.5">

              {/* Courses */}
              <Link
                to="/courses"
                className="block text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                Courses
              </Link>

              {/* 1-1 Mentorship */}
              <Link
                to="/mentorship"
                className="block text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                1-1 Mentorship
              </Link>

              {/* AI Mentor */}
              {/* <Link
                to="/ai-mentor"
                className="block text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                AI Mentor
              </Link> */}

              {/* Test Series */}
              <Link
                to="/test-series"
                className="block text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                Test Series
              </Link>

            </div>
          </div>

          {/* Company Dynamic & Static Links */}
          <div className="flex flex-col">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-200 mb-3 sm:mb-4">
              Company
            </h3>

            <div className="space-y-2 sm:space-y-2.5">
              {[
                { label: "Home", to: "/", isLink: true },
                { label: "About Us", to: "/about", isLink: true },
                { label: "Careers", to: "/careers", isLink: true },
                { label: "Blog", to: "/blogs", isLink: true },
              ].map((item) =>
                item.isLink ? (
                  <Link
                    key={item.label}
                    to={item.to!}
                    className="block text-xs text-zinc-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    key={item.label}
                    className="block text-xs text-zinc-400 cursor-default"
                  >
                    {item.label}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Support Links */}
          <div className="flex flex-col">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-200 mb-3 sm:mb-4">
              Support
            </h3>

            <div className="space-y-2 sm:space-y-2.5">
              {[
                { label: "Help Center", to: "/help", isLink: true },
                { label: "Privacy Policy", to: "/privacy", isLink: true },
                { label: "Terms & Conditions", to: "/terms", isLink: true },
              ].map((item) =>
                item.isLink ? (
                  <Link
                    key={item.label}
                    to={item.to!}
                    className="block text-xs text-zinc-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    key={item.label}
                    className="block text-xs text-zinc-400 cursor-default"
                  >
                    {item.label}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 border-t border-zinc-800/80 pt-5 sm:pt-6">

          <p className="order-2 sm:order-1 text-center sm:text-left text-[11px] sm:text-xs text-zinc-400 select-none">
            © 2026 MentorSala.com. All rights reserved.
          </p>

          <div className="order-1 sm:order-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">

            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              Follow Us:
            </span>

            <div className="flex items-center gap-2 sm:gap-2.5">

              {/* Instagram */}
              <a
                href="https://www.instagram.com/mentorsala_?igsh=ejVpNjZlMmJtc3k3"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80 transition-all duration-200 hover:border-purple-500/40 hover:bg-zinc-800 hover:scale-105 active:scale-95"
              >
                <img
                  src={igLogo}
                  alt="Instagram"
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4 object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/mentorsala/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80 transition-all duration-200 hover:border-purple-500/40 hover:bg-zinc-800 hover:scale-105 active:scale-95"
              >
                <img
                  src={inlogo}
                  alt="LinkedIn"
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4 object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@chemistryzone9111/videos"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80 transition-all duration-200 hover:border-purple-500/40 hover:bg-zinc-800 hover:scale-105 active:scale-95"
              >
                <img
                  src={youtube}
                  alt="YouTube"
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4 object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </a>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}