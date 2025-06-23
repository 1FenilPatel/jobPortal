import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_END_POINT } from "./Apis";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/Redux/companySlice";
import axiosInstance from "@/Utils/axiosInstance";

const CreateCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");

  const registerNewCompany = async () => {
    try {
      const res = await axiosInstance.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies/${res.data.company._id}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-0 flex justify-center mt-10">
      <div className="w-full max-w-xl bg-white/30 backdrop-blur-lg rounded-xl shadow-xl p-6 sm:p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Register Company
          </h1>
          <p className="text-sm text-gray-600">
            What would you like to name your company? You can change it later.
          </p>
        </div>

        <div className="space-y-4">
          <Label htmlFor="companyName" className="text-gray-800">
            Company Name
          </Label>
          <Input
            id="companyName"
            type="text"
            placeholder="Job Portal, Microsoft, etc."
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full border border-gray-300 text-black rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
            onClick={registerNewCompany}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
