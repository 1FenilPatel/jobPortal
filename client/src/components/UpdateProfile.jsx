import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/Redux/store";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { USER_API_END_POINT } from "./Apis";
import { toast } from "sonner";
import { setLoading, setProfilePhoto, setUser } from "@/Redux/authSlice";

const UpdateProfile = ({open,setOpen}) => {
  const {user,loading} = useSelector(store=>store.auth);
  
  const dispatch = useDispatch();

  const [input,setInput] = useState({
    fullname:user?.fullname,
    email:user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile.skills?.map((skills) => skills),
    location: user?.location,
    profilePhoto:null,
    gstno:user?.gstno,
    file: user?.profile?.resume,
  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
}

const fileChangeHandler = (e) => {
  const { name, files } = e.target;
  setInput({ ...input, [name]: files[0] });
};

  const submitHandler = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    formData.append("location", input.location);
    formData.append("gstno",input.gstno);
  
    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }
    if (input.resume) {
      formData.append("resume", input.resume);
    }
  
    try {
      dispatch(setLoading(true));
  
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
  
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user)); 
  
        if (res.data.user?.profile?.profilePhoto) {
          dispatch(setProfilePhoto(res.data.user.profile.profilePhoto)); 
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  
    setOpen(false);
  };
  
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          onInteractOutside={() => setOpen(false)}
          className="sm:max-w-[725px] sm:max-h-[80vh] bg-white outline-none border-none text-black overflow-y-auto  hide-scrollbar"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Update Personal Details</DialogTitle>
          </DialogHeader>
          <form action="" onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2 justify-center">
                <Label htmlFor="profilePhoto" className="text-lg">
                  Profile Photo
                </Label>
                <input
                  type="file"
                  id="profilePhoto"
                  name="profilePhoto"
                  onChange={fileChangeHandler}
                  accept="image/*"
                  className="text-black rounded-lg outline-none p-2"
                />
              </div>
              <div className="flex flex-col gap-2 justify-center">
                <Label htmlFor="name" className="text-lg">
                  FullName
                </Label>
                <input
                  type="text"
                  id="name"
                  name="fullname"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  className="text-black border border-gray-400 rounded-lg outline-none p-2"
                />
              </div>
              <div className="flex flex-col gap-2 justify-center">
                <Label htmlFor="email" className="text-lg">
                  Email
                </Label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className=" border border-gray-400 text-black rounded-lg outline-none p-2"
                />
              </div>
              <div className="flex flex-col gap-2 justify-center">
                <Label htmlFor="number" className="text-lg">
                  Phone No
                </Label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  className="border border-gray-400 text-black rounded-lg outline-none p-2"
                />
              </div>
              <div className="flex flex-col gap-2 justify-center">
                <Label htmlFor="location" className="text-lg">
                  Location
                </Label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  className="border border-gray-400 text-black rounded-lg outline-none p-2"
                />
              </div>
             {
              user?.role === "provider" && (
                 <div className="flex flex-col gap-2 justify-center">
                <Label htmlFor="location" className="text-lg">
                  GST No
                </Label>
                <input
                  type="text"
                  id="gstno"
                  name="gstno"
                  value={input.gstno}
                  onChange={changeEventHandler}
                  className="border border-gray-400 text-black rounded-lg outline-none p-2"
                />
              </div>
              )
             }
              {
                user?.role === "user" && (
                  <div>
                    <div className="flex flex-col gap-2 justify-center">
                <Label htmlFor="bio" className="text-lg">
                  Bio
                </Label>
                <input
                  type="text"
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  className=" border border-gray-400 text-black rounded-lg outline-none p-2"
                />
              </div>
              <div className="flex flex-col gap-2 justify-center">
                <Label htmlFor="skills" className="text-lg">
                  Skills
                </Label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  className=" border border-gray-400 text-black rounded-lg outline-none p-2"
                />
              </div>
              <div className="flex flex-col gap-2 justify-center">
                <Label htmlFor="resume" className="text-lg">
                  Resume
                </Label>
                <input
                  type="file"
                  id="file"
                  name="resume"
                  onChange={fileChangeHandler}
                  accept="application/pdf"
                  className="text-black rounded-lg outline-none p-2"
                />
              </div>
                  </div>
                )
              }
            </div>
            <DialogFooter>
            {
                loading ? <Button className="w-full  my-4"> <Loader2 className='mr-2 text-white bg-blue-900 hover:bg-blue-900 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit"  className="w-full text-white bg-blue-900 hover:bg-blue-900 my-4">Save Changes</Button>
            }
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfile;
