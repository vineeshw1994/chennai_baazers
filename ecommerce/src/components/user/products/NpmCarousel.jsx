import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import { products } from "../../../../data/ProductData";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./style.css";
import noproduct from "../../../assets/noproduct.png";

const NpmCarousel = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    largerDesktop: {
      breakpoint: { max: 2999, min: 1920 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 1919, min: 1440 },
      items: 6,
    },
    smallerDesktop: {
      breakpoint: { max: 1439, min: 1280 },
      items: 5,
    },
    tabletLandscape: {
      breakpoint: { max: 1279, min: 1024 },
      items: 5,
    },
    tabletPortrait: {
      breakpoint: { max: 1023, min: 768 },
      items: 4,
    },
    largerMobile: {
      breakpoint: { max: 767, min: 576 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 575, min: 0 },
      items: 2,
    },
  };

  const handlePage = (id) => {
    toast.success(id);
    navigate(`/productpage/${id}`);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(`/api/product/get-products`);
        const data = await res.json();
        if (res.ok) {
          setProducts(data.products);
        }
      } catch (error) {
        console.log("error geting products");
      }
    };
    getProducts();
  }, []);
  return (
    <>
      {products && products.length > 0 ? (
        <div className="xl:mx-16 lg:mx-2 md:mx-6 my-6 sm:mx-4 mx-4">
          <h2 className="text-slate-800 font-medium lg:text-xl md:text-lg sm:text-sm capitalize  ml-20">
            Mobiles
          </h2>
          <Carousel responsive={responsive} className="lg:mx-8 xl:mx-16 my-4  ">
            {products &&
              products.map((prodct, index) => (
                <div
                  key={prodct._id}
                  className={`relative lg:w-44 lg:h-52 md:w-32 md:h-48 xl:w-44 xl:h-56 border py-2 rounded shadow-md sm:w-32 w-32 ${
                    index % responsive.mobile.items === 0 ? "mr-4" : "mr-2" // Add margin right based on the number of items per row on mobile
                  }`}
                >
                  <img
                    className="w-16 h-20 lg:w-20 lg:h-24 md:w-20 md:h-24 xl:w-20 xl:h-28 mx-auto cursor-pointer hover:scale-110 "
                    src={
                      prodct.images.length > 0 ? prodct.images[0].image : " "
                    }
                    alt={prodct.name}
                    onClick={() => {
                      handlePage(prodct._id);
                    }}
                  />
                  {prodct && prodct.discount ? (
                    <span className="absolute top-0 left-0 bottom- m-2 rounded-full bg-red-600 px-2 text-center text-xs lg:text-xs xl:text-sm font-medium text-white">
                      {prodct.discount} % OFF
                    </span>
                  ) : null}
                  <p className=" text-xs font-medium text-gray-500 lg:text-sm md:text-xs sm:text-xs my-1 text-center capitalize">
                    {prodct.name}
                  </p>
                  <div className="flex  justify-around items-center mx-2 md-shrink-0">
                    <p className="text-xs font-medium text-red-500 lg:text-xs sm:text-xs md:text-xs xl:text-xs">
                      <span className="text-teal-800 ">£ </span>
                      {prodct.price}
                    </p>
                    <p className="hidden sm:block md:block lg:block xl:block line-through font-medium text-slate-500 lg:text-xs sm:text-xs md:text-xs">
                      <span className="text-teal-800">£ </span>11500
                    </p>
                  </div>
                  <div className="text-center my-3">
                    <button className="border text-xs font-medium text-teal-800 lg:text-sm md:text-sm sm:text-sm px-2 rounded hover:bg-gray-100 hover:border-green-600 ">
                      Add to Bag
                    </button>
                  </div>
                </div>
              ))}
          </Carousel>
        </div>
      ) : (
        <div className="text-center mt-4">
          <img
            src={noproduct}
            alt="No products available"
            className="w-32 h-36 lg:w-40 lg:h-48 md:w-36 md:h-40 xl:w-48 xl:h-56 mx-auto cursor-pointer hover:scale-110 "
          />
          <p className="text-gray-500 mt-2">No products available</p>
        </div>
      )}
    </>
  );
};

export default NpmCarousel;
