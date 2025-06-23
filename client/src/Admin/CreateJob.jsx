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
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axiosInstance from "@/Utils/axiosInstance";

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
    const selected = allCompanies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selected?._id });
  };

  const submitHanlder = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.post(
        `${JOB_API_END_POINT}/postJob`,
        input,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/job");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="px-4 py-8 max-w-5xl mx-auto">
      <h1 className="gradient-title font-extrabold text-3xl sm:text-4xl text-center pb-8">
        Posting a New Job
      </h1>

      <form
        onSubmit={submitHanlder}
        className="bg-white/30 backdrop-blur-lg p-6 rounded-lg shadow-md"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: "title", label: "Job Title" },
            { name: "description", label: "Description" },
            { name: "requirement", label: "Requirement Skills" },
            { name: "salary", label: "Salary" },
            { name: "location", label: "Location" },
            { name: "jobType", label: "Job Type" },
            { name: "experiance", label: "Experience Year" },
            { name: "position", label: "No of Position" },
          ].map(({ name, label }) => (
            <div key={name}>
              <Label>{label}</Label>
              <Input
                type="text"
                name={name}
                value={input[name]}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0"
                required
              />
            </div>
          ))}
        </div>

        {allCompanies.length > 0 && (
          <div className="mt-4">
            <Label>Select Company</Label>
            <Select onValueChange={selectCompanyHandler}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Companies</SelectLabel>
                  {allCompanies.map((company) => (
                    <SelectItem
                      key={company._id}
                      value={company.name.toLowerCase()}
                    >
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}

        {allCompanies.length === 0 && (
          <p className="text-red-700 text-sm mt-4 font-semibold text-center">
            *Please register a company before posting jobs.
          </p>
        )}

        <div className="mt-6">
          {loading ? (
            <Button className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Post Job
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateJob;
