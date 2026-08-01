import { ShieldCheck, Lock, Eye, Database, UserCheck, Bell, Mail, FileText } from "lucide-react";
import AboutNavbar from "../About/AboutNavbar";

const privacySections = [
  {
    icon: ShieldCheck,
    title: "1. Information We Collect",
    content: (
      <>
        <p>
          We collect information that identifies, relates to, or describes you ("Personal Data") to provide and improve our mentorship services.
        </p>

        <h3 className="mt-4 text-base font-bold text-slate-900">A. Personal Identification Information</h3>
        <ul className="list-disc pl-5 mt-2 space-y-2">
          <li>Full Name, Email Address, and Phone Number.</li>
          <li>Target Examination (e.g., JEE, WBJEE, Board Exams) and Academic History.</li>
          <li>Account credentials and profile preferences.</li>
        </ul>

        <h3 className="mt-4 text-base font-bold text-slate-900">B. Automated & Technical Data</h3>
        <ul className="list-disc pl-5 mt-2 space-y-2">
          <li>Device details, IP address, browser type, and operating system.</li>
          <li>Test logs, time spent per question, performance analytics, and session interaction metrics.</li>
        </ul>
      </>
    ),
  },
  {
    icon: Eye,
    title: "2. How We Use Your Data",
    content: (
      <>
        <p>Your data directly drives your personalized learning journey on MentorSala. We use collected information to:</p>

        <ul className="list-disc pl-5 mt-3 space-y-2">
          <li>Generate tailored AI analytics, test insights, and revision roadmaps.</li>
          <li>Schedule and manage 1-on-1 mentorship sessions.</li>
          <li>Process transactions and send subscription confirmations.</li>
          <li>Improve platform security, monitor test integrity, and prevent fraudulent attempts.</li>
          <li>Send important updates, feature additions, and security alerts.</li>
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
          MentorSala does <strong>not sell</strong> or rent your personal information to third parties. We share data only under strictly regulated conditions:
        </p>

        <ul className="list-disc pl-5 mt-3 space-y-2">
          <li><strong>Assigned Mentors:</strong> Authorized human mentors access your academic progress data solely to guide your learning.</li>
          <li><strong>Service Providers:</strong> Secure third-party vendors for payment gateway processing, SMS verification, and cloud hosting.</li>
          <li><strong>Legal Compliance:</strong> When required by law, legal process, or governmental regulatory requests.</li>
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
          We employ industry-standard administrative, technical, and physical security measures to safeguard your personal information.
        </p>

        <ul className="list-disc pl-5 mt-3 space-y-2">
          <li>End-to-end encryption for sensitive data transactions and passwords.</li>
          <li>Restricted database access controlled via multi-factor authentication.</li>
          <li>Regular platform vulnerability audits and secure cloud infrastructure hosting.</li>
        </ul>
      </>
    ),
  },
  {
    icon: UserCheck,
    title: "5. Your Rights & Choices",
    content: (
      <>
        <p>You maintain full control over your personal information registered on MentorSala:</p>

        <ul className="list-disc pl-5 mt-3 space-y-2">
          <li><strong>Access & Review:</strong> View and update your profile settings directly inside your student dashboard.</li>
          <li><strong>Data Erasure:</strong> Request permanent deletion of your account and associated records by contacting support.</li>
          <li><strong>Communication Preferences:</strong> Opt-out of non-essential promotional notifications at any time.</li>
        </ul>
      </>
    ),
  },
  {
    icon: ShieldCheck,
    title: "6. Children’s Privacy",
    content: (
      <p>
        MentorSala is designed for students preparing for competitive examinations. Users under 18 years of age must use the platform under the guidance and consent of a parent or legal guardian. We do not knowingly collect personal details from children under 13 without verifiable parental authorization.
      </p>
    ),
  },
  {
    icon: Bell,
    title: "7. Cookies & Analytics",
    content: (
      <p>
        We use essential cookies and session storage to keep you logged in, save your test preferences, and analyze platform performance. You can control or disable cookies via your browser settings, though doing so may affect certain functional features of the platform.
      </p>
    ),
  },
  {
    icon: FileText,
    title: "8. Policy Updates",
    content: (
      <p>
        MentorSala may update this Privacy Policy periodically to reflect technological changes or legal requirements. Material updates will be announced on this page with an updated revision date.
      </p>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <AboutNavbar />
      
      <main className="mx-auto max-w-5xl px-6 py-16 sm:py-20">

        {/* Hero Header */}
        <header className="text-center max-w-3xl mx-auto">

          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1 text-xs font-semibold text-indigo-600 tracking-wide uppercase">
            Data Protection & Privacy
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Privacy Policy
          </h1>

          

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 font-medium">
            At MentorSala, we are committed to safeguarding your personal data and ensuring a secure, transparent AI-powered learning environment.
          </p>

        </header>

        {/* Sections List */}
        <section className="mt-12 sm:mt-16 space-y-6">

          {privacySections.map((section) => {
            const Icon = section.icon;

            return (
              <article
                key={section.title}
                className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm transition-all duration-200 hover:shadow-md hover:border-indigo-100"
              >
                <div className="flex items-center gap-3.5">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {section.title}
                  </h2>

                </div>

                <div className="mt-5 text-sm sm:text-base leading-relaxed text-slate-600 font-normal">
                  {section.content}
                </div>

              </article>
            );
          })}

        </section>

        {/* Contact Support Card */}
        <section className="mt-12 sm:mt-16 rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50/60 via-white to-blue-50/40 p-8 sm:p-10 text-center shadow-xs">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20 mb-5">
            <Mail className="h-6 w-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Privacy Questions?
          </h2>

          <p className="mt-3 max-w-xl mx-auto text-sm sm:text-base text-slate-600 font-medium">
            If you have questions regarding this Privacy Policy or wish to exercise your data protection rights, please reach out to our privacy officer.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm font-semibold text-slate-800">

            <div className="flex items-center gap-2 rounded-xl bg-white border border-slate-200/80 px-4 py-2.5 shadow-xs">
              <span className="text-slate-400">Email:</span>
              <a href="mailto:support@mentorsala.com" className="text-indigo-600 hover:underline">
                support@mentorsala.com
              </a>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-white border border-slate-200/80 px-4 py-2.5 shadow-xs">
              <span className="text-slate-400">Website:</span>
              <a href="https://www.mentorsala.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                www.mentorsala.com
              </a>
            </div>

          </div>

        </section>

      </main>
    </div>
  );
}