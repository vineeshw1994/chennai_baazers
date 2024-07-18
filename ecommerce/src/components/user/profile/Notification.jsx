import React from "react";
import image from "../../../assets/no-notification.png";

const Notification = () => {
  return (
    <div className="max-w-lg mx-auto pt-6 w-full">
      <h2 className="text-center py-2 font-semibold font-lora text-white bg-indigo-700 rounded-lg">
        Notification's
      </h2>

      <div>
        <img src={image} alt="Notification" />
      </div>
    </div>
  );
};

export default Notification;
