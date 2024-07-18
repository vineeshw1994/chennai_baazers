import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ProductCard from "../../../../components/user/products/ProductCard";

const CategoryShop = () => {
  let { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [isActive, setIsActive] = useState(0);
  const [isActiveCate, setIsActiveCate] = useState(0);
  const [productId, setProductId] = useState(1);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filterSubcategories, setFilterSubcategories] = useState([]);

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

  // console.log(allProducts, "-----------");
  // console.log(categories, "///////////");
  // console.log(subCategories, "============");
  // Filter products based on the filter state
  const handleCategory = (categoryId, index) => {
    setIsActive(index);
    setIsActiveCate(0);
    const category = categories.filter((data) => data.id === categoryId);
    // console.log("----------------------->", category);
    if (category) {
      setSelectedCategory(category);
    }
  };

  const handFilterCate = (id, index) => {
    setIsActiveCate(index);
    const products = allProducts.filter((data) => data.subcategory_id === id);
    if (products) {
      setFilterProducts(products);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchSubcategories(),
          fetchCategories(),
          fetchAllProducts(),
        ]);
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    };

    fetchData();
    const categoryId = parseInt(id);
    handleCategory(categoryId);
  }, [id]);

  useEffect(() => {
    if (filterSubcategories) {
      const filterProducts = allProducts.filter(
        (data) => data.subcategory_id === filterSubcategories[0].id
      );
      setFilterProducts(filterProducts);
    }
    console.log("Filter Products:", filterProducts);
  }, [filterSubcategories]);

  useEffect(() => {
    if (selectedCategory && selectedCategory.length > 0) {
      const filterProducts = subCategories.filter(
        (cate) => cate.basecategory_name === selectedCategory[0].name
      );
      console.log(filterProducts, "its filtered subcategories");
      setFilterSubcategories(filterProducts);
    }
  }, [selectedCategory]);

  return (
    <div className="">
      <div className="flex items-center justify-around my-2 border-b mx-6 py-2">
        {categories &&
          categories.map((data, index) => (
            <p
              key={data.id}
              onClick={() => handleCategory(data.id, index)}
              className={`cursor-pointer capitalize text-sm text-gray-500 font-lato md:text-lg lg:text-lg xl:text-lg rounded-xl px-2 hover:bg-gray-200 hover:text-teal-700 ${
                isActive === index ? "bg-teal-500 text-white" : ""
              }`}
            >
              {data.name}
            </p>
          ))}
      </div>
      <div className="flex mx-12">
        <div className="flex flex-col items-center border-r-2 pr-4 ">
          {selectedCategory && filterSubcategories.length > 0 ? (
            filterSubcategories.map((subcate, index) => (
              <div
                onClick={() => handFilterCate(subcate.id, index)}
                className={`cursor-pointer flex items-center border px-2 rounded-md w-44 gap-4 py-2  mb-2 ${
                  isActiveCate === index ? "bg-gray-300" : ""
                }`}
                key={subcate.id}
              >
                <div className="w-fit flex flex-col">
                  <img
                    className="w-14 h-14 rounded-full  object-contain"
                    src={subcate.image_url}
                    alt={subcate.subcategory_name}
                  />
                </div>
                <p className="text-xs font-medium text-teal-800 sm:text-xs md:text-xs lg:text-sm xl:text-sm capitalize">
                  {subcate.subcategory_name}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm md:text-lg xl:text-xl font-poetsen font-medium text-black">
              No categories found.
            </p>
          )}
        </div>
        <div className="flex-3 grid grid-cols-1 pl-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {/* Displaying products */}
          {selectedCategory &&
            filterProducts &&
            filterProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryShop;
