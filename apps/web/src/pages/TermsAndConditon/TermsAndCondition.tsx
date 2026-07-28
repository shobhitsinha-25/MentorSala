import { ShieldCheck, BookOpen, CreditCard, Brain, FileText, Gavel, Mail } from "lucide-react";
import AboutNavbar from "../About/AboutNavbar";

const sections = [
  {
    icon: ShieldCheck,
    title: "1. Eligibility",
    content: (
      <>
        <p>
          To use MentorSala, you must provide accurate and complete information
          during registration.
        </p>

        <ul className="list-disc pl-5 mt-3 space-y-2">
          <li>You must be at least 13 years old to create an account.</li>
          <li>
            If you are under 18 years of age, you must obtain permission from
            your parent or legal guardian before using MentorSala.
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: ShieldCheck,
    title: "2. Your Account",
    content: (
      <>
        <p>You are responsible for maintaining the confidentiality of your account.</p>

        <ul className="list-disc pl-5 mt-3 space-y-2">
          <li>Keep your password secure.</li>
          <li>Provide accurate account information.</li>
          <li>Do not share your account with others.</li>
          <li>
            Notify MentorSala immediately if you suspect unauthorized access.
          </li>
        </ul>

        <p className="mt-4">
          MentorSala is not responsible for losses arising from failure to
          protect your account credentials.
        </p>
      </>
    ),
  },
  {
    icon: BookOpen,
    title: "3. Services",
    content: (
      <>
        <p>MentorSala offers educational services including:</p>

        <ul className="list-disc pl-5 mt-3 space-y-2">
          <li>Personalized mentorship</li>
          <li>AI-powered learning assistance</li>
          <li>Mock tests & test series</li>
          <li>Performance analytics</li>
          <li>Study resources & guidance</li>
        </ul>

        <p className="mt-4">
          All services are intended solely for educational purposes.
        </p>
      </>
    ),
  },
  {
    icon: FileText,
    title: "4. No Guarantee of Results",
    content: (
      <>
        <p>
          MentorSala provides educational guidance designed to improve learning.
        </p>

        <p className="mt-4">
          However, we do <strong>not guarantee</strong>:
        </p>

        <ul className="list-disc pl-5 mt-3 space-y-2">
          <li>Admission into any institution</li>
          <li>Any specific examination rank</li>
          <li>Selection in competitive examinations</li>
          <li>Any fixed score or percentile</li>
        </ul>

        <p className="mt-4">
          Academic success depends on your own preparation, consistency and
          performance.
        </p>
      </>
    ),
  },
  {
    icon: CreditCard,
    title: "5. Payments & Refunds",
    content: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>Payments are processed through secure payment gateways.</li>
          <li>Subscriptions must be paid before paid services are activated.</li>
          <li>Future pricing may change without prior notice.</li>
        </ul>

        <h3 className="mt-6 text-lg font-bold text-slate-900">Refund Policy</h3>

        <ul className="list-disc pl-5 mt-3 space-y-2">
          <li>Digital products are generally non-refundable once accessed.</li>
          <li>Duplicate payments will be refunded after verification.</li>
          <li>
            Technical issue refund requests are evaluated individually.
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: BookOpen,
    title: "6. Test Series Rules",
    content: (
      <>
        <p>Students are expected to maintain academic integrity.</p>

        <ul className="list-disc pl-5 mt-3 space-y-2">
          <li>Attempt tests honestly.</li>
          <li>Do not use unfair means.</li>
          <li>Do not share questions publicly.</li>
          <li>Do not create multiple accounts.</li>
        </ul>

        <p className="mt-4">
          MentorSala may suspend or terminate accounts involved in cheating or
          misuse.
        </p>
      </>
    ),
  },
  {
    icon: Brain,
    title: "7. AI Features",
    content: (
      <>
        <p>
          MentorSala may provide AI-generated recommendations, study plans,
          insights and analytics.
        </p>

        <p className="mt-4">
          AI-generated content is intended to support learning and should not be
          considered legal, medical, financial or guaranteed academic advice.
        </p>

        <p className="mt-4">
          AI systems may occasionally produce inaccurate or incomplete results.
        </p>
      </>
    ),
  },
  {
    icon: FileText,
    title: "8. Intellectual Property",
    content: (
      <>
        <p>
          All content available on MentorSala is protected by intellectual
          property laws.
        </p>

        <ul className="list-disc pl-5 mt-3 space-y-2">
          <li>Study materials</li>
          <li>Questions & mock tests</li>
          <li>Videos</li>
          <li>Graphics & branding</li>
          <li>AI reports</li>
          <li>Website design</li>
        </ul>

        <p className="mt-4">
          You may not reproduce, copy, distribute or commercially exploit any
          content without written permission.
        </p>
      </>
    ),
  },
  {
    icon: ShieldCheck,
    title: "9. Prohibited Activities",
    content: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>Sharing accounts</li>
          <li>Uploading harmful or malicious content</li>
          <li>Attempting to hack or disrupt the platform</li>
          <li>Reverse engineering our software</li>
          <li>Violating applicable laws</li>
          <li>Harassing mentors or other users</li>
          <li>Redistributing study material</li>
        </ul>
      </>
    ),
  },
  {
    icon: ShieldCheck,
    title: "10. Privacy",
    content: (
      <p>
        Your use of MentorSala is also governed by our Privacy Policy. By using
        the platform, you consent to the collection and processing of
        information as described in that policy.
      </p>
    ),
  },
  {
    icon: Gavel,
    title: "11. Limitation of Liability",
    content: (
      <>
        <p>To the fullest extent permitted by law, MentorSala is not liable for:</p>

        <ul className="list-disc pl-5 mt-3 space-y-2">
          <li>Examination results</li>
          <li>Internet connectivity failures</li>
          <li>Device incompatibility</li>
          <li>Third-party payment gateway issues</li>
          <li>Data loss beyond our reasonable control</li>
          <li>Indirect or consequential damages</li>
        </ul>
      </>
    ),
  },
  {
    icon: ShieldCheck,
    title: "12. Suspension & Termination",
    content: (
      <>
        <p>We reserve the right to suspend or terminate accounts that:</p>

        <ul className="list-disc pl-5 mt-3 space-y-2">
          <li>Violate these Terms</li>
          <li>Commit fraud</li>
          <li>Misuse the platform</li>
          <li>Fail to complete payment obligations</li>
          <li>Engage in abusive behaviour</li>
        </ul>
      </>
    ),
  },
  {
    icon: FileText,
    title: "13. Updates to these Terms",
    content: (
      <p>
        MentorSala may revise these Terms periodically. Updated Terms become
        effective immediately upon publication. Continued use of the platform
        indicates acceptance of the revised Terms.
      </p>
    ),
  },
  {
    icon: Gavel,
    title: "14. Governing Law",
    content: (
      <p>
        These Terms are governed by the laws of India. Any disputes shall fall
        under the exclusive jurisdiction of the competent courts where
        MentorSala's registered office is located.
      </p>
    ),
  },
];

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <AboutNavbar />
      
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">

        {/* Hero Header */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1 text-xs font-semibold text-indigo-600 tracking-wide uppercase">
            Legal Agreement
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Terms & Conditions
          </h1>

     

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 font-medium">
            These Terms & Conditions govern your access to MentorSala,
            including our website, mentorship services, AI-powered learning
            tools, mock tests, analytics and educational resources.
          </p>

        </div>

        {/* Sections Grid */}

        <div className="mt-12 sm:mt-16 space-y-6">

          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <div
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

              </div>
            );
          })}

        </div>

        {/* Contact Us Card */}

        <div className="mt-12 sm:mt-16 rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50/60 via-white to-blue-50/40 p-8 sm:p-10 text-center shadow-xs">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20 mb-5">
            <Mail className="h-6 w-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Contact Us
          </h2>

          <p className="mt-3 max-w-xl mx-auto text-sm sm:text-base text-slate-600 font-medium">
            If you have any questions regarding these Terms & Conditions,
            please contact our support team.
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

        </div>

      </div>

    </div>
  );
}