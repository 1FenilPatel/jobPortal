import CompanyTable from '@/Admin/CompanyTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useGetAllAdminJobs from '@/Hooks/useGetAllAdminJobs'
import useGetAllCompany from '@/Hooks/useGetAllCompany'
import { setsearchCompayByText } from '@/Redux/companySlice'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PostJob = () => {
  useGetAllCompany();
  const [input,setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(setsearchCompayByText(input));
  },[input]);

  return (
    <div>
        <h1 className='gradient-title font-extrabold text-4xl sm:text-7xl text-center pb-8'>Post a Company</h1>
        <div className="mx-auto my-10">
          <div className="flex items-center gap-5 justify-between my-6">
              <Input className="h-full flex-1 px-4 text-md" placeholder="Filter by name" onChange={(e)=>setInput(e.target.value)} />
              <Button variant="blue" className="h-full am:w-28" onClick={()=>navigate("/admin/companies/create")}> Add New Company</Button>
          </div>
          <CompanyTable/>
        </div>
    </div>
  )
}

export default PostJob