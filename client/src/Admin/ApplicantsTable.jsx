import { APPLICATION_API_END_POINT } from "@/components/Apis";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { store } from "@/Redux/store";
import axiosInstance from "@/Utils/axiosInstance";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const ApplicantsTable = () => {
  const sortListingStatus = ["accepted", "rejected"];
  const { applicants } = useSelector((store) => store.application);
  const [disabledButtons, setDisabledButtons] = useState({});
  const token = localStorage.getItem("token");

  const statusHandler = async (status, id, phoneNumber, fullname, jobTitle,companyName) => {
    try {
      setDisabledButtons((prev) => ({ ...prev, [id]: true }));

      const res = await axiosInstance.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        // { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        await axiosInstance.post(
          `${APPLICATION_API_END_POINT}/send-sms`,
          {
            phoneNumber,
            message:
              status === "accepted"
               ? `Dear ${fullname}, congratulations! 🎉 You have been ACCEPTED for the ${jobTitle} role at ${companyName}! Welcome aboard!`
               : `Dear ${fullname}, thank you for applying for the ${jobTitle} role at ${companyName}. Unfortunately, we couldn't proceed this time. Wishing you success ahead!`
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          // { withCredentials: true }
        );
        console.log("SMS Notification Sent");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
      setDisabledButtons((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fullname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.map((application) => {
            console.log(application);

            const { applicant, _id, status } = application;
            const jobTitle = application?.job?.title || "N/A";
            const companyName = application?.job?.company?.name || "N/A";
            const { fullname, email, phoneNumber, profile, createdAt } = applicant || {};
            const resumeLink = profile?.resume;
            const resumeName = profile?.resumeOriginalName || "Resume";
            const formattedDate = createdAt?.split("T")[0] || "NA";
            const isDisabled = status && status !== "pending";

            return (
              <TableRow key={_id}>
                <TableCell>{fullname || "N/A"}</TableCell>
                <TableCell>{email || "N/A"}</TableCell>
                <TableCell>{phoneNumber || "N/A"}</TableCell>
                <TableCell>{jobTitle}</TableCell>
                <TableCell>
                  {resumeLink ? (
                    <a
                      className="text-blue-900"
                      href={resumeLink}
                      target="_blank"
                      aria-label="View Resume"
                    >
                      {resumeName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>{status}</TableCell>
                <TableCell>{formattedDate}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger aria-label="Open action menu">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-40 flex gap-2 flex-col mr-24">
                      {sortListingStatus.map((statusOption) => (
                        <div
                          key={statusOption}
                          onClick={
                            !isDisabled && !disabledButtons[_id]
                              ? () => statusHandler(statusOption, _id, phoneNumber, fullname, jobTitle,companyName)
                              : null
                          }
                          className={`cursor-pointer my-1 flex items-center ${
                            (isDisabled || disabledButtons[_id]) && "opacity-50 pointer-events-none"
                          }`}
                          aria-disabled={isDisabled || disabledButtons[_id]}
                          aria-label={`Set status to ${statusOption}`}
                        >
                          <Button className="w-48 " variant="outline">
                            {statusOption}
                          </Button>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
