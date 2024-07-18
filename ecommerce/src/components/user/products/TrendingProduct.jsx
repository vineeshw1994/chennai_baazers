import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

const TrendingProduct = () => {
  const images = [
    {
      id: 1,
      image:
        "https://www.jiomart.com/images/product/original/rvgiwqhkez/active-white-detergent-powder-10-kg-family-pack-product-images-orvgiwqhkez-p603002057-0-202307071839.jpg?im=Resize=(420,420)",
      name: "surf-exel",
      price: 500,
      realprice: 600,
      discount: 10,
    },
    {
      id: 2,
      image:
        "https://www.jiomart.com/images/product/original/rvtmfjuxuo/lizol-disinfectant-surface-floor-cleaner-liquid-citrus-5-litre-product-images-orvtmfjuxuo-p601213316-0-202403271318.jpg?im=Resize=(420,420)",
      name: "pinoil",
      price: 100,
      realprice: 175,
      discount: 11,
    },
    {
      id: 3,
      image:
        "https://www.jiomart.com//images/product/original/rvhluyebo3/lyzoo-laundry-detergent-top-and-front-load-liquid-detergent-5-lt-buy-1-get-1-free-product-images-orvhluyebo3-p604693471-0-202309202129.png?im=Resize=(310,310)",
      name: "pinoil-2",
      price: 250,
      realprice: 325,
      discount: 16,
    },
    {
      id: 4,
      image:
        "https://www.jiomart.com//images/product/original/rvj05ixh6z/lizol-5-litre-lavender-disinfectant-surface-floor-cleaner-liquid-suitable-for-all-floor-cleaner-mops-kills-99-9-germs-india-s-1-floor-cleaner-product-images-orvj05ixh6z-p607030534-0-202312301401.jpg?im=Resize=(310,310)",
      name: "fin-care",
      price: 95,
      realprice: 120,
      discount: 8,
    },
    {
      id: 5,
      image:
        "https://www.jiomart.com//images/product/original/rv7ut76syt/herbal-strategi-natural-laundry-detergent-1-ltr-product-images-orv7ut76syt-p608686621-0-202404160404.png?im=Resize=(310,310)",
      name: "can-foil",
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

  return (
    <div className="mt-16 p-5  mb-8 rounded-md relative mx-4">
      <Slider {...settings}>
        {images && images.length > 0
          ? images.map((image, index) => (
              <div
                key={image.id}
                className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 xl:w-1/6 relative mx-2 py-2 px-3 "
              >
                <img
                  src={image.image}
                  alt="image"
                  className="w-36 h-auto rounded-md cursor-pointer "
                />
                <CiHeart className="absolute top-2 right-44 text-2xl cursor-pointer" />
                <p className="text-slate-900 text-base font-lora font-medium">
                  {image.name}
                </p>
                <p className="text-black text-base font-lora font-semibold">
                  £ {image.realprice}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-gray-400 line-through text-base font-lora font-semibold">
                    £{image.price}{" "}
                  </p>
                  <p className="bg-green-300 rounded-md px-1  text-green-900 text-sm font-lora font-medium">
                    {image.discount} % OFF
                  </p>
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

export default TrendingProduct;
