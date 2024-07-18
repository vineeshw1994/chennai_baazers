import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import "../banners/banners.css";
import DashNavbar from "../dashboard/components/DashNavbar";
import { TiDeleteOutline } from "react-icons/ti";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { Tooltip } from "flowbite-react";
import toast from "react-hot-toast";

const NavBanner = () => {
  const [variants, setVariants] = useState(false);
  const [banners, setBanners] = useState([]);

  const banner =
    "https://as2.ftcdn.net/v2/jpg/03/39/60/67/1000_F_339606710_pFQOII8MwyEVqXK5vb4XsIaJr13cipWO.jpg";

  const handleVariants = () => {
    setVariants(!variants);
  };

  const fetchBanners = async () => {
    try {
      const res = await fetch("/api/banner/get-nav-banner");
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      setBanners(data.banners);
    } catch (error) {
      return toast.error("Internal Error");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);
  console.log(banners);
  return (
    <div className="main_section">
      <DashNavbar />

      <div>
        <div className="flex flex-col md:flex- sm:flex-row items-center py-3 mx-2 my-6 justify-between px-6 border h-28 rounded-md bg-white">
          <h3 className="text-md font-medium font-poetsen lg:text-lg xl:text-xl">
            Home Banner
          </h3>
          <div className="flex items-center gap-5">
            <Link to="/admin?tab=addnavbanner">
              <button className="border rounded-md py-2 px-2 bg-green-500 hover:bg-green-600 text-white">
                <span className="text-xl">+</span> Add Banner
              </button>
            </Link>
          </div>
        </div>

        {/* header section */}
        <div className="flex items-center justify-around py-3 border mx-2">
          <form class="w-72 lg:w-80 xl:w-96">
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
                placeholder="Search Banner"
                required
              />
              <button
                type="submit"
                class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
          <div className="flex items-center gap-2 lg:gap-6 xl:gap-8">
            <select
              name=""
              id=""
              defaultValue="    "
              className="rounded-md w-24 h-11 md:w-28 lg:w-32 xl:w-36 text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium  border-gray-400"
            >
              <option disabled>Select Type</option>
              <option value="">By Name</option>
              <option value="">Recent</option>
            </select>
          </div>
        </div>

        {/* categories table */}
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
                          Banner
                        </th>
                        <th scope="col" className="px-6 py-4 font-lora">
                          Tittle
                        </th>
                        <th scope="col" className="px-6 py-4 font-lora">
                          Start Date
                        </th>
                        <th scope="col" className="px-6 py-4 font-lora">
                          End Date
                        </th>
                        <th scope="col" className="px-6 py-4 font-lora">
                          Published
                        </th>
                        <th scope="col" className="px-6 py-4 font-lora">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {banners &&
                        banners.map((data, index) => (
                          <tr
                            key={data.id}
                            className="border-b dark:border-neutral-500"
                          >
                            <td className="whitespace-nowrap px-6 py-4 text-xs xl:text-base lg:text-sm text-teal-700 font-medium">
                              {index + 1}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-xs xl:text-base lg:text-sm text-teal-700 font-medium">
                              <img
                                className="w-20 h-14 rounded-md object-contain"
                                src={data.image_url}
                                alt="banner"
                              />
                            </td>
                            <td className="capitalize whitespace-nowrap px-6 py-4 text-xs xl:text-base lg:text-sm text-teal-700 font-medium">
                              {data.name}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-xs xl:text-base lg:text-sm text-teal-700 font-medium">
                              {new Date(data.start_date).toLocaleDateString(
                                "en-GB"
                              )}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-xs xl:text-base lg:text-sm text-teal-700 font-medium">
                            {new Date(data.end_date).toLocaleDateString(
                                "en-GB"
                              )}
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
                        ))}
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

export default NavBanner;
