import React, { useState, useEffect, useRef } from "react";
import { ShinyText } from "@/components/lightswind/shiny-text";

// Canvas Liquid Wave Simulation with responsive DPR scaling & viewport matching
function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const handleResize = () => {
      if (!canvas) return;
      const parent = canvas.parentElement;
      width = parent?.clientWidth || window.innerWidth;
      height = parent?.clientHeight || window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    let step = 0;
    const waves = [
      { speed: 0.015, amplitude: 65, wavelength: 0.0035, color: "rgba(71, 17, 17, 0.08)" },
      { speed: 0.022, amplitude: 50, wavelength: 0.005, color: "rgba(157, 236, 240, 0.06)" },
      { speed: 0.01, amplitude: 80, wavelength: 0.0025, color: "rgba(29, 95, 248, 0.83)" },
      { speed: 0.018, amplitude: 40, wavelength: 0.006, color: "rgba(185, 226, 202, 0.05)" },
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      waves.forEach((wave, i) => {
        ctx.beginPath();
        ctx.moveTo(0, height);

        const stepX = width < 640 ? 16 : 10;
        for (let x = 0; x <= width; x += stepX) {
          const y =
            Math.sin(x * wave.wavelength + step * wave.speed + i) * wave.amplitude +
            Math.cos(x * 0.002 + step * 0.01) * 20 +
            height * 0.55;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      step += 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 h-full w-full opacity-90 filter blur-[35px]"
    />
  );
}

export default function FeaturesGrid() {
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      icon: "🤖",
      title: "AI-Powered Learning",
      desc: "Personalised plans adapting to strengths and weak areas in real time.",
      iconBg: "bg-neutral-100",
      iconColor: "text-neutral-900",
      border: "hover:border-black",
      shadow: "hover:shadow-black/10",
    },
    {
      icon: "📡",
      title: "Live Interactive Classes",
      desc: "Join live sessions, ask doubts, and get instant mentor guidance.",
      iconBg: "bg-neutral-100",
      iconColor: "text-neutral-900",
      border: "hover:border-black",
      shadow: "hover:shadow-black/10",
    },
    {
      icon: "🎮",
      title: "Gamified Progress",
      desc: "Earn XP, unlock achievements, and climb leaderboards daily.",
      iconBg: "bg-neutral-100",
      iconColor: "text-neutral-900",
      border: "hover:border-black",
      shadow: "hover:shadow-black/10",
    },
    {
      icon: "📊",
      title: "Deep Analytics",
      desc: "Track performance, identify weak areas, and predict ranks.",
      iconBg: "bg-neutral-100",
      iconColor: "text-neutral-900",
      border: "hover:border-black",
      shadow: "hover:shadow-black/10",
    },
    {
      icon: "💬",
      title: "Peer Community",
      desc: "50,000+ students discussing problems and sharing resources.",
      iconBg: "bg-neutral-100",
      iconColor: "text-neutral-900",
      border: "hover:border-black",
      shadow: "hover:shadow-black/10",
    },
    {
      icon: "🧑‍🏫",
      title: "Expert Mentors",
      desc: "1-on-1 mentorship from IIT and AIIMS alumni mentors.",
      iconBg: "bg-neutral-100",
      iconColor: "text-neutral-900",
      border: "hover:border-black",
      shadow: "hover:shadow-black/10",
    },
  ];

  const totalCards = features.length;

  // Auto slide cards every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalCards);
    }, 4000);

    return () => clearInterval(timer);
  }, [totalCards]);

  return (
    <section
      id="features"
      className="relative py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF] overflow-hidden select-none"
    >
      {/* Liquid Canvas Background */}
      <LiquidBackground />

      {/* Floating Ambient Dark Blobs with Responsive Boundaries */}
      <div className="pointer-events-none absolute -top-24 sm:-top-32 left-1/4 h-[300px] sm:h-[450px] lg:h-[550px] w-[300px] sm:w-[450px] lg:w-[550px] rounded-full bg-black/[0.04] blur-[90px] sm:blur-[130px] animate-pulse" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[320px] sm:h-[480px] lg:h-[600px] w-[320px] sm:w-[480px] lg:w-[600px] rounded-full bg-black/[0.05] blur-[100px] sm:blur-[150px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[260px] sm:h-[380px] lg:h-[450px] w-[260px] sm:w-[380px] lg:w-[450px] rounded-full bg-neutral-900/[0.03] blur-[90px] sm:blur-[140px]" />

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Heading Section */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="relative inline-flex items-center justify-center rounded-full mb-4 sm:mb-5">
            {/* Pulsing Black Ring Layer */}
            <div className="absolute inset-0 rounded-full animate-pulse ring-2 ring-black/20 bg-black/5 blur-xs" />

            {/* Badge */}
            <div className="relative z-10 inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/90 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-[11px] font-bold tracking-[0.18em] text-black shadow-sm">
              PLATFORM FEATURES
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.2] sm:leading-tight tracking-tight text-neutral-950">
            <ShinyText
              baseColor="#0A0A0A"
              shineColor="#ded4fb"
              speed={3.5}
              intensity={0.95}
              className="inline-block"
            >
              Everything You Need
              <br />
              To Crack Your Exam
            </ShinyText>
          </h2>

          <p className="mt-3 sm:mt-5 max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-neutral-600 leading-relaxed font-medium px-2">
            Smart tools, live mentorship, analytics, and gamified systems designed for modern aspirants.
          </p>
        </div>

        {/* Card Stack with Fluid GPU Transitions */}
        <div className="relative mx-auto flex w-full max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl flex-col items-center justify-center [perspective:1200px]">
          <div className="relative h-[310px] sm:h-[280px] lg:h-[260px] w-full">
            {features.map((feature, index) => {
              const offset = (index - activeIndex + totalCards) % totalCards;

              // Keep active card, next 2 queued cards, and previous exiting card
              const isExiting = offset === totalCards - 1;
              const isVisible = offset <= 2 || isExiting;

              if (!isVisible) return null;

              // Dynamic offsets: tighter on mobile so stacked cards stay visible
              const stepY = window.innerWidth < 640 ? 14 : 18;
              let translateY = offset * stepY;
              let scale = 1 - offset * 0.05;
              let zIndex = 30 - offset * 10;
              let opacity = 1 - offset * 0.22;
              let pointerEvents: "auto" | "none" = offset === 0 ? "auto" : "none";

              if (isExiting) {
                translateY = -30;
                scale = 1.04;
                zIndex = 35;
                opacity = 0;
                pointerEvents = "none";
              }

              return (
                <div
                  key={feature.title}
                  onClick={() => setActiveIndex((prev) => (prev + 1) % totalCards)}
                  style={{
                    transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
                    zIndex,
                    opacity,
                    pointerEvents,
                    transition:
                      "transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 650ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 500ms ease",
                  }}
                  className={`group absolute inset-0 cursor-pointer select-none rounded-[22px] sm:rounded-[26px] lg:rounded-[28px] border border-neutral-200/90 bg-white/95 backdrop-blur-xl p-5 sm:p-7 lg:p-8 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.08)] will-change-transform flex flex-col justify-between ${
                    offset === 0
                      ? "hover:-translate-y-1 hover:border-black hover:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.16)]"
                      : ""
                  } ${feature.border} ${feature.shadow}`}
                >
                  <div>
                    {/* Icon */}
                    <div
                      className={`mb-3.5 sm:mb-5 flex h-11 w-11 sm:h-13 sm:w-13 lg:h-14 lg:w-14 items-center justify-center rounded-xl sm:rounded-2xl text-xl sm:text-2xl border border-neutral-200/60 shadow-xs ${feature.iconBg} ${feature.iconColor}`}
                    >
                      {feature.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-neutral-900 leading-snug mb-2 sm:mb-3">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm lg:text-base leading-relaxed text-neutral-600 line-clamp-3 sm:line-clamp-none">
                      {feature.desc}
                    </p>
                  </div>

                  {/* Mobile-friendly indicator on top active card */}
                  <div className="flex items-center justify-between pt-3 border-t border-neutral-100 text-[10px] sm:text-xs font-semibold text-neutral-400">
                    <span>Feature {index + 1} of {totalCards}</span>
                    <span className="text-neutral-900 font-bold sm:hidden">Tap for next</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Indicators */}
          <div className="mt-12 sm:mt-14 flex items-center gap-2">
            {features.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ease-out ${
                  activeIndex === idx ? "w-6 sm:w-7 bg-black" : "w-1.5 sm:w-2 bg-neutral-300 hover:bg-neutral-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}