import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

export default function DashboardLayout() {
  return (
    // ✅ FIXED: Using h-screen and overflow-hidden locks the app viewport to the exact screen boundary dimensions
    <div className="w-screen h-screen bg-[#020617] flex overflow-hidden relative">
      
      {/* Sidebar - Remains locked firmly on the left without vertical clipping */}
      <Sidebar />

      {/* Main Content Workspace Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* Page Viewport Area - This handles vertical scrolling for the page dashboard grid separate from the sidebar */}
        <main className="flex-1 overflow-y-auto px-6 py-6 custom-page-scroll">
          <Outlet />
        </main>

      </div>

    </div>
  );
}