import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import axiosInstance from "@/Utils/axiosInstance";
import { USER_API_END_POINT } from "./Apis";
import { toast } from "sonner";
import { setLoading, setProfilePhoto, setUser } from "@/Redux/authSlice";

const UpdateProfile = ({ open, setOpen }) => {
  const { user, loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    location: user?.location || "",
    gstno: user?.gstno || "",
    profilePhoto: null,
    resume: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const { name, files } = e.target;
    setInput({ ...input, [name]: files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    formData.append("location", input.location);
    formData.append("gstno", input.gstno);

    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }
    if (input.resume) {
      formData.append("resume", input.resume);
    }

    try {
      dispatch(setLoading(true));

      const res = await axiosInstance.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
        if (res.data.user?.profile?.profilePhoto) {
          dispatch(setProfilePhoto(res.data.user.profile.profilePhoto));
        }
        setOpen(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="max-w-full sm:max-w-[725px] max-h-[90vh] overflow-y-auto bg-white border-none text-black p-4 sm:p-6 rounded-lg hide-scrollbar"
      >
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold">
            Update Personal Details
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-2 sm:py-4">
            {/* Profile Photo */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="profilePhoto" className="text-base sm:text-lg">
                Profile Photo
              </Label>
              <input
                type="file"
                id="profilePhoto"
                name="profilePhoto"
                onChange={fileChangeHandler}
                accept="image/*"
                className="w-full text-sm border rounded-lg p-2"
              />
            </div>

            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="text-base sm:text-lg">
                Full Name
              </Label>
              <input
                type="text"
                id="name"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                className="w-full border border-gray-400 rounded-lg p-2"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-base sm:text-lg">
                Email
              </Label>
              <input
                type="text"
                id="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                className="w-full border border-gray-400 rounded-lg p-2"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="phoneNumber" className="text-base sm:text-lg">
                Phone No
              </Label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                className="w-full border border-gray-400 rounded-lg p-2"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="location" className="text-base sm:text-lg">
                Location
              </Label>
              <input
                type="text"
                id="location"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="w-full border border-gray-400 rounded-lg p-2"
              />
            </div>

            {/* GST No */}
            {user?.role === "provider" && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="gstno" className="text-base sm:text-lg">
                  GST No
                </Label>
                <input
                  type="text"
                  id="gstno"
                  name="gstno"
                  value={input.gstno}
                  onChange={changeEventHandler}
                  className="w-full border border-gray-400 rounded-lg p-2"
                />
              </div>
            )}

            {/* Bio, Skills, Resume - For User */}
            {user?.role === "user" && (
              <>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="bio" className="text-base sm:text-lg">
                    Bio
                  </Label>
                  <input
                    type="text"
                    id="bio"
                    name="bio"
                    value={input.bio}
                    onChange={changeEventHandler}
                    className="w-full border border-gray-400 rounded-lg p-2"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="skills" className="text-base sm:text-lg">
                    Skills
                  </Label>
                  <input
                    type="text"
                    id="skills"
                    name="skills"
                    value={input.skills}
                    onChange={changeEventHandler}
                    className="w-full border border-gray-400 rounded-lg p-2"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="resume" className="text-base sm:text-lg">
                    Resume
                  </Label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    onChange={fileChangeHandler}
                    accept="application/pdf"
                    className="w-full text-sm border rounded-lg p-2"
                  />
                </div>
              </>
            )}
          </div>

          <DialogFooter className="mt-4">
            {loading ? (
              <Button className="w-full flex justify-center items-center gap-2 text-white bg-blue-900 hover:bg-blue-900">
                <Loader2 className="h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full text-white bg-blue-900 hover:bg-blue-900"
              >
                Save Changes
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfile;
