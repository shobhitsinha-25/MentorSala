import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import { useLayoutStore } from "../store/layout.store";

export default function DashboardLayout() {
  const { collapsed } = useLayoutStore();

  return (
    <div className="w-screen h-screen bg-[#020617] flex overflow-hidden relative">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        className={`
          flex-1
          flex
          flex-col
          min-w-0
          h-full
          overflow-hidden
          transition-all
          duration-300
          ease-in-out
          ${collapsed ? "ml-0" : "ml-0"}
        `}
      >
        <main className="flex-1 overflow-y-auto custom-page-scroll px-6 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}