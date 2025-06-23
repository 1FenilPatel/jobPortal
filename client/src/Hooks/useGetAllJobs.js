import { JOB_API_END_POINT } from "@/components/Apis";
import { setAllJobs } from "@/Redux/jobSlice";
import axiosInstance from "@/Utils/axiosInstance";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchAllJobs = async () => {
      if (!user) return; // ✅ Conditional logic inside useEffect

      try {
        const res = await axiosInstance.get(`${JOB_API_END_POINT}/getAllJobs`, {
          // withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
          console.log(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllJobs();
  }, [user, dispatch]); // ✅ add dependencies
};

export default useGetAllJobs;
