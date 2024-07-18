import React from "react";
import { FaRegHeart } from "react-icons/fa";

const Carousel = () => {
  const items = [
    {
      id: 1,
      imgSrc:
        "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/g/c/x/-original-imagtyxdm82fsv6m.jpeg?q=70&crop=false",
      imgAlt: "iPad",
      title: "Apple iPad",
      originalPrice: "$400.00",
      discountedPrice: "$369.00",
      rating: 4,
      wishIcon: "fa-heart-o",
    },
    {
      id: 2,
      imgSrc:
        "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/g/c/x/-original-imagtyxdm82fsv6m.jpeg?q=70&crop=false",
      imgAlt: "Headphone",
      title: "Sony Headphone",
      originalPrice: "$25.00",
      discountedPrice: "$23.99",
      rating: 4,
      wishIcon: "fa-heart-o",
    },
    {
      id: 3,
      imgSrc:
        "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/g/c/x/-original-imagtyxdm82fsv6m.jpeg?q=70&crop=false",
      imgAlt: "Macbook",
      title: "Macbook Air",
      originalPrice: "$899.00",
      discountedPrice: "$649.00",
      rating: 4.5,
      wishIcon: "fa-heart-o",
    },
  ];
  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <div className="w-full">
          <h2 className="text-2xl font-light text-center uppercase relative mb-16">
            Featured <b>Products</b>
            <div className="w-24 h-1 bg-green-500 absolute bottom-[-1rem] left-0 right-0 mx-auto"></div>
          </h2>
          <div
            id="myCarousel"
            className="carousel slide"
            data-ride="carousel"
            data-interval="0"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#myCarousel"
                data-slide-to="0"
                className="active"
              ></li>
              <li data-target="#myCarousel" data-slide-to="1"></li>
              <li data-target="#myCarousel" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="flex justify-between">
                  {items.map((item, index) => (
                    <div key={index} className="w-1/4 p-2">
                      <div className="bg-white p-6 rounded-lg shadow-md text-center relative">
                        <span className="absolute top-2 right-2 cursor-pointer text-gray-400">
                          <FaRegHeart />
                        </span>
                        <div className="h-28 mb-4 relative">
                          <img
                            src={item.imgSrc}
                            alt={item.imgAlt}
                            className="max-w-full max-h-full absolute bottom-0 left-0 right-0 mx-auto"
                          />
                        </div>
                        <div className="thumb-content">
                          <h4 className="text-lg">{item.title}</h4>
                          <div className="star-rating">
                            <ul className="flex justify-center mb-2">
                              {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                  <li key={i} className="mx-1">
                                    <i
                                      className={`fa ${
                                        i < item.rating
                                          ? "fa-star"
                                          : "fa-star-o"
                                      } text-yellow-400`}
                                    ></i>
                                  </li>
                                ))}
                            </ul>
                          </div>
                          <p className="text-sm mb-2">
                            <strike>{item.originalPrice}</strike>{" "}
                            <b>{item.discountedPrice}</b>
                          </p>
                          <a
                            href="#"
                            className="btn btn-primary text-green-500 text-xs uppercase font-bold border border-green-500 py-1.5 px-3 rounded-full mt-2 hover:bg-green-500 hover:text-white"
                          >
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Repeat similar blocks for additional carousel items */}
            </div>
            <a
              className="carousel-control-prev"
              href="#myCarousel"
              data-slide="prev"
            >
              <i className="fa fa-angle-left text-white text-3xl"></i>
            </a>
            <a
              className="carousel-control-next"
              href="#myCarousel"
              data-slide="next"
            >
              <i className="fa fa-angle-right text-white text-3xl"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
