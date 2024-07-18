import React, { useEffect } from "react";
import DashNavbar from "../dashboard/components/DashNavbar";
import { CiExport, CiEdit } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";
import { IoIosSearch } from "react-icons/io";
import { Pagination } from "flowbite-react";
import { useState } from "react";
import { Tooltip, Button, Modal, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Products = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [showView, setShowView] = useState(false);
  const [status, setStatus] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleView = () => {
    setShowView(!showView);
  };

  console.log(products);
  const onPageChange = (page) => setCurrentPage(page);

  const handlePublished = async (proId, newStatus) => {
    try {
      const res = await fetch(`/api/product/published/${proId}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      if (data.success) {
        setStatus(null);
        return toast.success(data.message);
      }
    } catch (error) {
      return toast.error("Internal Error");
    }
  };
  const fetchProducts = async () => {
    try {
      const res = await fetch(`/api/product/get-products?page=${currentPage}`);
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }

      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      return toast.error("Internal Error");
    }
  };

  const exportProduct = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/order/products-export"); // Adjust URL as per your backend route

      // Check if the response is successful
      if (!res.ok) {
        setLoading(false);
        const errorText = await res.text(); // Read error message from response body
        toast.error(errorText || "Export failed");
        return;
      }
      // Get the binary data as a Blob
      const blob = await res.blob();

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "products.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setLoading(false);
      return toast.success("Download Successful");
    } catch (error) {
      setLoading(false);
      toast.error("Failed to export products");
      console.error("Export error:", error);
    }
  };

  const handleChange = async (e) => {
    const searchValue = e.target.value;

    // Handle Esc key press to clear products
    if (e.key === "Escape") {
      e.target.value = ""; // Clear input field
      setProducts([]); // Clear products state
      return;
    }

    // Handle Backspace key press to clear products when input is empty
    if (e.key === "Backspace" && searchValue === "") {
      setProducts([]);
      return;
    }
    if (searchValue === "") {
      setProducts([]);
      return;
    }

    try {
      const res = await fetch(
        `/api/search/search-products?name=${encodeURIComponent(searchValue)}`
      );
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
  }, [status, currentPage]);

  const handleDelete = async () => {
    try {
      setOpenModal(false);
      const res = await fetch(`/api/product/delete/${deleteProduct}`, {
        method: "delete",
      });
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      if (data.success) {
        setDeleteProduct(null);
        fetchProducts();
        navigate("/admin?tab=products");
        return toast.success(data.message);
      }
    } catch (error) {
      return toast.error("Internal Error");
    }
  };
  const handleEdit = (proId) => {
    navigate(`/admin/update-product/${proId}`);
  };
  return (
    <div className="main_section">
      <DashNavbar />
      <div>
        <div className="flex flex-col md:flex- sm:flex-row items-center py-3   my-6 justify-between px-6 border h-28 rounded-md bg-white">
          <h3 className="text-md font-medium font-poetsen lg:text-lg xl:text-xl">
            Products
          </h3>

          <div className="flex items-center gap-5">
            {loading ? (
              <div className="flex items-center gap-1  rounded-md py-1 bg-red-500 px-3 border-gray-600 cursor-pointer hover:bg-red-700">
                <Spinner aria-label="Default status example" className="mr-2" />
                <p className="font-poetsen text-sm lg:text-md xl:text-lg text-white">
                  Loading....
                </p>
              </div>
            ) : (
              <div
                onClick={exportProduct}
                className="flex items-center gap-1  rounded-md py-1 bg-red-500 px-3 border-gray-600 cursor-pointer hover:bg-red-700"
              >
                <CiExport className="text-4xl py-1 text-white" />
                <p className="font-poetsen text-sm lg:text-md xl:text-lg text-white">
                  Export
                </p>
              </div>
            )}

            <Link to="/admin?tab=addproduct">
              <button className="border rounded-md py-2 px-2 bg-green-500 hover:bg-green-600 text-white">
                <span className="text-xl">+</span> Add Product
              </button>
            </Link>
          </div>
        </div>

        <div>
          {/* header section */}
          <div className="flex items-center justify-around py-3 border mx-2">
            <form className="w-72 lg:w-80 xl:w-96">
              <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <IoIosSearch className="text-xl xl:text-2xl" />
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Products"
                  required
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
            <div className="flex items-center gap-2 lg:gap-6 xl:gap-8">
              <select
                name=""
                id=""
                defaultValue="Select Brand"
                className="rounded-md w-24 h-11 lg:w-32 xl:w-36 text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lato font-medium  border-gray-400"
              >
                Select Brand
                <option value="">vivo</option>
                <option value="">oppo</option>
                <option value="">apple</option>
                <option value="">samsung</option>
              </select>

              <select
                name=""
                id=""
                defaultValue="Select Brand"
                className="rounded-md w-24 h-11 lg:w-32 xl:w-36 text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lato font-medium  border-gray-400"
              >
                Select Brand
                <option
                  value="published"
                  className="bg-gray-200 text-teal-700 font-medium font-poetsen my-1"
                >
                  Published
                </option>
                <option
                  value="unpublished"
                  className="bg-gray-200 text-red-700 font-medium font-poetsen my-1"
                >
                  Unpublished
                </option>
              </select>
            </div>
          </div>

          {/* products table */}
          <div>
            <div className="relative overflow-x-auto shadow-md  border rounded-b-lg my-2 mx-2 ">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-2 py-3">
                      Sl/No
                    </th>
                    <th scope="col" className="px-2 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Published
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.length > 0 &&
                    products.map((data, index) => (
                      <tr
                        key={data.id}
                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {index + 1}
                        </th>
                        <td className="px-4 py`2">
                          <img
                            className="w-14 h-14 object-contain"
                            src={
                              data.images && data.images.length > 0
                                ? data.images[0].url
                                : ""
                            }
                            alt={data.name}
                          />
                        </td>
                        <td className="px-6 py-4 font-lato uppercase text-teal-900 font-medium">
                          {data.name}
                        </td>
                        <td className="px-6 py-4 font-lato uppercase font-semibold text-gray-950">
                          {data.base_category_name}
                        </td>
                        <td className="px-6 py-4 font-lato font-semibold text-red-500">
                          £ {data.price}
                        </td>
                        <td
                          className="px-6 py-4"
                          onClick={() => {
                            const newStatus =
                              data.product_published === "published"
                                ? "unpublished"
                                : "published";
                            setStatus(newStatus);
                            handlePublished(data.id, newStatus);
                          }}
                        >
                          {data.product_published === "published" ? (
                            <div className="border flex items-center justify-end bg-green-500 h-4 w-8 rounded-lg cursor-pointer ">
                              <div className=" rounded-full w-2 h-2 bg-white my-auto mr-1"></div>
                            </div>
                          ) : (
                            <div className="border flex justify-start items-center border-green-500 bg-gray-100 h-4 w-8 rounded-lg cursor-pointer ">
                              <div className="border-2 rounded-full w-3 h-3 bg-green-500 my-auto"></div>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Tooltip
                              content="Edit"
                              style="light"
                              placement="left"
                            >
                              <CiEdit
                                onClick={() => handleEdit(data.product_id)}
                                className="text-2xl text-purple-600 cursor-pointer"
                              />
                            </Tooltip>
                            <Tooltip
                              content="Delete"
                              placement="right"
                              style="light"
                            >
                              <TiDeleteOutline
                                onClick={() => {
                                  setOpenModal(true),
                                    setDeleteProduct(data.product_id);
                                }}
                                className="text-2xl text-rose-500 cursor-pointer"
                              />
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              {/* Pagination component */}
              <div className="flex my-2 justify-end mx-2">
                <button
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="bg-blue-500 rounded-md text-white px-2 py-1 cursor-pointer"
                >
                  Previous
                </button>
                <span className="bg-stone-200 rounded-xl mx-2 p-2">
                  {currentPage}
                </span>
                <button
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={products.length < 10}
                  className="bg-green-500 rounded-md text-white px-2 py-1 cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Products;
