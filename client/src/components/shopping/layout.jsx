import React from "react";
import { Outlet } from "react-router-dom";
import ShoppingHeader from "./ShoppingHeader";

const ShoppingLayout = () => {
  return (
    <div className="flex flex-col bg-white w-screen h-auto overflow-hidden">
      <ShoppingHeader />
      <main className="flex flex-col bg-slate-600 w-full h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default ShoppingLayout;
