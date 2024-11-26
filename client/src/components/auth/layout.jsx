import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const AuthLayout = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen w-screen">
      <div className="hidden md:flex items-center justify-center bg-black w-full max-w-sm px-12">
        <div className="w-full space-y-6 text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Drip<span className="text-orange-600">IT</span>
          </h1>
          <p className="text-sm text-gray-600">
            Sign in to your account or create a new one!
          </p>
          <p className="text-sm text-orange-600">Enhance your drip style!</p>
          <Button
            className="bg-orange-600 text-white font-semibold"
            onClick={() => {
              navigate("/");
            }}
          >
            Explore
          </Button>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
