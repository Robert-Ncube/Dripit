import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="flex min-h-screen w-screen">
      <AdminSidebar open={openMenu} setOpen={setOpenMenu} />
      <div className="flex flex-1 flex-col">
        <AdminHeader setOpen={setOpenMenu} />
        <main className="flex flex-col flex-1 w-full bg-muted/90 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
