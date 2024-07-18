import React, { useEffect, useState } from "react";
import DashNavbar from "../dashboard/components/DashNavbar";
import { IoCartOutline } from "react-icons/io5";
import Charts from "./components/Charts";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { LuClock } from "react-icons/lu";
import { GoSync } from "react-icons/go";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import "./styles/dashmain.css";
import { topSelling } from "../../../../data/topSellingProducts";
import { orders } from "../../../../data/orders";
import { Tooltip } from "flowbite-react";
import { IoEyeOutline } from "react-icons/io5";
import ShowOrderStatus from "./components/ShowOrderStatus";
import { Link } from "react-router-dom";

const DashMain = () => {
  const [products, setProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options);
  };

  useEffect(() => {
    console.log(topSelling);
    console.log(orders);
    setProducts(topSelling);
    setRecentOrders(orders);
  }, [topSelling, orders]);
  return (
    <div className=" main_section">
      <DashNavbar />

      <div className="">
        <div className=" ">
          <div className="flex flex-col md:flex- sm:flex-row items-center py-3   my-6 justify-between px-6 border h-28 rounded-md bg-white">
            <h3 className="text-md font-medium font-poetsen lg:text-md xl:text-lg">
              Admin Dashboard
            </h3>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2 border rounded-md py-2 bg-gray-200 px-3 border-gray-600 cursor-pointer hover:bg-gray-300">
                <IoCartOutline className="text-2xl" />
                <p className=" text-sm font-medium lg:text-md xl:text-lg">
                  Manage Sales
                </p>
              </div>
              <button className="border rounded-md py-2 px-3 bg-green-500 hover:bg-green-600 text-white">
                <Link to="/admin?tab=addproduct">
                  {" "}
                  <span className="text-lg">+</span> Add Product
                </Link>
              </button>
            </div>
          </div>
        </div>

        {/*  chatts */}
        <Charts />

        {/* top selling products */}
        <div className="border mx-4 rounded-md py-2 px-3 my-6">
          <p className="text-lg font-poetsen text-gray-900 font-medium">
            Top Selling Products
          </p>
          <p className="text-sm font-poetsen text-gray-500">
            We have listed 29 total products.
          </p>
          <div className=" my-4 topselling_product">
            {topSelling &&
              products.map((data) => (
                <div
                  key={data._id}
                  className="flex border-b border-dashed items-center justify-between mx-4 my-1 py-2"
                >
                  <div className="flex  gap-1">
                    <img
                      className="w-8 "
                      src={data.images.length > 0 ? data.images[0].image : ""}
                      alt={data.name}
                    />
                    <div>
                      <p className="font-poetsen text-xs   text-teal-600">
                        {data.name}
                      </p>
                      <p className="text-xs font-poetsen text-gray-500">
                        Brand : {data.Brand}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p>({data.count})</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* // order status */}
        <div className="flex  flex-wrap items-center  justify-around  my-5 gap-3">
          <div className="flex items-center border py-2 px-3 rounded-md w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/5 xl:w-1/5">
            <LiaShoppingBagSolid className="text-7xl text-green-400 bg-yellow-100 py-2 rounded-full " />
            <div className="flex flex-col items-center ">
              <p className="text-sm lg:text-lg xl:text-lg font-medium ">192</p>
              <p className="text-sm lg:text-sm xl:text-lg font-medium text-gray-500">
                Total Orders
              </p>
            </div>
          </div>
          <div className="flex items-center border py-2 px-3 rounded-md w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/5 xl:w-1/5">
            {" "}
            <LuClock className="text-7xl text-red-400 bg-pink-100 py-2 rounded-full " />
            <div className="flex flex-col items-center ">
              <p className="text-sm lg:text-lg xl:text-lg font-medium ">138</p>
              <p className="text-sm lg:text-sm xl:text-lg font-medium text-gray-500">
                Order Pending
              </p>
            </div>
          </div>
          <div className="flex items-center border py-2 px-3 rounded-md w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/5 xl:w-1/5">
            {" "}
            <GoSync className=" text-7xl text-blue-400 bg-orange-100 py-2 rounded-full " />
            <div className="flex flex-col items-center ">
              <p className="text-sm lg:text-lg xl:text-lg font-medium ">5</p>
              <p className="text-sm lg:text-sm xl:text-lg font-medium text-gray-500">
                Order Processing
              </p>
            </div>
          </div>
          <div className="flex items-center border py-2 px-3 rounded-md w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/5 xl:w-1/5">
            {" "}
            <IoMdCheckmarkCircleOutline className="text-7xl text-teal-400 bg-rose-100 py-2 rounded-full " />
            <div className="flex flex-col items-center ">
              <p className="text-sm lg:text-lg xl:text-lg font-medium ">45</p>
              <p className="text-sm lg:text-sm xl:text-lg font-medium text-gray-500">
                Total Delivery
              </p>
            </div>
          </div>
        </div>

        {/* Recent orders */}
        <div className="border mx-4 rounded-md py-2 px-3 my-6">
          <p className="text-lg font-poetsen text-gray-900 font-medium">
            The Most Recent Orders
          </p>
          <p className="text-sm font-poetsen text-gray-500">
            Your 30 Recent Orders.
          </p>
          <div className="my-4 topselling_product">
            <div className="border rounded-md py-1 px-2 flex items-center justify-between">
              <p className="text-xs lg:text-sm xl:text-md font-poetsen font-semibold text-teal-800 flex-1">
                Order Id
              </p>
              <p className="text-xs lg:text-sm xl:text-md font-poetsen  font-semibold text-teal-800 flex-1">
                Customer
              </p>
              <p className="text-xs lg:text-sm xl:text-md font-poetsen font-semibold text-teal-800 flex-1">
                Placed On
              </p>
              <p className="text-xs lg:text-sm xl:text-md font-poetsen font-semibold text-teal-800 flex-1">
                Items
              </p>
              <p className="text-xs lg:text-sm xl:text-md font-poetsen font-semibold text-teal-800 flex-1">
                Payment Status
              </p>
              <p className="text-xs lg:text-sm xl:text-md font-poetsen font-semibold text-teal-800 flex-1">
                Delivery Status
              </p>
              <p className="text-xs lg:text-sm xl:text-md font-poetsen font-semibold text-teal-800 flex-1">
                Action
              </p>
            </div>
            {orders &&
              recentOrders.map((data) => (
                <div
                  key={data._id}
                  className="border rounded-sm flex items-center justify-between px-3 py-2"
                >
                  <p className="flex-1 text-xs lg:text-sm xl:text-md font-medium font-poetsen text-gray-900">
                    # {data._id}
                  </p>
                  <div className="flex items-center gap-1">
                    <img
                      src={data.profile}
                      alt={data.address.name}
                      className="w-7 h-7 rounded-full"
                    />
                    <div className="flex flex-1 flex-col items-start mr-6">
                      <p className="text-xs lg:text-sm xl:text-md font-medium font-poetsen">
                        {data.address.name}
                      </p>
                      <p className="text-xs lg:text-sm xl:text-md font-medium font-poetsen">
                        {data.address.mobile}
                      </p>
                    </div>
                  </div>
                  <p className="flex-1 xl:ml-24 text-xs  lg:text-sm xl:text-md font-medium font-poetsen">
                    {formatDate(data.date)}
                  </p>
                  <p className="flex-1 xl:ml-6 text-xs lg:text-sm xl:text-md font-medium font-poetsen">
                    {data.items}
                  </p>
                  <p className="flex-1 capitalize text-xs lg:text-sm xl:text-md font-medium font-poetsen">
                    {data.paymentStatus}
                  </p>
                  <p
                    className={`flex-1 text-xs lg:text-sm xl:text-md font-medium font-poetsen ${
                      data.status === "Confirmed" ||
                      data.status === "Shipped" ||
                      data.status === "In Route" ||
                      data.status === "Delivered"
                        ? "bg-green-400 text-white py-1 text-center rounded-lg"
                        : "bg-red-400 py-1 rounded-lg text-center text-white"
                    }`}
                  >
                    {data.status}
                  </p>
                  <div className="flex-1 xl:ml-8">
                    <Tooltip content="View" placement="left">
                      <IoEyeOutline className="cursor-pointer text-xl text-blue-800" />
                    </Tooltip>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* All over status */}
        <ShowOrderStatus />
      </div>
    </div>
  );
};

export default DashMain;
