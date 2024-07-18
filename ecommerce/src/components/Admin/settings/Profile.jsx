import React, { useEffect, useRef, useState } from "react";
import DashNavbar from "../dashboard/components/DashNavbar";
import "../settings/settings.css";
import { Button, Modal, TextInput } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../../../redux/admin/adminAuthSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentAdmin } = useSelector((state) => state.admin);
  const [imageFile, setImageFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const loading = false;
  const handleImageChange = (e) => {
    console.log("hello");
  };

  const uploadImage = async () => {
    console.log("hello");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username) {
      return toast.error("Username is Required");
    }
    if (!formData.email) {
      return toast.error("Username is Required");
    }
    if (!formData.mobile) {
      return toast.error("Username is Required");
    }
    try {
      const res = await fetch(`/api/admin/update-admin/${currentAdmin.id}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      if (data.success) {
        fetchAdmin();
        return toast.success(data.message);
      }
    } catch (error) {
      return toast.error("Interenal Error");
    }
  };
  const handleDeleteUser = async () => {
    toast.success("User Deleted Successfully");
    setShowModal(false);
  };

  const fetchAdmin = async () => {
    try {
      const res = await fetch(`/api/admin/admin/${currentAdmin.id}`);
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      if (data.success) {
        setFormData(data.admin);
      }
    } catch (error) {
      toast.error("Internal Error");
    }
  };
  console.log(formData);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/admin/admin-logout");
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      if (data.success) {
        dispatch(signoutSuccess());
        navigate("/admin/login");
        return toast.success(data.message);
      }
    } catch (error) {
      return toast.error("Internal Error");
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);
  return (
    <div className="main_section">
      <DashNavbar />
      <div>
        <div className="max-w-lg mx-auto p-3 w-full">
          <h1 className="my-7 text-center font-semibold font-lora text-3xl bg-neutral-100 rounded-full text-teal-600">
            Profile
          </h1>
          <div className="flex flex-col gap-4 border border-gray-200 rounded-lg py-3 px-4 shadow-lg">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={filePickerRef}
              hidden
            />
            <div
              className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
              onClick={() => filePickerRef.current.click()}
            >
              <img
                src={formData.profilePic}
                alt="user"
                className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] 
              "opacity-60"
        `}
              />
              <p>upload Image</p>
            </div>

            <TextInput
              type="text"
              id="username"
              placeholder="username"
              value={formData.username}
              onChange={handleChange}
              className=""
            />
            <TextInput
              type="email"
              id="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextInput
              type="number"
              id="mobile"
              placeholder="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
            <TextInput
              type="password"
              id="password"
              placeholder="password"
              onChange={handleChange}
            />
            <Button
              onClick={handleSubmit}
              gradientDuoTone="purpleToBlue"
              outline
            >
              {loading ? "Loading..." : "Update"}
            </Button>
          </div>
          <div className=" flex justify-between mt-5">
            <span
              onClick={() => setShowModal(true)}
              className="cursor-pointer bg-red-500 text-white font-lora rounded-lg px-1 shadow-inne hover:bg-red-700"
            >
              Delete Account
            </span>
            <span
              onClick={handleSignout}
              className="cursor-pointer bg-sky-800 text-white rounded-lg px-1 shadow-inner hover:bg-blue-900"
            >
              Sign Out
            </span>
          </div>

          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            popup
            size="md"
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete your account?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={handleDeleteUser}>
                    Yes, I'm sure
                  </Button>
                  <Button color="gray" onClick={() => setShowModal(false)}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Profile;
