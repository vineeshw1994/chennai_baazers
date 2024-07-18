import React, { useEffect, useState } from "react";
import { Pagination } from "flowbite-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "../profile/style/orders.css";
import { useSelector } from "react-redux";
import logo from "../../../assets/nodata.jpg";

const Orders = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);

  const onPageChange = (page) => setCurrentPage(page);

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "short", day: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // Function to navigate to individual order page
  const handleOrder = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  // Fetch orders function
  const fetchOrders = async () => {
    try {
      const res = await fetch(
        `/api/order/get-orders/${currentUser.id}?page=${currentPage}`
      );
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      return toast.error("Internal Error");
    }
  };

  console.log(orders);

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className=" mx-auto p-3 w-full">
      {orders && orders.length > 0 ? (
        <div className="flex items-center mx-12 mb-4">
          <input
            type="text"
            placeholder="Search Orders"
            className="w-full rounded focus-outline-none outline-none"
          />
          <div className="cursor-pointer flex items-center gap-2 text-white bg-blue-600 border py-2 px-8">
            <FaSearch />
            <p>Search</p>
          </div>
        </div>
      ) : null}

      {orders && orders.length > 0 ? (
        <div className="orders">
          {orders.map((order) => (
            <div
              key={order.id}
              onClick={() => handleOrder(order.id)}
              className="cursor-pointer flex items-center justify-between mx-8 px-6 border py-2 rounded-lg mb-2"
            >
              <div className="flex items-center gap-2 ">
                <div>
                  <p className="text-xs sm:text-xs md:text-xs lg:text-sm xl:text-sm font-medium font-poetsen text-slate-950">
                    <span className="font-lora font-semibold text-teal-900 capitalize text-sm">
                      Order Date -
                    </span>{" "}
                    {formatDate(order.orderDate)}
                  </p>
                  <p className="text-xs sm:text-xs md:text-xs lg:text-sm xl:text-sm font-medium font-poetsen text-red-700 bg-indigo-200 rounded-lg text-center py-1">
                    {order.paymentMethod} {/* Display subtotal */}
                  </p>
                  <p className="text-xs sm:text-xs md:text-xs lg:text-sm xl:text-sm font-medium  text-slate-700">
                    OrderId # -{order.id} {/* Display order ID */}
                  </p>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <p
                    className={`w-3 h-3 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-600"
                        : "bg-red-500"
                    }`}
                  ></p>

                  <p className="text-xs font-lora sm:text-sm md:text-sm lg:text-base xl:text-base  font-bold text-teal-700">
                    {order.status}
                  </p>
                </div>
                <p className="text-xs font-lora sm:text-xs md:text-xs lg:text-sm xl:text-sm font-medium text-slate-700">
                  Your item has been delivered {/* Example message */}
                </p>
                <button className="border font-lora my-2 py-1 px-2 rounded-lg border-blue-600 text-xs sm:text-xs md:text-xs lg:text-sm xl:text-sm font-medium text-blue-700">
                  Rate & Review
                </button>
              </div>
            </div>
          ))}
          {/* Pagination component */}
          <div className="flex my-2 justify-end mx-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-blue-500 rounded-md text-white px-2 py-1 cursor-pointer"
            >
              Previous
            </button>
            <span className="bg-stone-200 rounded-xl mx-2 p-2">
              {currentPage}
            </span>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={orders.length < 10}
              className="bg-green-500 rounded-md text-white px-2 py-1 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-10 ">
          <h2 className="font-lora font-bold mx-8 text-white bg-indigo-700 rounded-lg text-2xl text-center">
            No orders
          </h2>
          <img className="mx-auto w-1/2" src={logo} alt="No orders" />
        </div>
      )}
    </div>
  );
};

export default Orders;
