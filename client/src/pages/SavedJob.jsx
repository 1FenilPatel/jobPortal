import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { removeSavedJob } from "@/Redux/savedJobSlice";
import { Briefcase, Calendar, Eye, IndianRupee, Lightbulb, MapPinIcon, MoveRight, User2 } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SavedJob = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const savedJobs = useSelector((state) => state.savedJobs.savedJobs[user?.id] || []);

  const handleRemoveJob = (jobId) => {
    dispatch(removeSavedJob({ userId: user.id, jobId }));
    toast.success("Job unsaved successfully!");
  };

  return (
    <div className="p-5">
      <Button onClick={() => navigate("/jobs")} variant="outline" className="mb-2">
        Back to Jobs
      </Button>

      {savedJobs.length === 0 ? (
        <div className="text-center">
          <img className="w-60 mx-auto" src="/SavedJob-removebg-preview.png" alt="No Saved Jobs" />
          <h1 className="text-2xl font-bold mt-4">No jobs saved yet</h1>
          <p className="text-lg">Jobs you save appear here.</p>
          <Button className="bg-blue-900 mt-4 text-white hover:bg-blue-800" onClick={() => navigate("/jobs")}>
            Find jobs <MoveRight className="ml-2" />
          </Button>
        </div>
      ) : (
        savedJobs.map((job) => (
          <Card key={job._id} className="mb-4 p-2">
            <CardHeader className="text-xl font-bold">{job.title}</CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center text-lg sm:text-base">
                  <MapPinIcon size={18} /> {job.location}
                </div>
                {job.company?.logo && (
                  <img src={job.company.logo} className="w-20 h-auto" alt="Company Logo" />
                )}
              </div>
              <hr />
              <p className="text-white">{job.description?.substring(0, 120)}...</p>
              <Card className="p-4">
                <CardHeader className="text-lg font-semibold">Job Details</CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-lg">
                  <p className="flex items-center gap-2">
                    <Briefcase /> Job Type: {job.jobType}
                  </p>
                  <p className="flex items-center gap-2">
                    <IndianRupee /> Salary: {job.salary} LPA
                  </p>
                  <p className="flex items-center gap-2">
                    <User2 /> Applicants: {job?.applications?.length || 0}
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar /> Posted: {job.createdAt?.split("T")[0]}
                  </p>
                  <p className="flex items-center gap-2">
                    <Eye /> Position: {job.position}
                  </p>
                  <p className="flex items-center gap-2">
                    <Lightbulb /> Skills:{" "}
                    {Array.isArray(job.requirements) && job.requirements.length > 0
                      ? job.requirements.join(", ")
                      : "No skills listed"}
                  </p>
                </CardContent>
              </Card>
              <Button className="bg-red-700 hover:bg-red-800" onClick={() => handleRemoveJob(job._id)} variant="destructive">
                Remove
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default SavedJob;
