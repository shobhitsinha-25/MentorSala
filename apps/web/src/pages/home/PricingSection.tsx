import { Link } from "react-router-dom";

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-20 px-6 bg-[#F7F5FF]"
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex rounded-full border border-[#D9D4FF] bg-white px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-[#7C3AED] shadow-sm mb-5">
            PRICING PLANS
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

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {[
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
              cardStyle:
                "bg-white border-2 border-[#2563EB] shadow-[0_20px_50px_rgba(37,99,235,0.10)] scale-[1.02]",
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
              highlight: false,
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-[30px] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${plan.cardStyle}`}
            >
              <div>
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute top-5 right-5 rounded-full bg-[#2563EB] px-3 py-1 text-[10px] font-bold tracking-wide text-white">
                    {plan.badge}
                  </div>
                )}

                {/* Plan Info */}
                <div className="mb-8">
                  <h3 className="text-2xl font-black text-[#0F172A] mb-2">
                    {plan.name}
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
                      className="flex items-center gap-3"
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
              <Link
                to="/signup"
                className={`flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] ${plan.buttonStyle}`}
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
          ))}
        </div>
      </div>
    </section>
  );
}