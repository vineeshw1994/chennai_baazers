import React, { useState, createRef, useEffect, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button, Tooltip } from "flowbite-react";
import toast from "react-hot-toast";
import { TiDeleteOutline } from "react-icons/ti";
import { FiPlus, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { CiCrop } from "react-icons/ci";
import { FaBoxOpen, FaUserCircle, FaHeart } from "react-icons/fa";
import { IoNotifications, IoSettings } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaLocationDot, FaFileCircleQuestion } from "react-icons/fa6";
import easyinvoice from "easyinvoice";

export const Demo = () => {
  const [image, setImage] = useState(null);
  const [cropImage, setCropImage] = useState(null);
  const [cropData, setCropData] = useState("");
  const [cropperHide, setCropperHide] = useState(false);
  const [images, setImages] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [multiCropperHide, setMultiCropperHide] = useState(false);
  const [multiCropImage, setMultiCropImage] = useState(null);
  const [singleHoverIndex, setSingleHoverIndex] = useState(true);

  const [myaccountOpen, setMyaccountOpen] = useState(false);
  const [helpSupport, setHelpSupport] = useState(false);
  const [offerDiscount, setOfferDiscount] = useState(false);
  const [moreInformation, setMoreInformation] = useState(false);

  const [invoiceBase64, setInvoiceBase64] = useState("");

  const createInvoice = async () => {
    const data = getSampleData();
    const result = await easyinvoice.createInvoice(data);
    setInvoiceBase64(result.pdf);
  };

  const downloadInvoice = async () => {
    const data = getSampleData();
    const result = await easyinvoice.createInvoice(data);
    easyinvoice.download("myInvoice.pdf", result.pdf);
  };

  const renderInvoice = async () => {
    document.getElementById("pdf").innerHTML = "loading...";
    const data = getSampleData();
    const result = await easyinvoice.createInvoice(data);
    easyinvoice.render("pdf", result.pdf);
  };

  const getSampleData = () => {
    return {
      mode: "development",
      images: {
        logo: "https://public.easyinvoice.cloud/img/logo_en_original.png",
      },
      sender: {
        company: "Sample Corp",
        address: "Sample Street 123",
        zip: "1234 AB",
        city: "Sampletown",
        country: "Samplecountry",
      },
      client: {
        company: "Client Corp",
        address: "Clientstreet 456",
        zip: "4567 CD",
        city: "Clientcity",
        country: "Clientcountry",
      },
      information: {
        number: "2021.0001",
        date: "12-12-2021",
        "due-date": "31-12-2021",
      },
      products: [
        {
          quantity: 2,
          description: "Product 1",
          "tax-rate": 6,
          price: 33.87,
        },
        {
          quantity: 4.1,
          description: "Product 2",
          "tax-rate": 6,
          price: 12.34,
        },
        {
          quantity: 4.5678,
          description: "Product 3",
          "tax-rate": 21,
          price: 6324.453456,
        },
      ],
      "bottom-notice": "Kindly pay your invoice within 15 days.",
      settings: {
        currency: "USD",
      },
    };
  };

  useEffect(() => {
    setMyaccountOpen(false);
    setHelpSupport(false);
    setOfferDiscount(false);
    setMoreInformation(false);
  }, []);
  console.log(images);

  // single image ref
  const cropperRef = createRef();
  const nextIdRef = useRef(0);

  // single image onchange
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  // single image cropdata
  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setImage(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
    setCropperHide(false);
  };

  // single image handle funcion
  const handleCrop = () => {
    setCropperHide(true);
    setCropImage(image);
  };

  // multiple imgaes crop function
  const handleCropMultiple = (id) => {
    setMultiCropperHide(true);
    const img = images.find((data) => data.id === id);
    console.log("--------------->", img);
    setMultiCropImage(img);
  };

  // const getMultiCropData = () => {
  //   if (typeof cropperRef.current?.cropper !== "undefined") {
  //     const index = multiCropImage.id
  //     setImages(cropperRef.current?.cropper.getCroppedCanvas().toDataURL())
  //   }
  //   setMultiCropperHide(false);
  // };

  const getMultiCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const croppedDataURL = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      const updatedImages = images.map((image, index) => {
        if (index === multiCropImage.id) {
          return { ...image, img: croppedDataURL };
        }
        return image;
      });
      console.log(">>>>>>>>>>>>>>>>>>>>>>>", updatedImages);
      setImages(updatedImages);
    }
    setMultiCropperHide(false);
  };

  useEffect(() => {
    console.log(".........................", multiCropImage);
  }, [multiCropImage]);

  const handleCancel = () => {
    setCropperHide(false);
  };

  const handleMultiCancel = () => {
    setMultiCropperHide(false);
    setMultiCropImage(null);
  };

  // multi images onchange function
  const handleImgeUpload = (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const read = new FileReader();

      // read.onload = () => {
      //   setImages((prevImages) => [...prevImages, read.result]);
      // };
      read.onload = () => {
        // Append the uploaded image data URL to the images array
        setImages((prevImages) => [
          ...prevImages,
          { img: read.result, id: i }, // Store index along with image data
        ]);
      };

      read.readAsDataURL(file);
    }
  };

  // const handleImgeUpload = (e) => {
  //   const files = e.target.files;
  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];
  //     const read = new FileReader();

  //     read.onload = () => {
  //       // Append the uploaded image data URL to the images array
  //       setImages((prevImages) => [
  //         ...prevImages,
  //         { img: read.result, id: nextIdRef.current++ }, // Increment ID counter after assigning
  //       ]);
  //     };

  //     read.readAsDataURL(file);
  //   }
  // };

  // multi images remove function
  const handleImageDelete = (index) => {
    setImages((prevImages) => prevImages.filter((image, i) => i !== index));
  };

  return (
    <div className="h-screen">
      <div className="mx-2 flex  overflow-hidden my-4  items-center justify-center ">
        <input type="file" onChange={onChange} />
        {cropperHide && (
          <div className="flex items-center justify-center">
            <Cropper
              ref={cropperRef}
              className="h-60 w-56 py-2 self-center my-4 "
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
      </div>
      <div>
        <div className="">
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

          <div className="mt-4 flex items-center justify-center ">
            {image && (
              <div className="">
                <h3 className="text-center my-2 text-gray-800 font-lora font-semibold text-base lg:text-lg xl:text-lg">
                  Preview
                </h3>
                <img
                  onMouseEnter={() => {
                    setSingleHoverIndex(true);
                  }}
                  onMouseLeave={() => {
                    setSingleHoverIndex(false);
                  }}
                  onClick={handleCrop}
                  className="w-56 h-56 object-contain rounded cursor-pointer "
                  src={image}
                  alt="cropped"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-2 overflow-hidden my-4 flex items-center justify-center ">
        {multiCropperHide && (
          <Cropper
            ref={cropperRef}
            className="h-60 w-1/2 py-2 "
            zoomTo={0}
            initialAspectRatio={1}
            preview=".img-preview"
            src={multiCropImage.img}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            guides={true}
          />
        )}
      </div>

      {multiCropperHide && (
        <div className="flex items-center justify-center gap-1">
          <Button onClick={getMultiCropData} color="success">
            Crop Image
          </Button>
          <Button onClick={handleMultiCancel} color="failure">
            Cancel
          </Button>
        </div>
      )}

      <div className="border rounded-md py-4 px-4 mx-2 my-2">
        <h3 className="text-sm font-poetsen font-medium text-gray-800 lg:text-md xl:text-lg">
          Product Image
          <span className="text-lg font-medium text-red-600">*</span>
        </h3>
        <div className="flex w-full border border-dashed items-center justify-center my-4 h-56">
          <div className="mr-4 flex items-center gap-2">
            {images.map((data, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <img
                  src={data.img}
                  alt={`name ${index}`}
                  className="h-20 w-20 shadow-sm rounded-md object-contain cursor-pointer"
                />
                {hoverIndex === index && (
                  <div className="absolute top-0 right-0 flex items-center">
                    <Tooltip content="Crop Image" style="light">
                      <Button
                        onClick={() => handleCropMultiple(data.id)}
                        className="h-10 w-10 rounded-md bg-blue-800 border-none flex items-center justify-center text-white transition duration-300 mr-1"
                      >
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
              onChange={handleImgeUpload}
            />
          </label>
        </div>
      </div>

      <div className="w-1/3 mx-2 border border-gray-400 rounded-xl px-3 py-2">
        <div className="py-2  w-64">
          <h2>
            <button
              className="flex items-center justify-between w-full text-left font-semibold py-2"
              onClick={(e) => {
                e.preventDefault();
                setMyaccountOpen(!myaccountOpen);
              }}
              aria-expanded={myaccountOpen}
              aria-controls={`accordion-text-01`}
            >
              <span className="capitalize font-poetsen font-medium text-lg">
                my account
              </span>
              {myaccountOpen ? (
                <FiChevronUp className="text-2xl text-teal-800" />
              ) : (
                <FiChevronDown className="text-2xl text-teal-800" />
              )}
            </button>
          </h2>
          <div
            id={`accordion-text-01`}
            role="region"
            aria-labelledby={`accordion-title-01`}
            className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${
              myaccountOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            {myaccountOpen ? (
              <Button.Group className="flex flex-col mt-3 mr-1">
                <Link
                  to="/profile?tab=profile"
                  className="border-b mb-3 flex items-center mx-2 pb-4 "
                >
                  <FaUserCircle className="mr-3 text-2xl text-sky-700 " />
                  <p className="w-full border-none font-medium font-lora text-black text-base">
                    Profile
                  </p>
                </Link>
                <Link
                  to="/profile?tab=orders"
                  className="border-b mb-3 flex items-center mx-2 pb-4 "
                >
                  <FaBoxOpen className="mr-3 text-2xl text-sky-700 capitalize " />
                  <p className="w-full border-none font-medium font-lora text-black text-base">
                    My Orders
                  </p>
                </Link>
                <Link
                  to="/profile?tab=orders"
                  className="border-b mb-3 flex items-center mx-2 pb-4 "
                >
                  <FaHeart className="mr-3 text-2xl text-sky-700 capitalize " />
                  <p className="w-full border-none font-medium font-lora text-black text-base">
                    Wish List
                  </p>
                </Link>
                <Link
                  to="/profile?tab=orders"
                  className="border-b mb-2 flex items-center mx-2 pb-4 "
                >
                  <FaLocationDot className="mr-3 text-2xl text-sky-700 capitalize " />
                  <p className="w-full border-none font-medium font-lora text-black text-base">
                    Delivery Addresses
                  </p>
                </Link>
                <Link
                  to="/profile?tab=orders"
                  className="border-b mb-2 flex items-center mx-2 pb-4 "
                >
                  <IoNotifications className="mr-3 text-2xl text-sky-700 capitalize " />
                  <p className="w-full border-none font-medium font-lora text-black text-base">
                    Notification
                  </p>
                </Link>
              </Button.Group>
            ) : null}
          </div>
        </div>

        <div className="py-2 w-64">
          <h2>
            <button
              className="flex items-center justify-between w-full text-left font-semibold py-2"
              onClick={(e) => {
                e.preventDefault();
                setHelpSupport(!helpSupport);
              }}
              aria-expanded={helpSupport}
              aria-controls={`accordion-text-01`}
            >
              <span className="capitalize font-poetsen font-medium text-lg">
                help & support
              </span>
              {helpSupport ? (
                <FiChevronUp className="text-2xl text-teal-800" />
              ) : (
                <FiChevronDown className="text-2xl text-teal-800" />
              )}
            </button>
          </h2>
          <div
            id={`accordion-text-01`}
            role="region"
            aria-labelledby={`accordion-title-01`}
            className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${
              helpSupport
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            {helpSupport ? (
              <Button.Group className="flex flex-col mt-3 mr-1">
                <Link
                  to="/profile?tab=profile"
                  className="border-b mb-3 flex items-center mx-2 pb-4 "
                >
                  <FaFileCircleQuestion className="mr-3 text-2xl text-sky-700 " />
                  <p className="w-full border-none font-medium font-lora text-black text-base">
                    Need Help
                  </p>
                </Link>
                {/* <Link
                  to="/profile?tab=orders"
                  className="border-b mb-3 flex items-center mx-2 pb-4 "
                >
                  <FaBoxOpen className="mr-3 text-2xl text-sky-700 capitalize " />
                  <p className="w-full border-none font-medium font-lora text-black text-base">
                    My Orders
                  </p>
                </Link> */}
              </Button.Group>
            ) : null}
          </div>
        </div>

        <div className="py-2 w-64">
          <h2>
            <button
              className="flex items-center justify-between w-full text-left font-semibold py-2"
              onClick={(e) => {
                e.preventDefault();
                setOfferDiscount(!offerDiscount);
              }}
              aria-expanded={offerDiscount}
              aria-controls={`accordion-text-01`}
            >
              <span className="capitalize font-poetsen font-medium text-lg">
                Offers & Discounts
              </span>
              {offerDiscount ? (
                <FiChevronUp className="text-2xl text-teal-800" />
              ) : (
                <FiChevronDown className="text-2xl text-teal-800" />
              )}
            </button>
          </h2>
          <div
            id={`accordion-text-01`}
            role="region"
            aria-labelledby={`accordion-title-01`}
            className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${
              offerDiscount
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <p className="pb-3">
                If you go over your organisations or user limit, a member of the
                team will reach out about bespoke pricing. In the meantime, our
                collaborative features won't appear in accounts or users that
                are over the 100-account or 1,000-user limit.
              </p>
            </div>
          </div>
        </div>

        <div className="py-2 w-64">
          <h2>
            <button
              className="flex items-center justify-between w-full text-left font-semibold py-2"
              onClick={(e) => {
                e.preventDefault();
                setMoreInformation(!moreInformation);
              }}
              aria-expanded={moreInformation}
              aria-controls={`accordion-text-01`}
            >
              <span className="capitalize font-poetsen font-medium text-lg">
                More Information
              </span>
              {moreInformation ? (
                <FiChevronUp className="text-2xl text-teal-800" />
              ) : (
                <FiChevronDown className="text-2xl text-teal-800" />
              )}
            </button>
          </h2>
          <div
            id={`accordion-text-01`}
            role="region"
            aria-labelledby={`accordion-title-01`}
            className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${
              moreInformation
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <p className="pb-3">
                If you go over your organisations or user limit, a member of the
                team will reach out about bespoke pricing. In the meantime, our
                collaborative features won't appear in accounts or users that
                are over the 100-account or 1,000-user limit.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={createInvoice}
        >
          Create Invoice
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={downloadInvoice}
        >
          Download Invoice
        </button>
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          onClick={renderInvoice}
        >
          Render Invoice
        </button>
        <br />
        <br />
        <p>
          Invoice Base64 (click create invoice): <small>{invoiceBase64}</small>
        </p>
        <div id="pdf" className="mt-4"></div>
      </div>
    </div>
  );
};

export default Demo;
