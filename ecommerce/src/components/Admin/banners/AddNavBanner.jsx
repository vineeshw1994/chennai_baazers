import React, { createRef, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { TiDeleteOutline } from "react-icons/ti";
import { Button, Datepicker, Tooltip, Modal, Spinner } from "flowbite-react";
import DashNavbar from "../dashboard/components/DashNavbar";
import "../banners/banners.css";
import toast from "react-hot-toast";
import { MdCleaningServices } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { CiCrop } from "react-icons/ci";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const AddNavBanner = () => {
  const navigate = useNavigate();
  const cropperRef = createRef();
  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [cropImage, setCropImage] = useState(null);
  const [cropperHide, setCropperHide] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productDropDown, setProductDropDown] = useState(false);
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.image = image;
    img.onload = () => {
      setIsPortrait(img.height > img.width);
    };
  }, [image]);

  const validFileTypes = ["image/jpeg", "image/png", "image/webp"];
  const maxSizeInBytes = 2 * 1024 * 1024; // 2MB

  const handleChange = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    const imageURL = URL.createObjectURL(selectedFile);
    setShowImage(imageURL);
  };
  console.log("image", image);

  const handleImageDelete = () => {
    setImage(null);
  };

  console.log(formData, image);

  // single image cropdata
  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setImage(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }

    const imageURL = URL.createObjectURL(image);
    setShowImage(imageURL);
    setCropperHide(false);
  };

  // single image handle funcion
  const handleCrop = () => {
    setCropperHide(true);
    setCropImage(showImage);
  };

  const handleCancel = () => {
    setCropperHide(false);
    setImage(null);
    setShowImage(null);
    setCropImage(null);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`/api/product/all-products`);
      const data = await res.json();
      if (!data.success) {
        toast.error(data.message);
      } else {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      return toast.error("Internal Error");
    }
  };

  useEffect(() => {
    fetchProducts();
    setProduct(products);
  }, []);

  useEffect(() => {
    console.log(">>>>>>>>>>>>", selectedProducts);
  }, [product, selectedProducts]);

  const handleSubmit = async () => {
    if (
      !formData.name ||
      formData.name === "" ||
      !formData.description ||
      formData.description === ""
    ) {
      return toast.error("All fields are required");
    }
    if (!selectedProducts || selectedProducts.length === 0) {
      return toast.error("Choose the products");
    }
    if (!image) {
      return toast.error("image is required");
    }
    if (!validFileTypes.includes(image.type)) {
      return toast.error("Only JPG, PNG, and WebP formats are allowed");
    }

    if (image.size > maxSizeInBytes) {
      return toast.error("File size should be less than 2MB");
    }

    const formDataToSend = new FormData();
    formDataToSend.append("file", image);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("start_date", formData.start_date);
    formDataToSend.append("end_date", formData.end_date);
    formDataToSend.append("selectedProducts", JSON.stringify(selectedProducts));

    try {
      setLoading(true);
      const res = await fetch("/api/banner/nav-banner", {
        method: "post",
        body: formDataToSend,
      });
      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        return toast.error(data.message);
      }
      if (data.success) {
        setLoading(false);
        setImage(null);
        setShowImage(null);
        setCropImage(null);
        navigate("/admin?tab=navbanner");
        return toast.success(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
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

  // const handleSearch = (e) => {
  //   const searchValue = e.target.value;
  //   const searchingProduct = [...products];
  //   if (searchValue) {
  //     const searchItems = searchingProduct.filter(
  //       (product) => product.name === searchValue
  //     );
  //     console.log(searchItems, "-=-=-=-=-==-=-=-=-=-=-");
  //     setProducts(searchItems);
  //   }
  //   return toast.success(searchValue);
  // };

  return (
    <div className="main_section">
      <DashNavbar />
      <div className="flex items-center gap-2 mx-3 mt-6">
        <Link
          to="/admin?tab=dashmain"
          className="text-xs font-serif font-semibold sm:text-xs md:text-xs lg:text-sm xl:text-sm text-gray-500"
        >
          Dashboard
        </Link>
        <p className="font-lato font-medium">{"->"}</p>
        <Link
          to="/admin?tab=navbanner"
          className="text-xs font-serif font-semibold sm:text-xs md:text-xs lg:text-sm xl:text-sm text-gray-500"
        >
          Banners
        </Link>
      </div>
      <div>
        <div className="flex flex-col md:flex- sm:flex-row items-center py-3  mx-2  my-6 justify-between px-6 border h-28 rounded-md bg-white">
          <h3 className="text-md font-thin font-poetsen lg:text-lg xl:text-xl">
            Add Home Navbar
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
              className="text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lato font-medium"
            >
              Tittle
            </label>
            <input
              id="name"
              onChange={onChange}
              type="text"
              placeholder="Enter the Tittle"
              className="rounded-md text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lato font-medium h-10 border-gray-300"
            />
          </div>
          <div className="flex flex-col w-full">
            <label
              htmlFor=""
              className="text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lato font-medium"
            >
              Banner Description
            </label>
            <textarea
              name=""
              id="description"
              onChange={onChange}
              className="resize rounded-md w-full text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lato font-medium h-24 border-gray-300"
              placeholder="Enter Banner Description"
            ></textarea>
          </div>
          <div className="my-2">
            <label
              htmlFor=""
              className="text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lato font-medium"
            >
              Banner Date Range
            </label>
            <div className="flex items-center justify-around w-full my-4">
              <input
                type="date"
                id="start_date"
                onChange={onChange}
                className="rounded-md bg-gray-100"
              />
              <p className="text-sm text-teal-800 font-medium lg:text-md xl:text-lg">
                To
              </p>
              <input
                type="date"
                id="end_date"
                onChange={onChange}
                className="rounded-md bg-gray-100"
              />
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
                <div
                  className="relative"
                  onMouseEnter={() => setHoverIndex(true)}
                  onMouseLeave={() => setHoverIndex(false)}
                >
                  <img
                    src={showImage}
                    alt="Image"
                    className={`shadow-sm rounded-lg cursor-pointer ${
                      isPortrait ? "w-auto h-full" : "w-full h-auto"
                    }`}
                    style={{ maxHeight: "144px", maxWidth: "224px" }} // Adjust these values based on your container size
                  />
                  {hoverIndex && (
                    <div className="absolute top-0 right-0 flex items-center">
                      <Tooltip content="Preview" style="light">
                        <Button
                          onClick={() => setOpenModal(true)}
                          className="h-10 w-10 rounded-md bg-blue-800 border-none flex items-center justify-center text-white transition duration-300 mr-1"
                        >
                          <MdOutlineRemoveRedEye />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Crop Image" style="light">
                        <Button
                          onClick={handleCrop}
                          className="h-10 w-10 rounded-md bg-blue-800 border-none flex items-center justify-center text-white transition duration-300 mr-1"
                        >
                          <CiCrop />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Remove" style="light">
                        <Button
                          onClick={handleImageDelete}
                          className="h-10 w-10 rounded-md bg-red-500 border-none flex items-center justify-center text-white transition duration-300"
                        >
                          <TiDeleteOutline />
                        </Button>
                      </Tooltip>
                    </div>
                  )}
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
                onChange={handleChange}
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
              className="text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lato font-medium"
            >
              Select Products
            </label>
            <div
              onClick={handleClick}
              className="selected-products border h-fit rounded w-auto py-2 px-2 cursor-pointer"
            >
              {selectedProducts.map((productId) => {
                const product = products.find(
                  (product) => product.id === productId
                );
                return (
                  <span
                    key={product.id}
                    className="selected-product text-sm text-teal-600 font-normal  font-lato bg-gray-100 pr-2 py-2 mr-1 rounded-lg"
                  >
                    {product.name}
                    <span
                      className="close-icon text-red-600 ml-1 text-xl bg-red-100 rounded-full cursor-pointer px-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveProduct(product.id);
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
                  <input
                    type="text"
                    className="rounded-lg border-gray-300 h-8  text-sm text-gray-800"
                    placeholder="Search Products"
                  />
                </div>
                <div
                  className={`w-full flex flex-col items-center  max-h-36 overflow-y-auto z-10 absolute top-48 right-0 left-0  rounded-lg bg-stone-200  dropdown-animation ${
                    productDropDown ? "open" : ""
                  }`}
                >
                  {products.map((data) => (
                    <div className="flex items-center w-1/2 bg-white my-1 px-2 rounded-lg">
                      <img
                        src={data.images[0].url}
                        alt=""
                        className="object-contain w-8 h-8 rounded-md"
                      />
                      <p
                        onClick={() => handleProductSelect(data.id)}
                        key={data.id}
                        className="text-sm  text-center rounded-lg xl:text-base text-teal-700 font-medium font-lato my-2 bg-white cursor-pointer"
                      >
                        {data.name}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* save  button */}
        <div className="border mx-2 rounded-md py-3 my-3 px-4 flex items-center justify-center">
          {loading ? (
            <Button>
              <Spinner aria-label="Spinner button example" size="sm" />
              <span className="pl-3">Loading...</span>
            </Button>
          ) : (
            <Button
              gradientDuoTone="greenToBlue"
              className="w-36"
              onClick={handleSubmit}
            >
              Save Banner
            </Button>
          )}
        </div>

        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>
            <p className="text-teal-900 font-poetsen font-medium">preview</p>
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <img src={showImage} alt="image" className="" />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default AddNavBanner;
