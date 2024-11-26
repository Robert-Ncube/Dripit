import Form from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/authSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    dispatch(loginUser(formData)).then((data) => {
      console.log(data);
    });
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-blue-100 rounded-lg mx-auto w-full h-full max-w-lg space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
          Login
        </h2>
        <p className="mt-2">
          {"Don't have an account?"}{" "}
          <Link
            to="/auth/register"
            className="text-orange-600 hover:underline font-bold"
          >
            Sign Up
          </Link>
        </p>
      </div>
      <Form
        formControls={loginFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        buttonText="Login"
      />
      <Button
        className="md:hidden border border-orange-600 font-semibold"
        onClick={() => {
          navigate("/");
        }}
        variant="ghost"
      >
        Explore
      </Button>
    </div>
  );
};

export default Login;
