import React, { useState } from "react";

const SelectOrders = () => {
  const [orders, setOrders] = useState(false);
  const [manageOrders, setManageOrders] = useState(false)

  const handleOrders = () => setOrders((prevState) => !prevState);

  const handleManageOrders = () => setManageOrders((prevState) => !prevState) 

  return (
    <div className="border  rounded-md mx-2 my-2 py-4 px-4">
      <p className="cursor-pointer bg-sky-100 w-56 px-2 py-1 rounded-lg text-sm xl:text-base lg:text-base text-teal-800 font-lora font-medium">
        Select all of Orders
      </p>
      <div className="w-full flex items-center justify-between flex-wrap xl:justify-start xl:gap-4 lg:justify-start lg:gap-4 ">
        {/* orders */}
        <div className="flex items-center justify-between w-56 h-10 my-2 rounded-md py-1 px-2 bg-neutral-100">
          <p className="text-sm font-lora font-medium text-teal-900 lg:text-sm xl:text-base">
            Orders
          </p>
          {orders ? (
            <div
              onClick={handleOrders}
              className="border flex justify-start items-center border-gray-400 bg-white h-4 w-8  rounded-lg cursor-pointer "
            >
              <div className="border-1 rounded-full w-3 h-3 ml-1 bg-gray-400 my-auto"></div>
            </div>
          ) : (
            <div
              onClick={handleOrders}
              className="border flex items-center justify-end bg-green-500 h-4 w-8 rounded-lg cursor-pointer "
            >
              <div className=" rounded-full w-3 h-3 bg-white my-auto mr-1"></div>
            </div>
          )}
        </div>

        {/* manage orders */}
        <div className="flex items-center justify-between w-56 h-10 my-2 rounded-md py-1 px-2 bg-neutral-100">
          <p className="text-sm font-lora font-medium text-teal-900 lg:text-sm xl:text-base">
            Manage Orders
          </p>
          {manageOrders ? (
            <div
              onClick={handleManageOrders}
              className="border flex justify-start items-center border-gray-400 bg-white h-4 w-8  rounded-lg cursor-pointer "
            >
              <div className="border-1 rounded-full w-3 h-3 ml-1 bg-gray-400 my-auto"></div>
            </div>
          ) : (
            <div
              onClick={handleManageOrders}
              className="border flex items-center justify-end bg-green-500 h-4 w-8 rounded-lg cursor-pointer "
            >
              <div className=" rounded-full w-3 h-3 bg-white my-auto mr-1"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectOrders;
