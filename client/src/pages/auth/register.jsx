import Form from "@/components/common/Form";
import { registerFormControls } from "@/config";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "@/store/authSlice/index.js";
import { Button } from "@/components/ui/button";

const initialState = {
  username: "",
  email: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    dispatch(registerUser(formData)).then((data) => {
      console.log(data);

      if (data?.payload.success) {
        navigate("/auth/login");
      }
    });
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-blue-100 rounded-lg mx-auto w-full h-full max-w-lg space-y-6 p-4">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
          Create a new account
        </h1>
        <p className="mt-2">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-orange-600 hover:underline font-bold"
          >
            Login
          </Link>
        </p>
      </div>
      <Form
        formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        buttonText="Create Account"
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

export default Register;
