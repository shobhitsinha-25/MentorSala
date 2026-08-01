import { Briefcase, Clock3 } from "lucide-react";
import AboutNavbar from "../About/AboutNavbar";

const Careers = () => {
  return (
    /* 1. Standard block wrapper (matching HelpCenter layout structure) */
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* 2. Full-width sticky/top navbar */}
      <AboutNavbar />

      {/* 3. Centered main content container */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-lg">
          <div className="rounded-3xl bg-white border border-slate-200/80 shadow-2xs p-8 sm:p-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
              <Briefcase className="h-8 w-8" />
            </div>

            <h1 className="mt-6 text-3xl font-bold text-slate-900">
              Careers
            </h1>

            <p className="mt-3 text-slate-600 leading-relaxed text-sm sm:text-base">
              Thank you for your interest in joining the MentorSala team.
            </p>

            <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
              <div className="flex items-center justify-center gap-2 text-amber-700">
                <Clock3 className="h-5 w-5 shrink-0" />
                <span className="font-semibold text-sm sm:text-base">
                  Currently, there are no open positions.
                </span>
              </div>

              <p className="mt-3 text-xs sm:text-sm text-amber-800/90 leading-relaxed">
                We're not hiring at the moment, but we're always growing. Please
                check back later for future opportunities.
              </p>
            </div>

            <p className="mt-8 text-xs sm:text-sm text-slate-500">
              We appreciate your interest in being a part of MentorSala.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Careers;