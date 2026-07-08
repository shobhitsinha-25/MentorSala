import {
  Outlet,
} from "react-router-dom";

import AdminSidebar
from "../components/admin/AdminSidebar/AdminSidebar";

const AdminLayout = () => {

  return (

    <div className="flex h-screen w-screen bg-slate-950 overflow-hidden">

      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto bg-[#020617]">

        <Outlet />

      </main>

    </div>

  );

};

export default AdminLayout;