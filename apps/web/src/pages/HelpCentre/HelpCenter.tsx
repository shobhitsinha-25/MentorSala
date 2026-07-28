import { useState } from "react";
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
  Sparkles,
} from "lucide-react";
import AboutNavbar from "../About/AboutNavbar";

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
      "Once you book a session with a mentor, you will receive a confirmation with a video link. During the session, your mentor will review your study strategy, clear doubts, and help align your preparation goals.",
  },
  {
    category: "Mentorship & Sessions",
    question: "Can I reschedule or cancel a booked session?",
    answer:
      "Yes, you can reschedule or cancel your session from 'My Sessions' in your student dashboard at least 2 hours prior to the scheduled start time.",
  },
  {
    category: "Tests & AI Analytics",
    question: "How does the AI Performance Analytics work?",
    answer:
      "Our AI analyzes your speed, accuracy, question attempt strategy, and topic-wise strengths to generate personal rank projections, weak-area identification, and custom revision roadmaps.",
  },
  {
    category: "Tests & AI Analytics",
    question: "What happens if I face a technical glitch during a test?",
    answer:
      "Your test responses are automatically saved in real time. If your browser closes or connection drops, simply re-open the test from your dashboard to resume where you left off.",
  },
  {
    category: "Subscriptions & Payments",
    question: "What payment methods are supported on MentorSala?",
    answer:
      "We accept all major payment methods including UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and popular digital wallets via our secure payment gateway.",
  },
  {
    category: "Subscriptions & Payments",
    question: "Are subscriptions automatically renewed?",
    answer:
      "No, subscriptions are non-auto-renewing. You will receive a reminder before your plan expires and can choose to manually upgrade or renew anytime.",
  },
  {
    category: "Account & Settings",
    question: "How can I update my target exam or personal details?",
    answer:
      "Navigate to your Profile page from the student sidebar. There you can update your target exam (JEE, WBJEE, Board), name, phone number, and avatar.",
  },
  {
    category: "Account & Settings",
    question: "What should I do if I forget my password?",
    answer:
      "Click on 'Forgot Password' on the login screen, enter your registered email address, and follow the link sent to your inbox to reset your password securely.",
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

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "All Topics" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <AboutNavbar />

      <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        {/* Header & Hero */}
        <header className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1 text-xs font-semibold text-indigo-600 tracking-wide uppercase">
            <Sparkles size={12} className="text-indigo-500" />
            Support Hub
          </span>

          <h1 className="mt-5 text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            How can we help you?
          </h1>

          <p className="mt-3 text-base sm:text-lg text-slate-600 font-medium">
            Search our knowledge base or browse frequently asked questions below.
          </p>

          
        </header>

        {/* Category Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.name;

            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-200 active:scale-95 cursor-pointer ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                    : "bg-white border border-slate-200/80 text-slate-600 hover:border-slate-300 hover:bg-slate-100/50"
                }`}
              >
                <Icon size={15} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* FAQ Accordions List */}
        <section className="mt-10 space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-2xs transition-all duration-200 hover:border-indigo-200"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 text-base sm:text-lg gap-4 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-transform duration-200 ${
                        isOpen ? "rotate-180 bg-indigo-50 text-indigo-600" : ""
                      }`}
                    >
                      <ChevronDown size={18} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-sm sm:text-base leading-relaxed text-slate-600 border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 rounded-3xl border border-dashed border-slate-200 bg-white p-8">
              <HelpCircle className="mx-auto h-12 w-12 text-slate-300 mb-3" />
              <h3 className="text-lg font-bold text-slate-800">
                No matching topics found
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Try searching for different keywords or clear your search query.
              </p>
            </div>
          )}
        </section>

        {/* Contact & Direct Support Cards */}
        <section className="mt-14 grid md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 text-center shadow-2xs hover:shadow-md transition-shadow">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-4 border border-indigo-100">
              <Mail size={22} />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Email Support</h3>
            <p className="text-xs text-slate-500 mt-1">
              Get detailed responses within 24 hours.
            </p>
            <a
              href="mailto:support@mentorsala.com"
              className="mt-4 inline-block text-xs font-bold text-indigo-600 hover:underline"
            >
              support@mentorsala.com
            </a>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 text-center shadow-2xs hover:shadow-md transition-shadow ">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-4 border border-emerald-100">
              <Phone size={22} />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Direct Helpline</h3>
            <p className="text-xs text-slate-500 mt-1">
              Available Mon–Sat from 10 AM to 7 PM.
            </p>
            <a
              href="tel:+916203075758"
              className="mt-4 inline-block text-xs font-bold text-emerald-600 hover:underline"
            >
              +91-6203075758
            </a>
          </div>

          
        </section>
      </main>
    </div>
  );
}