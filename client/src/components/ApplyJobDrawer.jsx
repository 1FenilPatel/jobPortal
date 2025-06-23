import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_END_POINT } from "./Apis";
import { useParams } from "react-router-dom";
import { setIsApplied, setSingleJob } from "@/Redux/jobSlice";
import { toast } from "sonner";
import axiosInstance from "@/Utils/axiosInstance";

const ApplyJobDrawer = () => {
  const dispatch = useDispatch();
  const { id: jobId } = useParams();

  const { singleJob, isApplied } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (singleJob && user) {
      const hasApplied = singleJob.applications.some(
        (application) => application.applicant === user?._id
      );
      dispatch(setIsApplied(hasApplied));
    }
  }, [singleJob, user, dispatch]);

  const applyHandler = async () => {
    if (isApplied) {
      toast.error("You have already applied for the job.");
      return;
    }

    try {
      const res = await axiosInstance.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`
      );

      if (res.data.success) {
        dispatch(setIsApplied(true));
        const updatedJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      {user?.role === "user" && (
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button
              size="lg"
              className="w-full sm:w-auto"
              variant={!isApplied ? "blue" : "destructive"}
              disabled={isApplied}
              onClick={() => setDrawerOpen(true)}
            >
              {isApplied ? "Applied" : "Apply For Job"}
            </Button>
          </DrawerTrigger>

          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle className="text-lg sm:text-xl max-w-[90%] break-words">
                Apply for {singleJob?.title} at {singleJob?.company?.name}
              </DrawerTitle>
              <DrawerDescription className="text-sm text-gray-500">
                Please confirm your application below.
              </DrawerDescription>
            </DrawerHeader>

            <DrawerFooter className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Button
                className="w-full sm:w-auto"
                onClick={applyHandler}
                disabled={isApplied}
              >
                {isApplied ? "Already Applied" : "Apply Now"}
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default ApplyJobDrawer;
