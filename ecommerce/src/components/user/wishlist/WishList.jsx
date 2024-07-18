import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import image from "../../../assets/wishlist.avif";
import { useNavigate } from "react-router-dom";
const WishList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`/api/wishlist/get-wishlist/${currentUser.id}`);
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      if (data.success) {
        setProducts(data.items);
        console.log(data.items[0].items);
      }
    } catch (error) {
      toast.error("Internal Error");
    }
  };

  console.log(products, "this is my products ");

  const handleRemove = async (proId) => {
    try {
      const res = await fetch(`/api/wishlist/remove-wishlist/${proId}`, {
        method: "delete",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("Internal Error");
    }
  };

  const handleProduct = (productId) => {
    navigate(`/productpage/${productId}`);
  };

  const handleLogin = () => {
    toast.success("Login first");
    return navigate("/login");
  };

  const handleAddCart = async (proId) => {
    toast.success(proId);
    try {
      const res = await fetch(`/api/cart/add-cart/${proId}`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      if (data.success) {
        dispatch(cartCountSuccess(data.items));
        return toast.success(data.message);
      }
    } catch (error) {
      return toast.error("Internal Error");
    }
  };

  return (
    <div className="ml-3 w-auto mt-10">
      {products[0]?.items.length > 0 ? (
        <h2 className="text-lg  font-poetsen text-white bg-indigo-700 rounded-lg text-center ">
          Your favourited products
        </h2>
      ) : (
        <h2 className="text-lg font-poetsen text-white bg-indigo-700 rounded-lg text-center ">
          Your wishlist is empty
        </h2>
      )}

      <div className="mt-6 flex items-center gap-4 flex-grow">
        {products[0]?.items.length > 0 ? (
          products.map((product) =>
            product.items.map((item) => (
              <div
                key={item.productId}
                className="relative border border-gray-300 rounded-lg p-4 mt-6  "
              >
                <img
                  onClick={() => handleProduct(item.productId)}
                  className="h-40 object-contain sm:h-48 md:h-56 lg:h-64 xl:h-64 mb-3 p-3 rounded-lg hover:scale-105 mx-auto cursor-pointer"
                  src={item.image}
                  alt={item.name}
                />

                <FaHeart
                  onClick={() => handleRemove(item.productId)}
                  className={`absolute top-1 right-4 text-2xl cursor-pointer ${
                    item.iswishlist === "true" ? "" : "fill-red-500"
                  }`}
                />
                {item.discount ? (
                  <span className="absolute top-0 left-0 m-2 rounded-full bg-red-600 px-2 text-xs xl:text-sm font-medium text-white">
                    {item.discount} % OFF
                  </span>
                ) : null}
                <h3 className="truncate text-center py-2 text-sm font-semibold text-gray-800 capitalize">
                  {item.name}
                </h3>
                <p className="text-base text-center font-bold text-black">
                  £ {item.price}
                </p>
                <div className="flex justify-center gap-3">
                  <p className="line-through text-sm font-semibold text-gray-500">
                    £ {item.realprice}
                  </p>
                  <p className="text-sm font-medium text-green-700 rounded-xl bg-green-300 px-1">
                    {item.discount} % OFF
                  </p>
                </div>
                {currentUser ? (
                  <div
                    className="text-center"
                    onClick={() => handleAddCart(data?.product_id)}
                  >
                    <button className="w-full  text-base text-teal-800 font-lora font-semibold border border-gray-300 rounded-xl py-2 px-2 my-2">
                      Add
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <button
                      onClick={handleLogin}
                      className="w-full  text-base text-teal-800 font-lora font-semibold border border-gray-300 rounded-xl py-2 px-2 my-2"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
            ))
          )
        ) : (
          <div className="w-full">
            <div>
              {/* <h2 className="font-lora font-bold capitalize text-xl text-center">
                Your Wishlist is Empty
              </h2> */}
              <img src={image} alt="Empty Wishlist" className="h-64 " />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;
