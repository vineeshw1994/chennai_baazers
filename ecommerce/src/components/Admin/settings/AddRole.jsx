import React, { useState } from "react";
import "../settings/settings.css";
import DashNavbar from "../dashboard/components/DashNavbar";
import SelectProducts from "./components/SelectProducts";
import SelectCategory from "./components/SelectCategory";
import SelectDashboard from "./components/SelectDashboard";
import SelectSubCategory from "./components/SelectSubCategory";
import SelectBrand from "./components/SelectBrand";
import SelectOrders from "./components/SelectOrders";
import SelectCustomer from "./components/SelectCustomer";
import { Button } from "flowbite-react";

const AddRole = () => {
  const [variants, setVariants] = useState(false);

  const handleVariants = () => {
    setVariants(!variants);
  };

  return (
    <div className="main_section">
      <DashNavbar />
      <div>
        <div className="flex flex-col md:flex- sm:flex-row items-center py-3  mx-2  my-6 justify-between px-6 border h-28 rounded-md bg-white">
          <h3 className="text-md font-thin font-poetsen lg:text-lg xl:text-xl">
            Add Role
          </h3>
        </div>
        {/* basic information */}
        <div className="border rounded-md py-4 px-4 mx-2 my-2">
          <h3 className="text-sm font-poetsen font-medium text-gray-800 lg:text-md xl:text-lg">
            Basic Information
          </h3>
          <div className="flex flex-col w-full my-4">
            <label
              htmlFor=""
              className="text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium"
            >
              Role Name
              <span className="text-lg  font-medium text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Role Name --(admin, manager,supervisior, superadmin) "
              className="rounded-md text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-10 border-gray-300"
            />
          </div>
        </div>

        {/* permissions */}
        <div className="mx-2">
          <div className="flex items-center justify-between mx-2">
            <p className="text-sm lg:text-base xl:text-base font-lora font-bold text-slate-900">
              Permissions
            </p>
            <div className="flex items-center gap-2">
              {variants ? (
                <div
                  onClick={handleVariants}
                  className="border flex justify-start items-center border-green-500 bg-gray-100 h-5 w-8 rounded-lg cursor-pointer "
                >
                  <div className="border-2 rounded-full w-4 h-4 bg-green-500 my-auto"></div>
                </div>
              ) : (
                <div
                  onClick={handleVariants}
                  className="border flex items-center justify-end bg-green-500 h-5 w-8 rounded-lg cursor-pointer "
                >
                  <div className=" rounded-full w-3 h-3 bg-white my-auto mr-1"></div>
                </div>
              )}
              <p className="text-xs lg:text-sm xl:text-base font-medium font-lora text-green-500">
                Select All
              </p>
            </div>
          </div>
        </div>

        {/* dashboard */}
       <SelectDashboard />

        {/* select all products */}
       <SelectProducts />

       {/* select all categories */}
       <SelectCategory />

       {/* select all sub categories */}
       <SelectSubCategory />

       {/* select all brands */}
       <SelectBrand />

       {/* select all orders */}
       <SelectOrders /> 

       {/* select all customer */}
       <SelectCustomer />

         {/* save product button */}
         <div className="border mx-2 rounded-md py-3 my-3 px-4 flex items-center justify-center">
          <Button
            gradientDuoTone="greenToBlue"
            className="w-36"
          >
            Save Role
          </Button>{" "}
        </div>
      </div>
    </div>
  );
};

export default AddRole;
