import { APPLICATION_API_END_POINT } from "@/components/Apis";
import { setAllAppliedJobs } from "@/Redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAppliedJobs = ()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllAppliedJob = async()=>{
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/getappliedjobs`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application));
                }    
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAppliedJob();
    },[])
}
export default useGetAllAppliedJobs;