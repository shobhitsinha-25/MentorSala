import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Responsive Radial Viscous Liquid Flow Simulation
function ViscousLiquidBackground() {
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

    let angle = 0;
    // Layered liquid wave surfaces moving counter-directionally
    const liquidLayers = [
      { frequency: 0.003, speed: 0.016, amplitude: 55, color: "rgba(194, 147, 238, 0.12)", yShift: 0.52 },
      { frequency: 0.004, speed: -0.014, amplitude: 45, color: "rgba(76, 77, 134, 0.14)", yShift: 0.58 },
      { frequency: 0.002, speed: 0.011, amplitude: 70, color: "rgba(6, 255, 52, 0.09)", yShift: 0.65 },
      { frequency: 0.005, speed: -0.019, amplitude: 35, color: "rgba(79, 70, 229, 0.11)", yShift: 0.46 },
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      liquidLayers.forEach((layer, i) => {
        ctx.beginPath();
        ctx.moveTo(0, height);

        const stepX = width < 640 ? 16 : 10;
        for (let x = 0; x <= width; x += stepX) {
          const y =
            Math.sin(x * layer.frequency + angle * layer.speed + i) * layer.amplitude +
            Math.cos(x * 0.003 - angle * 0.009) * 22 +
            height * layer.yShift;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = layer.color;
        ctx.fill();
      });

      angle += 1;
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
      className="absolute inset-0 pointer-events-none z-0 h-full w-full opacity-90 filter blur-[40px]"
    />
  );
}

export default function HowItWorksSection() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      step: "STEP 01",
      icon: "🎯",
      title: "Choose Your Goal",
      desc: "Select your target exam and preparation path.",
      visual: (
        <div className="h-full flex items-center justify-center">
          <div className="flex flex-wrap justify-center gap-2">
            {["JEE", "WBJEE", "BOARD"].map((exam) => (
              <div
                key={exam}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                  exam === "JEE"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm"
                    : "bg-white border border-purple-100 text-slate-600"
                }`}
              >
                {exam}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      step: "STEP 02",
      icon: "🧠",
      title: "AI Builds Your Plan",
      desc: "Daily schedule personalised for your weak areas.",
      visual: (
        <div className="h-full flex flex-col justify-center space-y-2.5">
          {[
            "Physics Revision",
            "Mock Analysis",
            "Organic Chemistry",
          ].map((task) => (
            <div
              key={task}
              className="flex items-center gap-3 rounded-xl bg-white px-3 py-2 shadow-xs border border-purple-100/50"
            >
              <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 shrink-0" />
              <span className="text-slate-800 font-semibold text-xs truncate">
                {task}
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      step: "STEP 03",
      icon: "🏆",
      title: "Learn & Compete",
      desc: "Attend classes, solve tests, and earn XP rewards.",
      visual: (
        <div className="h-full flex flex-col justify-center space-y-2.5">
          {[
            { name: "Rahul", xp: "4280" },
            { name: "Priya", xp: "3950" },
            { name: "You", xp: "2840" },
          ].map((user, index) => (
            <div
              key={user.name}
              className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm ${
                user.name === "You"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm"
                  : "bg-white shadow-xs border border-purple-100/50"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold shrink-0 ${
                    user.name === "You"
                      ? "bg-white/20 text-white"
                      : "bg-indigo-50 text-indigo-600"
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`font-semibold text-xs ${
                    user.name === "You" ? "text-white" : "text-slate-800"
                  }`}
                >
                  {user.name}
                </span>
              </div>
              <span
                className={`font-bold text-xs ${
                  user.name === "You" ? "text-white" : "text-slate-800"
                }`}
              >
                {user.xp} XP
              </span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  // Cycles forward every 2.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [steps.length]);

  const handlePrev = () => {
    setCurrentStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  return (
    <section
      id="how-it-works"
      className="relative py-20 px-6 overflow-hidden bg-[#F8F9FE]"
    >
      {/* Dynamic Animated Liquid Canvas */}
      <ViscousLiquidBackground />

      {/* Floating Organic Fluid Blobs */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-[420px] w-[420px] rounded-full bg-purple-400/15 blur-[120px] animate-pulse" />
      <div className="pointer-events-none absolute bottom-5 right-1/4 h-[440px] w-[440px] rounded-full bg-indigo-400/15 blur-[130px]" />
      <div className="pointer-events-none absolute top-1/2 -left-12 h-[340px] w-[340px] rounded-full bg-blue-300/15 blur-[110px]" />

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="relative inline-flex items-center justify-center rounded-full mb-5">
            {/* The Ring Animation Layer */}
            <div className="absolute inset-0 rounded-full animate-pulse ring-2 ring-purple-400/50 bg-purple-200/40 blur-xs"></div>

            {/* Solid Glass Badge */}
            <div className="relative z-10 inline-flex items-center gap-2 rounded-full border border-purple-200/80 bg-white/80 backdrop-blur-md px-4 py-2 text-[11px] font-bold tracking-[0.18em] text-purple-700 shadow-sm">
              HOW IT WORKS
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            Three Steps To Your
            <br />
            Dream Rank
          </h2>

          <p className="mt-5 max-w-xl mx-auto text-base text-slate-600 leading-relaxed font-medium">
            A simple system designed to guide students from confusion to
            confidence.
          </p>
        </div>

        {/* Step Progression Bar */}
        <div className="max-w-md mx-auto mb-8 flex items-center justify-between gap-3">
          {steps.map((item, index) => (
            <button
              key={item.step}
              onClick={() => setCurrentStep(index)}
              className="flex-1 text-left group transition-all"
            >
              <div className="flex items-center justify-between mb-1.5 px-0.5">
                <span
                  className={`text-[10px] font-black tracking-wider transition-colors ${
                    currentStep === index
                      ? "text-purple-700"
                      : "text-slate-400 group-hover:text-slate-600"
                  }`}
                >
                  {item.step}
                </span>
                <span className="text-xs">{item.icon}</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    currentStep === index
                      ? "w-full bg-gradient-to-r from-indigo-600 to-purple-600"
                      : currentStep > index
                      ? "w-full bg-purple-300"
                      : "w-0"
                  }`}
                />
              </div>
            </button>
          ))}
        </div>

        {/* Single Step Card Display */}
        <div className="relative max-w-lg mx-auto">
          {/* Rigid Frame Container to eliminate layout shifts & flickering */}
          <div className="group relative w-full h-[470px] rounded-[28px] border border-purple-200/60 bg-white/85 backdrop-blur-xl p-8 shadow-xl shadow-purple-500/10 flex flex-col justify-between overflow-hidden">
            {/* Step Badge */}
            <div>
              <div className="inline-flex rounded-full bg-purple-100/80 border border-purple-200/50 px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-purple-700">
                {steps[currentStep].step}
              </div>
            </div>

            {/* Icon */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-3xl shadow-md shadow-indigo-500/20 shrink-0">
              {steps[currentStep].icon}
            </div>

            {/* Title & Description Header (Fixed Height Area) */}
            <div className="h-[76px] flex flex-col justify-start">
              <h3 className="text-2xl font-black text-slate-900 leading-snug">
                {steps[currentStep].title}
              </h3>
              <p className="mt-1.5 text-slate-600 text-sm leading-relaxed font-medium">
                {steps[currentStep].desc}
              </p>
            </div>

            {/* Visual Container (Locked Fixed Height with Pure Opacity Transition) */}
            <div className="h-[185px] w-full rounded-2xl border border-purple-100/80 bg-purple-50/40 p-4 backdrop-blur-xs">
              <div
                key={currentStep}
                className="h-full w-full transition-opacity duration-300 ease-in-out opacity-100"
              >
                {steps[currentStep].visual}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-center px-2">
            {/* Step Indicators */}
            <div className="flex items-center gap-2">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStep(idx)}
                  aria-label={`Go to step ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentStep === idx
                      ? "w-7 bg-gradient-to-r from-indigo-600 to-purple-600"
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}