import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2 } from "lucide-react";
import useCompanyById from "@/Hooks/useCompanyById";
import { setLoading } from "@/Redux/authSlice";
import { COMPANY_API_END_POINT } from "@/components/Apis";
import { setSingleCompany } from "@/Redux/companySlice";
import { store } from "@/Redux/store";
import axiosInstance from "@/Utils/axiosInstance";

const CompanySetUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  const {singleCompany} = useSelector(store=>store.company);
  const params = useParams();
  useCompanyById(params.id);

  const [input,setInput] = useState({
    name:"",
    description: "",
    website: "",
    location: "",
    profilePhoto: null,
  });

  const handleOnChange = (e)=>{
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, profilePhoto: file });
    }
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("name",input.name);
    formdata.append("description",input.description);
    formdata.append("website",input.website);
    formdata.append("location",input.location);
    if (input.profilePhoto) {
        formdata.append("profilePhoto", input.profilePhoto);
    }
    if (!input.profilePhoto) {
      toast.error("Please upload a logo.");
      return;
    }

    try {
        dispatch(setLoading(true));
        const res = await axiosInstance.put(`${COMPANY_API_END_POINT}/update/${params.id}`,formdata,{
            headers:{
                'Content-Type':'multipart/form-data'
            },withCredentials:true,
        });
        if(res.data.success){
            toast.success(res.data.message);
            navigate("/admin/companies");
        }
    } catch (error) {   
        console.log(error);
        toast.error(error?.response?.data?.message);
    }finally{
        dispatch(setLoading(false));
    }
  }

  useEffect(()=>{
    setInput({
        name:singleCompany.name || "",
        description:singleCompany.description || "",
        website:singleCompany.website || "",
        location:singleCompany.website || "",
        profilePhoto:singleCompany.profilePhoto || null,
    })
  },[singleCompany]);

  return (
    <motion.div
      className="max-w-2xl mx-auto my-10 p-6 bg-white/30 backdrop-blur-lg shadow-lg rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-center text-4xl font-bold text-gradient pb-6">Update Company</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            onClick={() => navigate("/admin/companies")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft /> Back
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Company Name", name: "name" },
            { label: "Description", name: "description" },
            { label: "Website", name: "website" },
            { label: "Location", name: "location" },
          ].map(({ label, name }) => (
            <div key={name}>
              <Label>{label}</Label>
              <Input type="text" name={name} value={input[name]} onChange={handleOnChange} required />
            </div>
          ))}
          <div>
            <Label>Logo</Label>
            <Input type="file" name="profilePhoto" accept="image/*" onChange={changeFileHandler} required />
          </div>
        </div>
        <motion.div whileHover={{ scale: 1.02 }}>
          <Button type="submit" className="w-full mt-4 flex items-center justify-center gap-2">
            {loading ? <Loader2 className="animate-spin" /> : "Update Company"}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default CompanySetUp;
