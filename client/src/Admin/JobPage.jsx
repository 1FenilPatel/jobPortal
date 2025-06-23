import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "@/components/Apis";
import ApplyJobDrawer from "@/components/ApplyJobDrawer";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { setIsApplied, setSingleJob } from "@/Redux/jobSlice";
import { store } from "@/Redux/store";
import axios from "axios";
import {
  BriefcaseBusiness,
  Calendar,
  IndianRupee,
  MapPinIcon,
  User2,
} from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance from "@/Utils/axiosInstance";

const JobPage = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { id: jobId } = useParams();

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axiosInstance.get(`${JOB_API_END_POINT}/getjobById/${jobId}`);
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          const isAlreadyAppliedJob = res.data.job.applications.some(
            (application) => application.applicant === user?._id
          );
          dispatch(setIsApplied(isAlreadyAppliedJob));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch]);

  return (
    <motion.div 
      className="flex flex-col gap-8 px-4 md:px-8 py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div 
        className="flex flex-col gap-6 md:flex-row justify-between items-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center md:text-left max-w-full break-words">
          <h1 className="gradient-title font-extrabold pb-3 text-3xl sm:text-5xl break-words">
            {singleJob?.title}
          </h1>
          <p className="flex items-center justify-center md:justify-start gap-2 text-gray-600 text-sm">
            <MapPinIcon size={18} />
            {singleJob?.location}
          </p>
        </div>
        <motion.img
          src={singleJob?.company?.logo}
          alt="Company Logo"
          className="w-36 sm:w-52 h-auto object-contain"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
        />
      </motion.div>

      {/* Company Info */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">Company Information</h2>
        <p className="text-gray-700">{singleJob?.company?.description}</p>
      </motion.div>

      {/* Job Description */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">About the job</h2>
        <p className="text-gray-700">{singleJob?.description}</p>
      </motion.div>

      {/* What We're Looking For */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">What we are looking for</h2>
        <p className="text-gray-700">
          We seek passionate, skilled professionals with expertise in their field. Strong technical abilities, creativity, and a collaborative mindset are key. Proficiency in relevant tools and a commitment to continuous learning and high-quality work are essential. If you're ready to tackle challenges in a dynamic environment, we’d love to hear from you.
        </p>
      </motion.div>

      {/* Additional Info */}
      <h2 className="text-xl sm:text-2xl font-bold">Some Other Information</h2>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.9 }}
      >
        <Card>
          <CardHeader className="text-green-500 text-lg font-bold">Essential Information</CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-y-4 gap-x-12">
            <div className="flex flex-col gap-2 text-sm sm:text-base">
              <p className="flex items-center gap-2"><BriefcaseBusiness size={18} /> Experience: {singleJob?.experiance} year</p>
              <p className="flex items-center gap-2"><IndianRupee size={18} /> Salary: {singleJob?.salary} LPA</p>
              <p className="flex items-center gap-2"><User2 size={18} /> Total Applicants: {singleJob?.applications?.length}</p>
              <p className="flex items-center gap-2"><Calendar size={18} /> Posted Date: {singleJob?.createdAt?.split("T")[0]}</p>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-red-500 font-medium text-sm">
              "Applicants must meet the following requirements to be eligible to apply for the job. Please ensure you carefully review all criteria before submitting your application."
            </p>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Apply Job Drawer */}
      <ApplyJobDrawer />
    </motion.div>
  );
};

export default JobPage;
