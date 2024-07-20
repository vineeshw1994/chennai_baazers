import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import OTPInput from "otp-input-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../../../redux/user/userSlice";
const Otp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  });
  const [timer, setTimer] = useState(() => {
    const storedTimer = localStorage.getItem("otpTimer");
    return storedTimer ? parseInt(storedTimer, 10) : 60;
  });
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer - 1;
          localStorage.setItem("otpTimer", newTimer);
          return newTimer;
        });
      }, 1000);

      return () => clearInterval(countdown);
    } else {
      localStorage.removeItem("otpTimer");
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (value.length <= 1) {
      setOtp({ ...otp, [id]: value });
      if (value !== "") {
        const nextInput = document.querySelector(
          `#input${parseInt(id.replace("input", "")) + 1}`
        );
        if (nextInput !== null) {
          nextInput.focus();
        }
      }
    }
  };
  const handleKeyDown = (e) => {
    const { id, value } = e.target;
    if (e.key === "Backspace" && value === "") {
      const prevInput = document.querySelector(
        `#input${parseInt(id.replace("input", "")) - 1}`
      );
      if (prevInput !== null) {
        prevInput.focus();
      }
    }
  };
  const handleSubmit = async () => {
    const otpCode = Object.values(otp).join("");
    if (!otpCode || otpCode === "") {
      return toast.error("OTP required");
    }
    try {
      dispatch(signInStart());
      const res = await fetch("api/user/signup-otp", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: otpCode }),
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        dispatch(signInFailure(data.message));
        return toast.error(data.message);
      }
      if (data.success) {
        dispatch(signInSuccess(data.user));
        toast.success(data.success);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleResendOTP = () => {
    // Handle OTP resend logic here
    toast.success("Resend otp successfully");
    setTimer(60); // Reset timer
    localStorage.setItem('otpTimer', 60);
    setCanResend(false); // Disable resend button
  };

  return (
    <div className="bg-stone-200 min-h-screen flex justify-center items-center">
      <div className="verifyDiv bg-gray-100 p-8 rounded-lg shadow-md">
        <p className="font-bold text-2xl mb-2 text-center font-lora text-teal-800">
          Verify Account
        </p>
        <p className="mb-3 text-center font-lora font-medium text-gray-800">
          An OTP has been sent to your entered mobile number
        </p>

        <div className="otpElements mt-6">
          <section className="flex flex-col items-center p-4 bg-gray-100 rounded-md shadow-md max-w-md mx-auto">
            <div className="text-2xl font-semibold mb-4">Enter OTP</div>
            <div id="inputs" className="flex space-x-2 mb-4">
              <input
                id="input1"
                type="text"
                maxLength="1"
                value={otp.input1}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <input
                id="input2"
                type="text"
                maxLength="1"
                value={otp.input2}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <input
                id="input3"
                type="text"
                maxLength="1"
                value={otp.input3}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <input
                id="input4"
                type="text"
                maxLength="1"
                value={otp.input4}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
            <div className="text-center mt-4">
              <p className="text-sm">Resend OTP in {timer} seconds</p>
              {canResend && (
                <button
                  onClick={handleResendOTP}
                  className="text-sm underline  bg-cyan-600 text-white px-2 rounded-lg py-1 font-lato "
                >
                  Resend OTP
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Otp;
