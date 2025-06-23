import { JOB_API_END_POINT } from "@/components/Apis";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setLoading } from "@/Redux/authSlice";
import { store } from "@/Redux/store";
import axiosInstance from "@/Utils/axiosInstance";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirement: "",
    salary: "",
    location: "",
    jobType: "",
    position: "",
    experiance: "",
    companyId: "",
  });

  const { allCompanies } = useSelector((store) => store.company);
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectCompanyHandler = (value) => {
    const selectCompany = allCompanies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectCompany._id });
  };

  const submitHanlder = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.post(`${JOB_API_END_POINT}/postJob`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        // withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/job");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-4xl sm:text-5xl text-center pb-8">
        Posting a New Job
      </h1>
      <div className="flex items-center justify-center w-screen my-5">
        <form className="mr-40" onSubmit={submitHanlder}>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Job Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Requirement Skills</Label>
              <Input
                type="text"
                name="requirement"
                value={input.requirement}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>JobType</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Experiance Year</Label>
              <Input
                type="text"
                name="experiance"
                value={input.experiance}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>No of Position</Label>
              <Input
                type="text"
                name="position"
                value={input.position}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            </div>
            {allCompanies.length > 0 && (
              <Select onValueChange={selectCompanyHandler}>
                <SelectTrigger className="w-[180px] mt-2">
                  <SelectValue placeholder="Select Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Companies</SelectLabel>
                    {allCompanies.map((company) => {
                      return (
                        <SelectItem
                          key={company._id}
                          value={company?.name?.toLowerCase()}
                        >
                          {company?.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
            {loading ? (
              <Button className="w-full my-4 mt-8">
                {" "}
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
              </Button>
            ) : (
              <Button type="submit" className="w-full mt-8 my-4">
                Post Job
              </Button>
            )}
            {allCompanies.length === 0 && (
              <p className="text-red-900 text-center text-xs font-bold my-3">
                *Please registre company, before posting a jobs.
              </p>
            )}
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
