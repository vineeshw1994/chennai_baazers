import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import {
  IoNotificationsOutline,
  IoCloseCircleOutline,
  IoSettings,
} from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  HiChartPie,
  HiClipboard,
  HiInformationCircle,
  HiSearch,
  HiShoppingBag,
  HiUsers,
  HiClipboardList,
} from "react-icons/hi";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { Avatar, Button, Drawer, Sidebar, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBoxOpen } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { signoutSuccess } from "../../../../redux/admin/adminAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const DashNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentAdmin } = useSelector((state) => state.admin);
  const [showDropDown, setShowDropDown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [bannerDropdown, setBannerDropdown] = useState(false);
  const [settingDropdown, setSettingDropdown] = useState(false);

  const productDropDown = () => {
    setIsDropdownOpen((prevState) => !prevState);
    setBannerDropdown(false);
    setSettingDropdown(false);
  };

  const handleDropdown = () => {
    setShowDropDown((prevState) => !prevState);
  };

  const bannerDrop = () => {
    setBannerDropdown((prevState) => !prevState);
    setSettingDropdown(false);
    setIsDropdownOpen(false);
  };

  const settingDrop = () => {
    setSettingDropdown((prevState) => !prevState);
    setBannerDropdown(false);
    setIsDropdownOpen(false);
  };

  const handleMouseEnter = () => {
    setShowDropDown(true);
  };

  const handleMouseLeave = () => {
    setShowDropDown(false);
  };
  const handleClose = () => setIsOpen(false);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/admin/admin-logout");
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      if (data.success) {
        dispatch(signoutSuccess());
        navigate("/admin/login");
        return toast.success(data.message);
      }
    } catch (error) {
      return toast.error("Internal Error");
    }
  };

  useEffect(()=>{
  setIsDropdownOpen(true)
  },[])

  return (
    <div className="sticky top-0 z-10 bg-gray-100 flex items-center justify-between py-4 px-2 overflow-y-none w-auto">
      <div className="cursor-pointer ">
        <FaBars
          onClick={() => setIsOpen(true)}
          className="text-teal-600 text-2xl  sm:block md:block lg:hidden xl:hidden "
        />
        <Link to="/">
          <h2 className="text-xl text-teal-700 font-semibold font-serif hidden lg:block xl:block">
            E-Shop
          </h2>
        </Link>
      </div>
      <div className="flex items-center justify-between gap-4 mx-2">
        <Link to="/">
          <p className="cursor-pointer text-sm lg:text-sm xl:text-lg font-medium text-white py-1 px-2 bg-cyan-600 rounded-xl">
            Visit Site
          </p>
        </Link>

        <IoNotificationsOutline className="cursor-pointer text-2xl text-teal-800 font-semibold" />
        <Avatar
          onClick={handleDropdown}
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          img={currentAdmin.profilePic}
          status={currentAdmin ? "online" : null}
          className="cursor-pointer"
        />
        {showDropDown && (
          <Button.Group
            outline
            className="flex flex-col z-10 absolute top-14 right-0 mr-2"
          >
            <Link to="/admin?tab=admin-profile">
              <Button color="gray" className="w-36">
                <FaUserCircle className="mr-3 text-lg text-teal-700 " />
                Profile
              </Button>
            </Link>
            <Link to="/admin?tab=orders">
              <Button color="gray" className="w-36">
                <FaBoxOpen className="mr-3 text-lg text-teal-700 " />
                Orders
              </Button>
            </Link>
            <Link to="/admin?tab=general-settings">
              <Button color="gray" className="w-36">
                <IoSettings className="mr-2 text-lg text-teal-700" />
                Settings
              </Button>
            </Link>
            <Button color="gray" onClick={handleSignout}>
              <RiLogoutCircleLine className="mr-2 text-lg text-teal-700" />
              Logout
            </Button>
          </Button.Group>
        )}
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <div className="flex items-center justify-between my-2 bg-gray-200 rounded-md py-1 px-2">
          <h2 className="text-lg text-teal-700 font-serif font-semibold ">
            E-Shop
          </h2>
          <IoCloseCircleOutline
            onClick={handleClose}
            className="cursor-pointer text-2xl text-gray-900"
          />
        </div>
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <form className="pb-3 md:hidden">
                  <TextInput
                    icon={HiSearch}
                    type="search"
                    placeholder="Search"
                    required
                    size={32}
                  />
                </form>
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    <Link
                      to="/admin?tab=dashmain"
                      className={`flex items-center py-2  w-56 rounded px-4 text-gray-700 hover:bg-gray-200 ${
                        location.search.includes("tab=dashmain")
                          ? "bg-gray-300 text-white"
                          : ""
                      }`}
                    >
                      <HiChartPie
                        className={`mr-2 text-xl ${
                          location.search.includes("tab=dashmain")
                            ? "text-teal-700"
                            : "text-gray-500"
                        }`}
                      />
                      <span className="text-sm lg:text-base xl:text-lg text-sky-700 font-semibold">
                        Dashboard
                      </span>
                    </Link>
                    <div
                      onClick={productDropDown}
                      className={`cursor-pointer flex items-center py-2  w-56 rounded px-4 text-gray-700 hover:bg-gray-200 ${
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
                      <div className="flex flex-col items-start pl-6 w-full  gap-4 bg-gray-100 rounded-md py-2  ">
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

                    <Link
                      to="/admin?tab=users"
                      className={`flex items-center py-2  w-56 rounded px-4 text-gray-700 hover:bg-gray-200 ${
                        location.search.includes("tab=users")
                          ? "bg-gray-300 text-white"
                          : ""
                      }`}
                    >
                      <HiUsers
                        className={`mr-2 text-xl ${
                          location.search.includes("tab=users")
                            ? "text-teal-700"
                            : "text-gray-500"
                        }`}
                      />
                      <span className="text-sm lg:text-base xl:text-lg  text-sky-700 font-semibold">
                        Users
                      </span>
                    </Link>
                    <Link
                      to="/admin?tab=orders"
                      className={`flex items-center py-2  w-56 rounded px-4 text-gray-700 hover:bg-gray-200 ${
                        location.search.includes("tab=orders")
                          ? "bg-gray-300 text-white"
                          : ""
                      }`}
                    >
                      <HiClipboardList
                        className={`mr-2 text-2xl ${
                          location.search.includes("tab=orders")
                            ? "text-teal-700"
                            : "text-gray-500"
                        }`}
                      />
                      <span className="text-sm lg:text-base xl:text-lg text-sky-700 font-semibold">
                        Orders
                      </span>
                    </Link>
                    <div
                      onClick={bannerDrop}
                      className={`cursor-pointer flex items-center py-2  w-56 rounded px-4 text-gray-700 hover:bg-gray-200 ${
                        location.search.includes("tab=navbanner") ||
                        location.search.includes("tab=product-banner") ||
                        location.search.includes("tab=special-day-banner")
                          ? "bg-gray-300 text-white"
                          : ""
                      }`}
                    >
                      <BsCreditCard2FrontFill
                        className={`mr-2 text-xl ${
                          location.search.includes("tab=banners")
                            ? "text-teal-700"
                            : "text-gray-500"
                        }`}
                      />
                      <span className="text-sm lg:text-base xl:text-lg text-sky-700 font-semibold">
                        Banners
                      </span>
                      <span className="ml-2 mt-1 text-lg text-black">
                        {bannerDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
                      </span>
                    </div>
                    {bannerDropdown && (
                      <div className="flex flex-col items-start pl-6 w-full  gap-4 bg-gray-100 rounded-md py-2   ">
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
                        <Link to="/admin?tab=product-banner" className="w-full pr-2">
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
                        <Link to="/admin?tab=special-day-banner" className="w-full pr-2">
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
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup>
                    <Link
                      to="/admin?tab=reports"
                      className={`flex items-center py-2  w-56 rounded px-4 text-gray-700 hover:bg-gray-200 ${
                        location.search.includes("tab=reports")
                          ? "bg-gray-300 text-white"
                          : ""
                      }`}
                    >
                      <HiClipboard
                        className={`mr-2 text-2xl ${
                          location.search.includes("tab=reports")
                            ? "text-teal-700"
                            : "text-gray-500"
                        }`}
                      />
                      <span className="text-sm lg:text-base xl:text-lg text-sky-700 font-semibold">
                        Reports
                      </span>
                    </Link>
                    <div
                      onClick={settingDrop}
                      className={`cursor-pointer flex items-center py-2  w-56 rounded px-4 text-gray-700 hover:bg-gray-200 ${
                        location.search.includes("tab=admin-profile") ||
                        location.search.includes("tab=general-settings") ||
                        location.search.includes("tab=role") ||
                        location.search.includes("tab=addrole")
                          ? "bg-gray-300 text-white"
                          : ""
                      }`}
                    >
                      <IoSettings
                        className={`mr-2 text-2xl ${
                          location.search.includes("tab=settings")
                            ? "text-teal-700"
                            : "text-gray-500"
                        }`}
                      />
                      <span className="text-sm lg:text-base xl:text-lg text-sky-700 font-semibold">
                        Settings
                      </span>
                      <span className="ml-2 mt-1 text-lg text-black">
                        {settingDropdown ? (
                          <IoIosArrowUp />
                        ) : (
                          <IoIosArrowDown />
                        )}
                      </span>
                    </div>
                    {settingDropdown && (
                      <div className="flex flex-col items-start pl-6 w-full  gap-4 bg-gray-100 rounded-md py-2 ">
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
                        <Link to="/admin?tab=general-settings" className="w-full pr-2">
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
                    <Link
                      to="/admin?tab=about"
                      className={`flex items-center py-2  rounded px-4 text-gray-700 hover:bg-gray-200 ${
                        location.search.includes("tab=about")
                          ? "bg-gray-300 text-white"
                          : ""
                      }`}
                    >
                      <HiInformationCircle
                        className={`mr-2 text-2xl  ${
                          location.search.includes("tab=about")
                            ? "text-teal-700"
                            : "text-gray-500"
                        }`}
                      />
                      <span className="text-sm lg:text-base xl:text-lg text-sky-700 font-semibold">
                        About
                      </span>
                    </Link>
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </div>
  );
};

export default DashNavbar;
