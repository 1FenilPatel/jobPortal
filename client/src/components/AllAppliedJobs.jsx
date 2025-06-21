import React, { useEffect, useState } from 'react'
import AppliedJobs from './AppliedJobs'
import useGetAllAppliedJobs from '@/Hooks/useGetAllAppliedJobs';
import { BarLoader } from "react-spinners";

const AllAppliedJobs = () => {
    useGetAllAppliedJobs();
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // Simulate loading delay
  }, []);

  if (loading) {
    return <BarLoader className="mb-4 mx-auto" width={"100%"} color='#36d7b7' />;
  }
  return (
   <>
        <div className="max-w-4xl mx-auto rounded-2xl">
            <AppliedJobs/>
        </div>
   </>
  )
}

export default AllAppliedJobs