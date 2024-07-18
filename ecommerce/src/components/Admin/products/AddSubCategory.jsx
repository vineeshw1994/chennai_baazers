import { Button, Modal, Spinner, Tooltip } from "flowbite-react";
import React, { createRef, useEffect, useState } from "react";
import { CiCrop } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { TiDeleteOutline } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import DashNavbar from "../../Admin/dashboard/components/DashNavbar";

const SubCategory = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [cropImage, setCropImage] = useState(null);
  const [cropperHide, setCropperHide] = useState(false);
  const cropperRef = createRef();
  const [hoverIndex, setHoverIndex] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [data, setData] = useState({
    name: "",
    description: "",
    baseCateId: "",
    brand: "",
  });
  console.log(data);
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

  useEffect(() => {
    const img = new Image();
    img.image = image;
    img.onload = () => {
      setIsPortrait(img.height > img.width);
    };
  }, [image]);

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  // single image onchange
  const handleChange = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    const imageURL = URL.createObjectURL(selectedFile);
    setShowImage(imageURL);
  };
  console.log(data);
  const handleImageDelete = () => {
    setImage(null);
    setShowImage(null);
    setCropImage(null);
  };

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

  const handleSubmit = async () => {
    if (
      !data.name ||
      data.name === "" ||
      !data.description ||
      data.description === "" ||
      !data.baseCateId ||
      data.baseCateId === ""
    ) {
      return toast.error("All fields are required");
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

    const formData = new FormData();
    formData.append("file", image);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("baseCateId", data.baseCateId);
    formData.append("brand", data.brand);
    try {
      setLoading(true);
      const res = await fetch("/api/category/create-sub-category", {
        method: "post",
        body: formData,
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
        navigate("/admin?tab=subcategory");
        return toast.success(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  // FETCH CATEGORIES FROM API
  const fetchCategory = async () => {
    try {
      const res = await fetch("/api/category/categories");
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }

      if (data.success) {
        return setCategories(data.category);
      } else {
        return toast.error(data.message);
      }
    } catch (error) {
      return toast.error("Internal Error");
    }
  };

  // FETCH BRANDS FROM API
  const fetchBrands = async () => {
    try {
      const res = await fetch("/api/brand/all-brands");
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      console.log(data);
      if (data.success) {
        return setBrands(data.brand);
      } else {
        return toast.error(data.message);
      }
    } catch (error) {
      return toast.error("Internal Error");
    }
  };
  useEffect(() => {
    fetchCategory();

    fetchBrands();
  }, []);
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
        <p className="font-lora font-medium">{"->"}</p>
        <Link
          to="/admin?tab=subcategory"
          className="text-xs font-serif font-semibold sm:text-xs md:text-xs lg:text-sm xl:text-sm text-gray-500"
        >
          Sub-Categories
        </Link>
      </div>
      <div>
        <div className="flex flex-col md:flex- sm:flex-row items-center py-3  mx-2  my-6 justify-between px-6 border h-28 rounded-md bg-white">
          <h3 className="text-md font-thin font-poetsen lg:text-lg xl:text-xl">
            Add Sub Category
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
              Category Name
            </label>
            <input
              type="text"
              id="name"
              onChange={handleOnChange}
              placeholder="Enter Category Name"
              className="rounded-md text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-10 border-gray-300"
            />
          </div>
          <div className="flex flex-col w-full">
            <label
              htmlFor=""
              className="text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium"
            >
              Category Description
            </label>
            <textarea
              name=""
              id="description"
              onChange={handleOnChange}
              className="resize rounded-md w-full text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-20 border-gray-300"
              placeholder="Enter Category Description"
            ></textarea>
          </div>
          <div className="flex flex-col w-full my-4">
            <label
              htmlFor=""
              className="text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium"
            >
              Base Category
            </label>
            <div className="flex flex-col w-full my-4">
              <select
                name="baseCateId"
                id="baseCateId"
                onChange={handleOnChange}
                className="rounded-md text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-9 border-gray-300 "
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
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col w-full my-4">
            <label
              htmlFor=""
              className="text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium"
            >
              Brands
            </label>
            <div className="flex flex-col w-full my-4">
              <select
                name="brand"
                id="brand"
                onChange={handleOnChange}
                className="rounded-md text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-9 border-gray-300 uppercase"
              >
                <option value="" disabled selected>
                  —
                </option>
                {brands.map((brand) => (
                  <option
                    key={brand.id}
                    value={brand.name}
                    className="uppercase"
                  >
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* category images */}
        <div className="border rounded-md py-4 px-4 mx-2 my-2">
          <h3 className="text-sm font-poetsen font-medium text-gray-800 lg:text-md xl:text-lg">
            Category Image
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
                    style={{ maxHeight: "144px", maxWidth: "224px" }}
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

        {/* save product button */}
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
              Save Category
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
            <img src={showImage} alt="image" className="" />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SubCategory;
