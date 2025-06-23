import { JOB_API_END_POINT } from "@/components/Apis";
import { setAllAdminJobs } from "@/Redux/jobSlice";
import axiosInstance from "@/Utils/axiosInstance";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = ()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllAdminJobs = async()=>{
            try {
                const res = await axiosInstance.get(`${JOB_API_END_POINT}/getAdminJobs`,
                    // {withCredentials:true}
                );
                console.log("Call");
                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs));
                    console.log(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobs();
    },[])
}
export default useGetAllAdminJobs;