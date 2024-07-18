import React, { useEffect, useState } from "react";
import "../products/style/products.css";
import DashNavbar from "../dashboard/components/DashNavbar";
import { Button, Modal, Tooltip, Spinner } from "flowbite-react";
import { TiDeleteOutline } from "react-icons/ti";
import { FiPlus } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { CiCrop } from "react-icons/ci";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [variants, setVariants] = useState(false);
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    sub_cateId: "",
    price: "",
    stock: "",
    product_status: "",
    code: "",
    sku: "",
    discount: "",
    start_date: "",
    end_date: "",
    size: "",
    color: "",
    units: "",
    discount_status: "",
  });
  const [loading, setLoading] = useState(false);
  const onchange = (e) => [
    setFormData({ ...formData, [e.target.id]: e.target.value }),
  ];

  console.log(formData);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch("/api/category/all-subcategories");
        const data = await res.json();
        if (!res.ok) {
          return toast.error(data.message);
        }

        if (data.success) {
          setCategories(data.category);
        } else {
          return toast.error(data.message);
        }
      } catch (error) {
        return toast.error("Internal Error");
      }
    };

    fetchCategory();
  }, []);

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  const maxFileSize = 2 * 1024 * 1024; // 2 MB

  const handleImageUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);

    const validFiles = uploadedFiles.filter(
      (file) => allowedTypes.includes(file.type) && file.size <= maxFileSize
    );

    if (validFiles.length !== uploadedFiles.length) {
      return toast.error(
        "Only jpg, png, and webp files below 2MB are allowed."
      );
    }

    const fileURLs = validFiles.map((file) => URL.createObjectURL(file));
    setImages([...images, ...fileURLs]);
    setFiles([...files, ...validFiles]);
  };

  console.log(images);

  const handleImageDelete = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedImages = images.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setImages(updatedImages);
  };

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const handleVariants = () => {
    setVariants(!variants);
  };

  const handlePreview = (image) => {
    setPreviewImage(image);
    setOpenModal(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.product_name || !formData.product_name === "") {
      return toast.error("Product name is required");
    }
    if (!formData.description || !formData.description === "") {
      return toast.error("Product description is required");
    }
    if (!formData.sub_cateId || !formData.sub_cateId === "") {
      return toast.error("Choose the category");
    }
    if (!formData.price || !formData.price === "") {
      return toast.error("price is required");
    }
    if (!formData.stock || !formData.stock === "") {
      return toast.error("stock is required");
    }
    if (!formData.product_status || !formData.product_status === "") {
      return toast.error("product status is required");
    }
    if (parseFloat(formData.price) <= 0) {
      return toast.error("Price must be a positive number");
    }

    if (parseInt(formData.stock) <= 0) {
      return toast.error("Stock must be a positive integer");
    }
    if (formData.discount && parseInt(formData.discount) <= 0) {
      return toast.error("Discount must be a positive number");
    }
    if (!images) {
      return toast.error("product image is required");
    }

    const formDataToSend = new FormData();
    formDataToSend.append("product_name", formData.product_name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("sub_cateId", formData.sub_cateId);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("stock", formData.stock);
    formDataToSend.append("code", formData.code);
    formDataToSend.append("sku", formData.sku);
    formDataToSend.append("discount", formData.discount);
    formDataToSend.append("start_date", formData.start_date);
    formDataToSend.append("end_date", formData.end_date);
    formDataToSend.append("size", formData.size);
    formDataToSend.append("color", formData.color);
    formDataToSend.append("units", formData.units);
    formDataToSend.append("product_status", formData.product_status);
    formDataToSend.append("discount_status", formData.discount_status);

    // Append multiple images to FormData
    for (let i = 0; i < files.length; i++) {
      formDataToSend.append("images", files[i]);
    }

    try {
      setLoading(true);
      const res = await fetch("/api/product/add-product", {
        method: "post",
        body: formDataToSend,
      });
      const data = await res.json();
      console.log(data, "its response data");
      if (!res.ok) {
        setLoading(false);
        return toast.error(data.message || "Failed to add product");
      }
      if (data.success) {
        setLoading(false);
        setImages(null);
        navigate("/admin?tab=products");
        return toast.success(data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log("error create product response", error.message);
      return toast.error(error.message);
    }
  };

  return (
    <div className="main_section ">
      <DashNavbar />
      <div className="flex items-center gap-2 mx-3 mt-6">
        <Link
          to="/admin?tab=dashmain"
          className="text-xs font-serif font-semibold sm:text-xs md:text-xs lg:text-sm xl:text-sm text-gray-500"
        >
          Dashboard
        </Link>
        <p className="font-lora font-medium">{"->"}</p>
        <Link
          to="/admin?tab=products"
          className="text-xs font-serif font-semibold sm:text-xs md:text-xs lg:text-sm xl:text-sm text-gray-500"
        >
          Products
        </Link>
      </div>
      <div>
        <div className="flex flex-col md:flex- sm:flex-row items-center py-3  mx-2  my-6 justify-between px-6 border h-28 rounded-md bg-white">
          <h3 className="text-md font-thin font-poetsen lg:text-lg xl:text-xl">
            Add Product
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
              Product Name
            </label>
            <input
              type="text"
              id="product_name"
              placeholder="Enter the Product name"
              className="rounded-md text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-10 border-gray-300"
              onChange={onchange}
            />
          </div>
          <div className="flex flex-col w-full">
            <label
              htmlFor=""
              className="text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium"
            >
              Product Description
            </label>
            <textarea
              name=""
              id="description"
              className="resize rounded-md w-full text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-24 border-gray-300"
              placeholder="Enter Product description"
              onChange={onchange}
            ></textarea>
          </div>
        </div>

        {/* product images */}
        <div className="border rounded-md py-4 px-4 mx-2 my-2">
          <h3 className="text-sm font-poetsen font-medium text-gray-800 lg:text-md xl:text-lg">
            Product Image
            <span className="text-lg font-medium text-red-600">*</span>
          </h3>
          <div className="flex w-full border border-dashed items-center justify-center my-4 h-56">
            <div className="mr-4 flex items-center gap-2">
              {images &&
                images.map((image, index) => (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img
                      src={image}
                      alt="Product"
                      className={`shadow-sm rounded-lg cursor-pointer ${
                        isPortrait ? "w-auto h-full" : "w-full h-auto"
                      }`}
                      style={{ maxHeight: "144px", maxWidth: "224px" }}
                    />
                    {hoverIndex === index && (
                      <div className="absolute top-0 right-0 flex items-center">
                        <Tooltip content="Preview" style="light">
                          <Button
                            onClick={() => handlePreview(image)}
                            className="h-10 w-10 rounded-md bg-blue-800 border-none flex items-center justify-center text-white transition duration-300 mr-1"
                          >
                            <MdOutlineRemoveRedEye />
                          </Button>
                        </Tooltip>
                        <Tooltip content="Crop Image" style="light">
                          <Button className="h-10 w-10 rounded-md bg-blue-800 border-none flex items-center justify-center text-white transition duration-300 mr-1">
                            <CiCrop />
                          </Button>
                        </Tooltip>
                        <Tooltip content="Remove" style="light">
                          <Button
                            onClick={() => handleImageDelete(index)}
                            className="h-10 w-10 rounded-md bg-red-500 border-none flex items-center justify-center text-white transition duration-300"
                          >
                            <TiDeleteOutline />
                          </Button>
                        </Tooltip>
                      </div>
                    )}
                  </div>
                ))}
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
                multiple
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>

        {/* sub categories */}
        <div className="border rounded-md py-4 px-4 mx-2 my-2">
          <h3 className="text-sm font-poetsen font-medium text-gray-800 lg:text-md xl:text-lg">
            Sub Categories
            <span className="text-lg  font-medium text-red-600">*</span>
          </h3>
          <div className="flex flex-col w-full my-4">
            <select
              name="category"
              id="sub_cateId"
              className="rounded-md text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-9 border-gray-400"
              onChange={onchange}
            >
              <option value="" disabled selected>
                —
              </option>
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  className="uppercase"
                >
                  {category.subcategory_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* product price and quantity */}
        <div className="border rounded-md py-4 px-4 mx-2 my-2">
          <div className="flex items-center justify-between xl:mx-16">
            <h3 className="text-sm font-poetsen font-medium text-gray-800 lg:text-md xl:text-lg">
              Price,Stock,Code
            </h3>
            <div className="flex items-center gap-3 text-green-700">
              {variants ? (
                <div
                  onClick={handleVariants}
                  className="border flex items-center justify-end bg-green-500 h-5 w-8 rounded-lg cursor-pointer "
                >
                  <div className=" rounded-full w-3 h-3 bg-white my-auto mr-1"></div>
                </div>
              ) : (
                <div
                  onClick={handleVariants}
                  className="border flex justify-start items-center border-green-500 bg-gray-100 h-5 w-8 rounded-lg cursor-pointer "
                >
                  <div className="border-2 rounded-full w-4 h-4 bg-green-500 my-auto"></div>
                </div>
              )}
              Has Variations?
            </div>
          </div>

          {variants ? (
            <div className="flex items-center flex-wrap xl:ml-24 sm:ml-28 justify-between ">
              <div className="">
                <p className="text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium">
                  Sizes
                </p>
                <select
                  name="category"
                  id="size"
                  className="rounded-md w-96 lg:w-80 md:w-72 bg-gray-100 text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-12 border-gray-300"
                  onChange={onchange}
                >
                  <option value="" disabled selected>
                    Select Sizes
                  </option>
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                  <option value="xl">E-Large</option>
                  <option value="xxl">X-X-Large</option>
                  <option value="xxxl">X-X-X-Large</option>
                </select>
              </div>

              <div className="w-1/2">
                <p className="text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium">
                  Colors
                </p>
                <select
                  name="category"
                  id="color"
                  className="rounded-md w-96 lg:w-80 md:w-72 bg-gray-100 text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-12 border-gray-300"
                  onChange={onchange}
                >
                  <option value="" disabled selected>
                    Select Colors
                  </option>
                  <option value="Red">Red</option>
                  <option value="Blue">Blue</option>
                  <option value="Green">Green</option>
                  <option value="Yellow">Yellow</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between sm:justify-center sm:items-center flex-wrap lg:gap-4 xl:gap-4 md:gap-2 sm:gap-1 ">
              <div className="flex flex-col items-center ">
                <p className="text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium">
                  Price
                  <span className="text-lg  font-semibold text-red-600">*</span>
                </p>
                <input
                  type="number"
                  id="price"
                  placeholder="Product Price"
                  className="rounded-md border-gray-400 text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-9"
                  onChange={onchange}
                />
              </div>
              <div className="flex flex-col items-center ">
                <p className="text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium">
                  Stock
                  <span className="text-lg font-semibold text-red-600">*</span>
                </p>
                <input
                  type="number"
                  id="stock"
                  placeholder="Stocky Qty"
                  className="rounded-md border-gray-400 text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-9"
                  onChange={onchange}
                />
              </div>
              <div className="flex flex-col items-center ">
                <p className="text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium">
                  SKU
                </p>
                <input
                  type="number"
                  id="sku"
                  placeholder="product SKU"
                  className="rounded-md border-gray-400 text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-9"
                  onChange={onchange}
                />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium">
                  Code
                </p>
                <input
                  type="number"
                  id="code"
                  placeholder="Product Price"
                  className="rounded-md border-gray-400 text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-9"
                  onChange={onchange}
                />
              </div>
            </div>
          )}
        </div>

        {/* product discount */}
        <div className="border rounded-md py-4 px-4 mx-2 my-2">
          <h3 className="text-sm font-poetsen font-medium text-gray-800 lg:text-md xl:text-lg">
            Product Discount
          </h3>
          <div className="flex items-center justify-around w-full my-4">
            <input
              type="date"
              id="start_date"
              onChange={onchange}
              className="rounded-md text-xs md:text-sm lg:text-base xl:text-base text-slate-900  py-1 font-lora font-medium h-9 border-teal-900"
            />
            <p className="text-sm text-teal-800 font-medium lg:text-md xl:text-lg">
              To
            </p>
            <input
              type="date"
              id="end_date"
              onChange={onchange}
              className="rounded-md text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-9 border-teal-900"
            />
          </div>
          <div className="flex flex-col w-full my-4 ">
            <label
              htmlFor=""
              className="py-1 text-xs md:text-sm lg:text-base xl:text-base text-slate-900  font-lora font-medium"
            >
              Discount Percentage
            </label>
            <input
              type="number"
              placeholder="Enter Discount"
              id="discount"
              className="rounded-md text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-10 border-gray-300"
              onChange={onchange}
            />
          </div>
          <h3 className="text-sm font-poetsen font-medium text-gray-800 lg:text-md xl:text-lg">
            Discount Status
          </h3>
          <div className="flex flex-col w-full my-4">
            <select
              name="category"
              id="discount_status"
              className="rounded-md text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-10 border-gray-300"
              onChange={onchange}
            >
              <option value="" defaultValue>
                Select Status
              </option>
              <option value="present">Precent %</option>
              <option value="Fixed">Fixed</option>
            </select>
          </div>
        </div>

        {/* product units */}
        <div className="border rounded-md py-4 px-4 mx-2 my-2">
          <h3 className="text-sm font-poetsen font-medium text-gray-800 lg:text-md xl:text-lg">
            Product Units
          </h3>
          <div className="flex flex-col w-full my-4">
            <select
              name="category"
              id="units"
              className="rounded-md text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-10 border-gray-300"
              onChange={onchange}
            >
              <option value="" defaultValue>
                Select a Units
              </option>
              <option value="pice">Pcs</option>
              <option value="kg">Kg</option>
              <option value="box">box</option>
              <option value="pair">pair</option>
            </select>
          </div>
        </div>

        {/* product status */}
        <div className="border rounded-md py-4 px-4 mx-2 my-2">
          <h3 className="text-sm font-poetsen font-medium text-gray-800 lg:text-md xl:text-lg">
            Product Status
            <span className="text-lg  font-medium text-red-600">*</span>
          </h3>
          <div className="flex flex-col w-full my-4">
            <select
              name="product_status"
              id="product_status"
              className="rounded-md text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-10 border-gray-300"
              onChange={onchange}
            >
              <option value="" disabled selected>
                _
              </option>
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>
        </div>

        {/* product taxes */}
        {/* <div className="border rounded-md py-4 px-4 mx-2 my-2">
          <h3 className="text-sm font-poetsen font-medium text-gray-800 lg:text-md xl:text-lg">
            Product Taxs (Default 0%)
          </h3>
          <div className="flex flex-col w-full my-4">
            <div className="flex items-center justify-between gap-1">
              <div className="w-1/2  my-2 py-1 px-2">
                <p className="py-1 text-xs md:text-sm lg:text-base xl:text-base text-slate-900  font-lora font-medium">
                  CGST
                </p>
                <input
                  type="number"
                  id="cgst"
                  className="rounded-md border-gray-300 w-full "
                  placeholder="0"
                  onChange={onchange}
                />
              </div>
              <div className="w-1/2  my-2 py-1 px-2">
                <p className="py-1 text-xs md:text-sm lg:text-base xl:text-base text-slate-900  font-lora font-medium">
                  Precent Or Fixed
                </p>
                <select
                  name="category"
                  id="cgst_status"
                  className="rounded-md w-full text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-9 border-gray-400"
                  onChange={onchange}
                >
                  <option disabled>Select a Type</option>
                  <option value="fixed">Fixed</option>
                  <option value="current">Present %</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-between gap-1">
              <div className="w-1/2  my-2 py-1 px-2">
                <p className="py-1 text-xs md:text-sm lg:text-base xl:text-base text-slate-900  font-lora font-medium">
                  IGST
                </p>
                <input
                  type="number"
                  className="rounded-md border-gray-300 w-full "
                  id="igst"
                  placeholder="0"
                  onChange={onchange}
                />
              </div>
              <div className="w-1/2  my-2 py-1 px-2">
                <p className="py-1 text-xs md:text-sm lg:text-base xl:text-base text-slate-900  font-lora font-medium">
                  Precent Or Fixed
                </p>
                <select
                  name="category"
                  id="igst_status"
                  className="rounded-md w-full text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-9 border-gray-400"
                  onChange={onchange}
                >
                  <option disabled>Select a Type</option>
                  <option value="fixed">Fixed</option>
                  <option value="current">Present %</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-between gap-1">
              <div className="w-1/2  my-2 py-1 px-2">
                <p className="py-1 text-xs md:text-sm lg:text-base xl:text-base text-slate-900  font-lora font-medium">
                  SGST
                </p>
                <input
                  type="number"
                  className="rounded-md border-gray-300 w-full "
                  placeholder="0"
                  id="sgst"
                  onChange={onchange}
                />
              </div>
              <div className="w-1/2  my-2 py-1 px-2">
                <p className="py-1 text-xs md:text-sm lg:text-base xl:text-base text-slate-900  font-lora font-medium">
                  Precent Or Fixed
                </p>
                <select
                  name="category"
                  id="sgst_status"
                  className="rounded-md w-full text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-9 border-gray-400"
                >
                  <option disabled>Select a Type</option>
                  <option value="fixed">Fixed</option>
                  <option value="current">Present %</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-between gap-1">
              <div className="w-1/2  my-2 py-1 px-2">
                <p className="py-1 text-xs md:text-sm lg:text-base xl:text-base text-slate-900  font-lora font-medium">
                  VAT
                </p>
                <input
                  type="number"
                  className="rounded-md border-gray-300 w-full "
                  placeholder="0"
                  id="vat"
                  onChange={onchange}
                />
              </div>
              <div className="w-1/2  my-2 py-1 px-2">
                <p className="py-1 text-xs md:text-sm lg:text-base xl:text-base text-slate-900  font-lora font-medium">
                  Precent Or Fixed
                </p>
                <select
                  name="category"
                  id="vat_status"
                  className="rounded-md w-full text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-9 border-gray-400"
                  onChange={onchange}
                >
                  <option disabled>Select a Type</option>
                  <option value="fixed">Fixed</option>
                  <option value="current">Present %</option>
                </select>
              </div>
            </div>
          </div>
        </div> */}

        {/* save product button */}
        <div className="border mx-2 rounded-md py-3 my-3 px-4 flex items-center justify-center">
          {loading ? (
            <Button>
              <Spinner aria-label="Spinner button example" size="sm" />
              <span className="pl-3">Loading...</span>
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              gradientDuoTone="greenToBlue"
              className="w-36"
            >
              Save Product
            </Button>
          )}
        </div>
      </div>

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          <p className="text-teal-900 font-poetsen font-medium">preview</p>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <img src={previewImage} alt="image" className="" />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddProduct;
