import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import JobTable from './JobTable';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useGetAllAdminJobs from '@/Hooks/useGetAllAdminJobs';
import { useDispatch } from 'react-redux';
import { setsearchJobByText } from '@/Redux/jobSlice';

const AdminJob = () => {
    useGetAllAdminJobs();
    const [input,setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setsearchJobByText(input));
    },[input]);
  return (
    <div>
        <h1 className='gradient-title font-extrabold text-4xl sm:text-7xl text-center pb-8'>Post a Job</h1>
        <Button
            onClick={() => navigate("/admin/companies")}
            variant="blue"
            className="flex items-center gap-2font-semibold"
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>
        <div className="flex items-center justify-between gap-10 my-6">
            <Input
             className="h-full flex-1 px-4 text-md" 
             placeholder="Filter by role and name"
             onChange={(e)=>setInput(e.target.value)}
            />
            <Button onClick={()=>navigate("/admin/jobs/create")} className="h-full am:w" variant="destructive">
                Post New Job
            </Button>
        </div>
        <JobTable/>
    </div>
  )
}

export default AdminJob