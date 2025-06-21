import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Heart, MapPinIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { removeSavedJob, saveJob } from "@/Redux/savedJobSlice";
import { toast } from "sonner";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const savedJobsMap = useSelector((store) => store.savedJobs.savedJobs);

  const savedJobs = useMemo(() => {
    if (!user?.id || !savedJobsMap) return [];
    return savedJobsMap[user.id] || [];
  }, [user?.id, savedJobsMap]);

  const isSaved = useMemo(() => {
    return savedJobs.some((savedJob) => savedJob._id === job._id);
  }, [savedJobs, job._id]);

  const handleSavedJob = (event) => {
    event.stopPropagation();

    if (!user) {
      toast.error("Please log in to save jobs!");
      return;
    }

    if (isSaved) {
      dispatch(removeSavedJob({ userId: user.id, jobId: job._id }));
      toast.success("Job unsaved successfully!");
    } else {
      dispatch(saveJob({ userId: user.id, job }));
      toast.success("Job saved successfully!");
    }
  };

  return (
    <Card className="flex flex-col p-4 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex justify-between text-lg md:text-xl font-bold">
          {job?.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center text-sm sm:text-base">
            <MapPinIcon size={18} /> {job?.location}
          </div>
          <img
            src={job?.company?.logo}
            alt="Company Logo"
            className="w-10 sm:w-12 h-auto"
          />
        </div>
        <hr />
        <p className="text-gray-600">
          {job?.description?.substring(0, 80)}...
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="text-sm px-3 py-2">
            {job?.position} Position
          </Button>
          <Button variant="outline" className="text-sm px-3 py-2">
            {job?.jobType}
          </Button>
          <Button variant="outline" className="text-sm px-3 py-2">
            {job?.salary} LPA
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button
          onClick={() => navigate(`/description/${job._id}`)}
          variant="secondary"
          className="w-full text-sm sm:text-base"
        >
          More Details
        </Button>
        {user?.role === "user" && (
          <Heart
            onClick={handleSavedJob}
            className={`cursor-pointer ml-3 transition-all duration-300 ${
              isSaved ? "text-red-500" : "text-gray-400"
            }`}
            size={22}
            stroke="red"
            fill={isSaved ? "red" : "transparent"}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
