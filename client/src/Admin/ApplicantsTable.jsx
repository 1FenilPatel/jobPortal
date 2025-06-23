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
import { useSelector } from "react-redux";
import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import axiosInstance from "@/Utils/axiosInstance";

const ApplicantsTable = () => {
  const sortListingStatus = ["accepted", "rejected"];
  const { applicants } = useSelector((store) => store.application);
  const [disabledButtons, setDisabledButtons] = useState({});
  const token = localStorage.getItem("token");

  const statusHandler = async (
    status,
    id,
    phoneNumber,
    fullname,
    jobTitle,
    companyName
  ) => {
    try {
      setDisabledButtons((prev) => ({ ...prev, [id]: true }));

      const res = await axiosInstance.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        await axiosInstance.post(
          `${APPLICATION_API_END_POINT}/send-sms`,
          {
            phoneNumber,
            message:
              status === "accepted"
                ? `Dear ${fullname}, congratulations! 🎉 You have been ACCEPTED for the ${jobTitle} role at ${companyName}!`
                : `Dear ${fullname}, thank you for applying for the ${jobTitle} role at ${companyName}. Unfortunately, we couldn't proceed this time.`,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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
    <div className="overflow-x-auto w-full">
      <Table className="min-w-[900px]">
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
            const { applicant, _id, status } = application;
            const jobTitle = application?.job?.title || "N/A";
            const companyName = application?.job?.company?.name || "N/A";
            const {
              fullname,
              email,
              phoneNumber,
              profile,
              createdAt,
            } = applicant || {};
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
                      className="text-blue-900 underline"
                      href={resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {resumeName}
                    </a>
                  ) : (
                    <span>N/A</span>
                  )}
                </TableCell>
                <TableCell className="capitalize">{status}</TableCell>
                <TableCell>{formattedDate}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger aria-label="Open action menu">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-40 flex flex-col gap-2">
                      {sortListingStatus.map((statusOption) => (
                        <Button
                          key={statusOption}
                          variant="outline"
                          disabled={isDisabled || disabledButtons[_id]}
                          onClick={() =>
                            statusHandler(
                              statusOption,
                              _id,
                              phoneNumber,
                              fullname,
                              jobTitle,
                              companyName
                            )
                          }
                          className="text-sm"
                        >
                          {statusOption}
                        </Button>
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
