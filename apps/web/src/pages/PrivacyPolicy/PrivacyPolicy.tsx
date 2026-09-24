import React from "react";
import {
  ShieldCheck,
  Lock,
  Eye,
  Database,
  UserCheck,
  Bell,
  Mail,
  FileText,
  Sparkles,
  CheckCircle2,
  Globe,
  ArrowUpRight,
} from "lucide-react";
import AboutNavbar from "../About/AboutNavbar";
import Footer from "../home/Footer";

const privacySections = [
  {
    icon: ShieldCheck,
    title: "1. Information We Collect",
    content: (
      <>
        <p>
          We collect information that identifies, relates to, or describes you
          ("Personal Data") to provide and improve our mentorship services.
        </p>

        <h3 className="mt-4 text-base font-bold text-zinc-100">
          A. Personal Identification Information
        </h3>
        <ul className="list-disc pl-5 mt-2 space-y-2 text-zinc-400">
          <li>Full Name, Email Address, and Phone Number.</li>
          <li>
            Target Examination (e.g., JEE, WBJEE, Board Exams) and Academic
            History.
          </li>
          <li>Account credentials and profile preferences.</li>
        </ul>

        <h3 className="mt-4 text-base font-bold text-zinc-100">
          B. Automated & Technical Data
        </h3>
        <ul className="list-disc pl-5 mt-2 space-y-2 text-zinc-400">
          <li>
            Device details, IP address, browser type, and operating system.
          </li>
          <li>
            Test logs, time spent per question, performance analytics, and session
            interaction metrics.
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: Eye,
    title: "2. How We Use Your Data",
    content: (
      <>
        <p>
          Your data directly drives your personalized learning journey on
          MentorSala. We use collected information to:
        </p>

        <ul className="list-disc pl-5 mt-3 space-y-2 text-zinc-400">
          <li>
            Generate tailored AI analytics, test insights, and revision roadmaps.
          </li>
          <li>Schedule and manage 1-on-1 mentorship sessions.</li>
          <li>Process transactions and send subscription confirmations.</li>
          <li>
            Improve platform security, monitor test integrity, and prevent
            fraudulent attempts.
          </li>
          <li>
            Send important updates, feature additions, and security alerts.
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: Database,
    title: "3. Data Sharing & Disclosure",
    content: (
      <>
        <p>
          MentorSala does <strong>not sell</strong> or rent your personal
          information to third parties. We share data only under strictly
          regulated conditions:
        </p>

        <ul className="list-disc pl-5 mt-3 space-y-2 text-zinc-400">
          <li>
            <strong className="text-zinc-200">Assigned Mentors:</strong> Authorized human mentors access
            your academic progress data solely to guide your learning.
          </li>
          <li>
            <strong className="text-zinc-200">Service Providers:</strong> Secure third-party vendors for
            payment gateway processing, SMS verification, and cloud hosting.
          </li>
          <li>
            <strong className="text-zinc-200">Legal Compliance:</strong> When required by law, legal
            process, or governmental regulatory requests.
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: Lock,
    title: "4. Data Security & Storage",
    content: (
      <>
        <p>
          We employ industry-standard administrative, technical, and physical
          security measures to safeguard your personal information.
        </p>

        <ul className="list-disc pl-5 mt-3 space-y-2 text-zinc-400">
          <li>
            End-to-end encryption for sensitive data transactions and passwords.
          </li>
          <li>
            Restricted database access controlled via multi-factor
            authentication.
          </li>
          <li>
            Regular platform vulnerability audits and secure cloud
            infrastructure hosting.
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: UserCheck,
    title: "5. Your Rights & Choices",
    content: (
      <>
        <p>
          You maintain full control over your personal information registered on
          MentorSala:
        </p>

        <ul className="list-disc pl-5 mt-3 space-y-2 text-zinc-400">
          <li>
            <strong className="text-zinc-200">Access & Review:</strong> View and update your profile
            settings directly inside your student dashboard.
          </li>
          <li>
            <strong className="text-zinc-200">Data Erasure:</strong> Request permanent deletion of your
            account and associated records by contacting support.
          </li>
          <li>
            <strong className="text-zinc-200">Communication Preferences:</strong> Opt-out of non-essential
            promotional notifications at any time.
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: ShieldCheck,
    title: "6. Children’s Privacy",
    content: (
      <p>
        MentorSala is designed for students preparing for competitive
        examinations. Users under 18 years of age must use the platform under
        the guidance and consent of a parent or legal guardian. We do not
        knowingly collect personal details from children under 13 without
        verifiable parental authorization.
      </p>
    ),
  },
  {
    icon: Bell,
    title: "7. Cookies & Analytics",
    content: (
      <p>
        We use essential cookies and session storage to keep you logged in, save
        your test preferences, and analyze platform performance. You can control
        or disable cookies via your browser settings, though doing so may affect
        certain functional features of the platform.
      </p>
    ),
  },
  {
    icon: FileText,
    title: "8. Policy Updates",
    content: (
      <p>
        MentorSala may update this Privacy Policy periodically to reflect
        technological changes or legal requirements. Material updates will be
        announced on this page with an updated revision date.
      </p>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-slate-900 font-sans antialiased selection:bg-indigo-500/20 overflow-x-hidden">
      {/* Global Navbar */}
      <AboutNavbar />

      {/* Main Content Area */}
      <main className="relative flex-1 px-4 sm:px-6 md:px-8 py-12 sm:py-16 lg:py-20 overflow-hidden">
        {/* Ambient Dark Theme Glows */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-600/10 blur-[150px] rounded-full" />
        <div className="pointer-events-none absolute top-1/3 left-1/4 w-[500px] h-[260px] bg-blue-600/10 blur-[130px] rounded-full" />

        <div className="relative z-10 mx-auto max-w-5xl">
          {/* Hero Header */}
          <header className="text-center max-w-3xl mx-auto">
            

            <h1 className="mt-5 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
              Privacy{" "}
              <span className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent">
                Policy
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base lg:text-lg leading-relaxed text-zinc-400 font-normal max-w-2xl mx-auto">
              At MentorSala, we are committed to safeguarding your personal data
              and ensuring a secure, transparent AI-powered learning
              environment.
            </p>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-zinc-500">
              <CheckCircle2 size={15} className="text-emerald-400" />
              <span className="text-zinc-400">Last Updated: 2026</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">Encrypted Data Storage</span>
            </div>
          </header>

          {/* Sections List */}
          <section className="mt-12 sm:mt-16 space-y-5 sm:space-y-6">
            {privacySections.map((section) => {
              const Icon = section.icon;

              return (
                <article
                  key={section.title}
                  className="rounded-2xl sm:rounded-3xl border border-zinc-800/80 bg-zinc-900/50 p-6 sm:p-8 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-zinc-100">
                      {section.title}
                    </h2>
                  </div>

                  <div className="mt-4 sm:mt-5 text-sm sm:text-base leading-relaxed text-zinc-400 font-normal">
                    {section.content}
                  </div>
                </article>
              );
            })}
          </section>

          {/* Contact Support Card */}
          <section className="mt-14 sm:mt-18 rounded-3xl border border-zinc-800/90 bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-slate-950 p-7 sm:p-10 text-center shadow-2xl backdrop-blur-xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/25 mb-5">
              <Mail className="h-6 w-6" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Privacy Questions?
            </h2>

            <p className="mt-2.5 max-w-xl mx-auto text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
              If you have questions regarding this Privacy Policy or wish to
              exercise your data protection rights, please reach out to our
              privacy officer.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold">
              <a
                href="mailto:support@mentorsala.com"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-zinc-950/80 border border-zinc-800 px-5 py-3 !text-white shadow-md hover:border-purple-500/40 hover:text-purple-300 transition-all cursor-pointer"
              >
                <Mail size={16} className="!text-white" />
                <span>support@mentorsala.com</span>
                <ArrowUpRight size={14} className="text-zinc-500" />
              </a>

              <a
                href="https://www.mentorsala.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-zinc-950/80 border border-zinc-800 px-5 py-3 !text-white shadow-md hover:border-purple-500/40 hover:text-purple-300 transition-all cursor-pointer"
              >
                <Globe size={16} className="text-purple-400" />
                <span className="!text-white">www.mentorsala.com</span>
                <ArrowUpRight size={14} className="text-zinc-500" />
              </a>
            </div>
          </section>
        </div>
      </main>
{/* Footer (Isolated Dark Container) */}
      <div className="dark w-full bg-[#07090E] text-zinc-100 selection:bg-purple-500/30 isolate">
        <Footer />
      </div>
    </div>
  );
}