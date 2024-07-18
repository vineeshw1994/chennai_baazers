import React, { useState } from "react";
import { products } from "../../../data/ProductData";
import ProductCard from "./ProductCard";
import { Helmet } from "react-helmet";

const Products = () => {
  const [filter, setFilter] = useState("");
   // State to manage selected category
   const [selectedCategory, setSelectedCategory] = useState(null);
   const [selectedSubcategory, setSelectedSubcategory] = useState(null);
   const [selectedPrice, setSelectedPrice] = useState(null);


  // Filter products based on the filter state
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  );
 
  const prices = ['0-50', '51-100', '101-200', '201+'];
  const categories = [
    {
      id: 1,
      name: "Electronics",
      subcategories: [
        {
          id: 11,
          name: "Smartphones",
          subsubcategories: [
            { id: 111, name: "iPhone" },
            { id: 112, name: "Samsung" },
          ],
        },
        { id: 12, name: "Laptops" },
      ],
    },
    {
      id: 2,
      name: "Clothing",
      subcategories: [
        { id: 21, name: "Men" },
        { id: 22, name: "Women" },
      ],
    },
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Function to handle subcategory selection
  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  // Function to handle price selection
  const handlePriceSelect = (price) => {
    setSelectedPrice(price);
  };

  
  return (
    <div className="mt-5 py-3 border">
       <Helmet>
        <title>E-Shop</title>
        <meta name={'E-Shop'} content={'E-Shop'} />
        {/* <link rel="canonical" href="https://www.yourwebsite.com/your-page" /> */}
      </Helmet>
      <div className="flex w-full">
      {/* <div className="flex-1 border-r p-2">
      <h2>Filter Products</h2>
      <div>
        <h3>Category</h3>
        <div className="relative">
          <select
            className="appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) =>
              handleCategorySelect(
                categories.find((cat) => cat.name === e.target.value)
              )
            }
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              
              <option key={category.id}>
              <input
                className="h-8 w-8 border border-green-800"
                type="checkbox"
                onChange={() => handleCategorySelect(category)}
              />{' '}
              {category.name}
            </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414zM10 2a1 1 0 011 1v6a1 1 0 01-2 0V3a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      {selectedCategory && (
        <div>
          <h3>Subcategory</h3>
          <div className="relative">
            <select
              className="appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) =>
                handleSubcategorySelect(
                  selectedCategory.subcategories.find(
                    (subcat) => subcat.name === e.target.value
                  )
                )
              }
            >
              <option value="">Select Subcategory</option>
              {selectedCategory.subcategories.map((subcategory) => (
                <option key={subcategory.id}>{subcategory.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414zM10 2a1 1 0 011 1v6a1 1 0 01-2 0V3a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
      <div>
        <h3>Price</h3>
        <div className="relative">
          <select
            className="appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => handlePriceSelect(e.target.value)}
          >
            <option value="">Select Price</option>
            {prices.map((price) => (
              <option key={price}>{price}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414zM10 2a1 1 0 011 1v6a1 1 0 01-2 0V3a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div> */}
        <div className=" grid grid-cols-1 pl-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {/* Displaying products */}
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product}  />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
