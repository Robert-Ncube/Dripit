import { Button } from "@/components/ui/button";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HomeComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-slate-200 w-screen min-h-screen">
      <div className="flex items-center justify-center gap-2 py-12">
        <h1 className="text-5xl md:text-[6rem] lg:text-[8rem] font-extrabold tracking-tight">
          Drip<span className="text-orange-600">IT</span>
        </h1>
      </div>
      <div className="flex items-center justify-center gap-6">
        <Button
          className=" bg-orange-600 hover:bg-inherit text-white"
          variant="ghost"
          onClick={() => navigate("/auth/login")}
        >
          Login
        </Button>
        <Button
          className="border border-orange-600 hover:bg-orange-600 bg-inherit hover:text-white"
          variant="ghost"
          onClick={() => navigate("/auth/register")}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default HomeComponent;
