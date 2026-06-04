import { Outlet } from "react-router-dom";
import MentorSidebar from "../components/mentorSidebar/MentorSidebar";

export default function MentorLayout() {
  return (
    // ✅ FIXED: Theme architecture consolidated into unified production light-grey framework
    <div className="min-h-screen bg-[#020617] text-[#0F172A] flex overflow-hidden select-none">
      
      {/* Decoupled Light-Themed Navigation Sidebar */}
      <MentorSidebar />

      {/* ✅ FIXED: Structural padding buffer added to perfectly clear the 260px fixed width sidebar */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden pl-[260px]">
        
        {/* Dynamic Route View Sub-Tree Renderer Container */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <Outlet />
        </div>

      </main>

    </div>
  );
}