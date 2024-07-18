import React, { createRef, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { TiDeleteOutline } from "react-icons/ti";
import { Button, Tooltip, Modal, Spinner } from "flowbite-react";
import { CiCrop } from "react-icons/ci";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import SideBar from "../dashboard/components/SideBar";
import DashNavbar from "../dashboard/components/DashNavbar";
import "../categories/style.css";
const EditSubCategory = () => {
  const { id } = useParams();
  console.log(id, "this is my id");
  const navigate = useNavigate();
  const cropperRef = createRef();

  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [cropImage, setCropImage] = useState(null);
  const [cropperHide, setCropperHide] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [input, setInput] = useState({
    name: "",
    description: "",
  });

  const validFileTypes = ["image/jpeg", "image/png", "image/webp"];
  const maxSizeInBytes = 2 * 1024 * 1024; // 2MB

  const handleOnChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  console.log(input, "this is inputs");
  // console.log(categories, "<-------------");
  // single image onchange
  const handleChange = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    const imageURL = URL.createObjectURL(selectedFile);
    setShowImage(imageURL);
  };

  // console.log("image", image);
  const handleImageDelete = () => {
    setImage(null);
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

  const handleUploadImage = async () => {
    if (!image) {
      return toast.error("Image is required");
    }
    if (!validFileTypes.includes(image.type)) {
      return toast.error("Only JPG, PNG, and WebP formats are allowed");
    }

    if (image.size > maxSizeInBytes) {
      return toast.error("File size should be less than 2MB");
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      setLoadingImage(true)
      const res = await fetch(`/api/category/update-sub-category-image/${id}`, {
        method: "put",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setLoadingImage(false)
        return toast.error(data.message);
      }
      if (data.success) {
        setLoadingImage(false)
        setImage(null);
        setShowImage(null);
        setCropImage(null);
        toast.success(data.message);
        navigate("/admin?tab=subcategory");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async () => {
    if (
      !input.name ||
      input.name === "" ||
      !input.description ||
      input.description === "" ||
      !input.brand ||
      input.brand === "" ||
      !input.baseCateId ||
      input.baseCateId === ""
    ) {
      return toast.error("All fields are required");
    }
    try {
      setLoading(true);
      const res = await fetch(`/api/category/update-sub-category/${id}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
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
        toast.success(data.message);
        navigate("/admin?tab=subcategory");
      }
    } catch (error) {
      setLoading(false)
      toast.error(error.message);
    }
  };

  // FETCH CATEGORIES FROM API
  useEffect(() => {
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

    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`/api/category/single-subcate/${id}`);
        const data = await res.json();
        if (!res.ok) {
          return toast.error(data.message);
        }
        console.log(data.category, "this is catedata");
        if (data.success) {
          setInput({
            name: data.category.name || "",
            description: data.category.description || "",
            brand: data.category.brand || "",
            baseCateId: data.category.base_category_id || "",
          });
          setImage(data.category.image_url);
          setShowImage(data.category.image_url);
        }
      } catch (error) {
        toast.error("Invalid Error");
      }
    };
    fetchCategory();
  }, [id]);

  // FETCH BRANDS FROM API
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch("/api/brand/brands");
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

    fetchCategory();
  }, [id]);
  console.log(showImage, "this is my show image");
  return (
    <div className=" w-full overflow-x-hidden h-screen">
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
            Edit Base Category
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
              value={input?.name}
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
              value={input?.description}
              className="resize rounded-md w-full text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-24 border-gray-300"
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
                value={input.baseCateId}
                onChange={handleOnChange}
                className="capitalize rounded-md text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-9 border-gray-300 "
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
                value={input.brand}
                onChange={handleOnChange}
                className="capitalize rounded-md text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-9 border-gray-300 uppercase"
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

        {cropperHide && (
          <div className="flex items-center justify-center">
            <Cropper
              ref={cropperRef}
              className="h-60 w-64 py-2 self-center my-4 "
              zoomTo={0}
              initialAspectRatio={1}
              preview=".img-preview"
              src={cropImage}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              guides={true}
            />
          </div>
        )}

        {cropperHide && (
          <div className="flex items-center justify-center gap-1">
            <Button onClick={getCropData} color="success">
              Crop Image
            </Button>
            <Button onClick={handleCancel} color="failure">
              Cancel
            </Button>
          </div>
        )}

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
                    className="h-36 w-56 shadow-sm rounded-lg object-content cursor-pointer "
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
          {loadingImage ? (
            <Button>
              <Spinner aria-label="Spinner button example" size="sm" />
              <span className="pl-3">Loading...</span>
            </Button>
          ) : (
            <Button
              gradientDuoTone="greenToBlue"
              className="w-36"
              onClick={handleUploadImage}
            >
              Save Image
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

export default EditSubCategory;
