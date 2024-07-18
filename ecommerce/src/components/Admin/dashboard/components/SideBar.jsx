import React from "react";
import { TbReportSearch } from "react-icons/tb";
import { RiPieChartFill } from "react-icons/ri";
import { LuSettings } from "react-icons/lu";
import {
  HiShoppingBag,
  HiUsers,
  HiClipboardList,
  HiInformationCircle,
} from "react-icons/hi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PiListBulletsFill } from "react-icons/pi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import toast from "react-hot-toast";

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [bannerDropdown, setBannerDropdown] = useState(false);
  const [settingDropdown, setSettingDropdown] = useState(false);
  const logo =
    "https://banner2.cleanpng.com/20180319/pde/kisspng-computer-icons-icon-design-avatar-flat-face-icon-5ab06e33bee962.122118601521511987782.jpg";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMouseEnter = () => {
    setIsSidebarOpen(true);
  };

  const handleMouseLeave = () => {
    setIsSidebarOpen(false);
  };

  const productDropDown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const bannerDrop = () => {
    setBannerDropdown((prevState) => !prevState);
  };

  const settingDrop = () => {
    setSettingDropdown((prevState) => !prevState);
  };
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`flex ${
        isSidebarOpen ? "w-64    " : "w-16  "
      } 'bg-slate-950   h-screen cursor-pointer border-r-2  hidden lg:block xl:block `}
    >
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "flex flex-col w-80" : "w-16 h-full"}`}
      >
        {/* Sidebar Logo */}
        <div className="flex items-center justify-start h-16 ml-2 mt-1 ">
          {isSidebarOpen ? (
            <div className="flex items-center gap-4">
              <img className="h-10 rounded-full" src={logo} alt="logo" />
              <div className="flex flex-col items-center">
                <p className="text-base text-teal-700 font-serif xl:text-lg">
                  Vineesh
                </p>
                <p className="text-base text-white bg-cyan-600  px-2 rounded-lg font-serif xl:text-lg">
                  Admin
                </p>
              </div>
            </div>
          ) : (
            <img className="h-10 rounded-full" src={logo} alt="logo" />
          )}
        </div>

        {/* Sidebar Items */}
        <div className="flex flex-col mt-4">
          {/* Sidebar Item Group */}

          <div className="flex flex-col">
            {/* Sidebar Item */}
            {isSidebarOpen ? (
              <Link
                to="/admin?tab=dashmain"
                className={`flex items-center py-2 m-2 w-56  rounded px-4 text-gray-700 hover:bg-gray-200 ${
                  location.search.includes("tab=dashmain")
                    ? "bg-gray-300 text-white"
                    : ""
                }`}
              >
                <RiPieChartFill
                  className={`mr-2 text-xl ${
                    location.search.includes("tab=dashmain")
                      ? " text-teal-700"
                      : ""
                  }  `}
                />
                <span className="text-sm lg:text-base xl:text-lg text-sky-700 font-semibold">
                  Dashboard
                </span>
              </Link>
            ) : (
              <Link
                to="/admin?tab=dashmain"
                className={`flex items-center py-2 m-2 w-14 md:w-auto rounded px-4 text-gray-700 hover:bg-gray-200 ${
                  location.search.includes("tab=dashmain")
                    ? "bg-gray-300 text-white"
                    : ""
                }`}
              >
                <RiPieChartFill
                  className={` text-3xl  font-bold ${
                    location.search.includes("tab=dashmain")
                      ? " text-teal-700"
                      : ""
                  }  `}
                />
              </Link>
            )}
            {isSidebarOpen ? (
              <>
                <div
                  onClick={productDropDown}
                  className={`cursor-pointer flex items-center py-2 m-2 w-56 rounded px-4 text-gray-700 hover:bg-gray-200 ${
                    location.search.includes("tab=products") ||
                    location.search.includes("tab=categories") ||
                    location.search.includes("tab=variants") ||
                    location.search.includes("tab=brands")
                      ? "bg-gray-300 text-white"
                      : ""
                  }`}
                >
                  <HiShoppingBag className="mr-2 text-gray-500 text-xl" />
                  <span className="text-sm lg:text-base xl:text-lg text-sky-700 font-semibold">
                    Products
                  </span>
                  <span className="ml-2 mt-1 text-lg text-black">
                    {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
                </div>
                {isDropdownOpen && (
                  <div className="flex flex-col items-start pl-6 w-60  gap-4 bg-gray-100 rounded-md py-2  ">
                    <Link to="/admin?tab=products" className="w-full pr-2">
                      <p
                        className={`px-4 text-sm rounded-md font-lora font-semibold text-teal-700 border-b ${
                          location.search.includes("tab=products")
                            ? "bg-teal-600 text-white hover:bg-teal-700 "
                            : " text-slate-800 hover:text-white hover:bg-sky-800 "
                        } `}
                      >
                        Products
                      </p>
                    </Link>
                    <Link to="/admin?tab=basecategory" className="w-full pr-2">
                      <p
                        className={`px-4 text-sm rounded-md font-lora font-semibold text-teal-700 border-b  ${
                          location.search.includes("tab=basecategory")
                            ? "bg-teal-600 text-white hover:bg-teal-700 "
                            : " text-slate-800 hover:text-white hover:bg-sky-800"
                        } `}
                      >
                        Base Categories
                      </p>
                    </Link>
                    <Link to="/admin?tab=subcategory" className="w-full pr-2">
                      <p
                        className={`px-4 text-sm rounded-md font-lora font-semibold text-teal-700 border-b  ${
                          location.search.includes("tab=subcategory")
                            ? "bg-teal-600 text-white hover:bg-teal-700 "
                            : "  text-slate-800 hover:text-white hover:bg-sky-800"
                        } `}
                      >
                        Sub Categories
                      </p>
                    </Link>
                    <Link to="/admin?tab=variants" className="w-full pr-2">
                      <p
                        className={`px-4 text-sm rounded-md font-lora font-semibold text-teal-700 border-b  ${
                          location.search.includes("tab=variants")
                            ? "bg-teal-600 text-white hover:bg-teal-700 "
                            : " text-slate-800 hover:text-white hover:bg-sky-800 "
                        } `}
                      >
                        Variants
                      </p>
                    </Link>
                    <Link to="/admin?tab=brands" className="w-full pr-2">
                      <p
                        className={`px-4 text-sm rounded-md font-lora font-semibold text-teal-700 border-b ${
                          location.search.includes("tab=brands")
                            ? "bg-teal-600 text-white hover:bg-teal-700 "
                            : "  text-slate-800 hover:text-white hover:bg-sky-800 "
                        } `}
                      >
                        Brands
                      </p>
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <Link
                className={`flex items-center py-2 m-2 w-16 md:w-auto rounded px-4 text-gray-700 hover:bg-gray-200 ${
                  location.search.includes("tab=products") ||
                  location.search.includes("tab=categories") ||
                  location.search.includes("tab=variants") ||
                  location.search.includes("tab=brands")
                    ? "bg-gray-300 text-white"
                    : ""
                }`}
              >
                <PiListBulletsFill
                  className={` text-3xl  f ${
                    location.search.includes("tab=products") ||
                    location.search.includes("tab=categories") ||
                    location.search.includes("tab=variants") ||
                    location.search.includes("tab=brands")
                      ? " text-teal-700"
                      : ""
                  }  `}
                />
              </Link>
            )}
          </div>

          <div className="flex flex-col">
            {/* Sidebar Item */}
            {isSidebarOpen ? (
              <Link
                to="/admin?tab=users"
                className={`flex items-center py-2 m-2 w-56 rounded px-4 text-gray-700 hover:bg-gray-200 ${
                  location.search.includes("tab=users")
                    ? "bg-gray-300 text-white"
                    : ""
                }`}
              >
                <HiUsers
                  className={`mr-2 text-xl ${
                    location.search.includes("tab=users")
                      ? " text-teal-700"
                      : ""
                  }  `}
                />
                <span className="text-sm lg:text-base xl:text-lg  text-sky-700 font-semibold">
                  Users
                </span>
              </Link>
            ) : (
              <Link
                to="/admin?tab=users"
                className={`flex items-center py-2 m-2 w-16 md:w-auto rounded px-4 text-gray-700 hover:bg-gray-200 ${
                  location.search.includes("tab=users")
                    ? "bg-gray-300 text-white"
                    : ""
                }`}
              >
                <HiUsers
                  className={` text-3xl  font-bold ${
                    location.search.includes("tab=users")
                      ? " text-teal-700 "
                      : ""
                  }  `}
                />
              </Link>
            )}
          </div>

          <div className="flex flex-col">
            {/* Sidebar Item */}
            {isSidebarOpen ? (
              <Link
                to="/admin?tab=orders"
                className={`flex items-center py-2 m-2 w-56 rounded px-4 text-gray-700 hover:bg-gray-200 ${
                  location.search.includes("tab=orders")
                    ? "bg-gray-300 text-white"
                    : ""
                }`}
              >
                <HiClipboardList
                  className={`mr-2 text-xl ${
                    location.search.includes("tab=orders")
                      ? " text-teal-700"
                      : ""
                  }  `}
                />
                <span className="text-sm lg:text-base xl:text-lg text-sky-700 font-semibold">
                  Orders
                </span>
              </Link>
            ) : (
              <Link
                to="/admin?tab=orders"
                className={`flex items-center py-2 m-2 w-16 md:w-auto rounded px-4 text-gray-700 hover:bg-gray-200 ${
                  location.search.includes("tab=orders")
                    ? "bg-gray-300 text-white"
                    : ""
                }`}
              >
                <HiClipboardList
                  className={` text-3xl  font-bold ${
                    location.search.includes("tab=orders")
                      ? " text-teal-700 "
                      : ""
                  }  `}
                />
              </Link>
            )}

            {isSidebarOpen ? (
              <>
                <div
                  onClick={bannerDrop}
                  className={`cursor-pointer flex items-center py-2 m-2 w-56 rounded px-4 text-gray-700 hover:bg-gray-200 ${
                    location.search.includes("tab=navbanner") ||
                    location.search.includes("tab=product-banner") ||
                    location.search.includes("tab=special-day-banner")
                      ? "bg-gray-300 text-white"
                      : ""
                  }`}
                >
                  <HiShoppingBag className={`mr-2 text-gray-500 text-xl `} />
                  <span className="text-sm lg:text-base xl:text-lg text-sky-700 font-semibold">
                    Banners
                  </span>
                  <span className="ml-2 mt-1 text-lg text-black">
                    {bannerDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
                </div>
                {bannerDropdown && (
                  <div className="flex flex-col items-start pl-6 w-60  gap-4 bg-gray-100 rounded-md py-2   ">
                    <Link to="/admin?tab=navbanner" className="w-full pr-2">
                      <p
                        className={`px-4 text-sm rounded-xl font-lora font-semibold text-teal-700 border-b ${
                          location.search.includes("tab=navbanner")
                            ? "bg-teal-600 text-white hover:bg-teal-700 "
                            : " text-slate-800 hover:text-white hover:bg-sky-800"
                        } `}
                      >
                        Main Banner
                      </p>
                    </Link>
                    <Link
                      to="/admin?tab=product-banner"
                      className="w-full pr-2"
                    >
                      <p
                        className={`px-4 text-sm rounded-xl font-lora font-semibold text-teal-700 border-b  ${
                          location.search.includes("tab=product-banner")
                            ? "bg-teal-600 text-white hover:bg-teal-700 "
                            : " text-slate-800 hover:text-white hover:bg-sky-800"
                        } `}
                      >
                        Product Banner
                      </p>
                    </Link>
                    <Link
                      to="/admin?tab=special-day-banner"
                      className="w-full pr-2"
                    >
                      <p
                        className={`px-4 text-sm rounded-xl font-lora font-semibold text-teal-700 border-b  ${
                          location.search.includes("tab=special-day-banner")
                            ? "bg-teal-600 text-white hover:bg-teal-700 "
                            : "text-slate-800 hover:text-white hover:bg-sky-800 "
                        } `}
                      >
                        Special Day Banner
                      </p>
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <Link
                to="/admin?tab=products"
                className={`flex items-center py-2 m-2 w-16 md:w-auto rounded px-4 text-gray-700 hover:bg-gray-200 ${
                  location.search.includes("tab=navbanner") ||
                  location.search.includes("tab=product-banner") ||
                  location.search.includes("tab=special-day-banner")
                    ? "bg-gray-300 text-white"
                    : ""
                }`}
              >
                <HiShoppingBag
                  className={` text-3xl  font-bold  ${
                    location.search.includes("tab=navbanner") ||
                    location.search.includes("tab=product-banner") ||
                    location.search.includes("tab=special-day-banner")
                      ? " text-teal-700"
                      : ""
                  }  `}
                />
              </Link>
            )}
          </div>

          <div className="flex flex-col">
            {/* Sidebar Item */}
            {isSidebarOpen ? (
              <Link
                to="/admin?tab=reports"
                className={`flex items-center py-2 m-2 w-56 rounded px-4 text-gray-700 hover:bg-gray-200 ${
                  location.search.includes("tab=reports")
                    ? "bg-gray-300 text-white"
                    : ""
                }`}
              >
                <TbReportSearch
                  className={`mr-2 text-xl ${
                    location.search.includes("tab=reports")
                      ? " text-teal-700"
                      : ""
                  }  `}
                />
                <span className="text-sm lg:text-base xl:text-lg text-sky-700 font-semibold">
                  Reports
                </span>
              </Link>
            ) : (
              <Link
                to="/admin?tab=reports"
                className={`flex items-center py-2 m-2 w-16 md:w-auto rounded px-4 text-gray-700 hover:bg-gray-200 hover:text-gray-900 ${
                  location.search.includes("tab=reports")
                    ? "bg-gray-300 text-white"
                    : ""
                }`}
              >
                <TbReportSearch
                  className={` text-3xl  font-bold ${
                    location.search.includes("tab=reports")
                      ? " text-teal-700 "
                      : ""
                  }  `}
                />
              </Link>
            )}

            {isSidebarOpen ? (
              <>
                <div
                  onClick={settingDrop}
                  className={`cursor-pointer flex items-center py-2 m-2 w-56 rounded px-4 text-gray-700 hover:bg-gray-200 ${
                    location.search.includes("tab=admin-profile") ||
                    location.search.includes("tab=general-settings") ||
                    location.search.includes("tab=role") ||
                    location.search.includes("tab=addrole")
                      ? "bg-gray-300 text-white"
                      : ""
                  }`}
                >
                  <HiShoppingBag className={`mr-2 text-gray-500 text-xl `} />
                  <span className="text-sm lg:text-base xl:text-lg text-sky-700 font-semibold">
                    Settings
                  </span>
                  <span className="ml-2 mt-1 text-lg text-black">
                    {settingDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
                </div>
                {settingDropdown && (
                  <div className="flex flex-col items-start pl-6 w-60   gap-4 bg-gray-100 rounded-md py-2 ">
                    <Link to="/admin?tab=admin-profile" className="w-full pr-2">
                      <p
                        className={`px-4 text-sm rounded-xl font-lora font-semibold text-teal-700 border-b ${
                          location.search.includes("tab=admin-profile")
                            ? "bg-teal-600 text-white hover:bg-teal-700 "
                            : " text-slate-800 hover:text-white hover:bg-sky-800 "
                        } `}
                      >
                        Profile
                      </p>
                    </Link>
                    <Link
                      to="/admin?tab=general-settings"
                      className="w-full pr-2"
                    >
                      <p
                        className={`px-4 text-sm rounded-xl font-lora font-semibold text-teal-700 border-b  ${
                          location.search.includes("tab=general-settings")
                            ? "bg-teal-600 text-white hover:bg-teal-700 "
                            : "text-slate-800 hover:text-white hover:bg-sky-800"
                        } `}
                      >
                        General Settings
                      </p>
                    </Link>
                    <Link to="/admin?tab=role" className="w-full pr-2">
                      <p
                        className={`px-4 text-sm rounded-xl font-lora font-semibold text-teal-700 border-b  ${
                          location.search.includes("tab=role")
                            ? "bg-teal-600 text-white hover:bg-teal-700 "
                            : " text-slate-800 hover:text-white hover:bg-sky-800 "
                        } `}
                      >
                        Roles & Permissions
                      </p>
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <Link
                to="/admin?tab=settings"
                className={`flex items-center py-2 m-2 w-16 md:w-auto rounded px-4 text-gray-700 hover:bg-gray-200 hover:text-gray-900 ${
                  location.search.includes("tab=settings")
                    ? "bg-gray-300 text-white"
                    : ""
                }`}
              >
                <LuSettings
                  className={` text-3xl  font-bold ${
                    location.search.includes("tab=settings")
                      ? " text-teal-700 "
                      : ""
                  }  `}
                />
              </Link>
            )}
            {isSidebarOpen ? (
              <Link
                to="/admin?tab=about"
                className={`flex items-center py-2 m-2 w-56 rounded px-4 text-gray-700 hover:bg-gray-200 ${
                  location.search.includes("tab=about")
                    ? "bg-gray-300 text-white"
                    : ""
                }`}
              >
                <HiInformationCircle
                  className={`mr-2 text-xl ${
                    location.search.includes("tab=about")
                      ? " text-teal-700"
                      : ""
                  }  `}
                />
                <span className="text-sm lg:text-base xl:text-lg text-sky-700 font-semibold">
                  About
                </span>
              </Link>
            ) : (
              <Link
                to="/admin?tab=about"
                className={`flex items-center py-2 m-2 w-16 md:w-auto rounded px-4 text-gray-700 hover:bg-gray-200 hover:text-gray-900 ${
                  location.search.includes("tab=about")
                    ? "bg-gray-300 text-white"
                    : ""
                }`}
              >
                <HiInformationCircle
                  className={` text-3xl  font-bold ${
                    location.search.includes("tab=about")
                      ? " text-teal-700 "
                      : ""
                  }  `}
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
