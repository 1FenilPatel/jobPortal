import { USER_API_END_POINT } from "@/components/Apis";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setLoading } from "@/Redux/authSlice";
import { store } from "@/Redux/store";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import axiosInstance from "@/Utils/axiosInstance";

const SignUpPage = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    profilePhoto: null,
  });

  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      const phoneValue = value.replace(/\D/g, "").slice(0, 10);
      setInput((prev) => ({ ...prev, phoneNumber: phoneValue }));
    } else {
      setInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file && file.size > 2 * 1024 * 1024) {
      toast.error("Profile photo must be less than 2MB");
      return;
    }
    setInput((prev) => ({ ...prev, profilePhoto: file }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!emailRegex.test(input.email)) {
      toast.error("Invalid email format");
      return;
    }
    if (input.phoneNumber.length !== 10) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        // withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Sign-up failed.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white border border-gray-300 shadow-xl rounded-2xl p-6 transition-all duration-300"
      >
        <div className="flex flex-col items-center">
          <MdAccountCircle className="text-6xl text-black" />
          <h1 className="font-extrabold text-2xl text-black">Sign Up</h1>
          <p className="text-gray-600 text-sm mt-1">Create a new account</p>
        </div>

        <div className="mb-2">
          <Label className="text-black font-semibold">Fullname</Label>
          <Input
            type="text"
            name="fullname"
            value={input.fullname}
            onChange={changeEventHandler}
            placeholder="John Doe"
            className="mt-2"
            required
          />
        </div>

        <div className="mb-2">
          <Label className="text-black font-semibold">Email</Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            placeholder="abc@example.com"
            className="mt-2"
            required
          />
        </div>

        <div className="mb-2">
          <Label className="text-black font-semibold">Phone Number</Label>
          <Input
            type="text"
            name="phoneNumber"
            value={input.phoneNumber}
            onChange={changeEventHandler}
            placeholder="10-digit phone number"
            maxLength={10}
            className="mt-2"
            required
          />
        </div>

        <div className="mb-2">
          <Label className="text-black font-semibold">Password</Label>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            placeholder="••••••••"
            className="mt-2"
            required
          />
        </div>

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

        <div className="mb-2">
          <Label className="text-black font-semibold">Profile Photo</Label>
          <input
            accept="image/*"
            type="file"
            name="profilePhoto"
            onChange={changeFileHandler}
            className="mt-2 ml-2 text-black file:text-sm file:border-0 file:px-3 file:py-1.5 file:bg-blue-500 file:text-black file:rounded-md cursor-pointer"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Sign Up"
          )}
        </Button>

        <p className="text-center mt-4 text-sm text-gray-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline transition-all"
          >
            Log In
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default SignUpPage;
