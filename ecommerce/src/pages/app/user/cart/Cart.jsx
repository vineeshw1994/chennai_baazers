import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import png from "../../../../assets/shopping.png";
import "../cart/cart.css";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { cartCountSuccess } from "../../../../redux/cartCount/cartCountSlice.js";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [cartItems, setCartItems] = useState({
    items: [],
    total: 0,
    discount: 0,
  });
  // console.log(cartItems);

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

  useEffect(() => {
    if (currentUser.id) {
      fetchCartItems();
    }
  }, [currentUser.id]);

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

  const handleIncreaseQuantity = async (productId) => {
    try {
      const res = await fetch(`/api/cart/update-quantity/${productId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser.id }),
      });
      const data = await res.json();
      if (res.ok) {
        fetchCartItems();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to increase quantity");
    }
  };

  const handleDecreaseQuantity = async (productId) => {
    try {
      const res = await fetch(`/api/cart/reduce-quantity/${productId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser.id }),
      });
      const data = await res.json();
      if (res.ok) {
        fetchCartItems();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to decrease quantity");
    }
  };

  const handlePlaceOrder = () => {
    navigate("/check-out");
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
    <div>
      <div className="text-center my-2">
        <h3 className="font-lato text-xs xl:text-2xl lg:text-lg sm:text-sm font-semibold text-gray-700">
          My Cart
        </h3>
      </div>
      {cartItems.items && cartItems.items.length > 0 ? (
        <div className="flex flex-col md:flex-row items-center mx-8">
          <div className="flex flex-col flex-1 mb-4 border mr-4 w-full md:w-auto rounded py-4 max-h-96 overflow-y-auto">
            {cartItems.items.map((product) => (
              <div
                key={product.productId}
                className="flex items-center justify-between border rounded-lg my-2 py-4 px-4 mx-4 h-36"
              >
                <div className="flex items-center gap-3">
                  <img
                    className="w-12 h-16 xl:w-20 xl:h-24 object-contain"
                    src={product.image} // Make sure the image URL is included in your data
                    alt={product.name}
                  />
                  <div>
                    <p className="text-teal-900 font-medium font-lato text-xs xl:text-base lg:text-sm md:text-xs sm:text-xs capitalize ">
                      {truncateName(product.name, 20)}
                    </p>
                    <p className="text-gray-800 font-medium font-lato text-xs xl:text-sm lg:text-xs md:text-xs sm:text-xs ">
                      {truncateDescription(product.description, 20)}
                    </p>
                    <p className="text-green-500 font-medium font-lato text-xs xl:text-sm lg:text-xs md:text-xs sm:text-xs ">
                      £ {product.realprice}
                      <span className="line-through ml-3 text-gray-400 font-lato font-medium">
                        £ {product.price}
                      </span>
                      <span className="text-red-500 font-medium font-lato ml-3">
                        {product.discount ? "%" : ""}{" "}
                        {product.discount ? product.discount : ""}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center w-1/6 justify-center">
                  <button
                    className="text-xl font-bold bg-gray-200 text-violet-800 xl:py-2 xl:px-5 lg:py-1 lg:px-4 px-2 mr-1 rounded-lg"
                    onClick={() => handleDecreaseQuantity(product.productId)}
                  >
                    -
                  </button>
                  <span className="xl:py-4 xl:px-6 py-1 px-2 lg:py-3 lg:px-4 rounded-lg">
                    {product.quantity}
                  </span>
                  <button
                    className="text-xl font-bold bg-gray-200 text-violet-800 xl:py-2 xl:px-4 lg:py-1 lg:px-3 px-1 ml-1 rounded-lg"
                    onClick={() => handleIncreaseQuantity(product.productId)}
                  >
                    +
                  </button>
                </div>
                <MdDelete 
                  className="text-3xl xl:text-4xl 2xl:text-4xl cursor-pointer font-medium font-lato shadow-sm text-red-700 border py-1 px-1 rounded-lg"
                  onClick={() => handleRemoveItem(product.productId)}
                />
                
              </div>
            ))}
          </div>
          <div className="bg-gray-100 h-80 rounded py-1 px-4 shadow w-full md:w-auto">
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
                <p className="text-black font-semibold font-lato">
                  £ {cartItems.total}
                </p>
              </div>
              <div className="flex items-center justify-between my-2">
                <p className="text-gray-700 font-medium font-lato">Discount</p>
                <p className="text-red-600 font-medium font-lato">
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
              <p className="text-gray-700 font-bold font-lato text-sm xl:text-xl lg:text-lg md:text-lg">
                Total Amount
              </p>
              <p className="text-slate-950 font-bold font-lato text-xs xl:text-xl lg:text-lg sm:text-sm">
                £ {parseFloat(cartItems.total) - parseFloat(cartItems.discount)}
              </p>
            </div>
            <div className="border px-2 mt-6">
              <p className="text-green-600 font-medium font-lato">
                You will save £  <span className="text-black font-bold ">{cartItems.discount}</span> on this order
              </p>
            </div>
            <div
              onClick={handlePlaceOrder}
              className="text-center my-2 bg-green-500 rounded border cursor-pointer hover:bg-green-600 text-white font-serif"
            >
              <button className="font-medium font-lato text-lg">
                Place Order
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <img src={png} alt="Cart is Empty" className="" />
        </div>
      )}
    </div>
  );
};

export default Cart;
