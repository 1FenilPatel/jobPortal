import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdAccountCircle } from "react-icons/md";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ADMIN_API_END_POINT, USER_API_END_POINT } from "@/components/Apis";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setProfilePhoto, setUser } from "@/Redux/authSlice";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import axiosInstance from "@/Utils/axiosInstance";

const LoginPage = () => {
  const { user, loading, isAdmin } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: ""
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    if (name === "email" && value.toLowerCase() === "fenil@yahoo.com") {
      setInput({ ...input, [name]: value, role: "admin" });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const handleSubmitChange = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));

      // Admin login
      if (input.role === "admin") {
        const res = await axiosInstance.post(`${ADMIN_API_END_POINT}/admin-login`, {
          email: input.email,
          password: input.password
        }, {
          headers: { 'Content-Type': 'application/json' }
        });

        toast.success(res.data.message);
        dispatch(setUser(res.data.admin));
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", "admin");
        navigate("/superadmin-dashboard");
        return;
      }

      // Role not selected
      if (!input.role) {
        toast.error("Please select role");
        return;
      }

      // User/Provider login
      const res = await axiosInstance.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.newUser));
        dispatch(setProfilePhoto(res.data.user?.profile?.profilePhoto || ""));
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.newUser.role);
        navigate("/");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="mt-5 flex items-center justify-center bg-gradient-to-br via-blue-50 to-blue-100 px-4">
      <motion.form
        onSubmit={handleSubmitChange}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-blue-100"
      >
        <div className="flex flex-col items-center mb-6">
          <MdAccountCircle className="text-6xl text-blue-600" />
          <h1 className="font-extrabold text-2xl text-gray-800 mt-3">Welcome Back</h1>
          <p className="text-gray-500 text-sm mt-1">Log in to your account</p>
        </div>

        <div className="mb-4">
          <Label className="font-semibold text-gray-700">Email</Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            placeholder="you@example.com"
            className="mt-2 transition-all duration-200 hover:border-blue-400 focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <Label className="font-semibold text-gray-700">Password</Label>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            placeholder="••••••••"
            className="mt-2 transition-all duration-200 hover:border-blue-400 focus:border-blue-500"
          />
        </div>

        {input.email !== "fenil@yahoo.com" && (
          <div className="mb-2">
            <Label className="text-black font-semibold">Select Role</Label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-1 text-sm text-gray-800">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={input.role === "user"}
                  onChange={changeEventHandler}
                  required
                />
                User
              </label>
              <label className="flex items-center gap-1 text-sm text-gray-800">
                <input
                  type="radio"
                  name="role"
                  value="provider"
                  checked={input.role === "provider"}
                  onChange={changeEventHandler}
                  required
                />
                Service Provider
              </label>
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white font-semibold py-2 rounded-xl"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Log In"
          )}
        </Button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-semibold hover:underline transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default LoginPage;
