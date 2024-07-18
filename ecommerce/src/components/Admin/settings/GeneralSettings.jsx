import React, { useState } from "react";
import DashNavbar from "../dashboard/components/DashNavbar";
import "../settings/settings.css";
import { TiDeleteOutline } from "react-icons/ti";
import { FiPlus } from "react-icons/fi";
import { Button } from "flowbite-react";

const GeneralSettings = () => {
  const [image, setImage] = useState(null);

  const handleImgeUpload = (e) => {
    const files = e.target.files[0];
    const read = new FileReader();

    read.onload = () => {
      // Append the uploaded image data URL to the images array
      setImage(read.result);
    };

    read.readAsDataURL(files);
  };

  const handleImageDelete = () => {
    setImage("");
  };

  const handleSubmit = () => {};
  return (
    <div className="main_section">
      <DashNavbar />
      <div>
        <div className="flex flex-col md:flex- sm:flex-row items-center py-3 mx-2 my-6 justify-between px-6 border h-28 rounded-md bg-white">
          <h3 className="text-md font-medium font-poetsen lg:text-lg xl:text-xl">
            General Settings
          </h3>
        </div>

        {/* basic information */}
        <div className="border rounded-md py-4 px-4 mx-2 my-2">
          <h3 className="text-sm font-poetsen font-medium text-gray-800 lg:text-md xl:text-lg">
            Basic Information
            <span className="text-lg  font-medium text-red-600">*</span>
          </h3>
          <div className="flex flex-col w-full my-4">
            <label
              htmlFor=""
              className="text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium"
            >
              Shop Tittle
            </label>
            <input
              type="text"
              placeholder="Enter Category Name"
              value={"E-Shop"}
              className="rounded-md text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-10 border-gray-300"
            />
          </div>
        </div>

        {/* shop image */}
        <div className="border rounded-md py-4 px-4 mx-2 my-2">
          <h3 className="text-sm font-poetsen font-medium text-gray-800 lg:text-md xl:text-lg">
            Shop Logo
            <span className="text-lg font-medium text-red-600">*</span>
          </h3>
          <div className="flex w-full border border-dashed items-center justify-center my-4 h-56">
            <div className="mr-4 flex items-center gap-2">
              {image && (
                <div className="relative">
                  <img
                    src={image}
                    alt="Image"
                    className="h-16 w-16 shadow-sm rounded-full object-content cursor-pointer "
                  />
                  <button
                    onClick={handleImageDelete}
                    className="absolute top-0 right-0  h-16 w-16 rounded-full bg-red-100 border-none  flex items-center justify-center text-white transition duration-300 opacity-0 hover:opacity-100"
                  >
                    <TiDeleteOutline className="text-3xl text-red-600" />
                  </button>
                </div>
              )}
            </div>
            <label
              htmlFor="fileInput"
              className="cursor-pointer flex items-center justify-center border border-gray-400 rounded-full h-20 w-20 hover:bg-gray-100"
            >
              <FiPlus className="text-4xl text-gray-500" />
              <span className="text-sm text-gray-600"></span>
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={handleImgeUpload}
              />
            </label>
          </div>
        </div>

        {/* Dashboard image */}
        <div className="border rounded-md py-4 px-4 mx-2 my-2">
          <h3 className="text-sm font-poetsen font-medium text-gray-800 lg:text-md xl:text-lg">
            Dashboard Logo
            {/* <span className="text-lg font-medium text-red-600">*</span> */}
          </h3>
          <div className="flex w-full border border-dashed items-center justify-center my-4 h-56">
            <div className="mr-4 flex items-center gap-2">
              {image && (
                <div className="relative">
                  <img
                    src={image}
                    alt="Image"
                    className="h-16 w-16 shadow-sm rounded-full object-content cursor-pointer "
                  />
                  <button
                    onClick={handleImageDelete}
                    className="absolute top-0 right-0  h-16 w-16 rounded-full bg-red-100 border-none  flex items-center justify-center text-white transition duration-300 opacity-0 hover:opacity-100"
                  >
                    <TiDeleteOutline className="text-3xl text-red-600" />
                  </button>
                </div>
              )}
            </div>
            <label
              htmlFor="fileInput"
              className="cursor-pointer flex items-center justify-center border border-gray-400 rounded-full h-20 w-20 hover:bg-gray-100"
            >
              <FiPlus className="text-4xl text-gray-500" />
              <span className="text-sm text-gray-600"></span>
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={handleImgeUpload}
              />
            </label>
          </div>
        </div>

        {/* maintenance mode */}
        <div className="border rounded-md py-4 px-4 mx-2 my-2">
          <h3 className="text-sm font-poetsen font-medium text-gray-800 lg:text-md xl:text-lg">
            Maintenance Mode
            {/* <span className="text-lg  font-medium text-red-600">*</span> */}
          </h3>
          <select
            name="category"
            id="category"
            className="rounded-md w-full  bg-gray-100 text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-12 border-gray-300"
          >
            <option value="" disabled selected>
              Set maintenance mode
            </option>
            <option value="Mobile">Enable</option>
            <option value="Laptop">Disable</option>
          </select>
        </div>

        {/* save product button */}
        <div className="border mx-2 rounded-md py-3 my-3 px-4 flex items-center justify-center">
          <Button
            onClick={handleSubmit}
            gradientDuoTone="greenToBlue"
            className="w-36"
          >
            Save Configuration
          </Button>{" "}
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
