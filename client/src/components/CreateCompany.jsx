import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from './Apis'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/Redux/companySlice'
import axiosInstance from '@/Utils/axiosInstance'

const CreateCompany = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName,setCompanyName] = useState();

    const registerNewCompany = async()=>{
        try {
            const res = await axiosInstance.post(`${COMPANY_API_END_POINT}/register`,{companyName},{
                headers:{
                    'Content-Type':'application/json'
                },
                // withCredentials:true,
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company._id;
                navigate(`/admin/companies/${companyId}`);
                console.log(res.data);
            }
        } catch (error) {   
            console.log(error);
            toast.error(error?.response?.data.message);
        }
    }

  return (
    <div className='max-w-lg mx-auto p-6 bg-white/30 backdrop-blur-lg rounded-lg shadow-lg'>
            <div className='my-6 text-center'>
                <h1 className='font-bold text-2xl mb-1'>Register Company</h1>
                <p className='text-white'>What would you like to name your company? You can change it later.</p>
            </div>

            <div className='space-y-4'>
                <Label>Company Name</Label>
                <Input type="text" className="w-full p-2 border rounded" placeholder="Job portal, Microsoft, etc." onChange={(e) => setCompanyName(e.target.value)} />
            </div>

            <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mt-6'>
                <Button className="w-full sm:w-auto hover:scale-105" onClick={() => navigate("/admin/companies")}>Cancel</Button>
                <Button className="w-full sm:w-auto hover:scale-105" onClick={registerNewCompany}>Continue</Button>
            </div>
        </div>
  )
}

export default CreateCompany