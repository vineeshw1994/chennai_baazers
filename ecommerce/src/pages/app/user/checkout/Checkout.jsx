import React, { useEffect, useState } from "react";
import {
  Accordion,
  Radio,
  FloatingLabel,
  Button,
  Spinner,
} from "flowbite-react";
import toast from "react-hot-toast";
import "../checkout/checkout.css";
import { useSelector, useDispatch } from "react-redux";
import {
  cartCountSuccess,
  cartCountNull,
} from "../../../../redux/cartCount/cartCountSlice";
import logo from "../../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";


const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [showForm, setShowForm] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [userAddress, setUserAddress] = useState(null);
  const [formData, setFormData] = useState({});
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState({
    items: [],
    total: 0,
    discount: 0,
  });
  const grandTotal = cartItems.total - cartItems.discount;
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const handleAddressSelect = (addressId) => {
    setSelectedAddressId(addressId);
  };

  const handleSelect = (value) => {
    setSelected(value);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const paymentOptions = [
    {
      id: 1,
      method: "online",
    },
    {
      id: 2,
      method: "cash",
    },
  ];

  console.log(userAddress, "this is the address");
  console.log(cartItems, "this is the cartItems");

  const onchangeTotal = (total) => {
    setGrandTotal(total);
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleShowForm = () => {
    setShowForm((prevState) => !prevState);
  };

  const handleRemoveItem = async (productId) => {
    try {
      const res = await fetch(`/api/cart/remove-cart/${productId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser.id }),
      });
      const data = await res.json();
      if (res.ok) {
        fetchCartItems();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };
  // fetch user cart items
  const fetchCartItems = async () => {
    try {
      const res = await fetch(`/api/cart/get-cart/${currentUser.id}`);
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      if (data.success) {
        dispatch(cartCountSuccess(data.items));
        setCartItems(data.items);
      }
    } catch (error) {
      return toast.error("Internal Error");
    }
  };

  // fetch useraddress
  const fetchAddress = async () => {
    try {
      const res = await fetch(`/api/user/getaddress/${currentUser.id}`);
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      if (data.success) {
        setUserAddress(data.address);
      }
    } catch (error) {
      return toast.error("Internal Error");
    }
  };

  useEffect(() => {
    if (currentUser.id) {
      fetchCartItems();
    }
    fetchAddress();
    const loadRazorpay = async () => {
      if (!window.Razorpay) {
        // Load Razorpay SDK dynamically
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
      }
    };

    loadRazorpay();

    return () => {
      // Cleanup
      if (window.Razorpay) {
        delete window.Razorpay;
      }
    };
  }, [currentUser.id]);

  const handleCheckout = async () => {
    console.log("clicked");

    try {
      if (!selectedAddressId || selectedAddressId === "") {
        toast.error("Please choose a address");
        return;
      }
      // Check if user has selected a payment method
      if (!selectedPaymentMethod) {
        toast.error("Please choose a payment method");
        return;
      }

      if (selectedPaymentMethod.toLowerCase() === "online") {
        setLoading(true);
        const res = await fetch("/api/order/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: currentUser.id,
            grandTotal: grandTotal,
            selectedPaymentMethod,
            selectedAddressId,
          }),
        });
        const data = await res.json();
        const addressId = data.addressId;
        const orderId = data.orderId;
        const method = data.method;
        console.log(data);
        const options = {
          key: "rzp_test_shKWSyokOpGZeo", // Enter the Key ID generated from the Dashboard
          amount: grandTotal * 100, // Amount in paise
          currency: "INR",
          name: "E-Shop",
          description: "Test Transaction",
          image: { logo },
          order_id: data.orderId,
          handler: async (response) => {
            const res = await fetch("/api/order/payment-success", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: currentUser.id,
                addressId: addressId,
                orderId: orderId,
                paymentId: response.razorpay_payment_id,
                method: method,
              }),
            });

            if (res.ok) {
              setLoading(false);
              const data = await res.json();
              toast.success(data.message);
              navigate("/");
              return;
            }

            if (!res.ok) {
              setLoading(false);
              const data = await res.json();
              toast.error(data.message);
              console.log("error from created order", data.message);
            }
          },
          prefill: {
            name: "E-Shop",
            email: "vineeshw1994@gmail.com",
            contact: "7598570568",
          },
          notes: {
            address: "E-Shop Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else if (selectedPaymentMethod.toLocaleLowerCase() === "cash") {
        console.log("this is the cash on delivery method");
        setLoading(true);
        const res = await fetch("/api/order/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: currentUser.id,
            grandTotal: grandTotal,
            selectedPaymentMethod,
            selectedAddressId,
          }),
        });
        if (res.ok) {
          setLoading(false);
          dispatch(cartCountNull());
          const data = await res.json();
          toast.success(data.message);
          navigate("/");
          return;
        }
        if (!res.ok) {
          setLoading(false);
          const data = await res.json();
          toast.error(data.message);
          return;
        }
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      toast.error(error.message);
    }
  };

  console.log(formData);
  const handleSubmit = async () => {
    if (!formData.houseNo && !formData.flatNo) {
      return toast.error("Either House No or Flat No is required");
    }
    if (!formData.username || formData === "") {
      return toast.error("Username is required");
    }
    if (!formData.address || !formData.address === "") {
      return toast.error("Address is required");
    }
    if (!formData.district || !formData.district === "") {
      return toast.error("District is required");
    }
    if (!formData.state || !formData.state === "") {
      return toast.error("State is required");
    }
    if (!formData.pincode || !formData.pincode === "") {
      return toast.error("Pincode is required");
    }
    if (!selected || selected === null) {
      return toast.error("Select Type");
    }
    try {
      setLoading(true);
      const res = await fetch(`/api/user/address/${currentUser.id}`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          saveAs: selected,
          mobile: currentUser.mobile,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        return toast.error(data.message);
      }
      console.log(data);
      if (data.success) {
        fetchAddress();
        setShowForm(false);
        setIsOpen(false);
        setLoading(false);
        return toast.success(data.message);
      }
    } catch (error) {
      return toast.error("Internal Error hello");
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

  return (
    <div className="h-auto mb-52">
      <div className="flex justify-around my-4 h-">
        <div>
          <Accordion collapseAll className="Accordion">
            <Accordion.Panel>
              <Accordion.Title>Delivery Address</Accordion.Title>
              <Accordion.Content>
                {userAddress && userAddress.length > 0 ? (
                  <div className="flex  max-h-40 overflow-y-auto px-1 scroll py-4 ">
                    {userAddress?.map((data) => (
                      <div
                        key={data.id}
                        className="flex-col border rounded-md px-1 py-1 items-center justify-start mx-2"
                      >
                        <div className="flex items-center justify-start gap-4">
                          <input
                            type="radio"
                            id={data.id}
                            name="address"
                            checked={selectedAddressId === data.id}
                            onChange={() => handleAddressSelect(data.id)}
                          />{" "}
                          <p className="text-gray-700 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base font-medium font-lato">
                            {data.username}
                            <span className="bg-gray-300 text-teal-700 rounded mx-1">
                              {data.place}
                            </span>
                            <span className="text-slate-900">
                              {data.mobile}
                            </span>
                          </p>
                          <p className="bg-sky-600 text-white rounded-md px-1">
                            {data.type}
                          </p>
                        </div>
                        <div className="mt-1 ml-8">
                          <p className="text-teal-800 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base font-lato font-medium">
                            {data.address}, {data.district}.
                          </p>
                          <p className="text-teal-800 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base font-medium font-lato">
                            {data.state}
                            <span className="ml-2">,{data.pincode}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <p className="text-teal-700 font-lato font-bold text-center bg-stone-100 rounded-lg w-1/2 mx-auto">
                      No addresses found
                    </p>
                  </div>
                )}
                <button
                  onClick={handleShowForm}
                  className="mt-6 rounded text-indigo-500 font-lato capitalize font-bold py-1 px-2 text-xs sm:text-sm md:text-base lg:text-base xl:text-base"
                >
                  <span className="text-lg sm:text-sm md:text-lg lg:text-lg xl:text-lg font-lato font-bold">
                    {showForm ? "-" : "+"}
                  </span>{" "}
                  Add new address
                </button>
                {showForm && (
                  <div className="bg-white rounded-xl border px-5 py-3 pb-20 relative ">
                    <div className=" py-2 px-2">
                      <FloatingLabel
                        variant="standard"
                        label="Name *"
                        className="font-lora text-black font-medium "
                        id="username"
                        onChange={handleChange}
                      />
                      <div className="w-full flex justify-between items-center gap-2">
                        <FloatingLabel
                          variant="standard"
                          label="House No*"
                          id="houseNo"
                          onChange={handleChange}
                          className="font-lato text-black font-medium flex-1 "
                        />
                        <FloatingLabel
                          variant="standard"
                          label="Flat No *"
                          className="font-lato text-black font-medium flex-1 "
                          id="flatNo"
                          onChange={handleChange}
                        />
                      </div>
                      <FloatingLabel
                        variant="standard"
                        label="Address *"
                        className="font-lato text-black font-medium "
                        id="address"
                        onChange={handleChange}
                      />
                      <FloatingLabel
                        variant="standard"
                        label="District*"
                        className="font-lato text-black font-medium "
                        id="district"
                        onChange={handleChange}
                      />
                      <FloatingLabel
                        variant="standard"
                        label="State *"
                        className="font-lato text-black font-medium "
                        id="state"
                        onChange={handleChange}
                      />
                      <FloatingLabel
                        variant="standard"
                        label="Pin code *"
                        className="font-lato text-black font-medium "
                        id="pincode"
                        onChange={handleChange}
                      />
                      <FloatingLabel
                        variant="standard"
                        label="Land Mark *"
                        className="font-lato text-black font-medium "
                        id="landmark"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <h2 className="font-poetsen font-medium my-2">Save as</h2>
                      <div className="flex justify-between items-center gap-3 w-full">
                        <input
                          type="text"
                          id="home"
                          value="home"
                          readOnly
                          onClick={() => handleSelect("home")}
                          className={`text-center rounded-full capitalize font-lato font-medium cursor-pointer w-1/2 ${
                            selected === "home"
                              ? "bg-teal-800 text-white"
                              : "text-teal-800"
                          }`}
                        />
                        <input
                          type="text"
                          id="work"
                          value="work"
                          readOnly
                          onClick={() => handleSelect("work")}
                          className={`text-center rounded-full capitalize font-lato font-medium cursor-pointer w-1/2 ${
                            selected === "work"
                              ? "bg-teal-800 text-white"
                              : "text-teal-800"
                          }`}
                        />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0  flex justify-center my-4">
                      {loading ? (
                        <Button>
                          <Spinner
                            aria-label="Spinner button example"
                            size="sm"
                          />
                          <span className="pl-3">Loading...</span>
                        </Button>
                      ) : (
                        <Button
                          color="blue"
                          pill
                          className="flex-1 mx-4"
                          onClick={handleSubmit}
                        >
                          Save
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title className="font-lato">
                Order Summary
              </Accordion.Title>
              <Accordion.Content>
                <div className="product_scroll">
                  {cartItems.items.map((product) => (
                    <div
                      key={product.productId}
                      className="flex items-center justify-around my-2 border py-2 mx-2 rounded-md"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          className="w-12 h-16 xl:w-20 xl:h-24 object-contain"
                          src={product?.image}
                          alt={product.name}
                        />
                        <div>
                          <p className="text-teal-900 font-medium font-lato text-xs xl:text-base lg:text-sm md:text-xs sm:text-xs">
                            {truncateName(product.name, 20)}
                          </p>
                          <p className="text-gray-800 font-medium font-lato text-xs xl:text-sm lg:text-xs md:text-xs sm:text-xs">
                            {truncateDescription(product.description, 30)}
                          </p>
                          <p className="text-green-500 font-medium font-lato text-xs xl:text-sm lg:text-xs md:text-xs sm:text-xs">
                            £ {product.price}{" "}
                            <span className="line-through ml-3 text-gray-400 font-lato font-medium">
                              £ {product.realprice}
                            </span>{" "}
                            <span className="text-red-500 font-medium font-lato ml-3">
                              {product.discount ? "%" : ""}{" "}
                              {product.discount ? product.discount : ""}
                            </span>
                          </p>
                        </div>
                      </div>
                      <MdDelete 
                        onClick={() => handleRemoveItem(product.productId)}
                        className="text-red-500 font-lato font-medium  shadow-sm  rounded-md  px-1  text-4xl xl:text-4xl cursor-pointer"
                      />
                      
                    </div>
                  ))}
                </div>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title className="font-lato">
                Payment Options
              </Accordion.Title>
              <Accordion.Content>
                <div>
                  {paymentOptions &&
                    paymentOptions.map((method) => (
                      <div
                        key={method.id}
                        className="flex items-center justify-start gap-4 my-2"
                      >
                        <Radio
                          id={method.id}
                          name="paymentMethod"
                          value={method.method}
                          onChange={() =>
                            handlePaymentMethodChange(method.method)
                          }
                          defaultChecked={
                            method.method === selectedPaymentMethod
                          }
                        />
                        <p className="text-tea-800 font-medium text-sm xl:text-lg lg:text-sm font-lato">
                          {method.method}
                        </p>
                      </div>
                    ))}
                  {loading ? (
                    <div className="cursor-pointer w-full text-center font-lato bg-blue-500 text-white font-semibold rounded py-1 mt-3 hover:bg-blue-700">
                      <button>
                        <Spinner
                          aria-label="Spinner button example"
                          size="sm"
                        />
                        <span className="pl-3">Loading...</span>
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={handleCheckout}
                      className="cursor-pointer w-full text-center font-lato bg-blue-500 text-white font-semibold rounded py-1 mt-3 hover:bg-blue-700"
                    >
                      <button>CheckOut</button>
                    </div>
                  )}
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </div>
        <div>
          <div className="border-b border-gray-600">
            <p className="text-center text-teal-800 font-semibold font-lato">
              PRICE DETAILS
            </p>
          </div>
          <div className="flex-col items-center mt-6">
            <div className="flex items-center justify-between my-2">
              <p className="text-gray-700 font-medium font-lato">
                Price({cartItems.items.length})
              </p>
              <p className="text-green-600 font-medium font-lato">
                £ {cartItems.total}
              </p>
            </div>
            <div className="flex items-center justify-between my-2">
              <p className="text-gray-700 font-medium font-lato">Discount</p>
              <p className="text-green-600 font-medium font-lato">
                £ {cartItems.discount}
              </p>
            </div>
            <div className="flex items-center justify-between my-2">
              <p className="text-gray-700 font-medium font-lato">
                Delivery Charges
              </p>
              <p className="text-green-600 font-medium font-lato">
                £ <span>Free</span>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-8 border-t-2 border-gray-500 pt-4">
            <p className="text-gray-700 font-bold text-sm xl:text-xl lg:text-lg md:text-lg font-lato">
              Total Amount
            </p>
            <p
              id="grandTotal"
              onChange={onchangeTotal}
              className="text-slate-950 font-semibold font-lato text-xs xl:text-xl lg:text-lg md:text-lg sm:text-sm"
            >
              £ {cartItems.total - cartItems.discount}
            </p>
          </div>
          <div className="border px-2 mt-6">
            <p className="text-green-600 font-semibold font-lato">
              You will save £ {cartItems.discount} on this order
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
