import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const IconsBanner = () => {
  const images = [
    {
      id: 1,
      image:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1717177980_Rice_Mela.jpg?im=Resize=(768,448)",
    },
    {
      id: 2,
      image:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1717438191_Best_Selling_Refrigerators_632x368.jpg?im=Resize=(768,448)",
    },
    {
      id: 3,
      image:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1717610017_Family_Fun_Time_632x368.jpg?im=Resize=(768,448)",
    },
    {
      id: 4,
      image:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1717486780_Brands_To_Grab.jpg?im=Resize=(768,448)",
    },
    {
      id: 5,
      image:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1717073946_HPMC.jpg?im=Resize=(768,448)",
    },
    {
      id: 6,
      image:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1717609912_Poco_M6_5G_632x368.jpg?im=Resize=(768,448)",
    },
    {
      id: 7,
      image:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1717075062_Artisanal_Bedsheets.jpg?im=Resize=(768,448)",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-16 p-5  mb-8 rounded-md relative mx-4 xl:mx-36 2xl:mx-40">
      
      <Slider {...settings}>
        {images && images.length > 0
          ? images.map((image) => (
              <div key={image.id} className="slide-ite mx-4">
                <img
                  className="rounded-lg h-56 xl:h-56 xl:w-11/12 lg:w-10/12 md:w-8/12 mx-2 object-contain cursor-pointer "
                  src={image.image}
                  alt="image"
                />
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

export default IconsBanner;
