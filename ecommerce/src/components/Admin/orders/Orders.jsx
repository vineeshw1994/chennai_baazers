import React, { useEffect, useState } from "react";
import DashNavbar from "../dashboard/components/DashNavbar";
import { Pagination, Spinner, Tooltip } from "flowbite-react";
import { IoIosSearch } from "react-icons/io";
import { IoEyeOutline, IoCloudDownloadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CiExport } from "react-icons/ci";

const Orders = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const onPageChange = (page) => setCurrentPage(page);

  // Fetch orders function
  const fetchOrders = async () => {
    try {
      const res = await fetch(`/api/order/admin-orders?page=${currentPage}`);
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

  const exportOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/order/orders-export"); // Adjust URL as per your backend route

      // Check if the response is successful
      if (!res.ok) {
        setLoading(false);
        const errorText = await res.text(); // Read error message from response body
        toast.error(errorText || "Export failed");
        return;
      }
      // Get the binary data as a Blob
      const blob = await res.blob();

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "products.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setLoading(false);
      return toast.success("Download Successful");
    } catch (error) {
      setLoading(false);
      toast.error("Failed to export products");
      console.error("Export error:", error);
    }
  };

  const handleOrder = (orderId) => {
    navigate(`/admin/orderstatus/${orderId}`);
  };
  return (
    <div className="main_section">
      <DashNavbar />

      <div>
        <div className="flex flex-col md:flex- sm:flex-row items-center py-3   my-6 justify-between px-6 border h-28 rounded-md bg-white">
          <h3 className="text-md font-medium font-poetsen lg:text-lg xl:text-xl">
            Orders
          </h3>

          <div className="flex items-center gap-5">
            {loading ? (
              <div className="flex items-center gap-1  rounded-md py-1 bg-red-500 px-3 border-gray-600 cursor-pointer hover:bg-red-700">
                <Spinner aria-label="Default status example" className="mr-2" />
                <p className="font-poetsen text-sm lg:text-md xl:text-lg text-white">
                  Downloading....
                </p>
              </div>
            ) : (
              <div
                onClick={exportOrders}
                className="flex items-center gap-1  rounded-md py-1 bg-red-500 px-3 border-gray-600 cursor-pointer hover:bg-red-700"
              >
                <CiExport className="text-4xl py-1 text-white" />
                <p className="font-poetsen text-sm lg:text-md xl:text-lg text-white">
                  Export Ordes
                </p>
              </div>
            )}
          </div>
        </div>

        {/* header section */}
        <div className="flex flex-col items-center  py-3 border mx-2">
          <div className="flex  items-center justify-between w-full px-2 md:gap-2">
            <form className="w-72 lg:w-80 xl:w-96">
              <label
                for="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <IoIosSearch className="text-xl xl:text-2xl" />
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Type Order Id"
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
            <div className="flex items-center gap-2 lg:gap-6 xl:gap-8">
              <select
                name=""
                id=""
                defaultValue="Select Brand"
                className="rounded-md w-36 h-11 md:w-40 lg:w-44 xl:w-48 py-1 text-xs md:text-sm lg:text-sm xl:text-base text-slate-900  font-lora font-medium  border-gray-400"
              >
                Orders Status
                <option disabled>Orders Status</option>
                <option value="">Online</option>
                <option value="">POS</option>
              </select>
            </div>
            <div className="flex items-center gap-2 lg:gap-6 xl:gap-8">
              <select
                name=""
                id=""
                defaultValue="Select Brand"
                className="rounded-md w-36 h-11 md:w-40 lg:w-44 xl:w-48 text-xs md:text-sm lg:text-sm xl:text-base text-slate-900 py-1 font-lora font-medium  border-gray-400"
              >
                {" "}
                Delivery Status
                <option disabled>Delivery Status</option>
                <option value="">Order Placed</option>
                <option value="">Pending</option>
                <option value="">Processing</option>
                <option value="">Delivered</option>
                <option value="">Canceled</option>
              </select>
            </div>
            <div className="flex items-center gap-2 lg:gap-6 xl:gap-8">
              <select
                name=""
                id=""
                defaultValue="Select Brand"
                className="rounded-md w-36 h-11 md:w-40 lg:w-44 xl:w-48 text-xs md:text-sm lg:text-sm xl:text-base text-slate-900 py-1 font-lora font-medium  border-gray-400"
              >
                {" "}
                Payment Status
                <option disabled>Payment Status</option>
                <option value="">Paid</option>
                <option value="">Unpaid</option>
              </select>
            </div>
          </div>
        </div>

        {/* orders table */}
        <div className="border mx-2">
          <div className="flex flex-col ">
            <div className="sm:-mx-6 lg:-mx-8">
              <div className="inline-block w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          #
                        </th>
                        <th scope="col" className="px-6 py-4">
                          OrderId
                        </th>
                        <th scope="col" className="px-6 py-4">
                          PlacedOn
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 hidden lg:block xl:block md:block"
                        >
                          Items
                        </th>
                        <th scope="col" className="px-6 py-4 ">
                          Payment
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 hidden lg:block xl:block md:block"
                        >
                          Location
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Action
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Invoice
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders &&
                        orders.length > 0 &&
                        orders.map((data, index) => (
                          <tr
                            key={data.id}
                            className="border-b dark:border-neutral-500"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {index + 1}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-lora text-sm text-teal-800 font-medium">
                              #-{data.id}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-lora text-sm text-teal-800 font-medium">
                              {new Date(data.orderDate).toLocaleDateString(
                                "en-GB"
                              )}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-lora text-sm text-teal-800 font-medium hidden lg:block xl:block md:block">
                              {data.items}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-lora text-sm text-teal-800 font-medium">
                              <p
                                className={`${
                                  data.paymentMethod === "online"
                                    ? "bg-green-600 text-white text-center rounded-lg"
                                    : "bg-yellow-400 text-teal-800 rounded-lg text-center"
                                }`}
                              >
                                {" "}
                                {data.paymentStatus}
                              </p>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-lora text-sm text-teal-800 font-medium">
                              {data.status}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-lora text-sm text-teal-800 font-medium hidden lg:block xl:block md:block">
                              {data.address.state}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <Tooltip
                                content="View"
                                style="light"
                                placement="left"
                              >
                                <IoEyeOutline
                                  onClick={() => handleOrder(data.id)}
                                  className="cursor-pointer text-2xl text-green-800 font-bold"
                                />
                              </Tooltip>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <Tooltip
                                content="Invoice"
                                style="light"
                                placement="left"
                              >
                                <IoCloudDownloadOutline className="cursor-pointer text-2xl text-blue-800" />
                              </Tooltip>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

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
      </div>
    </div>
  );
};

export default Orders;
