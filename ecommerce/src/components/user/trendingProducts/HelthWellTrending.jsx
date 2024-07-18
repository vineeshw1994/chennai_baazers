import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import "../trendingProducts/style.css";
import toast from "react-hot-toast";

const HelthWellTrending = () => {
  const [wishList, setWishList] = useState(false);
  const images = [
    {
      id: 1,
      image:
        "https://www.jiomart.com//images/product/original/rvdwnjjel0/everteen-period-care-xxl-soft-40-sanitary-pads-320mm-with-double-flaps-enriched-with-neem-and-safflower-1-pack-40-pads-product-images-orvdwnjjel0-p591231437-0-202405201848.jpg?im=Resize=(310,310)",
      name: "surf-exel clean master",
      price: 500,
      realprice: 600,
      discount: 10,
    },
    {
      id: 2,
      image:
        "https://www.jiomart.com//images/product/original/rvzoqpfk9s/elduro-premium-medium-adult-diaper-pant-30-count-14-hrs-overnight-protection-pack-of-3-product-images-orvzoqpfk9s-p594410449-0-202309011858.png?im=Resize=(310,310)",
      name: "pinoil tuff clean",
      price: 100,
      realprice: 175,
      discount: 11,
    },
    {
      id: 3,
      image:
        "https://www.jiomart.com//images/product/original/rv9cyoapjz/paree-super-nights-sanitary-pads-with-double-feather-for-heavy-flow-xxl-all-night-leakage-protection-and-convenient-disposable-pouch-30-pads-product-images-orv9cyoapjz-p596417609-0-202403291953.jpg?im=Resize=(310,310)",
      name: "pinoil-2 floor clenar",
      price: 250,
      realprice: 325,
      discount: 16,
    },
    {
      id: 4,
      image:
        "https://www.jiomart.com//images/product/original/rvfzh7zlol/pentasure-2-0-high-protein-high-calorie-vanilla-flavour-1-kg-product-images-orvfzh7zlol-p599949950-0-202309201751.png?im=Resize=(310,310)",
      name: "fin-care glass clenar",
      price: 95,
      realprice: 120,
      discount: 8,
    },
    {
      id: 5,
      image:
        "https://www.jiomart.com//images/product/original/rvberhkgeg/kobra-labs-the-bull-mass-gainer-weight-gainers-mass-gainers-1kg-chocolate-product-images-orvberhkgeg-p593920469-0-202401191644.jpg?im=Resize=(310,310)",
      name: "can-foil every wash",
      price: 256,
      realprice: 310,
      discount: 15,
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Show 5 products by default
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4, // Show 4 products on large screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3, // Show 3 products on medium screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2.5, // Show 2.5 products on small screens
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleAddCart = () => {
    toast.success((t) => (
      <span>
        Add Successfully
        <button
          className=" ml-3 border border-green-500 text-sm font-lora font-medium  px-2 rounded-lg"
          onClick={() => toast.dismiss(t.id)}
        >
          View
        </button>
      </span>
    ));
  };
  return (
    <div className=" p-5  mb-4 rounded-md relative mx-4">
      <h1 className="font-poetsen font-medium text-gray-900 text-2xl my-4">
        Health & Wellness Picks
      </h1>
      <Slider {...settings}>
        {images && images.length > 0
          ? images.map((image, index) => (
              <div
                key={image.id}
                className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 xl:w-1/6 relative mx-2 my-2 py-2 px-3 "
              >
                <img
                  src={image.image}
                  alt="image"
                  className="w-32 mx-auto h-40 rounded-md cursor-pointer "
                />
                <CiHeart className="absolute top-2 right-8 text-2xl cursor-pointer" />
                <p className="text-slate-900 xl:text-center text-sm font-lora font-semibold capitalize truncate">
                  {image.name}
                </p>
                <p className="text-black text-sm font-lora font-semibold my-1 xl:text-center">
                  £ {image.realprice}
                </p>
                <div className="flex items-center gap-2 mb-2 xl:justify-center">
                  <p className="text-gray-400 line-through text-sm font-lora font-semibold">
                    £{image.price}{" "}
                  </p>
                  <p className="bg-green-300 rounded-md px-1  text-green-900 text-xs font-lora font-medium">
                    {image.discount} % OFF
                  </p>
                </div>
                <div className="text-center">
                  <button
                    onClick={handleAddCart}
                    className="w-full xl:w-1/2 text-base text-teal-800 font-lora font-semibold border border-gray-300 rounded-xl py-2 px-2 my-2"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))
          : null}
      </Slider>
      <FaChevronLeft
        className="absolute top-1/2 left-0 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 cursor-pointer"
        onClick={() => {
          document.querySelector(".slick-prev").click();
        }}
      />
      <FaChevronRight
        className="absolute top-1/2 right-0 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 cursor-pointer"
        onClick={() => {
          document.querySelector(".slick-next").click();
        }}
      />
    </div>
  );
};

export default HelthWellTrending;
