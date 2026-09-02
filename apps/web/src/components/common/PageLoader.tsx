import mentorsalalog from "../../assets/logo1.png";

export default function PageLoader() {
  return (
    <div 
      role="status" 
      aria-label="Loading"
      className="fixed inset-0 z-50 flex min-h-screen w-full items-center justify-center bg-[#020617] antialiased select-none"
    >
      <div className="relative flex items-center justify-center">
        {/* Soft Ambient Purple Glow */}
        <div className="absolute -inset-6 rounded-full bg-purple-600/30 blur-2xl animate-pulse" />

        {/* Static Background Track Ring */}
        <div className="absolute -inset-2 rounded-full border-2 border-purple-500/15" />

        {/* Outer Pulsing Glow Wave */}
        <div className="absolute -inset-3 rounded-full border border-purple-500/20 animate-ping [animation-duration:3s]" />

        {/* Primary Circular Spinning Ring */}
        <div 
          className="absolute -inset-2 rounded-full border-2 border-transparent border-t-purple-500 border-r-purple-400 animate-spin" 
          style={{ animationDuration: '1s' }} 
        />

        {/* Inner Counter-Spinning Subtle Accent Ring */}
        <div 
          className="absolute -inset-0.5 rounded-full border border-dashed border-purple-400/30 animate-spin" 
          style={{ animationDuration: '6s', animationDirection: 'reverse' }} 
        />

        {/* Circular Glassmorphic Core */}
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-slate-900/90 shadow-2xl backdrop-blur-md shadow-purple-950/60 p-3">
          <div className="absolute inset-0 rounded-full bg-purple-500/10" />

          {/* Mentorsala Logo */}
          <img 
            src={mentorsalalog} 
            alt="MentorSala Loading" 
            className="relative h-full w-full object-contain drop-shadow-[0_0_12px_rgba(168,85,247,0.7)] animate-pulse"
          />
        </div>
      </div>
    </div>
  );
}