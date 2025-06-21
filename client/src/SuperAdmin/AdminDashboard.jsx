import { ADMIN_API_END_POINT } from "@/components/Apis";
import { setProvider } from "@/Redux/providerSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("requests");

  const dummyUsers = [
    {
      _id: "u1",
      fullname: "Arpan Sharma",
      email: "arpan@gmail.com",
      phoneNumber: "8799086127",
      location: "Surat",
    },
    {
      _id: "u2",
      fullname: "Kiran Mehta",
      email: "kiran@gmail.com",
      phoneNumber: "9823049583",
      location: "Vadodara",
    },
  ];

  const { provider } = useSelector((store) => store.pro);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const fetchProvider = async () => {
    try {
      const res = await axios.get(`${ADMIN_API_END_POINT}/getProvider`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setProvider(res.data.provider));
      }
    } catch (error) {
      console.log(error);
      setErrMsg(error?.response?.data?.message || "Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${ADMIN_API_END_POINT}/getAlluser`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setUsers(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  const handleAction = async (providerId, isApproved) => {
    try {
      const res = await axios.put(
        `${ADMIN_API_END_POINT}/approveRequest`,
        { providerId, isApproved },
        { withCredentials: true }
      );
      if (res.data.success) {
        fetchProvider();
      }
    } catch (error) {
      console.log("Error updating provider status:", error);
    }
  };
  
  const handleDelete = async(userId)=>{
    try {
      const res = await axios.delete(`${ADMIN_API_END_POINT}/removeUser/${userId}`,{withCredentials:true});
      if(res.data.success){
        toast.success(res.data.message);
        
        setUsers((prevUser)=>prevUser.filter((user)=>user._id !== userId));
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }
  
  useEffect(() => {
    fetchProvider();
    fetchUser();
  }, [dispatch]);

  
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <ul className="space-y-4">
          <li
            className={`cursor-pointer ${
              activeTab === "requests" ? "text-blue-400 font-semibold" : ""
            }`}
            onClick={() => setActiveTab("requests")}
          >
            Provider Requests
          </li>
          <li
            className={`cursor-pointer ${
              activeTab === "users" ? "text-blue-400 font-semibold" : ""
            }`}
            onClick={() => setActiveTab("users")}
          >
            Registered Users
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 py-6 px-4">
        <div className="max-w-4xl w-full mx-auto">
          {activeTab === "requests" ? (
            <>
              <h2 className="text-xl text-black font-bold mb-4">
                Pending Provider Requests
              </h2>
              {/* <div className="space-y-4">
                {dummyProviders.map((provider) => (
                  <div
                    key={provider._id}
                    className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center"
                  >
                    <div className="text-black">
                      <h3 className="text-lg font-semibold">{provider.fullname}</h3>
                      <p>Email: {provider.email}</p>
                      <p>Phone: {provider.phone}</p>
                      <p>GST: {provider.gstno}</p>
                      <p>Location: {provider.location}</p>
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                      Approve
                    </button>
                  </div>
                ))}
              </div> */}
              {provider?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {provider.map((item) => (
                    <Card key={item._id} className="shadow-lg border">
                      <CardContent className="p-4 space-y-2">
                        <div className="text-xl font-semibold text-blue-700">
                          {item.fullname}
                        </div>
                        <div className="text-sm text-gray-700">
                          <strong>Phone:</strong> {item.phone}
                        </div>
                        <div className="text-sm text-gray-700">
                          <strong>GST No:</strong> {item.gstno}
                        </div>
                        <div className="text-sm text-gray-700">
                          <strong>Shop Name:</strong> {item.shopName}
                        </div>
                        <div className="text-sm text-gray-700">
                          <strong>Location:</strong> {item.location}
                        </div>
                        <div className="text-sm">
                          <strong>Status:</strong>{" "}
                          {item.isApproved ? (
                            <Badge className="bg-green-100 text-green-700">
                              Approved
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-700">
                              Pending
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button
                            onClick={() => handleAction(item._id, true)}
                            disabled={item.isApproved !== false}
                            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
                          >
                            Accept
                          </Button>
                          <Button
                            onClick={() => handleAction(item._id, false)}
                            disabled={item.isApproved !== false}
                            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400"
                          >
                            Reject
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">
                  No pending service providers found.
                </p>
              )}
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-black mb-4">
                All Registered Users
              </h2>
              <div className="space-y-4">
                {users.map((user) => (
                  <div
                    key={user._id}
                    className="bg-white shadow-md text-black p-4 rounded-lg"
                  >
                    <h3 className="text-lg font-semibold">{user.fullname}</h3>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phoneNumber}</p>
                    <p>Location: {user.location} </p>

                    <Button
                      onClick={() => handleDelete(user._id)}
                      variant="destructive"
                      className="flex gap-2 items-center"
                    >
                      <Trash2 className="w-4 h-4" /> Remove
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
