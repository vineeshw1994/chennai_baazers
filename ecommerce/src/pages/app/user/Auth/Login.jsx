import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Google from "../../../../assets/google.png";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../../../redux/user/userSlice";
import { Button, Spinner } from "flowbite-react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);
  const [formInput, setFormInput] = useState({});

  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.id]: e.target.value.trim() });
  };

  console.log(formInput);

  const handleSubmit = async (e) => {
    if (!formInput.email || formInput === "") {
      return toast.error("Email is required");
    }
    if (!formInput.password || formInput === "") {
      return toast.error("Password is required");
    }
    if (formInput.password.length < 6) {
      return toast.error("minium six char ");
    }

    try {
      dispatch(signInStart());
      const res = await fetch("/api/user/sign-in", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formInput),
      });
      const data = await res.json();
      if (data.success) {
        dispatch(signInSuccess(data.user));
        navigate("/");
        return toast.success(data.message);
      }
      if (!data.success) {
        dispatch(signInFailure(data.message));
        return toast.error(data.message);
      }
    } catch (error) {
      dispatch(signInFailure(data.message));
      toast.error(error.message);
    }
  };
  return (
    <div className=" overflow-hidden min-h-screen  flex justify-center items-center">
      <div className="bg-white my-5 mx-auto rounded-lg shadow-lg max-w-md p-5 z-0">
        <h2 className="font-bold text-2xl mb-2 text-center font-lora text-sky-700">
          E-Shop
        </h2>
        <p className="mb-3 text-center font-lora font-medium text-teal-800">
          Please enter your login and password!
        </p>

        <input
          className="mb-4 w-full px-3 py-2 border rounded-lg"
          type="email"
          id="email"
          placeholder="Email address"
          onChange={handleChange}
        />
        <input
          className="mb-4 w-full px-3 py-2 border rounded-lg"
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />

        {loading ? (
          <Button className=" text-white px-4 py-2 rounded-lg w-full mb-4">
            <Spinner aria-label="Spinner button example" size="sm" />
            <span className="pl-3">Loading...</span>
          </Button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mb-4"
          >
            Login
          </button>
        )}

        <hr className="my-4" />

        <button className="bg-white text-black px-4 py-1 font-lora font-medium border rounded-lg flex items-center justify-center w-full mb-2">
          <img src={Google} className="mr-2 w-9" alt="Google" />
          Sign in with Google
        </button>
        <h2 className="text-base font-lora font-medium">
          Don't have an account ?{" "}
          <Link
            to="/sign-up"
            className="text-base font-lora font-medium text-blue-600"
          >
            {" "}
            Sign Up
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default Login;
