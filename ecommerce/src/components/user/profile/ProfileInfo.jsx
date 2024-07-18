import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { FaTransgender } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FloatingLabel, Spinner } from "flowbite-react";

const ProfileInfo = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  console.log(formData);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const fetchUser = async () => {
    try {
      const res = await fetch(`/api/user/get-user/${currentUser.id}`);
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      setFormData({
        username: data.user.username || "",
        mobile: data.user.mobile || "",
        email: data.user.email || "",
      });
    } catch (error) {
      return toast.error("Internal Error");
    }
  };
  useEffect(() => {
    fetchUser();
  }, [currentUser]);

  const handleUpdate = async () => {
    if (!formData.username || formData.username === "") {
      return toast.error("Username is required");
    }
    if (!formData.email || formData.email === "") {
      return toast.error("Email is required");
    }
    if (!formData.mobile || formData.mobile === "") {
      return toast.error("Mobile is required");
    }
    if (formData.mobile.length < 10) {
      return toast.error("Enter the correct number");
    }

    try {
      setLoading(true);
      const res = await fetch("/api/user/update-user", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData ),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        return toast.error(data.message);
      }
      setLoading(false);
      setFormData({});
      return toast.success(data.message);
    } catch (error) {
      return toast.error("Internal Error");
    }
  };
  return (
    <div className="ml-3 p-3 w-full bg-gray-100">
      <div className="mt-4 ml-6">
        {/* head div */}
        <div className="flex items-center justify-between mx-4 w-9/12">
          <div>
            <p className="text-3xl font-poetsen font-medium text-gray-900">
              personal info
            </p>
            <p className="text-sm text-gray-600 font-lora font-medium">
              Information about you and your preference
            </p>
          </div>
          <Link to="/profile?tab=profile">
            <IoMdClose className="text-3xl cursor-pointer" />
          </Link>
        </div>

        {/* basic details */}
        <div className="w-1/2 border rounded-xl mt-10 px-3 py-2 bg-white">
          <h2 className="text-xl font-poetsen font-medium text-gray-900">
            basic details
          </h2>
          <p className="text-sm text-gray-500 font-lora font-medium">
            View and manage your basic profile details
          </p>
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-4">
              <FaUser className="bg-gray-300 text-4xl rounded-full text-gray-500 p-2" />
              <div>
                <p className="text-base text-slate-900 font-medium font-lora ">
                  Full name
                </p>
                <FloatingLabel
                  variant="filled"
                  label="Username"
                  id="username"
                  onChange={onChange}
                  value={formData.username}
                  className="text-gray-900 font-bold font-lora text-base"
                />
              </div>
            </div>

            {/* <FiChevronRight className="text-4xl text-purple-600 p-1 hover:bg-blue-300 rounded-full cursor-pointer" /> */}
          </div>

          {/* <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-4">
              <SlCalender className="bg-gray-300 text-4xl rounded-full text-gray-500 p-2" />
              <div>
                <p className="text-base text-slate-900 font-medium font-lora ">
                  Date of birth
                </p>
              </div>
            </div>

            <FiChevronRight className="text-4xl text-purple-600 p-1 hover:bg-blue-300 rounded-full cursor-pointer" />
          </div> */}
          {/* <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-4">
              <FaTransgender className="bg-gray-300 text-4xl rounded-full text-gray-500 p-2" />
              <div>
                <p className="text-base text-slate-900 font-medium font-lora ">
                  Gender
                </p>
              </div>
            </div>

          </div> */}
        </div>

        {/* contact details */}
        <div className="w-1/2 border rounded-xl mt-10 px-3 py-2 bg-white">
          <h2 className="text-xl font-poetsen font-medium text-gray-900">
            Contact details
          </h2>
          <p className="text-sm text-gray-500 font-lora font-medium">
            View and manage your contact Information
          </p>
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-4">
              <FaUser className="bg-gray-300 text-4xl rounded-full text-gray-500 p-2" />
              <div>
                <p className="text-base text-slate-900 font-medium font-lora ">
                  Mobile Number
                </p>
                <FloatingLabel
                  variant="filled"
                  label=" Update Mobile"
                  id="mobile"
                  onChange={onChange}
                  value={formData.mobile}
                  className="text-gray-900 font-bold font-lora text-base"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-4">
              <SlCalender className="bg-gray-300 text-4xl rounded-full text-gray-500 p-2" />
              <div>
                <p className="text-base text-slate-900 font-medium font-lora ">
                  Email
                </p>
                <FloatingLabel
                  variant="filled"
                  label=" Update Email"
                  id="email"
                  onChange={onChange}
                  value={formData.email}
                  className="text-gray-900 font-bold font-lora text-base"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mt-3">
            {loading ? (
              <button className="border rounded-xl border-gray-300 text-base text-indigo-800 font-medium py-2 px-4  hover:border-purple-500">
                <Spinner aria-label="Default status example" /> loading...
              </button>
            ) : (
              <button
                onClick={handleUpdate}
                className="border rounded-xl border-gray-300 text-base text-indigo-800 font-medium py-2 px-4  hover:border-purple-500"
              >
                Update
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
