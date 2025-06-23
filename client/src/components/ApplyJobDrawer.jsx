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
import axios from "axios";
import { APPLICATION_API_END_POINT } from "./Apis";
import { useParams } from "react-router-dom";
import { setIsApplied, setSingleJob } from "@/Redux/jobSlice";
import { toast } from "sonner";
import { store } from "@/Redux/store";
import axiosInstance from "@/Utils/axiosInstance";

const ApplyJobDrawer = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;

  // Accessing Reduc State
  const { singleJob, isApplied } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  //Local State to manage the drawer visibility
  const [drawerOpen, setDrawerOpen] = useState(false);

  // check if user has already applied
  useEffect(() => {
    if (singleJob && user) {
      const hasApplied = singleJob.applications.some(
        (application) => application.applicant === user?._id
      );
      dispatch(setIsApplied(hasApplied)); // set isApplied State in the store.
    }
  }, [singleJob, user, dispatch]);

  // handle the apply action
  const applyHandler = async () => {
    if (isApplied) {
      toast.error("You have already applied for the job.");
      return;
    }

    try {
      const res = await axiosInstance.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        // { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setIsApplied(true)); // update the application status in the store
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "An error occured");
    }
  };

  return (
    <>
    {
      user?.role === "user" && (
           <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerTrigger asChild>
          <Button
            size="lg"
            variant={!isApplied ? "blue" : "destructive"}
            disabled={isApplied} // disable button if user has already applied the job.
            onClick={() => setDrawerOpen(true)}
          >
            {isApplied ? "Applied" : "Apply For Job"}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{`Applied for ${singleJob?.title} at ${singleJob?.company?.name} `}</DrawerTitle>
            <DrawerDescription>Please fill the form below</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button onClick={applyHandler} disabled={isApplied}>
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      )
    }
    </>
  );
};

export default ApplyJobDrawer;
