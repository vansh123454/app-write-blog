import React, { useState } from "react";
import authService from "../appwriteServices/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";  
import { useForm } from "react-hook-form";

function Signup() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const signup = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData)); 
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div>
        <div>
          <span>
            <Logo />
          </span>
        </div>
        <h2>Sign up to create account</h2>
        <p>
          Already have an account
          <Link to="/login">Sign in</Link>
        </p>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit(signup)}>
          <Input
            label="Full name"
            placeholder="Enter your name"
            {...register("name", {
              required: true,
            })}
          />
          <Input
            label="Email: "
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                  "Email must be valid",
              },
            })}
          />
          <Input
            label="Password"
            placeholder="Enter Your Password"
            type="password"
            {...register("password", {
              required: true,
            })}
          />
          <Button type="submit">Create Account</Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
