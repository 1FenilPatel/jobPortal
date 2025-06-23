import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarImage } from "./ui/avatar";
import { BriefcaseBusiness, LogOut, Save, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/Redux/store";
import axios from "axios";
import { USER_API_END_POINT } from "./Apis";
import { toast } from "sonner";
import { clearUser } from "@/Redux/authSlice";
import { persistStore } from "redux-persist";
import { motion } from "framer-motion";
import { clearSavedJobs } from "@/Redux/savedJobSlice";
import axiosInstance from "@/Utils/axiosInstance";

const Header = () => {
  const { user, isAdmin, MyprofilePhoto } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("role : ", user?.role);

  useEffect(() => {
    console.log("User changed:", user);
  }, [user]);

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.get(`${USER_API_END_POINT}/logout`, {
        // withCredentials: true,
      });
      if (res.data.success) {
        dispatch(clearUser());
        dispatch(clearSavedJobs());
        localStorage.removeItem("token");
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <motion.nav
        className="py-4 flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to={isAdmin ? "/admin/companies" : "/"}>
          <motion.img
            src="/logo.png"
            className="h-20"
            alt="Logo"
            whileHover={{ scale: 1.1 }}
          />
        </Link>

        <div className="flex items-center gap-5">
          {!user ? (
            <div className="flex gap-2">
              <Link to="/signup">
                <Button variant="outline">SignUp</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
            </div>
          ) : (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Avatar className="w-12 h-auto cursor-pointer">
                    <AvatarImage
                      className="rounded-full"
                      src={
                        isAdmin
                          ? "/admin_avatar.jpg"
                          : MyprofilePhoto || "/user_avatar.png"
                      }
                    />
                  </Avatar>
                </motion.div>
              </PopoverTrigger>
              <PopoverContent className="mt-2 rounded-xl mr-10 shadow-lg w-56 bg-gray-50 border border-gray-200">
                <div className="flex flex-col items-center py-3 px-4">
                  <h4 className="font-semibold text-gray-800">
                    {user?.fullname}
                  </h4>
                  <p className="text-sm text-gray-500">{user?.role}</p>
                </div>

                <hr className="border-gray-200" />

                {(user?.role === "user" || user?.role === "provider") && (
                  <motion.div
                    className="flex flex-col"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-300 rounded-md cursor-pointer transition"
                      onClick={() => setOpen(false)}
                    >
                      <User2 className="text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">
                        View Profile
                      </span>
                    </Link>

                    {user?.role === "user" && (
                      <div>
                        <Link
                          to="/saved-job"
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-300 rounded-md cursor-pointer transition"
                          onClick={() => setOpen(false)}
                        >
                          <Save className="text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">
                            Saved Jobs
                          </span>
                        </Link>

                        <Link
                          to="/allApplied-jobs"
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-300 rounded-md cursor-pointer transition"
                          onClick={() => setOpen(false)}
                        >
                          <BriefcaseBusiness className="text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">
                            All Applied Jobs
                          </span>
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}

                <hr className="border-gray-200" />

                <motion.div
                  className="flex justify-center py-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <Button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    variant="destructive"
                    className="w-full flex items-center gap-2"
                  >
                    <LogOut />
                    Logout
                  </Button>
                </motion.div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </motion.nav>
    </>
  );
};

export default Header;
