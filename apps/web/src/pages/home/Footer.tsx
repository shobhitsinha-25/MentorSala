import { Link } from "react-router-dom";
import igLogo from "../../assets/iglogo.jpg"
import inlogo from "../../assets/inlogo.jpg"
import youtube from "../../assets/utube.png"

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0B1020] px-6 pt-14 pb-6 select-none">
      <div className="max-w-6xl mx-auto">

        {/* Top Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pb-10">

          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-1 flex flex-col items-start">
            <Link
              to="/"
              className="inline-block cursor-default"
              onClick={(e) => e.preventDefault()}
            >
              <h2 className="text-2xl font-black tracking-tight text-white">
                Mentor
                <span className="bg-gradient-to-r from-[#7C3AED] to-[#2563EB] bg-clip-text text-transparent">
                  Sala
                </span>
              </h2>
            </Link>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-[#94A3B8]">
              AI-powered mentorship platform for competitive exam preparation.
            </p>
            
            {/* Moved Admin Login Link */}
            <Link
              to="/admin/login"
              className="mt-4 text-[13px] font-medium !text-[#a366ff] hover:!text-[#330080] transition-colors"
            >
              Admin Login 
            </Link>
          </div>

          {/* Platform Static Links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4">
              Platform
            </h3>
            <div className="space-y-2">
              {[
                "Courses",
                "1-1 Mentorship",
                "AI Mentor",
                "Test Series",
              ].map((item) => (
                <span
                  key={item}
                  className="block text-xs text-[#94A3B8] cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Company Dynamic & Static Links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4">
              Company
            </h3>
            <div className="space-y-2">
              {[
                { label: "About Us", to: "/about", isLink: true },
                { label: "Careers", isLink: false },
                { label: "Blog", isLink: false },
                { label: "Press", isLink: false },
              ].map((item) => 
                item.isLink ? (
                  <Link
                    key={item.label}
                    to={item.to!}
                    className="block text-xs !text-[#94A3B8] hover:!text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    key={item.label}
                    className="block text-xs text-[#94A3B8] cursor-default"
                  >
                    {item.label}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Support Static Links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4">
              Support
            </h3>
            <div className="space-y-2">
              {[
                "Help Center",
                "Contact (+91-6203075758)",
                "Privacy",
                "Terms",
              ].map((item) => (
                <span
                  key={item}
                  className="block text-xs text-[#94A3B8] cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-t border-white/10 pt-5">
          
          {/* Left: Copyright Statement */}
          <p className="text-[11px] text-[#64748B] cursor-default order-1 lg:order-none">
            © 2026 MentorSala.com All rights reserved.
          </p>

          {/* Center: Follow Us Social Media Block with Picture Logos */}
          <div className="flex flex-col items-center gap-2 order-3 lg:order-none mx-auto">
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#64748B] font-bold">
              Follow Us
            </span>
            <div className="flex items-center gap-5">
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/mentorsala_?igsh=ejVpNjZlMmJtc3k3" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-200"
              >
                <img 
                  src={igLogo}
                  alt="Instagram" 
                  className="h-5 w-5 object-contain brightness-100"
                />
              </a>
              
              {/* LinkedIn */}
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-200"
              >
                <img 
                  src={inlogo}
                  alt="LinkedIn" 
                  className="h-5 w-5 object-contain brightness-100"
                />
              </a>
              
              {/* YouTube */}
              <a 
                href="https://www.youtube.com/@chemistryzone9111/videos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-200"
              >
                <img 
                  src={youtube}
                  alt="YouTube" 
                  className="h-5 w-5 object-contain brightness-100"
                />
              </a>
            </div>
          </div>

          {/* Right: Exam Status Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 order-2 lg:order-none">
            {[
              {
                label: "JEE",
                style: "bg-blue-500/10 text-blue-400 border-blue-500/20",
              },
              {
                label: "WBJEE",
                style: "bg-purple-500/10 text-purple-400 border-purple-500/20",
              },
              {
                label: "BOARD",
                style: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
              },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-full border px-3 py-1 text-[10px] font-semibold cursor-default ${item.style}`}
              >
                {item.label}
              </div>
            ))}
          </div>

        </div>

      </div>
    </footer>
  );
}