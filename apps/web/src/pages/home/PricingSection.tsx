import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState("Scholar");
  const [tilt, setTilt] = useState<{ [key: string]: { x: number; y: number } }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, planName: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt calculation (-8deg to 8deg)
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTilt((prev) => ({
      ...prev,
      [planName]: { x: rotateX, y: rotateY },
    }));
  };

  const handleMouseLeave = (planName: string) => {
    setTilt((prev) => ({
      ...prev,
      [planName]: { x: 0, y: 0 },
    }));
  };

  const plans = [
    {
      name: "Starter",
      price: "Free",
      subtitle: "Perfect for beginners starting their journey.",
      features: [
        "AI Doubt Solver (10 Q/day)",
        "AI Weak Topic Report (1x)",
        "Rank Predictor (3 uses)",
        "1 Mock Test",
        "1 Free 1-on-1 Mentorship Session (30min)",
      ],
      button: "Start Free",
      buttonStyle:
        "border border-[#D9D4FF] bg-white text-[#0F172A] hover:border-[#2563EB] hover:bg-[#F8FAFF]",
      cardStyle: "bg-white border border-[#E8E5F5]",
      glowColor: "rgba(99, 102, 241, 0.15)",
      highlight: false,
    },
    {
      name: "Scholar",
      price: "₹2,999",
      duration: "/yr",
      subtitle: "Best for serious aspirants preparing daily.",
      features: [
        "Everything in Starter",
        "Mentor Seesion (4/Month)",
        "Unlimited Mock Tests + PYQs",
        "Deep AI Test Analysis",
        "Weekly Adaptive Study Plan",
        "PYQ Pattern Analyser",
        "JEE Advanced Coverage",
        "Priority Match (24 hr)",
        "Mentor WhatsApp Access",
      ],
      button: "Get Scholar",
      buttonStyle:
        "bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white shadow-lg shadow-blue-200",
      cardStyle: "bg-white border-2 border-[#2563EB]",
      glowColor: "rgba(37, 99, 235, 0.25)",
      badge: "MOST POPULAR",
      highlight: true,
    },
    {
      name: "Elite",
      price: "₹5,999",
      duration: "/yr",
      subtitle: "Premium mentorship and career guidance.",
      features: [
        "Everything in Scholar",
        "Mentor Seesion (8/Month)",
        "Dedicated IIT mentor",
        "Weekly strategy call",
        "Full mock series + review",
      ],
      button: "Go Elite",
      buttonStyle:
        "bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white shadow-lg shadow-orange-200",
      cardStyle: "bg-white border border-[#FDE7C3]",
      glowColor: "rgba(249, 115, 22, 0.20)",
      highlight: false,
    },
  ];

  return (
    <section
      id="pricing"
      className="py-20 px-6 bg-[#F7F5FF] select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="relative inline-flex items-center justify-center rounded-full mb-5">
            {/* The Ring Animation Layer */}
            <div className="absolute inset-0 rounded-full animate-pulse ring-3 ring-[#4d4dff] bg-[#ccccff]"></div>

            {/* Solid Glass Badge */}
            <div className="relative z-10 inline-flex items-center gap-2 rounded-full border border-[#D9D4FF] bg-white px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-[#7C3AED] shadow-sm">
              PRICING PLANS
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] leading-tight">
            Simple pricing for
            <br />
            every aspirant
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-base text-[#64748B] leading-relaxed">
            Start free and upgrade as your preparation grows.
          </p>
        </div>

        {/* 3D Clickable Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch [perspective:1400px]">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.name;
            const currentTilt = tilt[plan.name] || { x: 0, y: 0 };

            return (
              <div
                key={plan.name}
                onClick={() => setSelectedPlan(plan.name)}
                onMouseMove={(e) => handleMouseMove(e, plan.name)}
                onMouseLeave={() => handleMouseLeave(plan.name)}
                style={{
                  transform: `rotateX(${currentTilt.x}deg) rotateY(${currentTilt.y}deg) translateZ(${
                    isSelected ? "35px" : "0px"
                  }) ${isSelected ? "scale(1.03)" : "scale(1)"}`,
                  boxShadow: isSelected
                    ? `0 25px 60px -12px ${plan.glowColor}`
                    : "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
                  transformStyle: "preserve-3d",
                }}
                className={`group relative rounded-[30px] p-7 cursor-pointer transition-all duration-300 ease-out flex flex-col justify-between ${
                  plan.cardStyle
                } ${
                  isSelected
                    ? "ring-2 ring-[#2563EB]/80 shadow-2xl z-20"
                    : "hover:border-slate-300 hover:shadow-lg z-10"
                }`}
              >
                {/* 3D Depth Layer */}
                <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute top-0 right-0 rounded-full bg-[#2563EB] px-3.5 py-1 text-[10px] font-bold tracking-wide text-white shadow-md shadow-blue-500/20">
                      {plan.badge}
                    </div>
                  )}

                  {/* Plan Info */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-black text-[#0F172A] mb-2 flex items-center justify-between">
                      {plan.name}
                      {isSelected && (
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200">
                          Selected
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-8 flex items-end gap-1">
                    <h2 className="text-5xl font-black text-[#0F172A]">
                      {plan.price}
                    </h2>
                    {plan.duration && (
                      <span className="mb-1 text-[#64748B]">
                        {plan.duration}
                      </span>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-10">
                    {plan.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 transition-transform duration-200 group-hover:translate-x-1"
                      >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-xs text-[#2563EB]">
                          ✓
                        </div>
                        <span className="text-sm text-[#0F172A]">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div style={{ transform: "translateZ(40px)" }}>
                  <Link
                    to="/signup"
                    onClick={(e) => e.stopPropagation()}
                    className={`flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] ${plan.buttonStyle}`}
                  >
                    <span
                      className={`${
                        plan.name === "Starter" ? "text-[#0F172A]" : "text-white"
                      }`}
                    >
                      {plan.button}
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}