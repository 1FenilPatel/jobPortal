import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import UpdateProfile from "@/components/UpdateProfile";
import useGetAllAppliedJobs from "@/Hooks/useGetAllAppliedJobs";
import { store } from "@/Redux/store";
import { Mail, MapPin, Pen, Contact2, Phone, } from "lucide-react";
import { FaHandHoldingDollar } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/components/Apis";
import { setUser } from "@/Redux/authSlice";
import axiosInstance from "@/Utils/axiosInstance";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const textVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const Profile = () => {
  const { user, MyprofilePhoto } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  useGetAllAppliedJobs();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(()=>{
    if(user?.role === "provider" && token){
      const fetchUser = async()=>{
        try {
          const res = await axiosInstance.get(`${USER_API_END_POINT}/getuser`,{
            headers:{Authorization: `Bearer ${token}`},
            // withCredentials:true
          });
          if(res.data.success){
              dispatch(setUser(res.data.user));
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    }
  },[token]);

  // useEffect(() => {
  //   console.log("Profile photo from Redux: ", MyprofilePhoto);
  // }, [MyprofilePhoto]);

  return (
    <>
      <motion.div
        className="max-w-4xl mx-auto my-10 p-8 bg-white shadow-xl rounded-2xl border border-gray-300"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={fadeIn}
      >
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between pb-6 border-b"
          variants={fadeIn}
        >
          <motion.div className="flex items-center gap-6" variants={fadeIn}>
            <Avatar className="h-28 w-28 shadow-lg">
              <AvatarImage
                src={user?.profile?.profilePhoto || MyprofilePhoto || "/user_avatar.png"}
                alt="Profile"
              />
            </Avatar>
            <motion.div variants={textVariant}>
              <h1 className="text-3xl font-bold text-gray-900">
                {user?.fullname}
              </h1>
              <p className="text-gray-600 mt-1">
                {user?.profile?.bio || "No bio available"}
              </p>
            </motion.div>
          </motion.div>
          <Button
            onClick={() => setOpen(true)}
            variant="blue"
            className="mt-4 md:mt-0"
          >
            <Pen className="mr-2" /> Edit Profile
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <motion.div variants={fadeIn}>
            <h2 className="text-xl font-semibold text-gray-900">
              Personal Details
            </h2>
            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="text-blue-600" />{" "}
                {user?.email || "Not provided"}
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="text-green-600" />{" "}
                {user?.phoneNumber || "Not provided"}
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="text-green-600" />{" "}
                {user?.location || "Not provided"}
              </div>
            </div>
          </motion.div>

          {user?.role === "user" && (
            <motion.div variants={fadeIn}>
              <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {user?.profile?.skills?.length ? (
                  user.profile.skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      className="px-3 py-1 bg-gray-200 text-gray-900 rounded-full text-sm font-medium shadow"
                      variants={fadeIn}
                    >
                      {skill}
                    </motion.span>
                  ))
                ) : (
                  <span className="text-gray-500">No skills added</span>
                )}
              </div>
            </motion.div>
          )}
          {user?.role === "provider" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Provider Details</h2>
              <div className="flex items-center gap-3 text-gray-700">
                <FaHandHoldingDollar className="text-purple-600" size={20} />
                GST NO: {user?.gstno || "N/A"}
              </div>

              <h3 className="mt-6 text-lg font-semibold text-gray-800">Access Provider Panel</h3>
              {user?.isApproved ? (
                <Button className="mt-3 bg-green-600 hover:bg-green-700 text-white">
                  <Link to="/admin/companies">Go to Dashboard</Link>
                </Button>
              ) : (
                <p className="text-sm mt-3 text-red-600 font-medium">
                  * Your profile is pending admin approval. Access is restricted.
                </p>
              )}
            </div>
          )}        
        </div>

        {user?.role === "user" && (
          <motion.div className="mt-6" variants={fadeIn}>
            <h2 className="text-xl font-semibold text-gray-900">Resume</h2>
            <div className="mt-3">
              {user?.profile?.resume ? (
                <a
                  href={user?.profile?.resume}
                  className="text-blue-600 hover:underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user?.profile?.resumeOriginalName || "Download Resume"}
                </a>
              ) : (
                <span className="text-gray-500">No resume uploaded</span>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>

      <UpdateProfile open={open} setOpen={setOpen} />
    </>
  );
};

export default Profile;
