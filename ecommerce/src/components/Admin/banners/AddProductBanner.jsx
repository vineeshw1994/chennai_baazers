import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { TiDeleteOutline } from "react-icons/ti";
import { Button, Datepicker } from "flowbite-react";
import DashNavbar from "../dashboard/components/DashNavbar";
import "../banners/banners.css";
import { products } from "../../../../data/ProductData";
import toast from "react-hot-toast";
import { MdCleaningServices } from "react-icons/md";

const AddProductBanner = () => {
  const [image, setImage] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productDropDown, setProductDropDown] = useState(false);
  const [product, setProduct] = useState([]);

  const handleImgeUpload = (e) => {
    const files = e.target.files[0];
    const read = new FileReader();

    read.onload = () => {
      // Append the uploaded image data URL to the images array
      setImage(read.result);
    };

    read.readAsDataURL(files);
  };

  const handleImageDelete = () => {
    setImage("");
  };

  useEffect(() => {
    setProduct(products);
  }, [products]);

  useEffect(() => {
    console.log(">>>>>>>>>>>>", selectedProducts);
  }, [product, selectedProducts]);

  const handleSubmit = () => {
  };

  // Function to handle product selection
  const handleProductSelect = (proId) => {
    const pro = products.find((data) => data._id === proId);
    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.includes(proId)) {
        return prevSelectedProducts.filter((product) => product !== proId);
      } else {
        return [...prevSelectedProducts, proId];
      }
    });
    setProductDropDown(false); // Close the dropdown after selection
  };

  const handleClick = () => {
    setProductDropDown((prevState) => !prevState);
  };

  const handleRemoveProduct = (proId) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.filter((product) => product !== proId)
    );
  };
  return (
    <div className="main_section">
      <DashNavbar />

      <div>
        <div className="flex flex-col md:flex- sm:flex-row items-center py-3  mx-2  my-6 justify-between px-6 border h-28 rounded-md bg-white">
          <h3 className="text-md font-thin font-poetsen lg:text-lg xl:text-xl">
            Add Product Banner
          </h3>
        </div>

        {/* basic information */}
        <div className="border rounded-md py-4 px-4 mx-2 my-2">
          <h3 className="text-sm font-poetsen font-medium text-gray-800 lg:text-md xl:text-lg">
            Basic Information
            <span className="text-lg  font-medium text-red-600">*</span>
          </h3>
          <div className="flex flex-col w-full my-4">
            <label
              htmlFor=""
              className="text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium"
            >
              Tittle
            </label>
            <input
              type="text"
              placeholder="Enter the Tittle"
              className="rounded-md text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-10 border-gray-300"
            />
          </div>
          <div className="flex flex-col w-full">
            <label
              htmlFor=""
              className="text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium"
            >
              Banner Description
            </label>
            <textarea
              name=""
              id=""
              className="resize rounded-md w-full text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-24 border-gray-300"
              placeholder="Enter Banner Description"
            ></textarea>
          </div>
          <div className="my-2">
            <label
              htmlFor=""
              className="text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium"
            >
              Banner Date Range
            </label>
            <div className="flex items-center justify-around w-full my-4">
              <Datepicker />
              <p className="text-sm text-teal-800 font-medium lg:text-md xl:text-lg">
                To
              </p>
              <Datepicker />
            </div>
          </div>
        </div>

        {/* banner images */}
        <div className="border rounded-md py-4 px-4 mx-2 my-2">
          <h3 className="text-sm font-poetsen font-medium text-gray-800 lg:text-md xl:text-lg">
            Banner Image
            <span className="text-lg font-medium text-red-600">*</span>
          </h3>
          <div className="flex w-full border border-dashed items-center justify-center my-4 h-56">
            <div className="mr-4 flex items-center gap-2">
              {image && (
                <div className="relative">
                  <img
                    src={image}
                    alt="Image"
                    className="h-16 w-32 shadow-sm rounded-md object-content cursor-pointer "
                  />
                  <button
                    onClick={handleImageDelete}
                    className="absolute top-0 right-0  h-16 w-32 rounded-md bg-red-100 border-none  flex items-center justify-center text-white transition duration-300 opacity-0 hover:opacity-100"
                  >
                    <TiDeleteOutline className="text-3xl text-red-600" />
                  </button>
                </div>
              )}
            </div>
            <label
              htmlFor="fileInput"
              className="cursor-pointer flex items-center justify-center border border-gray-400 rounded-full h-20 w-20 hover:bg-gray-100"
            >
              <FiPlus className="text-4xl text-gray-500" />
              <span className="text-sm text-gray-600"></span>
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={handleImgeUpload}
              />
            </label>
          </div>
        </div>

        {/* Product information */}
        <div className="border rounded-md py-4 px-4 mx-2 my-2 relative">
          <h3 className="text-sm font-poetsen font-medium text-gray-800 lg:text-md xl:text-lg">
            Product Information
            <span className="text-lg font-medium text-red-600">*</span>
          </h3>
          <div className="flex flex-col w-full my-4">
            <label
              htmlFor=""
              className="text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium"
            >
              Select Products
            </label>
            <div
              onClick={handleClick}
              className="selected-products border rounded h-12 py-2 px-2 cursor-pointer"
            >
              {selectedProducts.map((productId) => {
                const product = products.find(
                  (product) => product._id === productId
                );
                return (
                  <span
                    key={product._id}
                    className="selected-product text-sm text-teal-600 font-normal  font-lora bg-gray-100 pr-2 py-2 mr-1 rounded-lg"
                  >
                    {product.name}
                    <span
                      className="close-icon text-red-600 ml-1 text-xl bg-red-100 rounded-full cursor-pointer px-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveProduct(product._id);
                      }}
                    >
                      &times;
                    </span>
                  </span>
                );
              })}
            </div>
            {productDropDown && (
              <>
              <div className="text-center py-2">
                <input type="text" className="rounded-lg border-gray-300 h-8  text-sm text-gray-800" placeholder="Search Products"/>
              </div>
                <div
                  className={`w-full flex flex-col items-center  max-h-36 overflow-y-auto z-10 absolute top-48 right-0 left-0  rounded-lg bg-stone-200  dropdown-animation ${
                    productDropDown ? "open" : ""
                  }`}
                >
                  {products.map((data) => (
                    <p
                      onClick={() => handleProductSelect(data._id)}
                      key={data._id}
                      className="text-sm w-1/2 text-center rounded-lg xl:text-base text-teal-700 font-medium font-lora my-2 bg-white cursor-pointer"
                    >
                      {data.name}
                    </p>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* save  button */}
        <div className="border mx-2 rounded-md py-3 my-3 px-4 flex items-center justify-center">
          <Button
            onClick={handleSubmit}
            gradientDuoTone="greenToBlue"
            className="w-36"
          >
            Save Banner
          </Button>{" "}
        </div>
      </div>
    </div>
  );
};

export default AddProductBanner;
