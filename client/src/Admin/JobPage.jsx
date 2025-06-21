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
  Briefcase,
  BriefcaseBusiness,
  Calendar,
  Eye,
  IndianRupee,
  Lightbulb,
  MapPinIcon,
  User2,
} from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { toast } from "sonner";
import { motion } from "framer-motion";

const JobPage = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/getjobById/${jobId}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));

          const isAlreadyAppliedJob = res.data.job.applications.some(
            (application) => application.applicant === user?._id
          );
          dispatch(setIsApplied(isAlreadyAppliedJob));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch]);

  return (
    // <div className="flex flex-col gap-8">
    //   <div className="flex flex-col gap-6 md:flex-row justify-between items-center">
    //     <div>
    //     <h1 className="flex flex-col gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">
    //       {singleJob?.title}
    //     </h1>
    //     <p className="flex gap-2"> <MapPinIcon size={20} />
    //     {singleJob?.location}</p>
    //     </div>
    //     <img
    //       src={singleJob?.company?.logo}
    //       alt="job Title"
    //       className="w-52 h-auto"
    //     />
    //   </div>
    //   <div>
    //     <h2 className="text-2xl sm:text-3xl font-semibold">
    //       Company Information
    //     </h2>
    //     <p className="mt-3">{singleJob?.company?.description}</p>
    //   </div>
    //   <div>
    //     <h2 className="text-2xl sm:text-3xl font-semibold">About the job</h2>
    //     <p className="mt-3">{singleJob?.description}</p>
    //   </div>
    //   <div>
    //     <h2 className="text-2xl sm:text-3xl font-semibold">
    //       What we are looking for
    //     </h2>
    //     <p className="mt-3">
    //       $
    //       {`We seek passionate, skilled professionals with expertise in their field. Strong technical abilities, creativity, and a collaborative mindset are key. Proficiency relevant tools and a commitment to continuous learning and high-quality work are essential. If youre ready to tackle challenges  a dynamic environment, we’d love to hear from you.`}
    //     </p>
    //   </div>
    //   <h2 className="text-2xl sm:text-3xl font-bold ">
    //     Some Other Information
    //   </h2>
    //   <Card>
    //     <CardHeader className="text-green-500">
    //       Essensial Information
    //     </CardHeader>
    //     <CardContent className="flex gap-28">
    //       <div className="flex sm:flex-col gap-2">
    //         <p className="flex gap-2">
    //           {" "}
    //           <BriefcaseBusiness /> Experiance : {
    //             singleJob?.experiance
    //           } year{" "}
    //         </p>
    //         <p className="flex gap-2">
    //           {" "}
    //           <IndianRupee /> Salary : {singleJob?.salary} LPA
    //         </p>
    //         <p className="flex gap-2">
    //           {" "}
    //           <User2 /> Total Applicants : {singleJob?.applications?.length}
    //         </p>
    //         <p className="flex gap-2">
    //           {" "}
    //           <Calendar /> Posted Date : {singleJob?.createdAt?.split("T")[0]}
    //         </p>
    //       </div>
    //       <div className="flex flex-col gap-2">
    //         <p className="flex gap-2">
    //           <Briefcase /> JobType : {singleJob?.jobType}
    //         </p>
    //         <p className="flex gap-2">
    //           <Eye /> Position : {singleJob?.position}
    //         </p>
    //         <p className="flex gap-2">
    //           <Lightbulb /> Required skills :{" "}
    //           {Array.isArray(singleJob?.requirement) &&
    //           singleJob?.requirement.length > 0
    //             ? singleJob?.requirement.map((skill, index) => (
    //                 <span key={index}>
    //                   {skill.trim()}
    //                   {index < singleJob?.requirement.length - 1 && ", "}
    //                 </span>
    //               ))
    //             : "No skills listed"}
    //         </p>
    //       </div>
    //     </CardContent>
    //     <CardFooter>
    //       <p className="text-red-400 font-semibold">
    //         "Applicants must meet the following requirements to be eligible to
    //         apply for the job. Please ensure you carefully review all criteria
    //         before submitting your application."
    //       </p>
    //     </CardFooter>
    //   </Card>
    //   <ApplyJobDrawer />
    // </div>
    <motion.div 
    className="flex flex-col gap-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div 
      className="flex flex-col gap-6 md:flex-row justify-between items-center"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div>
        <h1 className="flex flex-col gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">
          {singleJob?.title}
        </h1>
        <p className="flex gap-2"> <MapPinIcon size={20} />
        {singleJob?.location}</p>
      </div>
      <motion.img
        src={singleJob?.company?.logo}
        alt="job Title"
        className="w-52 h-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
      />
    </motion.div>

    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.3 }}
    >
      <h2 className="text-2xl sm:text-3xl font-semibold">
        Company Information
      </h2>
      <p className="mt-3">{singleJob?.company?.description}</p>
    </motion.div>

    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.5 }}
    >
      <h2 className="text-2xl sm:text-3xl font-semibold">About the job</h2>
      <p className="mt-3">{singleJob?.description}</p>
    </motion.div>

    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.7 }}
    >
      <h2 className="text-2xl sm:text-3xl font-semibold">
        What we are looking for
      </h2>
      <p className="mt-3">
        We seek passionate, skilled professionals with expertise in their field. Strong technical abilities, creativity, and a collaborative mindset are key. Proficiency in relevant tools and a commitment to continuous learning and high-quality work are essential. If you're ready to tackle challenges in a dynamic environment, we’d love to hear from you.
      </p>
    </motion.div>

    <h2 className="text-2xl sm:text-3xl font-bold ">
      Some Other Information
    </h2>
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.9 }}
    >
      <Card>
        <CardHeader className="text-green-500">
          Essential Information
        </CardHeader>
        <CardContent className="flex gap-28">
          <div className="flex sm:flex-col gap-2">
            <p className="flex gap-2"><BriefcaseBusiness /> Experience : {singleJob?.experiance} year</p>
            <p className="flex gap-2"><IndianRupee /> Salary : {singleJob?.salary} LPA</p>
            <p className="flex gap-2"><User2 /> Total Applicants : {singleJob?.applications?.length}</p>
            <p className="flex gap-2"><Calendar /> Posted Date : {singleJob?.createdAt?.split("T")[0]}</p>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-red-400 font-semibold">
            "Applicants must meet the following requirements to be eligible to apply for the job. Please ensure you carefully review all criteria before submitting your application."
          </p>
        </CardFooter>
      </Card>
    </motion.div>
    <ApplyJobDrawer />
  </motion.div>
  );
};

export default JobPage;
