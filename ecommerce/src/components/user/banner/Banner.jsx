import React, { useState, useEffect } from "react";
import { Carousel } from "flowbite-react";

const Banner = () => {
  const images = [
    "https://img.freepik.com/free-vector/horizontal-sale-banner-template_23-2148897328.jpg?w=996&t=st=1720066957~exp=1720067557~hmac=1c484247bf4bf992ba13a148e28449d8244ebfcd360792f408c34a26dc3db6c0",
    "https://img.freepik.com/free-vector/home-page-with-fashion-sale-theme_23-2148584361.jpg?w=996&t=st=1720067043~exp=1720067643~hmac=16d3ef3b27e578fb77359867570bb282dccc4061c8a48bded6ee78e25f4abb29",
    "https://img.freepik.com/free-vector/gradient-horizontal-sale-banner-template-with-photo_23-2149014887.jpg?w=996&t=st=1720067108~exp=1720067708~hmac=9810170769671bfe03b61ad6103a38fe10574b53b8390d839ccefd16421ef1d2",
    "https://img.freepik.com/free-psd/summer-sale-70-discount_23-2148476960.jpg?w=996&t=st=1720067288~exp=1720067888~hmac=ecff5e26d985ad47ee5123dd226bf518ca4290011900d52469d74f83d242f0ec",
  ]; // Replace with your image URLs

  return (
    <div className="relative h-48 sm:h-64 xl:h-80 2xl:h-80 lg:my-5 md:my-4 sm:my-3 lg:mx-12 sm:mx-1 xl:mx-36 2xl:mx-48">
      <Carousel pauseOnHover>
        {images.slice(0, 3).map((image, index) => (
          <img key={index} src={image} alt={`Image ${index + 1}`} className="object-contain" />
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
