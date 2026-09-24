import { useState, useMemo } from "react";
import {
  Search,
  BookOpen,
  UserCheck,
  CreditCard,
  FileText,
  ChevronDown,
  Mail,
  Phone,
  MessageSquare,
  HelpCircle,
  X,
  LifeBuoy,
  ArrowUpRight,
} from "lucide-react";
import AboutNavbar from "../About/AboutNavbar";
import Footer from "../home/Footer";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: "Mentorship & Sessions",
    question: "How do 1-on-1 mentorship sessions work?",
    answer:
      "Once you book a session with a mentor, you will receive an instant confirmation along with a secure video call room link. During the session, your mentor reviews your personalized test performance, identifies syllabus bottlenecks, clears conceptual doubts, and refines your weekly schedule.",
  },
  {
    category: "Mentorship & Sessions",
    question: "Can I reschedule or cancel a booked session?",
    answer:
      "Yes, sessions can be rescheduled or cancelled directly from 'My Sessions' in your student dashboard up to 2 hours prior to the scheduled start time at zero penalty.",
  },
  {
    category: "Mentorship & Sessions",
    question: "What should I do if my mentor doesn't join on time?",
    answer:
      "Mentors are notified instantly upon your arrival. If a mentor is delayed by more than 5 minutes due to an emergency, you will receive an automated option to rebook with priority or connect with an alternate mentor immediately.",
  },
  {
    category: "Tests & AI Analytics",
    question: "How does the AI Performance Analytics work?",
    answer:
      "Our AI engine tracks micro-metrics including time-per-question, accuracy ratios across difficulty tiers, guess-work tendencies, and topic retention curves to generate realistic percentile predictions and high-yield revision schedules.",
  },
  {
    category: "Tests & AI Analytics",
    question: "What happens if I face a technical glitch during a live test?",
    answer:
      "Responses are auto-saved in local cache and synchronized with cloud servers every 3 seconds. In case of power loss or browser crashes, simply re-open the test from your dashboard to resume with your timer paused accordingly.",
  },
  {
    category: "Subscriptions & Payments",
    question: "What payment methods are supported on MentorSala?",
    answer:
      "We accept all major payment methods including UPI (Google Pay, PhonePe, Paytm), Credit & Debit Cards (Visa, MasterCard, RuPay), Net Banking across 50+ banks, and EMI options through our 256-bit SSL encrypted payment gateway.",
  },
  {
    category: "Subscriptions & Payments",
    question: "Are subscriptions automatically renewed?",
    answer:
      "No. All MentorSala plans are non-auto-renewing. You will receive renewal alerts 7 days before plan expiry, and your account will never be charged without explicit manual authorization.",
  },
  {
    category: "Account & Settings",
    question: "How can I update my target exam or personal details?",
    answer:
      "Navigate to 'Account Settings' from your user avatar menu in the top navigation bar. From there, you can adjust your primary target exam (JEE Main, Advanced, WBJEE, NEET), class grade, and contact credentials.",
  },
  {
    category: "Account & Settings",
    question: "What should I do if I forget my password?",
    answer:
      "Click on 'Forgot Password' on the login screen, provide your registered email, and follow the secure one-time reset link sent to your inbox. Make sure to check your spam/promotions folder if it does not arrive within 60 seconds.",
  },
];

