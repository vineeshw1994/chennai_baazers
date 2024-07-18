import React from "react";
import { GiCardPickup } from "react-icons/gi";
import { MdOutlineCancel } from "react-icons/md";
import { PiTruckLight } from "react-icons/pi";
import { TbBrandCashapp } from "react-icons/tb";
import { GoCreditCard } from "react-icons/go";
import { CiBoxes } from "react-icons/ci";
import { LiaListSolid } from "react-icons/lia";
import { HiOutlineUsers } from "react-icons/hi2";

const ShowOrderStatus = () => {
  return (
    <div className="flex  flex-wrap items-center  justify-around  my-5 gap-3">
      <div className="flex items-center border py-2 px-3 rounded-md w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/5 xl:w-1/5">
        <GiCardPickup className="text-6xl text-green-400 py-2 rounded-full " />
        <div className="flex flex-col items-center ">
          <p className="text-sm lg:text-lg xl:text-lg font-medium ">192</p>
          <p className="text-sm lg:text-sm xl:text-lg font-medium text-gray-500">
           Order Pickup
          </p>
        </div>
      </div>
      <div className="flex items-center border py-2 px-3 rounded-md w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/5 xl:w-1/5">
        {" "}
        <MdOutlineCancel className="text-6xl text-red-400 py-2 rounded-full " />
        <div className="flex flex-col items-center ">
          <p className="text-sm lg:text-lg xl:text-lg font-medium ">138</p>
          <p className="text-sm lg:text-sm xl:text-lg font-medium text-gray-500">
            Cancel Orders
          </p>
        </div>
      </div>
      <div className="flex items-center border py-2 px-3 rounded-md w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/5 xl:w-1/5">
        {" "}
        <PiTruckLight className=" text-6xl text-blue-400  py-2 rounded-full " />
        <div className="flex flex-col items-center ">
          <p className="text-sm lg:text-lg xl:text-lg font-medium ">5</p>
          <p className="text-sm lg:text-sm xl:text-lg font-medium text-gray-500">
            Out For Delivery
          </p>
        </div>
      </div>
      <div className="flex items-center border py-2 px-3 rounded-md w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/5 xl:w-1/5">
        {" "}
        <TbBrandCashapp className="text-6xl text-fuchsia-400  py-2 rounded-full " />
        <div className="flex flex-col items-center ">
          <p className="text-sm lg:text-lg xl:text-lg font-medium ">45</p>
          <p className="text-sm lg:text-sm xl:text-lg font-medium text-gray-500">
            Paid Orders
          </p>
        </div>
      </div>
      <div className="flex items-center border py-2 px-3 rounded-md w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/5 xl:w-1/5">
        <GoCreditCard className="text-6xl text-indigo-400 py-2 rounded-full " />
        <div className="flex flex-col items-center ">
          <p className="text-sm lg:text-lg xl:text-lg font-medium ">192</p>
          <p className="text-sm lg:text-sm xl:text-lg font-medium text-gray-500">
            Unpaid Orders
          </p>
        </div>
      </div>
      <div className="flex items-center border py-2 px-3 rounded-md w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/5 xl:w-1/5">
        {" "}
        <CiBoxes className="text-6xl text-green-700 bg-agenta-100 py-2 rounded-full " />
        <div className="flex flex-col items-center ">
          <p className="text-sm lg:text-lg xl:text-lg font-medium ">138</p>
          <p className="text-sm lg:text-sm xl:text-lg font-medium text-gray-500">
            Total Products
          </p>
        </div>
      </div>
      <div className="flex items-center border py-2 px-3 rounded-md w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/5 xl:w-1/5">
        {" "}
        <LiaListSolid className=" text-6xl text-amber-400  py-2 rounded-full " />
        <div className="flex flex-col items-center ">
          <p className="text-sm lg:text-lg xl:text-lg font-medium ">5</p>
          <p className="text-sm lg:text-sm xl:text-lg font-medium text-gray-500">
            Total Categories
          </p>
        </div>
      </div>
      <div className="flex items-center border py-2 px-3 rounded-md w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/5 xl:w-1/5">
        {" "}
        <HiOutlineUsers className="text-6xl text-purple-400  py-2 rounded-full " />
        <div className="flex flex-col items-center ">
          <p className="text-sm lg:text-lg xl:text-lg font-medium ">45</p>
          <p className="text-sm lg:text-sm xl:text-lg font-medium text-gray-500">
            Total Customers
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowOrderStatus;
