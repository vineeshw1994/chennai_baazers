import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  Spinner, FloatingLabel } from "flowbite-react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  console.log(formData);
  const handleSubmit = async () => {
    if (!formData.mobile || formData.mobile === "") {
      return toast.error("Mobile Number is Required");
    }

    if (formData.mobile.length < 10) {
      return toast.error("Enter correct number");
    }
    try {
      setLoading(true);
      const res = await fetch("/api/user/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) {
        setLoading(false);
        return toast.error(data.message);
      }
      if (res.ok) {
        setLoading(false);
        toast.success("Otp Send Your Mobile");
        navigate("/otp");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-stone-100 min-h-screen  flex justify-center items-center">
      <div className="bg-white my-5 mx-auto rounded-lg shadow-lg max-w-md w-4/12 h-fit p-5">
        <div className="flex items-center justify-between mx-2 mb-2">
          <h2 className="font-bold text-2xl mb-2 text-center font-lora text-sky-700">
            E-Shop
          </h2>
          <Link to="/">
            <IoMdClose className="text-3xl" />
          </Link>
        </div>
        {/* <p className="mb-3 text-center text-xs font-lora font-medium text-teal-800">
          Verify your mobile number to access your{" "}
          <b className="text-black ">E-Shop</b> account
        </p> */}

        <FloatingLabel
          type="number"
          id="mobile"
          placeholder="91- Enter Your Mobile Number"
          onChange={handleChange}
          variant="standard"
          label=""
          className="mt-4 font-poetsen font-medium"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mb-6 mt-2"
        >
          {loading ? (
            <>
              <Spinner
                aria-label="Spinner button example"
                size="sm"
                className="text-white"
              />
              <span className="pl-3 text-white">Loading...</span>
            </>
          ) : (
            "Continue"
          )}
        </button>

        <p className="text-xs xl:text-sm 2xl:text-sm font-medium text-black ">
          By continuing, you agree to our Terms and Conditions.
        </p>
      </div>
    </div>
  );
};

export default Signup;
