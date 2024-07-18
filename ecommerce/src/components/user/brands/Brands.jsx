import React, { useEffect, useState } from "react";
import { brands } from "../../../../data/brands";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../brands/brands.css'

const Brands = () => {
  const [brand, setBrand] = useState([]);

  useEffect(() => {
    setBrand(brands);
  }, []);
  console.log(brand,'------------>')
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
  return (
    <div className="xl:mx-4 ">
      <h2 className="text-stone-700 font-bold font-lora lg:text-xl md:text-lg sm:text-sm capitalize  ml-20 text-center">
       Our Brands
      </h2>
      <Carousel responsive={responsive} className="shadow-2xl xl:mx-4 lg:mx-4 my-4 border rounded-lg py-4 bg-white react-multi-carousel-arrow " showArrows={false} autoPlay={true} autoPlaySpeed={2000} infinite={true}>
        {brand && brand.length > 0 &&
          brand.map((data, index) => (
            <div
              key={data.id}
              className={`relative h-32 w-32 py-2 mb-3   ${
                index % responsive.mobile.items === 0 ? "mr-4" : "mr-2" // Add margin right based on the number of items per row on mobile
              }`}
            >
              <img
                className="w-16 h-16 sm:w-16 sm:h-16 lg:w-20 lg:h-20 md:w-20 md:h-20 xl:w-24 xl:h-24 mx-auto cursor-pointer rounded-full "
                src={data.image}
                alt={data.name}
                onClick={() => {
                  handlePage(prodct._id);
                }}
              />

              <p className=" text-sm font-bold text-teal-600 lg:text-sm md:text-sm sm:text-sm my-1 text-center capitalize">
                {data.name}
              </p>
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default Brands;
