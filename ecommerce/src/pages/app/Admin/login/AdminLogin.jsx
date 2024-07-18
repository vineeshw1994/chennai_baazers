import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Spinner } from "flowbite-react";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../../../redux/admin/adminAuthSlice.js";
const AdiminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formInput, setFormInput] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.id]: e.target.value.trim() });
  };

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
      setLoading(true);
      dispatch(signInStart());
      const res = await fetch("/api/admin/admin-login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formInput),
      });
      const data = await res.json();
      console.log(data);
      if (!data.success) {
        setLoading(false);
        dispatch(signInFailure(data.message));
        return toast.error(data.message);
      }
      if (data.success) {
        setLoading(false);
        dispatch(signInSuccess(data.admin));
        navigate("/admin?tab=dashmain", { replace: true });
        toast.success(data.message);
        return;
      }
    } catch (error) {
      setLoading(false);
      dispatch(signInFailure(data.message));
      toast.error(error.message);
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-900 to-purple-900 overflow-hidden relative min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-5">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 z-10">
            <h1 className="text-5xl font-bold tracking-tight text-blue-200 mb-5">
              Welcome Back!
            </h1>
            <p className="text-blue-100 opacity-70 mb-5">
              Sign in to continue to your account. If you don't have an account,
              you can sign up for one.
            </p>
          </div>

          <div className="w-full lg:w-1/2 relative">
            <div
              className="absolute bg-gradient-to-br from-purple-800 to-purple-600 rounded-full"
              style={{
                height: "220px",
                width: "220px",
                top: "-60px",
                left: "-130px",
              }}
            ></div>
            <div
              className="absolute bg-gradient-to-br from-purple-800 to-purple-600 rounded-full"
              style={{
                height: "300px",
                width: "300px",
                bottom: "-60px",
                right: "-110px",
                borderRadius: "38% 62% 63% 37% / 70% 33% 67% 30%",
              }}
            ></div>

            <div className="relative bg-white bg-opacity-90 backdrop-blur-lg p-8 rounded-xl shadow-lg w-96 mx-auto">
              <h2 className="text-teal-800 font-lora font-semibold text-xl text-center mt-2 mb-6">
                Admin Login
              </h2>
              <div>
                <div className="mb-4">
                  <label
                    className="form-label block text-gray-700 font-lora font-medium"
                    htmlFor="email"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 font-lora font-medium"
                    placeholder="Enter email"
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="form-label block text-gray-700 font-lora font-medium"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 font-lora font-medium"
                    placeholder="Enter password"
                    onChange={handleChange}
                  />
                </div>

                {loading ? (
                  <button className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <Spinner color="info" aria-label="Info spinner example" />{" "}
                    loading ....
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Sign in
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdiminLogin;
