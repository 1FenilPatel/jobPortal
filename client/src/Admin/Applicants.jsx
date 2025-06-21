import React, { useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/Redux/store";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/components/Apis";
import { setAllApplicants } from "@/Redux/applicationSlice";

const Applicants = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const {applicants} = useSelector(store=>store.application);

  useEffect(()=>{
    const fetchAllApplicants = async()=>{
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/getApplicants`,{withCredentials:true});
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllApplicants();
  },[])

  return (
    <div className="mx-auto">
      <h1 className="gradient-title font-extrabold text-4xl sm:text-3xl text-center pb-8">
        No of Applicants on {applicants?.title} role
      </h1>
      <Button
        onClick={() => navigate("/admin/job")}
        variant="blue"
        className="flex mb-6 items-center gap-2font-semibold"
      >
      <ArrowLeft />
      <span>Back</span>
      </Button>
      <ApplicantsTable />
    </div>
  );
};

export default Applicants;
