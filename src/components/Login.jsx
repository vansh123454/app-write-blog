import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { Button, Input, Logo } from "./index";
import authService from "../appwriteServices/auth";
import { useForm } from "react-hook-form";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm(); 
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
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
        <h2>Sign into your account</h2>
        <p>
          Don't have any account
          <Link to="/signup" className="">
            Sign up
          </Link>
        </p>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)}>
          <div>
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Email must be valid",
                },
              })}
            />

            <Input
            label = "Password"
            type = "password"
            placeholder = "Enter your Password"
            {...register("password",{
              required: true,
            })}
             />

             <Button
             type="sumbit"
             className="w-full cursor-pointer"
             >
              Sign In
             </Button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
