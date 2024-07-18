import React, { useEffect } from "react";
import { Avatar, Button, Drawer, Sidebar, TextInput } from "flowbite-react";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import {
  IoNotificationsOutline,
  IoCloseCircleOutline,
  IoSettings,
} from "react-icons/io5";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiSearch,
  HiShoppingBag,
  HiUsers,
  HiClipboardList,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import SideBar from "./components/SideBar";
import { FaUserCircle, FaBoxOpen } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { PiListBulletsFill } from "react-icons/pi";

const DashSidebar = () => {
  const userImage =
    "https://banner2.cleanpng.com/20180319/pde/kisspng-computer-icons-icon-design-avatar-flat-face-icon-5ab06e33bee962.122118601521511987782.jpg";
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [tab, setTab] = useState("");
  

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);


  return (
    <div className="">
     

      <div className="border "></div>
      {/* this is sidebar */}
      <SideBar />

     
    </div>
  );
};

export default DashSidebar;
