import React from "react";
import { offers } from "../../../../data/Offers";

const ProductOffer = () => {
  const pro1 = {
    _id: 1,
    name: "Apple Macbook ",
    price: 71000,
    description: "6.59-inch (16.97 cm)with super charger.",
    category: "mobile",
    quantity: 5,
    realprice: 89900,
    discount: 20,
    published: false,
    brand: "vivo",
    images: [
      {
        id: 1,
        image: "https://m.media-amazon.com/images/I/71jG+e7roXL._SL1500_.jpg",
      },
      {
        id: 2,
        image: "https://m.media-amazon.com/images/I/71jG+e7roXL._SL1500_.jpg",
      },
      {
        id: 3,
        image: "https://m.media-amazon.com/images/I/71jG+e7roXL._SL1500_.jpg",
      },
      {
        id: 4,
        image: "https://m.media-amazon.com/images/I/71jG+e7roXL._SL1500_.jpg",
      },
      {
        id: 5,
        image: "https://m.media-amazon.com/images/I/71jG+e7roXL._SL1500_.jpg",
      },
    ],
  };
  const pro2 = {
    _id: 2,
    name: "Apple Air M2",
    price: 89000,
    description: "6.59-inch (16.97 cm)with super charger.",
    category: "mobile",
    quantity: 24,
    realprice: 114000,
    published: false,
    brand: "oppo",
    images: [
      {
        id: 1,
        image: "https://m.media-amazon.com/images/I/719C6bJv8jL._SL1500_.jpg",
      },
      {
        id: 2,
        image: "https://m.media-amazon.com/images/I/719C6bJv8jL._SL1500_.jpg",
      },
      {
        id: 3,
        image: "https://m.media-amazon.com/images/I/719C6bJv8jL._SL1500_.jpg",
      },
      {
        id: 4,
        image: "https://m.media-amazon.com/images/I/719C6bJv8jL._SL1500_.jpg",
      },
      {
        id: 5,
        image: "https://m.media-amazon.com/images/I/719C6bJv8jL._SL1500_.jpg",
      },
    ],
  };
  const pro3 = {
    _id: 3,
    name: "MacBook Air 13",
    price: 119000,
    description: "6.59-inch (16.97 cm)with super charger.",
    category: "mobile",
    quantity: 5,
    realprice: 112990,
    discount: 6,
    brand: "realme",
    published: false,
    images: [
      {
        id: 1,
        image: "https://m.media-amazon.com/images/I/71ItMeqpN3L._SL1500_.jpg",
      },
      {
        id: 2,
        image: "https://m.media-amazon.com/images/I/71ItMeqpN3L._SL1500_.jpg",
      },
      {
        id: 3,
        image: "https://m.media-amazon.com/images/I/71ItMeqpN3L._SL1500_.jpg",
      },
      {
        id: 4,
        image: "https://m.media-amazon.com/images/I/71ItMeqpN3L._SL1500_.jpg",
      },
      {
        id: 5,
        image: "https://m.media-amazon.com/images/I/71ItMeqpN3L._SL1500_.jpg",
      },
    ],
  };
  const pro4 = {
    _id: 3,
    name: "Apple iPhone 15",
    price: 64999,
    description: "Apple iPhone 15 (Blue, 128 GB).",
    category: "mobile",
    quantity: 5,
    realprice: 79900,
    discount: 6,
    brand: "realme",
    published: false,
    images: [
      {
        id: 1,
        image: "https://m.media-amazon.com/images/I/71d7rfSl0wL._SL1500_.jpg",
      },
      {
        id: 2,
        image: "https://m.media-amazon.com/images/I/71d7rfSl0wL._SL1500_.jpg",
      },
      {
        id: 3,
        image: "https://m.media-amazon.com/images/I/71d7rfSl0wL._SL1500_.jpg",
      },
      {
        id: 4,
        image: "https://m.media-amazon.com/images/I/71d7rfSl0wL._SL1500_.jpg",
      },
      {
        id: 5,
        image: "https://m.media-amazon.com/images/I/71d7rfSl0wL._SL1500_.jpg",
      },
    ],
  };
  const pro5 = {
    _id: 3,
    name: "Apple iPhone 14",
    price: 56000,
    description: "Apple iPhone 14 (Blue, 128 GB).",
    category: "mobile",
    quantity: 5,
    realprice: 69900,
    discount: 6,
    brand: "realme",
    published: false,
    images: [
      {
        id: 1,
        image: "https://m.media-amazon.com/images/I/61cwywLZR-L._SL1500_.jpg",
      },
      {
        id: 2,
        image: "https://m.media-amazon.com/images/I/61cwywLZR-L._SL1500_.jpg",
      },
      {
        id: 3,
        image: "https://m.media-amazon.com/images/I/61cwywLZR-L._SL1500_.jpg",
      },
      {
        id: 4,
        image: "https://m.media-amazon.com/images/I/61cwywLZR-L._SL1500_.jpg",
      },
      {
        id: 5,
        image: "https://m.media-amazon.com/images/I/61cwywLZR-L._SL1500_.jpg",
      },
    ],
  };
  const pro6 = {
    _id: 3,
    name: "Apple iPhone 15 ",
    price: 64900,
    description: "Apple iPhone 15 (Blue, 128 GB).",
    category: "mobile",
    quantity: 5,
    realprice: 79900,
    discount: 6,
    brand: "realme",
    published: false,
    images: [
      {
        id: 1,
        image:
          "https://m.media-amazon.com/images/I/31Q14qzdoZL._SY445_SX342_QL70_FMwebp_.jpg",
      },
      {
        id: 2,
        image:
          "https://m.media-amazon.com/images/I/31Q14qzdoZL._SY445_SX342_QL70_FMwebp_.jpg",
      },
      {
        id: 3,
        image:
          "https://m.media-amazon.com/images/I/31Q14qzdoZL._SY445_SX342_QL70_FMwebp_.jpg",
      },
      {
        id: 4,
        image:
          "https://m.media-amazon.com/images/I/31Q14qzdoZL._SY445_SX342_QL70_FMwebp_.jpg",
      },
      {
        id: 5,
        image:
          "https://m.media-amazon.com/images/I/31Q14qzdoZL._SY445_SX342_QL70_FMwebp_.jpg",
      },
    ],
  };

  return (
    <div className="xl:mx-16 lg:mx-8 py-4">
      <div className="flex items-center xl:justify-around  gap-1 ">

        <div className="flex items-center border ">
          <div className="  mx-2 pb-2">
            <img
              src={pro1.images[0].image}
              alt={pro1.name}
              className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-96"
            />
            <div className="text-center">
              <p className="text-xs lg:text-sm xl:text-base font-lora font-medium text-teal-700">
                {pro1.name}
              </p>
              <div className="flex items-center justify-center">
                <p className="text-xs lg:text-sm xl:text-base font-lora font-medium text-slate-900">
                  {pro1.price}
                </p>
                <p className="line-through ml-2 text-xs lg:text-sm xl:text-base font-lora font-medium text-gray-500 ">
                  £ {pro1.realprice}
                </p>
                {pro1?.discount ? (
                  <p className="ml-2 text-red-500 ">%{pro1.discount}</p>
                ) : (
                  ""
                )}
              </div>
              <p className="text-green-600 text-xs lg:text-sm xl:text-base font-lora font-medium">
                Offers goes 3 days only
              </p>
            </div>
          </div>

          <div className="border">
            <div>
              <img
                src={pro2.images[0].image}
                alt={pro2.name}
                className="w-36 sm:w-48 md:w-56 lg:w-64 xl:w-72"
              />
              <div className="text-center">
                <p className="text-xs lg:text-sm xl:text-base font-lora font-medium text-teal-700">
                  {pro2.name}
                </p>
                <div className="flex items-center justify-center">
                  <p className="text-xs lg:text-sm xl:text-base font-lora font-medium text-slate-900">
                    {pro2.price}
                  </p>
                  <p className="line-through ml-2 text-xs lg:text-sm xl:text-base font-lora font-medium text-gray-500 ">
                    £ {pro2.realprice}
                  </p>
                  {pro2?.discount ? (
                    <p className="ml-2 text-red-500 ">%{pro2.discount}</p>
                  ) : (
                    ""
                  )}
                </div>
                <p className="text-green-600 text-xs lg:text-sm xl:text-base font-lora font-medium">
                  Offers goes 3 days only
                </p>
              </div>
            </div>
            <div className="pb-4">
              <img
                src={pro3.images[0].image}
                alt={pro3.name}
                className="w-36 sm:w-48 md:w-56 lg:w-64 xl:w-72"
              />
              <div className="text-center">
                <p className="text-xs lg:text-sm xl:text-base font-lora font-medium text-teal-700">
                  {pro3.name}
                </p>
                <div className="flex items-center justify-center">
                <p className="text-xs lg:text-sm xl:text-base font-lora font-medium text-slate-900">
                  {pro3.price}
                </p>
                <p className="line-through ml-2 text-xs lg:text-sm xl:text-base font-lora font-medium text-gray-500 ">
                  £ {pro3.realprice}
                </p>
                {pro3?.discount ? (
                  <p className="ml-2 text-red-500 ">%{pro3.discount}</p>
                ) : (
                  ""
                )}
              </div>
                <p className="text-green-600 text-xs lg:text-sm xl:text-base font-lora font-medium">
                  Offers goes 3 days only
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center border ">

          <div className="">
            <img
              src={pro4.images[0].image}
              alt={pro4.name}
              className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-96"
            />
            <div className="text-center">
              <p className="text-xs lg:text-sm xl:text-base font-lora font-medium text-teal-700">
                {pro4.name}
              </p>
              <div className="flex items-center justify-center">
                <p className="text-xs lg:text-sm xl:text-base font-lora font-medium text-slate-900">
                  {pro4.price}
                </p>
                <p className="line-through ml-2 text-xs lg:text-sm xl:text-base font-lora font-medium text-gray-500 ">
                  £ {pro4.realprice}
                </p>
                {pro4?.discount && (
                  <p className="ml-2 text-red-500 ">%{pro4.discount}</p>
                )}
              </div>
              <p className="text-green-600 text-xs lg:text-sm xl:text-base font-lora font-medium">
                Offers goes 3 days only
              </p>
            </div>
          </div>

          <div className="border">
            <div>
              <img
                src={pro5.images[0].image}
                alt={pro5.name}
                className="w-36 sm:w-48 md:w-56 lg:w-64 xl:w-72"
              />
              <div className="text-center">
                <p className="text-xs lg:text-sm xl:text-base font-lora font-medium text-teal-700">
                  {pro5.name}
                </p>
                <div className="flex items-center justify-center">
                  <p className="text-xs lg:text-sm xl:text-base font-lora font-medium text-slate-900">
                    {pro5.price}
                  </p>
                  <p className="line-through ml-2 text-xs lg:text-sm xl:text-base font-lora font-medium text-gray-500 ">
                    £ {pro5.realprice}
                  </p>
                  {pro5?.discount && (
                    <p className="ml-2 text-red-500 ">%{pro5.discount}</p>
                  )}
                </div>
                <p className="text-green-600 text-xs lg:text-sm xl:text-base font-lora font-medium">
                  Offers goes 3 days only
                </p>
              </div>
            </div>
            <div>
              <img
                src={pro6.images[0].image}
                alt={pro6.name}
                className="w-36 sm:w-48 md:w-56 lg:w-64 xl:w-72"
              />
              <div className="text-center">
                <p className="text-xs lg:text-sm xl:text-base font-lora font-medium text-teal-700">
                  {pro6.name}
                </p>
                <div className="flex items-center justify-center">
                  <p className="text-xs lg:text-sm xl:text-base font-lora font-medium text-slate-900">
                    {pro6.price}
                  </p>
                  <p className="line-through ml-2 text-xs lg:text-sm xl:text-base font-lora font-medium text-gray-500 ">
                    £ {pro6.realprice}
                  </p>
                  {pro6?.discount && (
                    <p className="ml-2 text-red-500 ">%{pro6.discount}</p>
                  )}
                </div>
                <p className="text-green-600 text-xs lg:text-sm xl:text-base font-lora font-medium">
                  Offers goes 3 days only
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOffer;
