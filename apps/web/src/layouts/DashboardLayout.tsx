import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import { useLayoutStore } from "../store/layout.store";

export default function DashboardLayout() {
  const { collapsed } = useLayoutStore();

  return (
    <div className="w-screen h-screen bg-[#020617] flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Side / Main Area */}
      <div className="flex-1 min-w-0 h-screen flex flex-col overflow-hidden bg-white">
        <main className="flex-1 min-h-0 w-full overflow-y-auto custom-page-scroll px-6 py-6 bg-white text-slate-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}