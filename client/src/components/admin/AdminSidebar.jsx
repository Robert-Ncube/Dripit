import React, { Fragment } from "react";
import { LuShoppingBag } from "react-icons/lu";
import { MdAdminPanelSettings, MdOutlineDashboard } from "react-icons/md";
import { SiProducthunt } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

export const adminSidebarMenuItems = [
  {
    label: "Dashboard",
    icon: <MdOutlineDashboard />,
    path: "/admin/dashboard",
    id: "dashboard",
  },
  {
    label: "Products",
    icon: <SiProducthunt />,
    path: "/admin/products",
    id: "products",
  },
  {
    label: "Orders",
    icon: <LuShoppingBag />,
    path: "/admin/orders",
    id: "orders",
  },
];

const MenuItems = ({ setOpen }) => {
  const navigate = useNavigate();

  return (
    <nav className="flex flex-col gap-2 mt-8">
      {adminSidebarMenuItems.map((menuItem) => {
        return (
          <div
            key={menuItem.id}
            className={`flex items-center gap-2 cursor-pointer px-3 py-2 hover:text-orange-600 hover:bg-muted rounded-lg ${
              menuItem.isActive ? "bg-foreground text-orange-600" : ""
            }`}
            onClick={() => {
              navigate(menuItem.path);
              setOpen ? setOpen(false) : null;
            }}
          >
            {menuItem.icon}
            <span className="text-lg font-medium">{menuItem.label}</span>
          </div>
        );
      })}
    </nav>
  );
};

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <aside className="hidden lg:flex w-64 flex-col border-r bg-background p-6">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            navigate("/admin/dashboard");
          }}
        >
          <MdAdminPanelSettings size={34} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle>
                <div
                  className="flex items-center gap-2 cursor-pointer mt-8"
                  onClick={() => navigate("/admin/dashboard")}
                >
                  <MdAdminPanelSettings size={34} />
                  <h1 className="text-2xl font-extrabold">Admin Panel</h1>
                </div>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminSidebar;
