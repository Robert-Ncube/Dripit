import React from "react";
import { Button } from "../ui/button";
import { IoMdMenu } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/authSlice";

const AdminHeader = ({ setOpen }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-bottom">
      <Button title="menu" onClick={() => setOpen(true)} className="lg:hidden">
        <IoMdMenu size={30} />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="flex flex-1 justify-end">
        <Button
          title="logout"
          onClick={handleLogout}
          className="text-white hover:text-orange-600 hover:bg-inherit hover:border-orange-600"
        >
          Log Out
          <IoIosLogOut size={30} className="ml-2" />
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
