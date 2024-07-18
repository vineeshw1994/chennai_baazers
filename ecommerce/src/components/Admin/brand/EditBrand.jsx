import { Button, Modal, Tooltip, Spinner } from "flowbite-react";
import React, { createRef, useEffect, useState } from "react";
import { CiCrop } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { TiDeleteOutline } from "react-icons/ti";
import { Link, useNavigate, useParams } from "react-router-dom";
import DashNavbar from "../dashboard/components/DashNavbar";
import toast from "react-hot-toast";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoPulse } from "react-icons/io5";

const EditBrand = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [cropImage, setCropImage] = useState(null);
  const [cropperHide, setCropperHide] = useState(false);
  const cropperRef = createRef();
  const [hoverIndex, setHoverIndex] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState({
    name: "",
    description: "",
    activity: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const validFileTypes = ["image/jpeg", "image/png", "image/webp"];
  const maxSizeInBytes = 2 * 1024 * 1024; // 2MB

  const handleOnChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  // single image onchange
  const handleChange = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    const imageURL = URL.createObjectURL(selectedFile);
    setShowImage(imageURL);
  };
  console.log("image", image);
  console.log(input);
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
      !input.name ||
      input.name === "" ||
      !input.description ||
      input.description === "" ||
      !input.activity ||
      input.activity === ""
    ) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);
      const res = await fetch(`/api/brand/update-brand/${id}`, {
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
        navigate("/admin?tab=brands");
        return toast.success(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  const handleUpdateImage = async () => {
    try {
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
      setLoadingImage(true);
      const res = await fetch(`/api/brand/update-brand-image/${id}`, {
        method: "put",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setLoadingImage(false);
        navigate("/admin?tab=brands");
        return toast.success(data.message);
      }
      if (!data.success) {
        setLoadingImage(false);
        return toast.error(data.message);
      }
    } catch (error) {
      setLoadingImage(false);
      return toast.error("Internal Error");
    }
  };

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const res = await fetch(`/api/brand/single-brand/${id}`);
        const data = await res.json();
        if (!res.ok) {
          return toast.error(data.message);
        }
        console.log(data.brand, "this is brand data");
        if (data.success) {
          setInput({
            name: data.brand.name || "",
            description: data.brand.description || "",
            activity: data.brand.published || "",
          });
          setImage(data.brand.image_url);
          setShowImage(data.brand.image_url);
        }
      } catch (error) {
        toast.error("Invalid Error");
      }
    };
    fetchBrand();
  }, [id]);
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
          to="/admin?tab=brands"
          className="text-xs font-serif font-semibold sm:text-xs md:text-xs lg:text-sm xl:text-sm text-gray-500"
        >
          Brands
        </Link>
      </div>
      <div>
        <div className="flex flex-col md:flex- sm:flex-row items-center py-3  mx-2  my-6 justify-between px-6 border h-28 rounded-md bg-white">
          <h3 className="text-md font-thin font-poetsen lg:text-lg xl:text-xl">
            Edit Brand
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
              Brand Name
            </label>
            <input
              type="text"
              id="name"
              value={input.name}
              onChange={handleOnChange}
              placeholder="Enter Brand Name"
              className="rounded-md text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-10 border-gray-300"
            />
          </div>
          <div className="flex flex-col w-full">
            <label
              htmlFor=""
              className="text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium"
            >
              Brand Description
            </label>
            <textarea
              name=""
              id="description"
              value={input.description}
              onChange={handleOnChange}
              className="resize rounded-md w-full text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-24 border-gray-300"
              placeholder="Enter Brand Description"
            ></textarea>
          </div>
          {/* product status */}
          <div className="border rounded-md py-4 px-4  my-2">
            <h3 className="text-sm font-poetsen font-medium text-gray-800 lg:text-md xl:text-lg">
              Brand Status
            </h3>
            <div className="flex flex-col w-full my-4">
              <select
                name="activity"
                id="activity"
                value={input.activity}
                className="rounded-md text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lora font-medium h-10 border-gray-300"
                onChange={handleOnChange}
              >
                <option value="" defaultValue>
                  Select Status
                </option>
                <option value="published">Published</option>
                <option value="unpublished">Unpublished</option>
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
              Update Brand
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
            Brand Image
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
              onClick={handleUpdateImage}
            >
              Update Image
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

export default EditBrand;
