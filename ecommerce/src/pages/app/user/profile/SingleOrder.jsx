import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { IoCheckmark } from "react-icons/io5";
import { Button, Modal, Tooltip, Spinner } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";

const SingleOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [cancelOrderId, setCancelOrderId] = useState(0);
  const [returnOrderId, setReturnOrderId] = useState(0);
  const [returnModal, setReturnModal] = useState(false);
  const [whoeOrderModel, setWholeOrderModel] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/order/get-order/${id}`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      if (data.success) {
        setOrder(data.order);
      }
    } catch (error) {
      return toast.error("Internal Error");
    }
  };

  console.log(order);

  useEffect(() => {
    fetchOrder();
  }, [currentUser.id]);

  const downloadInvoice = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/order/invoice/${currentUser.id}`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id }),
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

  const handleOrderCancel = async () => {
    setWholeOrderModel(false);
    try {
      const res = await fetch(`/api/order/orders-status-change`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.id,
          orderId: order.id,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      if (data.success) {
        setCancelOrderId(null);
        fetchOrder();
        toast.success(data.message);
        return;
      }
    } catch (error) {
      return toast.error("Internal Error");
    }
  };
  const handleCancelOrder = async () => {
    setOpenModal(false);
    try {
      const res = await fetch(`/api/order/order-delete/${cancelOrderId}`, {
        method: "delete",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.id,
          orderId: order.id,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      if (data.success) {
        setCancelOrderId(null);
        fetchOrder();
        toast.success(data.message);
        return;
      }
    } catch (error) {
      return toast.error("Internal Error");
    }
  };

  const handleReturnOrder = async () => {
    setReturnModal(false);
    try {
      const res = await fetch(`/api/order/order-return/${returnOrderId}`, {
        method: "delete",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.id,
          orderId: order.id,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      if (data.success) {
        setReturnOrderId(null);
        fetchOrder();
        toast.success(data.message);
        return;
      }
    } catch (error) {
      return toast.error("Internal Error");
    }
  };

  const truncateDescription = (description, length) => {
    return description.length > length
      ? description.substring(0, length) + "..."
      : description;
  };
  const truncateName = (description, length) => {
    return description.length > length
      ? description.substring(0, length) + "..."
      : description;
  };

  // Function to check if the product is returnable based on delivery date
  function isReturnable(deliveryDate) {
    // Assuming currentDate is the current date in JavaScript
    const currentDate = new Date();
    const fiveDaysBeforeDelivery = new Date(deliveryDate);
    fiveDaysBeforeDelivery.setDate(fiveDaysBeforeDelivery.getDate() + 5);

    return currentDate >= fiveDaysBeforeDelivery;
  }

  return (
    <div className="mb-28 p-10">
      <div className="flex items-center gap-2 mx-3 mt-6">
        <Link
          to="/"
          className="text-xs font-serif font-semibold sm:text-xs md:text-xs lg:text-sm xl:text-sm text-gray-500"
        >
          Home /
        </Link>
        <Link
          to="/profile?tab=orders"
          className="text-xs font-serif font-semibold sm:text-xs md:text-xs lg:text-sm xl:text-sm text-gray-500"
        >
          Myorders {">"}
        </Link>
        {order && <p>#- {order.id}</p>}
      </div>
      {order && (
        <div className="flex items-center justify-between mt-6 py-2 px-4 mx-2 border rounded bg-white">
          <div className="">
            <div className="my-2">
              <p className="text-sm text-slate-900 font-serif font-medium md:text-lg lg:text-lg xl:text-xl ">
                Delivery Adderss
              </p>
            </div>
            <p className="text-xs sm:text-sm md:text-lg lg:text-sm xl:text-lg font-medium text-teal-700 uppercase ">
              {order.address.username}
              <span className="ml-4 font-lora text-xs font-semibold bg-teal-700 text-white capitalize px-1 py-1 rounded-lg">
                {order.address.type}
              </span>
            </p>
            <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-lg font-medium text-gray-700 capitalize">
              {order.address.address},
            </p>
            <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-lg font-medium text-gray-700 capitalize">
              {order.address.district},
            </p>
            <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-lg font-medium text-gray-700 capitalize">
              {order.address.state},
            </p>
            <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-lg font-medium text-gray-700">
              {order.address.pincode}.
            </p>
            <div className="flex items-center gap-2">
              <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-lg text-gray-800 font-medium">
                Phone Number:
              </p>
              <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-lg text-gray-800 font-medium">
                {order.address.mobile}
              </p>
            </div>
          </div>
          <div className="">
            {order.status === "confirmed" ||
            order.status === "shipped" ||
            order.status === "inRoute" ||
            order.status === "pending" ||
            order.status === "processing" ? (
              <div>
                <Button
                  gradientMonochrome="failure"
                  onClick={() => {
                    setWholeOrderModel(true);
                  }}
                >
                  Cancel Order
                </Button>
              </div>
            ) : order.status === "return" ? (
              <div>
                <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base font-lora font-medium text-teal-900">
                  Return Date:{" "}
                  <span className="text-red-600 font-lora font-medium bg-red-100 px-2 py-1 rounded-lg">
                    {order &&
                      new Date(order.date).toLocaleDateString("uk", "GB")}
                  </span>
                </p>
              </div>
            ) : order.status === "canceled" ? (
              <div>
                <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base font-lora font-medium text-teal-900">
                  Cancel Date:{" "}
                  <span className="text-red-600 font-lora font-medium bg-red-100 px-2 py-1 rounded-lg">
                    {" "}
                    {order &&
                      new Date(
                        new Date(order.cancelDate).setDate(
                          new Date(order.cancelDate).getDate() - 1
                        )
                      ).toLocaleDateString("uk-GB")}
                  </span>
                </p>
              </div>
            ) : order.status === "delivered" ? (
              <div>
                <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base font-lora font-medium text-teal-900">
                  Delivered Date:{" "}
                  <span className="text-white font-lora font-medium bg-green-500 px-2 py-1 rounded-lg">
                    {" "}
                    {order &&
                      new Date(
                        new Date(order.deliveryDate).setDate(
                          new Date(order.deliveryDate).getDate() - 1
                        )
                      ).toLocaleDateString("uk-GB")}
                  </span>
                </p>
              </div>
            ) : null}
          </div>

          <div>
            <div className="flex items-center gap-4">
              <p className="text-xs md:text-sm lg:text-sm xl:text-lg text-green-900 font-medium">
                {" "}
                Invoice :
              </p>
              {loading ? (
                <Button
                  onClick={downloadInvoice}
                  outline
                  gradientDuoTone="purpleToBlue"
                >
                  <Spinner color="info" aria-label="Info spinner example" className="mr-1" />
                  loading....
                </Button>
              ) : (
                <Button
                  onClick={downloadInvoice}
                  outline
                  gradientDuoTone="purpleToBlue"
                >
                  Download
                </Button>
              )}
            </div>
          </div>

          {/* cancel whole order modal */}
          <Modal
            show={whoeOrderModel}
            size="md"
            onClose={() => setWholeOrderModel(false)}
            popup
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to cancel whole Order?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button onClick={handleOrderCancel} color="failure">
                    {"Yes, I'm sure"}
                  </Button>
                  <Button
                    color="gray"
                    onClick={() => setWholeOrderModel(false)}
                  >
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          {/* order return modal */}
          <Modal
            show={returnModal}
            size="md"
            onClose={() => setReturnModal(false)}
            popup
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to return this Product?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button onClick={handleReturnOrder} color="failure">
                    {"Yes, I'm sure"}
                  </Button>
                  <Button color="gray" onClick={() => setReturnModal(false)}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          {/* cancel order modal */}
          <Modal
            show={openModal}
            size="md"
            onClose={() => setOpenModal(false)}
            popup
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to cancel this Order?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button onClick={handleCancelOrder} color="failure">
                    {"Yes, I'm sure"}
                  </Button>
                  <Button color="gray" onClick={() => setOpenModal(false)}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}
      {order &&
        order.products.map((product) => (
          <div
            key={product.productId}
            className="flex justify-between gap-16 items-center border mx-2 mt-6 rounded py-3 px-2"
          >
            <div className="flex gap-2">
              <img
                className="w-16 lg:w-16 lg:h-20 xl:w-20 xl:h-24"
                src={product.image}
                alt={product.name}
              />
              <div className="flex flex-col gap-2">
                <p className="text-xs text-teal-800 font-medium md:text-xs lg:text-sm xl:text-lg">
                  {truncateName(product.name, 15)}
                </p>
                <p className="text-xs text-gray-900 font-medium sm:text-xs md:text-xs lg:text-sm xl:text-sm">
                  {truncateDescription(product.description, 25)}
                </p>
                <p className="text-xs text-teal-950 font-medium md:text-xs lg:text-sm xl:text-sm">
                  £ {product.realprice}
                </p>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-lora font-medium mb-4 text-gray-700 sm:text-xs md:text-sm lg:text-sm xl:text-xl">
                Order Status
              </h3>

              <div>
                <div className="flex items-center w-10/12">
                  <div
                    className={`rounded-full ${
                      (product.status === "processing" ||
                        product.status === "confirmed" ||
                        product.status === "shipped" ||
                        product.status === "inRoute" ||
                        product.status === "delivered" ||
                        product.status === "ReturnAccepted" ||
                        product.status === "ReturnRejected" ||
                        product.status === "return") &&
                      "bg-green-600"
                    } ${
                      product.status === "canceled" &&
                      product.level === "processing"
                        ? "bg-red-500"
                        : "bg-gray-200"
                    } h-8 w-8 p-1 text-white border flex items-center justify-center`}
                  >
                    {product.status === "processing" ||
                    product.status === "confirmed" ||
                    product.status === "shipped" ||
                    product.status === "inRoute" ||
                    product.status === "delivered" ? (
                      <IoCheckmark className="text-3xl" />
                    ) : (
                      <IoCheckmark className="text-3xl text-gray-200" />
                    )}
                  </div>
                  {/* line - 1 */}
                  <div
                    className={`border ${
                      (product.status === "confirmed" ||
                        product.status === "shipped" ||
                        product.status === "inRoute" ||
                        product.status === "delivered" ||
                        product.level === "shipped" ||
                        product.level === "inRoute" ||
                        product.status === "ReturnAccepted" ||
                        product.status === "ReturnRejected" ||
                        product.status === "return") &&
                      "bg-green-600 border-green-600"
                    } w-full mx-1`}
                  ></div>
                  <div
                    className={`rounded-full ${
                      (product.status === "confirmed" ||
                        product.status === "shipped" ||
                        product.status === "inRoute" ||
                        product.status === "delivered" ||
                        product.status === "ReturnAccepted" ||
                        product.status === "ReturnRejected" ||
                        product.status === "return") &&
                      "bg-green-600"
                    } ${
                      product.status === "canceled" &&
                      product.level === "confirmed"
                        ? "bg-red-500"
                        : "bg-gray-200"
                    } h-8 w-8 p-1 text-white border flex items-center justify-center`}
                  >
                    {product.status === "confirmed" ||
                    product.status === "shipped" ||
                    product.status === "inRoute" ||
                    product.status === "delivered" ? (
                      <IoCheckmark className="text-3xl" />
                    ) : (
                      <IoCheckmark className="text-3xl text-gray-200" />
                    )}
                  </div>
                  {/* line - 2 */}
                  <div
                    className={`border ${
                      product.status === "shipped" ||
                      product.status === "inRoute" ||
                      product.status === "delivered" ||
                      product.level === "shipped" ||
                      product.level === "inRoute" ||
                      product.status === "ReturnAccepted" ||
                      product.status === "ReturnRejected" ||
                      product.status === "return"
                        ? "bg-green-600 border-green-600"
                        : "bg-gray-200 border-gray-200"
                    } w-full  mx-1`}
                  ></div>

                  <div
                    className={`rounded-full ${
                      product.status === "shipped" ||
                      product.status === "inRoute" ||
                      product.status === "delivered" ||
                      product.level === "inRoute" ||
                      product.status === "ReturnAccepted" ||
                      product.status === "ReturnRejected" ||
                      product.status === "return"
                        ? "bg-green-600"
                        : "bg-gray-200 "
                    } ${
                      product.status === "canceled" &&
                      product.level === "shipped"
                        ? "bg-red-500"
                        : ""
                    }   h-8 w-8 p-1 text-white  border  flex items-center justify-center`}
                  >
                    {product.status === "shipped" ||
                    product.status === "inRoute" ||
                    product.status === "delivered" ? (
                      <IoCheckmark className="text-3xl " />
                    ) : (
                      <IoCheckmark className="text-3xl text-gray-200 " />
                    )}
                  </div>
                  {/* line 3 */}
                  <div
                    className={`border  ${
                      product.status === "delivered" ||
                      product.status === "inRoute" ||
                      product.level === "inRoute" ||
                      product.status === "ReturnAccepted" ||
                      product.status === "ReturnRejected" ||
                      product.status === "return"
                        ? "bg-green-600 border-green-600"
                        : "bg-gray-200 border-gray-200"
                    }   w-full   mx-1`}
                  ></div>

                  <div
                    className={`rounded-full ${
                      product.status === "inRoute" ||
                      product.status === "delivered" ||
                      product.status === "ReturnAccepted" ||
                      product.status === "ReturnRejected" ||
                      product.status === "return"
                        ? "bg-green-600"
                        : "bg-gray-200 "
                    } ${
                      product.level === "inRoute" &&
                      product.status === "canceled"
                        ? "bg-red-600"
                        : ""
                    }   h-8 w-8 p-1 text-white  border  flex items-center justify-center`}
                  >
                    {product.status === "inRoute" ||
                    product.status === "delivered" ? (
                      <IoCheckmark className="text-3xl " />
                    ) : (
                      <IoCheckmark className="text-3xl text-gray-200 " />
                    )}
                  </div>
                  {/* line - 4*/}
                  <div
                    className={`border  ${
                      product.status === "delivered" ||
                      product.status === "ReturnAccepted" ||
                      product.status === "ReturnRejected" ||
                      product.status === "return"
                        ? "bg-green-600 border-green-600"
                        : "bg-gray-200 border-gray-200"
                    }   w-full   mx-1`}
                  ></div>

                  <Tooltip
                    content={`Delivery on :${product.deliveryDate}`}
                    style="light"
                  >
                    <div
                      className={`rounded-full cursor-pointer ${
                        product.status === "delivered"
                          ? "bg-green-600"
                          : "bg-gray-200 "
                      }${
                        (product.status === "return" ||
                          product.status === "ReturnAccepted" ||
                          product.status === "ReturnRejected") &&
                        product.level === "delivered"
                          ? "bg-red-600"
                          : ""
                      } h-8 w-8 p-1 text-white border flex items-center justify-center`}
                    >
                      {product.status === "delivered" ? (
                        <IoCheckmark className="text-3xl " />
                      ) : (
                        <IoCheckmark className="text-3xl text-gray-200 " />
                      )}
                    </div>
                  </Tooltip>
                </div>

                <div className="flex items-center justify-between w-10/12">
                  <p
                    className={`font-medium ${
                      product.status === "canceled" &&
                      product.level === "processing"
                        ? "text-red-500"
                        : "text-gray-900"
                    }  dark:text-white text-xs sm:text-xs md:text-xs lg:text-sm xl:text-base`}
                  >
                    {product.status === "canceled" &&
                    product.level === "processing"
                      ? "Canceled"
                      : " Processing"}
                  </p>
                  <p
                    className={`font-medium ${
                      product.status === "canceled" &&
                      product.level === "confirmed"
                        ? "text-red-500"
                        : "text-gray-900"
                    }  dark:text-white text-xs sm:text-xs md:text-xs lg:text-sm xl:text-base`}
                  >
                    {product.status === "canceled" &&
                    product.level === "confirmed"
                      ? "Canceled"
                      : " Confirmed"}
                  </p>
                  <p
                    className={`font-medium ${
                      product.status === "canceled" &&
                      product.level === "shipped"
                        ? "text-red-500"
                        : "text-gray-900"
                    }  dark:text-white text-xs sm:text-xs md:text-xs lg:text-sm xl:text-base`}
                  >
                    {product.status === "canceled" &&
                    product.level === "shipped"
                      ? "Canceled"
                      : " Shipped"}
                  </p>
                  <p
                    className={`font-medium ${
                      product.status === "canceled" &&
                      product.level === "inRoute"
                        ? "text-red-500"
                        : "text-gray-900"
                    }  dark:text-white text-xs sm:text-xs md:text-xs lg:text-sm xl:text-base`}
                  >
                    {product.status === "canceled" &&
                    product.level === "inRoute"
                      ? "Canceled"
                      : " InRoute"}
                  </p>
                  <p
                    className={`font-medium ${
                      (product.status === "return" ||
                        product.status === "ReturnAccepted" ||
                        product.status === "ReturnRejected") &&
                      product.level === "delivered"
                        ? "text-red-500"
                        : "text-gray-900"
                    }  dark:text-white text-xs sm:text-xs md:text-xs lg:text-sm xl:text-base`}
                  >
                    {product.status === "return" &&
                    product.level === "delivered"
                      ? "Return"
                      : " Delivered"}
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              {product.status === "shipped" ||
              product.status === "inRoute" ||
              product.status === "processing" ||
              product.status === "confirmed" ? (
                <div>
                  <button
                    className="text-white bg-red-500 rounded-md px-2"
                    onClick={() => {
                      setOpenModal(true);
                      setCancelOrderId(product.productId);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : product.status === "return" ? (
                <div>
                  <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base font-lora font-medium text-teal-900">
                    Return Date:{" "}
                    <span className="text-red-600 font-lora font-medium bg-red-100 px-2 py-1 rounded-lg">
                      {order &&
                        new Date(product.returnDate).toLocaleDateString(
                          "uk",
                          "GB"
                        )}
                    </span>
                  </p>
                </div>
              ) : product.status === "canceled" ? (
                <div>
                  <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base font-lora font-medium text-teal-900">
                    Cancel Date:{" "}
                    <span className="text-red-600 font-lora font-medium bg-red-100 px-2 py-1 rounded-lg">
                      {" "}
                      {order &&
                        new Date(
                          new Date(product.cancelDate).setDate(
                            new Date(product.cancelDate).getDate() - 1
                          )
                        ).toLocaleDateString("uk-GB")}
                    </span>
                  </p>
                </div>
              ) : product.status === "return" ? (
                <div>
                  <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base font-lora font-medium text-teal-900">
                    Return Date:{" "}
                    <span className="text-red-600 font-lora font-medium bg-red-100 px-2 py-1 rounded-lg">
                      {" "}
                      {order &&
                        new Date(
                          new Date(product.returnDate).setDate(
                            new Date(product.returnDate).getDate() - 1
                          )
                        ).toLocaleDateString("uk-GB")}
                    </span>
                  </p>
                </div>
              ) : product.status === "ReturnAccepted" ? (
                <div>
                  <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base font-lora font-medium text-teal-900">
                    Return Status
                    <span className=" capitalize  text-white font-lora font-medium bg-green-500 px-2 py-1 rounded-lg">
                      {product.status}
                    </span>
                  </p>
                </div>
              ) : product.status === "ReturnRejected" ? (
                <div>
                  <p className="capitalize text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base font-lora font-medium text-teal-900">
                    Return Status
                    <span className=" capitalize text-white font-lora font-medium bg-red-500 px-2 py-1 rounded-lg">
                      {product.status}
                    </span>
                  </p>
                </div>
              ) : product.status === "delivered" && product.deliveryDate ? (
                <div className="flex flex-col gap-2">
                  {isReturnable(product.deliveryDate) ? (
                    <Button
                      onClick={() => {
                        setReturnModal(true);
                        setReturnOrderId(product.productId);
                      }}
                      gradientMonochrome="failure"
                    >
                      Return
                    </Button>
                  ) : (
                    <>
                      <p className="capitalize text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base font-lora font-medium text-teal-900">
                        Status :
                        <span className="capitalize text-white font-lora font-medium bg-green-500 px-2 py-1 rounded-lg">
                          {product.status}
                        </span>
                      </p>
                      {/* <Button gradientDuoTone="cyanToBlue">Add Review</Button> */}
                    </>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button gradientDuoTone="cyanToBlue">Add Review</Button>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default SingleOrder;
