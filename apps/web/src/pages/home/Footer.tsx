import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import igLogo from "../../assets/iglogo.jpg";
import inlogo from "../../assets/inlogo.jpg";
import youtube from "../../assets/utube.png";

// Responsive Interactive Animated Grid Canvas with Retina/HiDPI support & Touch/Mouse handlers
function InteractiveGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    let isMobile = window.innerWidth < 640;
    let gridSize = isMobile ? 28 : 40;

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isHovered: false,
    };

    const handleResize = () => {
      if (!canvas) return;
      const parent = canvas.parentElement;
      width = parent?.clientWidth || window.innerWidth;
      height = parent?.clientHeight || window.innerHeight;
      dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      isMobile = width < 640;
      gridSize = isMobile ? 28 : 40;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovered = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.touches[0].clientX - rect.left;
      mouse.targetY = e.touches[0].clientY - rect.top;
      mouse.isHovered = true;
    };

    const handleLeave = () => {
      mouse.isHovered = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    window.addEventListener("touchend", handleLeave);

    handleResize();

    const beamCount = isMobile ? 4 : 7;
    const beams = Array.from({ length: beamCount }).map(() => ({
      horizontal: Math.random() > 0.5,
      coord: Math.floor((Math.random() * (Math.random() > 0.5 ? height : width)) / gridSize) * gridSize,
      pos: Math.random() * (Math.random() > 0.5 ? width : height),
      length: isMobile ? 50 + Math.random() * 60 : 70 + Math.random() * 110,
      speed: 1.0 + Math.random() * 1.6,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";

      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (mouse.isHovered && mouse.x > 0 && mouse.y > 0) {
        const radius = isMobile ? 150 : 220;
        const spotlight = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          radius
        );
        spotlight.addColorStop(0, "rgba(246, 246, 246, 0.28)");
        spotlight.addColorStop(0.4, "rgba(99, 102, 241, 0.12)");
        spotlight.addColorStop(1, "rgba(124, 58, 237, 0)");

        ctx.fillStyle = spotlight;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "rgba(168, 85, 247, 0.25)";

        const startX = Math.max(0, Math.floor((mouse.x - radius) / gridSize) * gridSize);
        const endX = Math.min(width, Math.ceil((mouse.x + radius) / gridSize) * gridSize);
        const startY = Math.max(0, Math.floor((mouse.y - radius) / gridSize) * gridSize);
        const endY = Math.min(height, Math.ceil((mouse.y + radius) / gridSize) * gridSize);

        for (let x = startX; x <= endX; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, Math.max(0, mouse.y - radius));
          ctx.lineTo(x, Math.min(height, mouse.y + radius));
          ctx.stroke();
        }
        for (let y = startY; y <= endY; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(Math.max(0, mouse.x - radius), y);
          ctx.lineTo(Math.min(width, mouse.x + radius), y);
          ctx.stroke();
        }

        ctx.fillStyle = "rgba(192, 132, 252, 0.7)";
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      beams.forEach((beam) => {
        ctx.lineWidth = isMobile ? 1.5 : 2;
        ctx.shadowBlur = isMobile ? 10 : 18;
        ctx.shadowColor = "rgba(147, 51, 234, 0.9)";
        ctx.strokeStyle = "rgba(192, 132, 252, 0.85)";

        ctx.beginPath();
        if (beam.horizontal) {
          ctx.moveTo(beam.pos, beam.coord);
          ctx.lineTo(beam.pos + beam.length, beam.coord);
          beam.pos += beam.speed;
          if (beam.pos > width) {
            beam.pos = -beam.length;
            beam.coord = Math.floor((Math.random() * height) / gridSize) * gridSize;
          }
        } else {
          ctx.moveTo(beam.coord, beam.pos);
          ctx.lineTo(beam.coord, beam.pos + beam.length);
          beam.pos += beam.speed;
          if (beam.pos > height) {
            beam.pos = -beam.length;
            beam.coord = Math.floor((Math.random() * width) / gridSize) * gridSize;
          }
        }
        ctx.stroke();
      });

      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("touchend", handleLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 h-full w-full"
    />
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#0B1020] px-4 sm:px-6 md:px-8 pt-12 sm:pt-14 pb-6 select-none overflow-hidden">
      {/* Interactive Grid with Cursor/Touch Follower & Beams */}
      <InteractiveGridBackground />

      {/* Subtle Vignette Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#0B1020]/75 via-transparent to-[#0B1020]/90" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 pb-10">
          
          {/* Brand Info */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-start">
            <Link
              to="/"
              className="inline-block"
            >
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white hover:opacity-90 transition-opacity">
                Mentor
                <span className="bg-gradient-to-r from-[#7C3AED] to-[#2563EB] bg-clip-text text-transparent">
                  Sala
                </span>
              </h2>
            </Link>
            <p className="mt-3 sm:mt-4 max-w-sm lg:max-w-xs text-xs leading-relaxed text-[#94A3B8]">
              AI-powered mentorship platform for competitive exam preparation.
            </p>

            {/* Admin Login Link */}
            <Link
              to="/admin/login"
              className="mt-3 sm:mt-4 text-xs sm:text-[13px] font-medium !text-[#a366ff] hover:!text-[#c099ff] transition-colors inline-block"
            >
              Admin Login &rarr;
            </Link>
          </div>

          {/* Platform Static Links */}
          <div className="flex flex-col">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white mb-3 sm:mb-4">
              Platform
            </h3>
            <div className="space-y-2 sm:space-y-2.5">
              {[
                "Courses",
                "1-1 Mentorship",
                "AI Mentor",
                "Test Series",
              ].map((item) => (
                <span
                  key={item}
                  className="block text-xs text-[#94A3B8] hover:text-slate-200 transition-colors cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Company Dynamic & Static Links (Includes Home Link) */}
          <div className="flex flex-col">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white mb-3 sm:mb-4">
              Company
            </h3>
            <div className="space-y-2 sm:space-y-2.5">
              {[
                { label: "Home", to: "/", isLink: true },
                { label: "About Us", to: "/about", isLink: true },
                { label: "Careers", to: "/careers", isLink: true },
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

          {/* Support Links */}
          <div className="flex flex-col">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white mb-3 sm:mb-4">
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
        </div>

        {/* Bottom Section */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 border-t border-white/10 pt-6">
          <p className="order-2 sm:order-1 text-center sm:text-left text-[11px] sm:text-xs text-slate-400 select-none">
            © 2026 MentorSala.com. All rights reserved.
          </p>

          <div className="order-1 sm:order-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Follow Us:
            </span>

            <div className="flex items-center gap-2 sm:gap-2.5">
              <a
                href="https://www.instagram.com/mentorsala_?igsh=ejVpNjZlMmJtc3k3"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all duration-200 hover:border-purple-500/40 hover:bg-white/10 hover:scale-105 active:scale-95"
              >
                <img
                  src={igLogo}
                  alt="Instagram"
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4 object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </a>

              <a
                href="https://www.linkedin.com/company/mentorsala/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all duration-200 hover:border-purple-500/40 hover:bg-white/10 hover:scale-105 active:scale-95"
              >
                <img
                  src={inlogo}
                  alt="LinkedIn"
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4 object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </a>

              <a
                href="https://www.youtube.com/@chemistryzone9111/videos"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all duration-200 hover:border-purple-500/40 hover:bg-white/10 hover:scale-105 active:scale-95"
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