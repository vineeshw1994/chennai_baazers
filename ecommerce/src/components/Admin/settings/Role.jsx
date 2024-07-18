import React, { useState } from "react";
import "../settings/settings.css";
import DashNavbar from "../dashboard/components/DashNavbar";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { Tooltip } from "flowbite-react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";

const Role = () => {
  const [variants, setVariants] = useState(false);

  const handleVariants = () => {
    setVariants(!variants);
  };
  return (
    <div className="main_section">
      <DashNavbar />

      <div>
        <div className="flex flex-col md:flex- sm:flex-row items-center py-3 mx-2 my-6 justify-between px-6 border h-28 rounded-md bg-white">
          <h3 className="text-md font-medium font-poetsen lg:text-lg xl:text-xl">
            Roles
          </h3>
          <div className="flex items-center gap-5">
            <Link to="/admin?tab=addrole">
              <button className="border rounded-md py-2 px-2 bg-green-500 hover:bg-green-600 text-white">
                <span className="text-xl">+</span> Add Role
              </button>
            </Link>
          </div>
        </div>
        {/* header section */}
        <div className="w-full py-3 border mx-2 flex justify-center">
          <form class="w-72 sm:w-1/2 md:w-1/2 lg:w-1/2  xl:w-11/12 xl:ml-4">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <IoIosSearch className="text-xl xl:text-2xl" />
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                required
              />
              <button
                type="submit"
                class="text-white absolute end-2.5 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* persons table */}
        <div className="mx-2 border rounded-sm">
          <div className="flex flex-col ">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4 font-lora ">
                          Sl/No
                        </th>
                        <th scope="col" className="px-6 py-4 font-lora">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-4 font-lora">
                          Created By
                        </th>
                        <th scope="col" className="px-6 py-4 font-lora">
                          Created At
                        </th>
                        <th scope="col" className="px-6 py-4 font-lora">
                          Activity
                        </th>
                        <th scope="col" className="px-6 py-4 font-lora">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4 text-xs xl:text-base lg:text-sm text-teal-700 font-medium">
                          1
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs xl:text-base lg:text-sm text-teal-700 font-medium">
                          vineesh
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs xl:text-base lg:text-sm text-teal-700 font-medium">
                          vineesh
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs xl:text-base lg:text-sm text-teal-700 font-medium">
                          31/05/2024
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs xl:text-base lg:text-sm text-teal-700 font-medium">
                          {variants ? (
                            <div
                              onClick={handleVariants}
                              className="border flex justify-start items-center border-green-500 bg-gray-100 h-4 w-8 rounded-lg cursor-pointer "
                            >
                              <div className="border-2 rounded-full w-3 h-3 bg-green-500 my-auto"></div>
                            </div>
                          ) : (
                            <div
                              onClick={handleVariants}
                              className="border flex items-center justify-end bg-green-500 h-4 w-8 rounded-lg cursor-pointer "
                            >
                              <div className=" rounded-full w-2 h-2 bg-white my-auto mr-1"></div>
                            </div>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex gap-2">
                            <Tooltip
                              content="Edit"
                              style="light"
                              placement="left"
                            >
                              <CiEdit className="text-2xl text-purple-600 cursor-pointer" />
                            </Tooltip>
                            <Tooltip
                              content="Delete"
                              placement="right"
                              style="light"
                            >
                              <RiDeleteBinLine className="text-2xl text-rose-500 cursor-pointer" />
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4 text-xs xl:text-base lg:text-sm text-teal-700 font-medium">
                          2
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs xl:text-base lg:text-sm text-teal-700 font-medium">
                          wilson
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs xl:text-base lg:text-sm text-teal-700 font-medium">
                          vineesh
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs xl:text-base lg:text-sm text-teal-700 font-medium">
                          31/05/2024
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xs xl:text-base lg:text-sm text-teal-700 font-medium">
                          {variants ? (
                            <div
                              onClick={handleVariants}
                              className="border flex justify-start items-center border-green-500 bg-gray-100 h-4 w-8 rounded-lg cursor-pointer "
                            >
                              <div className="border-2 rounded-full w-3 h-3 bg-green-500 my-auto"></div>
                            </div>
                          ) : (
                            <div
                              onClick={handleVariants}
                              className="border flex items-center justify-end bg-green-500 h-4 w-8 rounded-lg cursor-pointer "
                            >
                              <div className=" rounded-full w-2 h-2 bg-white my-auto mr-1"></div>
                            </div>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex gap-2">
                            <Tooltip
                              content="Edit"
                              style="light"
                              placement="left"
                            >
                              <CiEdit className="text-2xl text-purple-600 cursor-pointer" />
                            </Tooltip>
                            <Tooltip
                              content="Delete"
                              placement="right"
                              style="light"
                            >
                              <RiDeleteBinLine className="text-2xl text-rose-500 cursor-pointer" />
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Role;
