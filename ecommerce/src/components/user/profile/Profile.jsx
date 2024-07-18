import { Button, Modal } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../../../redux/user/userSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const filePickerRef = useRef();
  const handleImageChange = (e) => {
    console.log("hello");
  };

  const fetchUser = async () => {
    try {
      const res = await fetch(`/api/user/get-user/${currentUser.id}`);
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      setUser(data.user);
    } catch (error) {
      return toast.error("Internal Error");
    }
  };
  useEffect(() => {
    fetchUser();
  }, [currentUser]);

  const uploadImage = async () => {
    console.log("hello");
  };

  const handleDeleteUser = async () => {
    toast.success("User Deleted Successfully");
    setShowModal(false);
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout");
      const data = await res.json();
      if (!res.ok) {
        return toast.error("Internal Error");
      }
      if (data.success) {
        toast.success(data.message);
        dispatch(signoutSuccess());
        navigate("/");
      }
    } catch (error) {
      return toast.error("Internal Error");
    }
  };

  return (
    <div className="max-w-lg mx-auto pt-6 w-full">
      <h1 className="mb-8  text-center font-semibold text-white bg-indigo-700 rounded-lg cursor-pointer text-3xl font-lora">
        Profile
      </h1>
      <div className="flex flex-col gap-4 border rounded-lg px-4 py-4 border-gray-300">
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
            src={currentUser.profilePic}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] 
              "opacity-60"
        `}
          />
        </div>

        <div className="border-b-1 pb-4 border-gray-400">
          <p className="font-poetsen font-medium text-gray-700 text-base capitalize">
            Full Name:
          </p>
          <p className="text-base font-lora font-semibold text-teal-800">
            {user?.username ? user?.username : "-"}
          </p>
        </div>
        <div className="border-b-1 pb-4 border-gray-400">
          <p className="font-poetsen font-medium text-gray-700 text-base capitalize">
            Email ID:
          </p>
          <p className="text-base font-lora font-semibold text-teal-800">
            {user?.email ? user?.email : "-"}
          </p>
        </div>
        <div className="border-b-1 pb-4 border-gray-400">
          <p className="font-poetsen font-medium text-gray-700 text-base capitalize">
            mobile no:
          </p>
          <p className="text-base font-lora font-semibold text-teal-800">
            +91 {user?.mobile}
          </p>
        </div>

        <Link to="/profile?tab=profile-info" className="">
          <button className="w-full bg-blue-500 rounded-lg py-1 px-4 text-white font-lora font-medium text-base hover:bg-blue-700">
            Edit
          </button>
        </Link>
      </div>
      <div className="text-red-500 flex justify-between mt-5">
        <span
          onClick={() => setShowModal(true)}
          className="cursor-pointer bg-red-500 font-poetsen text-white py-1 px-2 rounded-xl"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignout}
          className="cursor-pointer bg-blue-500 text-white py-1 px-2 rounded-xl font-poetsen font-medium"
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
  );
};

export default Profile;
