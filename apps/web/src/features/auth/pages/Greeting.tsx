import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

export default function Greeting() {
  const navigate = useNavigate();

  const fullText = "Hello, Welcome to MentorSala";
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // ==================================================
  // TYPEWRITER / CURSIVE SCRIPT WRITING EFFECT
  // ==================================================
  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsTypingComplete(true);
      }
    }, 75); // Speed of cursive letter formation

    return () => clearInterval(interval);
  }, []);

  // ==================================================
  // REDIRECT UPON COMPLETION
  // ==================================================
  useEffect(() => {
    if (!isTypingComplete) return;

    // Smooth pause after writing finishes so the user can read the greeting
    const redirectTimer = setTimeout(() => {
      navigate("/student/dashboard", { replace: true });
    }, 5000);

    return () => clearTimeout(redirectTimer);
  }, [isTypingComplete, navigate]);

  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col items-center justify-center px-4 sm:px-8 select-none overflow-hidden">
      {/* Import elegant cursive calligraphy font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

        .font-cursive-calligraphy {
          font-family: 'Great Vibes', cursive;
        }

        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .animate-blink-cursor {
          animation: cursorBlink 0.8s ease-in-out infinite;
        }

        @keyframes gentleGlow {
          0%, 100% { transform: scale(1); opacity: 0.35; }
          50% { transform: scale(1.08); opacity: 0.55; }
        }

        .animate-ambient-glow {
          animation: gentleGlow 4s ease-in-out infinite;
        }
      `}</style>

      {/* Ambient background glows matching light/purple/blue palette */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] md:w-[750px] h-[340px] sm:h-[450px] bg-gradient-to-tr from-purple-200/40 via-indigo-100/35 to-blue-100/30 rounded-full blur-[100px] sm:blur-[140px] animate-ambient-glow" />

      <div className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center justify-center">
        {/* Top subtle badge */}
        <div
          className={`inline-flex items-center gap-2 rounded-full border border-purple-200/80 bg-purple-50/70 px-4 py-1.5 text-xs sm:text-sm font-semibold text-purple-700 shadow-xs mb-4 sm:mb-6 transition-all duration-700 ${
            displayedText.length > 5 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          <span>Setting up your personalized workspace</span>
        </div>

        {/* Central Animated Cursive Headline with Black, Purple, and Blue Blend */}
        <div className="min-h-[100px] sm:min-h-[140px] md:min-h-[170px] flex items-center justify-center">
          <h1 className="font-cursive-calligraphy text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide leading-tight drop-shadow-sm">
            <span className="bg-gradient-to-r from-slate-950 via-purple-700 to-blue-600 bg-clip-text text-transparent">
              {displayedText}
            </span>

            {/* Writing Nib / Cursor with purple-to-blue gradient accent */}
            <span
              className={`inline-block ml-1 sm:ml-2 font-sans font-thin text-purple-600 text-3xl sm:text-5xl md:text-6xl align-baseline ${
                isTypingComplete ? "opacity-0 transition-opacity duration-300" : "animate-blink-cursor"
              }`}
            >
              |
            </span>
          </h1>
        </div>

        {/* Progress feedback bar shown as the writing finishes */}
        <div
          className={`mt-6 sm:mt-10 flex flex-col items-center gap-2 transition-all duration-700 ${
            isTypingComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <div className="h-1.5 w-36 sm:w-48 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-slate-900 via-purple-600 to-blue-600 animate-[pulse_1.2s_ease-in-out_infinite]" />
          </div>
          <p className="text-[11px] sm:text-xs font-semibold text-slate-500">
            Entering Dashboard...
          </p>
        </div>
      </div>
    </div>
  );
}