import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartCountSuccess } from "../../../redux/cartCount/cartCountSlice";
const Fashion = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const sliderRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [mobiles, setMobiles] = useState([]);

  console.log(mobiles, "this is the mobiles");

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/product/all-products");
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      toast.error("Internal Error");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const mobileProducts = products.filter(
      (product) => product.base_category_name.trim() === "fashion"
    );
    setMobiles(mobileProducts);
  }, [products]);
  console.log(products, "<----------------");
  console.log(mobiles);

  const handleAddCart = async (proId) => {
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

  const handleAddWishlist = async (proId) => {
    try {
      const res = await fetch(`/api/wishlist/add-wishlist/${proId}`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      if (data.success) {
        fetchProducts();
        return toast.success(data.message);
      }
    } catch (error) {
      toast.error("Internal Error");
    }
  };

  const handleLogin = () => {
    toast.success("Login first");
    return navigate("/login");
  };

  const handleProduct = (productId) => {
    navigate(`/productpage/${productId}`);
  };

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: mobiles.length > 1 ? 6 : mobiles.length,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: mobiles.length > 1 ? 5 : mobiles.length,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: mobiles.length > 1 ? 4 : mobiles.length,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: mobiles.length > 1 ? 3 : mobiles.length,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: mobiles.length > 1 ? 2 : mobiles.length,
        },
      },
    ],
  };
  return (
    <div className="mx-4 overflow-hidden xl:mx-36 2xl:mx-48">
      {mobiles && mobiles.length > 0 && (
        <div className="flex justify-between items-center mx-4">
          <h2 className="font-lato font-medium text-gray-900 text-2xl my-4">
            Trending Mobiles
          </h2>
          <p className="font-lato font-semibold text-lg bg-gray-200 px-2 py-1 rounded-xl text-indigo-800 cursor-pointer">
            view all
          </p>
        </div>
      )}

      <div className="relative">
        <Slider ref={sliderRef} {...settings}>
          {mobiles &&
            mobiles.length > 0 &&
            mobiles.map((data) => (
              <div
                key={data?.id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/6 relative mx-2 my-2 py-2 px-3 "
              >
                <img
                  onClick={() => handleProduct(data?.id)}
                  src={data?.images ? data?.images[0].url : null}
                  alt={data?.name}
                  className="mx-auto w-32 h-40 rounded-md cursor-pointer object-contain "
                />
                {currentUser ? (
                  <CiHeart
                    onClick={() => handleAddWishlist(data?.id)}
                    className={`absolute top-2 right-4 text-2xl p-0 cursor-pointer ${
                      data.iswishlist === "true"
                        ? "fill-red-500"
                        : "fill-stone-300"
                    }`}
                  />
                ) : (
                  <CiHeart
                    onClick={handleLogin}
                    className="absolute top-2 right-8 text-2xl cursor-pointer"
                  />
                )}

                <p className="text-slate-900 xl:text-center text-sm font-lato font-semibold capitalize truncate">
                  {data?.name}
                </p>
                <p className="text-black text-sm font-lato font-semibold my-1 xl:text-center">
                  <span className="font-lato font-medium">₹</span>{" "}
                  {parseInt(data.realprice) === 0
                    ? `${data.price}`
                    : data.realprice}
                </p>
                <div className="flex items-center gap-2 mb-2 xl:justify-center">
                  <p className="text-gray-400 line-through text-sm font-lato font-semibold">
                    <span className="font-lato font-medium">₹</span>
                    {data?.price}
                  </p>
                  <p className="bg-green-300 rounded-md px-1 text-green-900 text-xs font-lato font-medium">
                    {data?.discount} % OFF
                  </p>
                </div>
                {currentUser ? (
                  <div
                    className="text-center"
                    onClick={() => handleAddCart(data?.id)}
                  >
                    <button className="w-full xl:w-1/2 text-base text-teal-800 font-lato font-semibold border border-gray-300 rounded-xl py-2 px-2 my-2">
                      Add
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <button
                      onClick={handleLogin}
                      className="w-full xl:w-1/2 text-base text-teal-800 font-lato font-semibold border border-gray-300 rounded-xl py-2 px-2 my-2"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
            ))}
        </Slider>
        <FaChevronLeft
          className="absolute top-1/2 left-0 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 cursor-pointer"
          onClick={() => sliderRef.current.slickPrev()}
        />
        <FaChevronRight
          className="absolute top-1/2 right-0 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 cursor-pointer"
          onClick={() => sliderRef.current.slickNext()}
        />
      </div>
    </div>
  );
};

export default Fashion;
