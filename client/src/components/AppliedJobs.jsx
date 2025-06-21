import React from 'react'
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { useSelector } from 'react-redux'
import { store } from '@/Redux/store'
import { Badge } from './ui/badge'
import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const AppliedJobs = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);
  return (
<div className="max-w-5xl mx-auto my-10 p-6 bg-gray-300 shadow-xl rounded-xl">
<h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
  Your Applied Jobs
</h2>
{allAppliedJobs?.length <= 0 ? (
  <p className="text-center text-gray-600">
    You haven't applied for any jobs yet.
  </p>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {allAppliedJobs?.map((job, index) => (
      <motion.div
        key={index}
        className="p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200"
        whileHover={{ scale: 1.03 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Briefcase className="text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">
            {job?.job?.title}
          </h3>
        </div>
        <p className="text-gray-600 mb-2">{job?.job?.company?.name}</p>
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
          <Calendar className="w-4 h-4" />
          <span>{job?.createdAt.split("T")[0]}</span>
        </div>
        <Badge
          className={`px-3 py-1 text-sm font-semibold rounded-full text-white ${
            job?.status === "rejected"
              ? "bg-red-600 hover:bg-red-600"
              : job?.status === "pending"
              ? "bg-yellow-500 hover:bg-yellow-500"
              : "bg-green-500 hover:bg-green-500"
          }`}
        >
          {job?.status.toUpperCase()}
        </Badge>
      </motion.div>
    ))}
  </div>
)}
</div>
  )
}

export default AppliedJobs