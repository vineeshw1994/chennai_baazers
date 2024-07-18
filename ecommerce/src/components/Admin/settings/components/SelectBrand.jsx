import React, { useState } from "react";

const SelectBrand = () => {
  const [products, setProducts] = useState(false);
  const [addProducts, setAddProducts] = useState(false);
  const [editProducts, setEditProducts] = useState(false);
  const [publishBrand, setPublishBrand] = useState(false);

  const handleProduct = () => {
    setProducts((preState) => !preState);
  };
  const handleAddProduct = () => {
    setAddProducts((preState) => !preState);
  };
  const handleEditProduct = () => {
    setEditProducts((preState) => !preState);
  };
  const handlePublished = ()=>{
    setPublishBrand((preState)=> !preState)
  }
  return (
    <div className="border  rounded-md mx-2 my-2 py-4 px-4">
      <p className="cursor-pointer bg-sky-100 w-56 px-2 py-1 rounded-lg text-sm xl:text-base lg:text-base text-teal-800 font-lora font-medium">
        Select all of Brands
      </p>
      <div className="w-full flex items-center justify-between flex-wrap   ">
        {/* products */}
        <div className="flex items-center justify-between w-56 h-10 my-2 rounded-md py-1 px-2 bg-neutral-100">
          <p className="text-sm font-lora font-medium text-teal-900 lg:text-sm xl:text-base">
            Brands
          </p>
          {products ? (
            <div
              onClick={handleProduct}
              className="border flex justify-start items-center border-gray-400 bg-white h-4 w-8  rounded-lg cursor-pointer "
            >
              <div className="border-1 rounded-full w-3 h-3 ml-1 bg-gray-400 my-auto"></div>
            </div>
          ) : (
            <div
              onClick={handleProduct}
              className="border flex items-center justify-end bg-green-500 h-4 w-8 rounded-lg cursor-pointer "
            >
              <div className=" rounded-full w-3 h-3 bg-white my-auto mr-1"></div>
            </div>
          )}
        </div>

        {/* add product */}
        <div className="flex items-center justify-between w-56 h-10 my-2 rounded-md py-1 px-2 bg-neutral-100">
          <p className="text-sm font-lora font-medium text-teal-900 lg:text-sm xl:text-base">
            Add Brand
          </p>
          {addProducts ? (
            <div
              onClick={handleAddProduct}
              className="border flex justify-start items-center border-gray-400 bg-white h-4 w-8  rounded-lg cursor-pointer "
            >
              <div className="border-1 rounded-full w-3 h-3 ml-1 bg-gray-400 my-auto"></div>
            </div>
          ) : (
            <div
              onClick={handleAddProduct}
              className="border flex items-center justify-end bg-green-500 h-4 w-8 rounded-lg cursor-pointer "
            >
              <div className=" rounded-full w-3 h-3 bg-white my-auto mr-1"></div>
            </div>
          )}
        </div>

        {/* edit product */}
        <div className="flex items-center justify-between w-56 h-10 my-2 rounded-md py-1 px-2 bg-neutral-100">
          <p className="text-sm font-lora font-medium text-teal-900 lg:text-sm xl:text-base">
            Edit Brand
          </p>
          {editProducts ? (
            <div
              onClick={handleEditProduct}
              className="border flex justify-start items-center border-gray-400 bg-white h-4 w-8  rounded-lg cursor-pointer "
            >
              <div className="border-1 rounded-full w-3 h-3 ml-1 bg-gray-400 my-auto"></div>
            </div>
          ) : (
            <div
              onClick={handleEditProduct}
              className="border flex items-center justify-end bg-green-500 h-4 w-8 rounded-lg cursor-pointer "
            >
              <div className=" rounded-full w-3 h-3 bg-white my-auto mr-1"></div>
            </div>
          )}
        </div>
        {/* publish brand */}
        <div className="flex items-center justify-between w-56 h-10 my-2 rounded-md py-1 px-2 bg-neutral-100">
          <p className="text-sm font-lora font-medium text-teal-900 lg:text-sm xl:text-base">
            Publish Brand
          </p>
          {publishBrand ? (
            <div
              onClick={handlePublished}
              className="border flex justify-start items-center border-gray-400 bg-white h-4 w-8  rounded-lg cursor-pointer "
            >
              <div className="border-1 rounded-full w-3 h-3 ml-1 bg-gray-400 my-auto"></div>
            </div>
          ) : (
            <div
              onClick={handlePublished}
              className="border flex items-center justify-end bg-green-500 h-4 w-8 rounded-lg cursor-pointer "
            >
              <div className=" rounded-full w-3 h-3 bg-white my-auto mr-1"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectBrand;
