import React from "react";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { FaPinterest } from "react-icons/fa";
const Footer = () => {
  return (
    <div className=" pt-5 bg-stone-100 ">
      <div className="flex justify-around items-center">
        <div className="flex-col">
          <h2 className="text-lg text-gray-600 font-medium mb-1">Categories</h2>
          <div className="text-center">
            <p className="text-sm p-1 cursor-pointer">Laptops</p>
            <p className="text-sm p-1 cursor-pointer">Mobiles</p>
            <p className="text-sm p-1 cursor-pointer">Monitors</p>
            <p className="text-sm p-1 cursor-pointer">Speakers</p>
            <p className="text-sm p-1 cursor-pointer">Toys</p>
          </div>
          <a href="#">
            <img
              className="h-10 w-15"
              src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png"
              alt="Get it on Google Play"
            />
          </a>
        </div>

        <div className="flex-col mb-14">
          <h2 className="text-lg text-gray-600 font-medium mb-1 ">
            Customer Care
          </h2>
          <div className="text-center">
            <p className="text-sm p-1 cursor-pointer">Contact Us</p>
            <p className="text-sm p-1 cursor-pointer">Android Permissions</p>
            <p className="text-sm p-1 cursor-pointer">Privacy</p>
            <p className="text-sm p-1 cursor-pointer">Terms</p>
          </div>
        </div>

        <div className="flex-col mb-24">
          <h2 className="text-lg text-gray-600 font-medium mb-4 ">
            Contact Us
          </h2>
          <p className="text-sm p-1 cursor-pointer">+9100000000 | Contact Us</p>
          <div className="flex justify-around pt-3">
            <FaTwitter className="text-xl mr-3 hover:text-blue-900" />
            <FaFacebookSquare className="text-xl mr-3 hover:text-blue-900" />
            <BsInstagram className="text-xl mr-3 hover:text-blue-900" />
            <FaPinterest className="text-xl  hover:text-blue-900" />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="flex-col w-96">
          <h3 className="text-center mt-3 p-2 text-lg text-gray-600">
            Payment Methods
          </h3>
          <div className="flex justify-center items-center space-x-4 ">
            <img
              className="h-6 w-9"
              src="https://res.cloudinary.com/mela-techologies-inc/image/upload/v1686146874/namaste-app-resources/images_1_g8ivfe.png"
              alt=""
            />
            <img
              className="h-6 w-9"
              src="https://res.cloudinary.com/mela-techologies-inc/image/upload/v1686147109/namaste-app-resources/Mastercard_logo_fxaudc.jpg"
              alt=""
            />
            <img
              className="h-6 w-9"
              src="https://res.cloudinary.com/mela-techologies-inc/image/upload/v1686147110/namaste-app-resources/06cd1a3c_rupay-logo_n8hekv.jpg"
              alt=""
            />
            <img
              className="h-6 w-9"
              src="https://res.cloudinary.com/mela-techologies-inc/image/upload/v1686147159/namaste-app-resources/download_3_thecci.jpg"
              alt=""
            />
            <img
              className="h-6 w-9"
              src="https://res.cloudinary.com/mela-techologies-inc/image/upload/v1686147231/namaste-app-resources/phonepe_mainbanner2_ljgrgu.jpg"
              alt=""
            />
          </div>
          <div className="text-center mt-6 p-2 mb-8">
            <p className="text-sm text-gray-600">@2024, All Rights Reserved</p>
            <p className="text-sm text-gray-600">Powered By Names</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
