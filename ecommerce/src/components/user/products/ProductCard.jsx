import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../products/styles/productCard.css";
import { CiHeart } from "react-icons/ci";

const ProductCard = ({ product }) => {
  console.log(product, "-----------------");
  const price = parseInt(product.price);
  const realprice = parseInt(product.realprice);
  console.log(price, realprice);
  const navigate = useNavigate();
  const handleAddBag = () => {
    toast.success("Added Sucessfully");
  };

  const handlePage = (id) => {
    navigate(`/productpage/${id}`);
  };
  return (
    <div className="flex lg:justify-evenly xl:justify-between sm:justify-center cursor-pointer">
      <div className="relative border border-gray-300 w-full h-fit px-1 py-4 rounded-lg ">
        <img
          onClick={() => {
            handlePage(product.id);
          }}
          className="object-contain h-40 sm:h-48 md:h-56  lg:h-64 xl:h-72 mb-3 p-3 rounded-lg hover:scale-105 mx-auto relative"
          src={product.images[0].url}
          alt={product?.name}
        />
        <CiHeart className="absolute top-1  right-4 text-2xl cursor-pointer" />
        {product && product?.discount ? (
          <span class="absolute top-3 left-0 bottom- m-2 rounded-full bg-red-600 px-2 text-center text-xs xl:text-sm font-medium text-white">
            {product?.discount} % OFF
          </span>
        ) : null}
        <h3 className="truncate py-2 text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm font-semibold font-lato text-gray-800 capitalize">
          {product?.name}
        </h3>
        <p className="text-sm sm:text-base md:text-base lg:text-base xl:text-base font-bold font-lato text-black">
          <span className="font-lato font-medium">₹</span>{" "}
          {realprice === 0 ? price : realprice}
        </p>
        <div className="flex items-center gap-3">
          <p className="line-through text-xs sm:text-xs md:text-xs lg:text-sm xl:text-sm font-semibold font-lato text-gray-500 ">
            <span className="font-lato font-medium">₹</span> {product?.price}
          </p>
          <p className=" text-xs sm:text-xs md:text-xs lg:text-sm xl:text-sm font-medium font-lato text-green-700 rounded-xl bg-green-300 px-1  ">
            {product?.discount ? `${product?.discount} % OFF` : null}
          </p>
        </div>
        <button
          onClick={handleAddBag}
          className="py-1 text-xs sm:text-sm md:text-base lg:text-base xl:text-lg border mt-4 border-gray-400 w-full font-lato  font-medium text-teal-800 rounded-lg  "
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
