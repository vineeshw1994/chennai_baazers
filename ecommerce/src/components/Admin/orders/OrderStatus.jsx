import React, { useEffect, useState } from "react";
import DashNavbar from "../dashboard/components/DashNavbar";
import "../orders/order.css";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import SideBar from "../dashboard/components/SideBar";
import { Spinner } from "flowbite-react";

const OrderStatus = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const orderId = parseInt(id);
    const filterOrder = () => {
      const foundOrder = orders.find((data) => data.id === orderId);
      setOrder(foundOrder);
    };
    filterOrder();
  }, [orders]);

  console.log(order, "<-----------------------");
  const fetchOrders = async () => {
    try {
      const res = await fetch(`/api/order/admin-orders`);
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
  }, [id]);

  // download invoice
  const downloadInvoice = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/order/invoice-download`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: order.userId, orderId: order.id }),
      });

      if (!res.ok) {
        setLoading(false);
        const data = await res.json();
        return toast.error(data.message);
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice_${order.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setLoading(false);
      toast.success("Downloaded Successfully");
    } catch (error) {
      console.error("Error downloading invoice:", error);
      toast.error("Internal Error");
    }
  };
  // single  order status change function
  const handleOrderStatus = async (e) => {
    e.preventDefault();
    const selectedValue = e.target.value;

    try {
      const res = await fetch("/api/order/orders-status-change", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: order.userId,
          orderId: order.id,
          status: selectedValue,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      if (data.success) {
        fetchOrders();
        return toast.success(data.message);
      }
    } catch (error) {
      return toast.error("Internal Error");
    }
  };

  // single  order status change function
  const handleChangeOrderStatus = async (proId, e) => {
    e.preventDefault();
    const selectedValue = e.target.value;

    try {
      const res = await fetch("/api/order/order-status-change", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: order.userId,
          orderId: order.id,
          status: selectedValue,
          proId: proId,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      if (data.success) {
        fetchOrders();
        return toast.success(data.message);
      }
    } catch (error) {
      return toast.error("Internal Error");
    }
  };

  // order return accept function

  const handleOrderAccept = async (proId) => {
    try {
      const res = await fetch("/api/order/order-accept", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: order.userId,
          orderId: order.id,
          proId: proId,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      if (data.success) {
        fetchOrders();
        return toast.success(data.message);
      }
    } catch (error) {
      return toast.error("Internal Error");
    }
  };

  const handleOrderReject = async (proId) => {
    try {
      const res = await fetch("/api/order/order-reject", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: order.userId,
          orderId: order.id,
          proId: proId,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      if (data.success) {
        fetchOrders();
        return toast.success(data.message);
      }
    } catch (error) {
      return toast.error("Internal Error");
    }
  };

  const truncateName = (description, length) => {
    return description.length > length
      ? description.substring(0, length) + "..."
      : description;
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <SideBar />
      <div className="main_section">
        <DashNavbar />
        <div className="flex items-center gap-2 mx-3 mt-6">
          <Link
            to="/admin?tab=dashmain"
            className="text-xs font-serif font-semibold sm:text-xs md:text-xs lg:text-sm xl:text-sm text-gray-500"
          >
            Dashboard
          </Link>
          <p className="font-lato font-medium">{"->"}</p>
          <Link
            to="/admin?tab=orders"
            className="text-xs font-serif font-semibold sm:text-xs md:text-xs lg:text-sm xl:text-sm text-gray-500"
          >
            Orders
          </Link>
        </div>
        <div>
          <div className="flex flex-col md:flex- sm:flex-row items-center py-3 mx-2  my-6 justify-between px-6 border h-28 rounded-md bg-white">
            <h3 className="text-md font-medium font-poetsen lg:text-lg xl:text-xl">
              Order Details
            </h3>
            {loading ? (
              <div className="flex items-center gap-5">
                <button className="border rounded-md py-2 px-2 bg-green-500 hover:bg-green-600 text-white">
                  <Spinner
                    color="success"
                    aria-label="Success spinner example"
                    className="mr-2"
                  />
                  loading....
                </button>
              </div>
            ) : (
              <div
                onClick={downloadInvoice}
                className="flex items-center gap-5"
              >
                <button className="border rounded-md py-2 px-2 bg-green-500 hover:bg-green-600 text-white">
                  Download Invoice
                </button>
              </div>
            )}
          </div>
          {/* invoice details */}
          <div className="border rounded-md mx-1 py-2">
            <div className="flex items-center justify-around py-2 bg-gray-100">
              <div>
                <h2 className="text-lg text-gray-600 font-lato font-bold">
                  Invoice{" "}
                  <span className="text-base text-red-500">
                    #{order && order.id}
                  </span>
                  <span
                    className={`text-xs ml-2 bg-green-500 text-white ${
                      order && order.status === "canceled" ? "bg-red-500" : null
                    } rounded-lg px-2`}
                  >
                    {order && order.status}
                  </span>
                </h2>
                <p className="text-sm font-lato font-bold text-gray-500">
                  order date:{" "}
                  <span>
                    {order &&
                      new Date(order.orderDate).toLocaleDateString("en-GB")}
                  </span>
                </p>
                <p className="text-sm font-lato font-bold text-gray-500 capitalize">
                  Location: <span>{order && order.address.state}</span>
                </p>
              </div>
              <div>
                <p className="text-sm bg-yellow-500 text-center text-white rounded-md font-lato lg:text-sm xl:text-base font-medium ">
                  Assign Delivery Man
                </p>
                <select
                  defaultValue="Select Brand"
                  className="rounded-md w-36 h-11 md:w-40 lg:w-44 xl:w-48 py-1 text-xs md:text-sm lg:text-sm xl:text-base text-slate-900  font-lato font-medium  border-gray-400"
                >
                  Delivery Man
                  <option disabled>Delivery Man</option>
                  <option value="">vineesh</option>
                  <option value="">wilson</option>
                </select>
              </div>

              <div>
                <p className="text-sm bg-cyan-500 text-center text-white rounded-md font-lato lg:text-sm xl:text-base font-medium ">
                  Payment Method
                </p>
                <select
                  name=""
                  id=""
                  defaultValue="Select Brand"
                  className="rounded-md w-36 h-11 md:w-40 lg:w-44 xl:w-48 py-1 text-xs md:text-sm lg:text-sm xl:text-base text-slate-900  font-lato font-medium  border-gray-400"
                >
                  payment status
                  <option disabled>payment status</option>
                  <option value="online">
                    {order && order?.paymentMethod}
                  </option>
                </select>
              </div>
              {order && order.status === "delivered" ? (
                <div>
                  {" "}
                  <p className="text-sm font-lato font-medium text-slate-900">
                    Delivery Date:{" "}
                    <span className="bg-green-500 text-white px-1 rounded-lg">
                      {new Date(order?.deliveryDate).toLocaleDateString(
                        "en-GB"
                      )}
                    </span>
                  </p>{" "}
                </div>
              ) : order && order?.status === "canceled" ? (
                <div>
                  {" "}
                  <p className="text-sm font-lato font-medium text-slate-900">
                    Cancelled Date:
                    <span className="bg-red-500 text-white px-1 rounded-lg capitalize">
                      {new Date(order?.cancelDate).toLocaleDateString("en-GB")}
                    </span>
                  </p>{" "}
                </div>
              ) : (
                <div>
                  <p className="text-sm bg-indigo-500 text-center text-white rounded-md   font-lato lg:text-sm xl:text-base font-medium ">
                    Delivery Status
                  </p>
                  <select
                    onChange={handleOrderStatus}
                    defaultValue=""
                    className="rounded-md w-36 h-11 md:w-40 lg:w-44 xl:w-48 py-1 text-xs md:text-sm lg:text-sm xl:text-base text-slate-900  font-lato font-medium  border-gray-400"
                  >
                    <option value="" disabled selected>
                      Select Status -
                    </option>
                    <option value="pending">Pending</option>
                    <option value="canceled">Canceled</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              )}
            </div>

            {/* customer info */}
            <div className="py-3 border my-2 mx-2 px-4 rounded-md flex items-center justify-between ">
              <div>
                <h2 className="text-sm md:text-base lg:text-base xl:text-lg font-lato font-medium text-gray-900 my-1">
                  Customer Info
                </h2>
                <div>
                  <p className="text-sm font-lato text-slate-950">
                    Name:{" "}
                    <span className="text-green-600 font-medium capitalize">
                      {order && order?.address.username}
                    </span>
                  </p>
                  <p className="text-sm font-lato text-slate-950">
                    Email:{" "}
                    <span className="text-green-600 font-medium">
                      {order && order?.address.email}
                    </span>
                  </p>
                  <p className="text-sm font-lato text-slate-950">
                    Phone:{" "}
                    <span className="text-green-600 font-medium">
                      {order && order?.address.mobile}
                    </span>
                  </p>
                  <p className="text-sm font-lato text-slate-950">
                    Status:
                    <span className="bg-green-500 rounded-sm text-sm text-white font-lato font-medium mx-2 px-2">
                      {order && order?.paymentStatus}
                    </span>
                  </p>
                  <p className="text-sm font-lato text-slate-950">
                    Delivery Time :
                    <span className="text-teal-600 font-medium">
                      {order && order?.status === "delivered"
                        ? new Date(order?.deliveryDate).toLocaleDateString(
                            "en-GB"
                          )
                        : order?.status === "canceled"
                        ? new Date(order?.cancelDate).toLocaleDateString(
                            "en-GB"
                          )
                        : new Date(
                            new Date(order?.orderDate).setDate(
                              new Date(order?.orderDate).getDate() + 5
                            )
                          ).toLocaleDateString("en-GB")}
                    </span>
                  </p>
                </div>
              </div>
              <div className="border-r-2 h-40 "></div>

              <div className="">
                <div>
                  <h3 className="text-sm md:text-base lg:text-base xl:text-lg font-lato font-medium text-gray-900 my-1">
                    Billing Address
                  </h3>
                  <div className="flex flex-col items-start">
                    <p className="text-sm font-lato text-slate-950 capitalize">
                      {order && order.address.address},
                    </p>
                    <p className="text-sm font-lato text-slate-950 capitalize">
                      {order && order.address.district},
                    </p>
                    <p className="text-sm font-lato text-slate-950 capitalize">
                      {order && order.address.state},
                    </p>
                    <p className="text-sm font-lato text-slate-950">
                      {order && order.address.pincode}.
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-r-2 h-40 "></div>
              <div>
                <div>
                  <h3 className="text-sm md:text-base lg:text-base xl:text-lg font-lato font-medium text-gray-900 my-1">
                    Shipping Address
                  </h3>
                </div>
                <div
                  className={`flex flex-col ${
                    order && order?.shippingAddress
                      ? "items-start"
                      : "items-center"
                  }`}
                >
                  <p className="text-sm font-lato text-slate-950">
                    {order && order?.shippingAddress
                      ? order?.shippingAddress.address + ","
                      : "-"}
                  </p>
                  <p className="text-sm font-lato text-slate-950">
                    {order && order?.shippingAddress
                      ? order?.shippingAddress.district + ","
                      : "-"}
                  </p>
                  <p className="text-sm font-lato text-slate-950">
                    {order && order?.shippingAddress
                      ? order?.shippingAddress.state + ","
                      : "-"}
                  </p>
                  <p className="text-sm font-lato text-slate-950">
                    {order && order?.shippingAddress
                      ? order?.shippingAddress.pincode + ","
                      : "-"}
                  </p>
                </div>
              </div>
            </div>

            {order &&
              order?.products.length > 0 &&
              order?.products.map((data, index) => (
                <div
                  key={data.productId}
                  className="flex items-center justify-between px-6 mx-2 rounded-md my-1 py-2 bg-stone-100"
                >
                  <div className="flex items-center gap-4">
                    <h1>{index + 1}</h1>
                    <div className="flex items-center gap-2">
                      <img
                        src={data.image}
                        alt={"image"}
                        className="w-10 h-10 rounded object-contain"
                      />
                      <p className=" text-sm font-medium font-lato">
                        {truncateName(data.name, 20)}
                      </p>
                    </div>
                  </div>

                  {data.status === "delivered" ? (
                    <div>
                      <p className="text-sm font-lato font-medium text-slate-900">
                        Delivered Date:{" "}
                        <span className="bg-green-500 text-white px-1 rounded-lg">
                        {new Date(data.deliveryDate).toLocaleDateString(
                          "en-GB"
                        )}
                        </span>
                      </p>
                    </div>
                  ) : null}

                  {data.status === "canceled" ? (
                    <p className="text-sm font-lato font-medium text-slate-900">
                      Status:{" "}
                      <span className="bg-red-500 text-white px-1 rounded-lg capitalize">
                        {data.status}
                      </span>
                    </p>
                  ) : data.status === "return" ? (
                    <p className="text-sm font-lato font-medium text-slate-900">
                      Status:{" "}
                      <span className="bg-red-500 text-white px-1 rounded-lg capitalize">
                        {data.status}
                      </span>
                    </p>
                  ) : order?.status === "delivered" ? (
                    <p className="text-sm font-lato font-medium text-slate-900">
                      Delivered Date:{" "}
                      <span className="bg-green-500 text-white px-1 rounded-lg">
                        {new Date(order.deliveryDate).toLocaleDateString(
                          "en-GB"
                        )}
                      </span>
                    </p>
                  ) : (
                    <p className=" text-sm font-lato font-medium text-slate-900">
                      Status:{" "}
                      <span className="bg-green-500 text-white px-1 rounded-lg capitalize">
                        {data.status}
                      </span>
                    </p>
                  )}

                  {data.status === "return" ? (
                    <p className="text-sm font-lato font-medium text-slate-900">
                      Return Date:{" "}
                      <span className="bg-red-500 text-white px-1 rounded-lg">
                        {new Date(data.returnDate).toLocaleDateString("en-GB")}
                      </span>
                    </p>
                  ) : data.status === "ReturnAccepted" ? (
                    <p className="text-sm font-lato font-medium text-slate-900">
                      Return Date:{" "}
                      <span className="bg-green-500 text-white px-1 rounded-lg">
                        {new Date(data.returnDate).toLocaleDateString("en-GB")}
                      </span>
                    </p>
                  ) : data.status === "ReturnRejected" ? (
                    <p className="text-sm font-lato font-medium text-slate-900">
                      Return Date:{" "}
                      <span className="bg-red-500 text-white px-1 rounded-lg">
                        {new Date(data.returnDate).toLocaleDateString("en-GB")}
                      </span>
                    </p>
                  ) : null}

                  {data.status === "canceled" ? (
                    <p className="text-sm font-lato font-medium text-slate-900 capitalize">
                      cancelled Date:{" "}
                      <span className="bg-red-500 text-white px-1 rounded-lg">
                      {new Date(data.cancelDate).toLocaleDateString("en-GB")}
                      </span>
                    </p>
                  ) : data.status === "return" ? null : data.status ===
                    "ReturnAccepted" ? null : data.status ===
                    "ReturnRejected" ? null : data.status ===
                    "delivered" ? null : order?.status ===
                    "delivered" ? null : (
                    <div>
                      <p className="text-sm bg-indigo-500 text-center text-white rounded-md   font-lato lg:text-sm xl:text-base font-medium ">
                        Delivery Status
                      </p>
                      <select
                        defaultValue=""
                        onChange={(e) =>
                          handleChangeOrderStatus(data.productId, e)
                        }
                        className="rounded-md border-indigo-500 border-2 w-36 h-8 md:w-40 lg:w-44 xl:w-48 py-1 text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-sm font-bold text-cyan-900 font-lato uppercase select-dropdown"
                      >
                        <option value="" disabled selected>
                          Select Status -
                        </option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="inRoute">InRoute</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                  )}

                  {data.status === "return" ? (
                    <div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleOrderAccept(data.productId)}
                          className="bg-green-500 text-white font-bold rounded-lg px-1"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleOrderReject(data.productId)}
                          className="bg-red-500 text-white font-bold rounded-lg px-1"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ) : data.status === "ReturnAccepted" ? (
                    <div>
                      <p className="text-sm font-lato font-medium text-slate-900 capitalize">
                        Return Status:
                        <span className="bg-green-500 text-white px-1 rounded-lg">
                          {data.status}
                        </span>
                      </p>
                    </div>
                  ) : data.status === "ReturnRejected" ? (
                    <div>
                      <p className="text-sm font-lato font-medium text-slate-900 capitalize">
                        Return Status:
                        <span className="bg-red-500 text-white px-1 rounded-lg">
                          {data.status}
                        </span>
                      </p>
                    </div>
                  ) : null}
                </div>
              ))}

            {/* product table */}
            <div className="flex flex-col  border-b-none mx-2">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-4 text-sm font-lato"
                          >
                            Sl/No
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-4 text-sm font-lato"
                          >
                            Products
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-4 text-sm font-lato"
                          >
                            Unit Price
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-4 text-sm font-lato"
                          >
                            Qty
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-4 text-sm font-lato"
                          >
                            Total Price
                          </th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {order &&
                          order?.products.length > 0 &&
                          order?.products.map((data, index) => (
                            <tr
                              key={data.productId}
                              className="border-b dark:border-neutral-500 "
                            >
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                {index + 1}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <img
                                    src={data.image}
                                    alt={"image"}
                                    className="w-5 h-5 object-contain rounded"
                                  />
                                  <p className="text-sm font-medium font-lato">
                                    {data.name}
                                  </p>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium font-lato">
                                {data.realprice}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <p className="text-sm font-medium font-lato">
                                  {data.quantity}
                                </p>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <p className="text-sm font-bold font-lato text-orange-600">
                                  £ {data.realprice * data.quantity}
                                </p>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                      <tr className="border-b dark:border-neutral-500 ">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          <div className="">
                            <p className="text-sm font-bold font-lato text-teal-900">
                              Delivery By
                            </p>
                            <p>-</p>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4"></td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium font-lato">
                          <div>
                            <p className="text-sm font-bold font-lato text-teal-900">
                              Sub Total
                            </p>
                            <p className="font-bold text-sm xl:text-base">
                              £{" "}
                              {order &&
                                order?.products
                                  .reduce((total, product) => {
                                    return (
                                      total + parseFloat(product.realprice)
                                    );
                                  }, 0)
                                  .toFixed(2)}
                            </p>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <p className="text-sm font-medium font-lato"></p>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div>
                            <p className="text-sm font-bold font-lato text-teal-900">
                              Grand Total
                            </p>
                            <p className="text-sm font-bold font-lato text-orange-600">
                              £{" "}
                              {order &&
                                (order.total - order.subTotal).toFixed(2)}
                            </p>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
