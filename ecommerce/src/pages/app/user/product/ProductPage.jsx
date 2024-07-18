import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import "../product/productPage.css";
import { Magnify } from "magnify-zone";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [image, setImage] = useState(0);
  console.log(product);
  useEffect(() => {
    const singleProduct = async () => {
      try {
        const res = await fetch(`/api/product/single-product/${id}`);
        const data = await res.json();
        if (!res.ok) {
          return toast.error(data.message);
        }
        if (data.success) {
          setProduct(data.product);
        }
      } catch (error) {
        toast.error("Internal Error");
      }
    };

    singleProduct();
  }, [id]);

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
        return toast.success(data.message);
      }
    } catch (error) {
      toast.error("Internal Error");
    }
  };

  const handleMouseEnter = (index) => {
    setImage(index);
  };
  const handleLogin = () => {
    toast.success("Login first");
    return navigate("/login");
  };

  const price = parseInt(product.price);
  const realprice = parseInt(product.realprice);

  return (
    <div className=" overflow-hidden">
      <div className="flex items-center justify-center ">
        <h3 className="text-center text-2xl font-semibold font-lato text-gray-700 capitalize mt-6 mb-12 bg-stone-200 w-fit py-1 px-4 rounded-xl">
          {product && product?.name}
        </h3>
      </div>
      <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center py-6 mx-4">
        {/* product images */}
        <div className="flex flex-col gap-6 lg:w-2/4 border rounded-lg ">
          {product && product.images && product.images.length > 0 && (
            <div className="mx-auto h-fit " key={product.id}>
              <Magnify
                imageUrl={
                  product.images.length > 0 ? product.images[image].url : ""
                }
                zoomFactor={2}
                zoomPosition="right"
                zoomWidth={500}
                zoomHeight={500}
                marginSize="10px"
                mainImageWidth="100%"
                object-fit="contain"
              />
            </div>
          )}
          <div className="flex flex-row justify-center   gap-2 h-28 mx-2  py-2 border mb-2 rounded-md">
            {product &&
              product.images &&
              product.images.length > 0 &&
              product.images.map((img, index) => (
                <img
                  key={img.public_id}
                  src={img.url}
                  alt=""
                  className={`w-24 h-24  rounded-md cursor-pointer object-contain py-1 px-2 ${
                    index === image
                      ? "border border-blue-500"
                      : "border border-gray-300"
                  }`}
                  // onClick={() => handleImageChange(index)}
                  onMouseEnter={() => handleMouseEnter(index)}
                />
              ))}
          </div>
        </div>
        {/* ABOUT */}
        <div className=" flex flex-col items-center md:border-t sm:border-t lg:border-none xl:border-none 2xl:border-none pt-4 lg:p-0 xl:p-0 2xl:p-0 border-t gap-2 lg:w-2/4 ">
          <div>
            <span className=" text-violet-600 font-semibold font-lato">
              Special Sneaker
            </span>
            <h1 className="text-3xl font-lato font-bold">
              {product && product?.name}
            </h1>
          </div>
          <p className="text-gray-700 font-lato">
            {product && product?.description}.
          </p>
          <h6 className="text-2xl font-semibold font-lato">
            £ {product && realprice === 0 ? price : realprice}
          </h6>
          <div className="flex flex-row items-center gap-12">
            {currentUser ? (
              <button
                onClick={() => handleAddCart(product?.product_id)}
                className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full"
              >
                Add Cart
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full"
              >
                Add Cart
              </button>
            )}
            {currentUser ? (
              <button
                onClick={() => handleAddWishlist(product.id)}
                className="bg-yellow-400 text-white font-semibold py-3 px-16 rounded-xl h-full"
              >
                Add whishlist
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-yellow-400 text-white font-semibold py-3 px-16 rounded-xl h-full"
              >
                Add whishlist
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="border-b border-2 pt-4">
        <h2 className="text-center text-2xl py-5 font-lato text-semibold capitalize font-medium text-teal-800">
          Related Products
        </h2>
        <div className="flex items-center py-2 mx-4 w-full">
          {relatedProducts.map((data) => (
            <div
              key={data._id}
              className="border rounded-lg py-2 px-4 mr-3 hover"
            >
              <img
                className=" cursor-pointer w-16 sm:w-16 md:w-20 lg:w-20 xl:w-24  mx-auto hover:scale-105"
                src={data.images.length > 0 ? data.images[0].image : ""}
                alt={data.name}
              />
              <p className="text-gray-800 text-xs xl:text-sm lg:text-sm md:text-xs font-medium py-2 text-center">
                {data.name}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-xs text-green-600 sm:text-xs md:text-xs lg:text-sm xl:text-sm font-medium">
                  <span className="text-teal-900 pr-1">£</span>
                  {data.price}
                </p>
                <p className="line-through text-xs text-gray-600 sm:text-sxs md:text-xs lg:text-sm xl:text-sm hidden sm:block lg:block xl:block font-medium">
                  <span className="text-teal-900 pr-1">£</span>
                  {data.realprice}
                </p>
              </div>
              <div className="text-center mt-2">
                <button className="border rounded py-1 px-3 font-medium text-xs hover:border-green-500 text-teal-600 sm:text-xs md:text-xs lg:text-sm xl:text-base">
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
