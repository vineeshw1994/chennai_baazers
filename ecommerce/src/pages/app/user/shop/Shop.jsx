import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";

const Shop = () => {
  const { proId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const [myaccountOpen, setMyaccountOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [progressWidth, setProgressWidth] = useState("0%");
  const [selectedDiscount, setSelectedDiscount] = useState("");

  const fetchAllProducts = async () => {
    try {
      const res = await fetch("/api/product/all-products");
      const data = await res.json();
      if (!data.success) {
        return toast.error(data.message);
      }
      if (data.success) {
        setAllProducts(data.products);
      }
    } catch (error) {
      return toast.error("Internal Error");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/category/all-categories");
      const data = await res.json();
      if (!data.success) {
        return toast.error(data.message);
      }
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      return toast.error("Internal Error");
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/product/product/${proId}`);
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      if (data.success) {
        setProducts(data.product);
      }
    } catch (error) {
      return toast.error("Internal Error");
    }
  };

  const fetchSubcategories = async () => {
    try {
      const res = await fetch("/api/category/all-subcategories");
      const data = await res.json();
      if (!data.success) {
        return toast.error(data.message);
      }
      if (data.success) {
        setSubCategories(data.category);
      }
    } catch (error) {
      return toast.error("Internal Error");
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchSubcategories();
    fetchCategories();
    fetchAllProducts();
  }, []);

  console.log(products, "<-----------------");

  const prices = [
    "0-1000",
    "1000-10000",
    "10000-20000",
    "20000-30000",
    "30000-50000",
    "50000-70000",
    "70000-80000",
    "80000-90000",
    "90000-100000",
    "100000-300000",
  ];
  const discount = ["1%-10%", "10%-20%", "20%-30%", "30%-40%", "40%-50%"];

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

  const handleLogin = () => {
    toast.success("Login first");
    return navigate("/login");
  };

  const handleFilter = (id) => {
    const newSubcategory = selectedSubcategory === id ? null : id;
    setSelectedSubcategory(newSubcategory);

    if (newSubcategory === null) {
      setProducts(allProducts); // Reset to all products if no category selected
    } else {
      setSelectedDiscount(null);
      setSelectedPrice(null);
      const filteredProducts = allProducts.filter(
        (product) => product.subcategory_id === newSubcategory
      );
      setProducts(filteredProducts);
    }
  };

  const handlePriceSelect = (value) => {
    setSelectedPrice(value);
  };

  const handleDiscountSelect = (value) => {
    setSelectedDiscount(value);
  };

  const handleProduct = (productId) => {
    navigate(`/productpage/${productId}`);
  };

  useEffect(() => {
    let filteredProducts = [...allProducts];

    if (selectedSubcategory !== null) {
      filteredProducts = filteredProducts.filter(
        (product) => product.subcategory_id === selectedSubcategory
      );
    }
    console.log(filteredProducts, "/////////////////////////");

    if (selectedPrice) {
      const [min, max] = selectedPrice.split("-");
      console.log("Selected price range:", min, max);
      filteredProducts = filteredProducts.filter((product) => {
        const price = parseFloat(product.realprice);
        console.log("Product price:", price);
        return price >= parseFloat(min) && price <= parseFloat(max);
      });
      console.log(filteredProducts, "Filtered by price");
    }

    if (selectedDiscount) {
      const [minDiscount, maxDiscount] = selectedDiscount.split("-");
      filteredProducts = filteredProducts.filter((product) => {
        const discount = parseFloat(product.discount);
        return (
          discount >= parseFloat(minDiscount) &&
          discount <= parseFloat(maxDiscount)
        );
      });
      console.log(filteredProducts, "Filtered by discount");
    }

    setProducts(filteredProducts);
  }, [selectedSubcategory, selectedPrice, selectedDiscount]);

  return (
    <div className="mt-5 py-3 border">
      <div className="flex mx-6">
        <div className="flex flex-col   p-2 w-72 xl:w-96 border border-gray-300 rounded-xl shadow-md">
          <h2 className="text-sm md:text-lg lg:text-lg xl:text-xl  font-medium font-poetsen my-2 text-slate-800">
            Filter Products
          </h2>
          <div className="my-1 ">
            <h3 className=" bg-gray-100 rounded-md py-1 text-sm md:text-sm lg:text-base font-poetsen font-medium xl:text-base text-gray-900">
              Categories
            </h3>
            <div className=" max-h-80 overflow-y-auto">
              {subCategories.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-1 cursor-pointer my-1 "
                >
                  <input
                    type="checkbox"
                    checked={selectedSubcategory === item.id}
                    onChange={() => handleFilter(item.id)}
                  />
                  <p className="capitalize font-lato font-medium text-sm">
                    {item.subcategory_name}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-gray-300 mx-1 my-2"></div>
          <div>
            <h3 className="my-2 text-sm md:text-sm lg:text-base font-poetsen font-medium xl:text-base text-gray-900">
              Price
            </h3>
            <div className="relative">
              <select
                className="cursor-pointer text-xs sm:text-xs md:text-xs lg:text-sm xl:text-base font-lato font-medium text-stone-900 appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => handlePriceSelect(e.target.value)}
                value={selectedPrice}
              >
                <option value="">Select Price</option>
                {prices.map((price) => (
                  <option key={price} value={price}>
                    {price}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="border border-gray-300 mx-1 mt-6"></div>

          <div className="mt-2">
            <h3 className="my-2 text-sm md:text-sm lg:text-base font-poetsen font-medium xl:text-base text-gray-900">
              Discount
            </h3>
            <div className="relative">
              <select
                className="cursor-pointer text-xs sm:text-xs md:text-xs lg:text-sm xl:text-base font-lato font-medium text-stone-900 appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => handleDiscountSelect(e.target.value)}
                value={selectedDiscount}
              >
                <option value="">Select Discount</option>
                {discount.map((discount) => (
                  <option key={discount} value={discount}>
                    {discount}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex-3 grid grid-cols-1 pl-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="flex lg:justify-evenly xl:justify-between sm:justify-center cursor-pointer"
              >
                <div className="relative border border-gray-300 h-fit w-full px-1 py-4 rounded-lg ">
                  <img
                    onClick={() => {
                      handleProduct(product.id);
                    }}
                    className="object-contain h-36 sm:h-36 md:h-44 lg:h-56 xl:h-64 mb-3 p-3 rounded-lg hover:scale-105 mx-auto relative"
                    src={product.images[0].url}
                    alt={product?.name}
                  />
                  {currentUser ? (
                    <CiHeart
                      onClick={() => handleAddWishlist(product.id)}
                      className={`absolute top-2 right-4 text-2xl p-0 cursor-pointer ${
                        product.iswishlist === "true"
                          ? "fill-red-500"
                          : "fill-stone-300"
                      }`}
                    />
                  ) : (
                    <CiHeart
                      onClick={handleLogin}
                      className="absolute top-2 right-8 text-2xl cursor-pointer"
                    />
                  )}
                  {product?.discount ? (
                    <span className="absolute top-3 left-0 bottom- m-2 rounded-full bg-red-600 px-2 text-center text-xs xl:text-sm font-medium text-white">
                      {product?.discount} % OFF
                    </span>
                  ) : null}
                  <h3 className="truncate text-center py-2 text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm font-semibold font-lato text-gray-800 capitalize">
                    {product?.name}
                  </h3>
                  <p className="text-xs sm:text-base md:text-base lg:text-base xl:text-base font-bold font-lato text-black">
                    <span className="font-lato font-medium">₹</span>{" "}
                    {product?.price}
                  </p>
                  <div className="flex items-center gap-3">
                    <p className="line-through text-xs sm:text-xs md:text-xs lg:text-sm xl:text-sm font-semibold font-lato text-gray-500 ">
                      <span className="font-lato font-medium">₹</span>{" "}
                      {product?.realprice}
                    </p>
                    <p className="text-xs sm:text-xs md:text-xs lg:text-sm xl:text-sm font-medium font-lato text-green-700 rounded-xl bg-green-300 px-1  ">
                      {product?.discount ? `${product?.discount} % OFF` : null}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center  ">
              <p className=" font-poetsen  text-lg text-gray-600">
                No products available
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