const categories = [
  { name: "All Topics", icon: HelpCircle },
  { name: "Mentorship & Sessions", icon: UserCheck },
  { name: "Tests & AI Analytics", icon: FileText },
  { name: "Subscriptions & Payments", icon: CreditCard },
  { name: "Account & Settings", icon: BookOpen },
];

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Topics");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        selectedCategory === "All Topics" || faq.category === selectedCategory;
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="bg-white text-black min-h-screen flex flex-col font-sans antialiased">
      {/* Navbar directly rendered matching About.tsx */}
      <AboutNavbar />

      {/* Main Content Area */}
      <main className="relative flex-1 px-4 sm:px-6 md:px-8 py-12 sm:py-16 overflow-hidden text-slate-900 selection:bg-indigo-500/20 bg-slate-50/60">
        {/* Soft Ambient Light Glows */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-indigo-200/40 blur-[140px] rounded-full" />
        <div className="pointer-events-none absolute top-1/3 left-1/4 w-[450px] h-[250px] bg-purple-200/40 blur-[130px] rounded-full" />

        <div className="relative z-10 mx-auto max-w-5xl">
          {/* Hero Header */}
          <header className="text-center max-w-3xl mx-auto">
            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900">
              How can we{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                help you?
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              Find quick answers to common questions about mentorship sessions, test evaluations, billing, and account settings.
            </p>

            {/* Interactive Search Bar */}
           <div className="mx-auto mt-8 sm:mt-12 max-w-2xl">
  {/* Keyframe animation for the rotating conic border beam */}
  <style>{`
    @keyframes rotateBorderGlow {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    .animate-border-beam {
      animation: rotateBorderGlow 4s linear infinite;
    }
  `}</style>

  <div className="relative rounded-2xl sm:rounded-3xl p-[2px] overflow-hidden shadow-xl shadow-cyan-500/10">
    {/* Rotating Light-Blue / Cyan Conic Beam Border Animation */}
    <div
      className="absolute -inset-[150%] animate-border-beam"
      style={{
        background:
          "conic-gradient(from 0deg, transparent 0deg, transparent 180deg, #38bdf8 260deg, #06b6d4 310deg, #60a5fa 340deg, transparent 360deg)",
      }}
    />

    {/* Ambient Glow layer matching the border */}
    <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-cyan-400/10 blur-sm pointer-events-none" />

    {/* Inner Input Card */}
    <div className="relative flex items-center rounded-[14px] sm:rounded-[22px] bg-white border border-slate-200/80 transition-all duration-200 focus-within:border-sky-400 focus-within:ring-4 focus-within:ring-sky-400/10">
      {/* Search Icon */}
      <div className="pointer-events-none pl-4 sm:pl-5 pr-2 sm:pr-3 text-sky-500 transition-colors">
        <Search size={20} className="stroke-[2.2]" />
      </div>

      {/* Input Field */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search questions, keywords (e.g. reschedule, refund, AI tests)..."
        className="h-12 sm:h-14 w-full bg-transparent pr-20 sm:pr-24 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none"
      />

      {/* Right Actions: Clear Button / Keyboard Shortcut */}
      <div className="absolute right-3 sm:right-4 flex items-center gap-2">
        {searchQuery ? (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            aria-label="Clear search"
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        ) : (
          <span className="hidden sm:inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-400 tracking-wider">
            ⌘
          </span>
        )}
      </div>
    </div>
  </div>

  {/* Quick Helper Suggestion Pills */}
  <div className="mt-3.5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-500">
    <span className="font-semibold text-slate-400">Popular:</span>
    {["Reschedule session", "AI rank report", "Reset password", "Payment receipts"].map((tag) => (
      <button
        key={tag}
        type="button"
        onClick={() => setSearchQuery(tag)}
        className="rounded-full border border-slate-200/80 bg-white px-2.5 sm:px-3 py-0.5 text-slate-600 hover:border-sky-300 hover:text-sky-600 hover:bg-sky-50/40 transition-colors cursor-pointer"
      >
        {tag}
      </button>
    ))}
  </div>
</div>
          </header>

       

          {/* Category Filter Tabs */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.name;

              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setOpenFaqIndex(0);
                  }}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold tracking-wide transition-all duration-200 active:scale-95 cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/20 border border-indigo-600"
                      : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 hover:bg-slate-100/70 shadow-xs"
                  }`}
                >
                  <Icon size={14} className={isSelected ? "text-white" : "text-slate-500"} />
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* FAQs Accordion Container */}
          <section className="mt-10 space-y-3.5">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;

                return (
                  <div
                    key={faq.question}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? "border-indigo-200 bg-white shadow-md shadow-indigo-100/50"
                        : "border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-xs"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-900 text-base sm:text-lg gap-4 cursor-pointer"
                    >
                      <span className="leading-snug">{faq.question}</span>
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 ${
                          isOpen
                            ? "border-indigo-200 bg-indigo-50 text-indigo-600 rotate-180"
                            : "border-slate-200 bg-slate-50 text-slate-500"
                        }`}
                      >
                        <ChevronDown size={17} />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 text-sm sm:text-base leading-relaxed text-slate-600 border-t border-slate-100 pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 rounded-3xl border border-dashed border-slate-300 bg-white p-8">
                <LifeBuoy className="mx-auto h-12 w-12 text-slate-400 mb-3 animate-pulse" />
                <h3 className="text-lg font-bold text-slate-800">
                  No matching queries found
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                  We couldn't find anything matching "{searchQuery}". Try different keywords or reach out directly to our team below.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Topics");
                  }}
                  className="mt-5 rounded-xl border border-slate-300 bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </section>

          {/* Direct Support Cards */}
          <section className="mt-16 sm:mt-20">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                Still have questions?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
                Our support team is active across all channels to help you stay focused on your preparation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {/* Email Card */}
              <div className="group rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-6 text-center shadow-xs transition-all duration-300 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/60 hover:translate-y-[-2px]">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-4 border border-indigo-100 group-hover:scale-110 transition-transform">
                  <Mail size={22} />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Email Support</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  For complex inquiries, feedback, or test dispute logs. Responded within 24 hours.
                </p>
                <a
                  href="mailto:support@mentorsala.com"
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  support@mentorsala.com
                  <ArrowUpRight size={14} />
                </a>
              </div>

              {/* Helpline Card */}
              <div className="group rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-6 text-center shadow-xs transition-all duration-300 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100/60 hover:translate-y-[-2px]">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-4 border border-emerald-100 group-hover:scale-110 transition-transform">
                  <Phone size={22} />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Direct Helpline</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Speak with a student counselor. Available Mon–Sat from 10:00 AM to 7:00 PM IST.
                </p>
                <a
                  href="tel:+916203075758"
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  +91-6203075758
                  <ArrowUpRight size={14} />
                </a>
              </div>

              {/* Instant WhatsApp Card */}
              <div className="group rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-6 text-center shadow-xs transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/60 hover:translate-y-[-2px] sm:col-span-2 lg:col-span-1">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-4 border border-blue-100 group-hover:scale-110 transition-transform">
                  <MessageSquare size={22} />
                </div>
                <h3 className="font-bold text-slate-900 text-base">WhatsApp Desk</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Instant guidance for slot booking confirmation and portal onboarding assistance.
                </p>
                <a
                  href="https://wa.me/916203075758"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Chat on WhatsApp
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
<div className="dark w-full bg-[#07090E] text-zinc-100 selection:bg-purple-500/30 isolate">
        <Footer />
      </div>

      
    </div>
  );
}