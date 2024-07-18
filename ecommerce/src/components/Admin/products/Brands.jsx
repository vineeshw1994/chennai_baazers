import React, { useEffect, useState } from "react";
import DashNavbar from "../dashboard/components/DashNavbar";
import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { TiEdit } from "react-icons/ti";
import { FiPlus } from "react-icons/fi";
import { TiDeleteOutline } from "react-icons/ti";
import { Button, Pagination, Spinner } from "flowbite-react";
import toast from "react-hot-toast";

const Brands = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const [variants, setVariants] = useState(false);
  const [brands, setBrands] = useState([]);

  console.log(brands);
  const onPageChange = (page) => setCurrentPage(page);

  const handleVariants = () => {
    setVariants(!variants);
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch(`/api/brand/brands?page=${currentPage}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        if (data.success) {
          setBrands(data.brand);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Internal Error");
      }
    };

    fetchBrands();
  }, [currentPage]);

  const handleEdit = (brandId) => {
    navigate(`/admin/update-brand/${brandId}`);
  };
  return (
    <div className="main_section">
      <DashNavbar />

      <div>
        <div className="flex flex-col md:flex- sm:flex-row items-center py-3 mx-2 my-6 justify-between px-6 border h-28 rounded-md bg-white">
          <h3 className="text-md font-medium font-poetsen lg:text-lg xl:text-xl">
            Brands
          </h3>
          <div className="flex items-center gap-5">
            <Link to="/admin?tab=add-brand">
              <button className="border rounded-md py-2 px-2 bg-green-500 hover:bg-green-600 text-white">
                <span className="text-xl">+</span> Add Brand
              </button>
            </Link>
          </div>
        </div>

        {/* header section */}
        <div className="flex items-center justify-around py-3 border mx-2">
          <form class="w-72 lg:w-80 xl:w-96">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <IoIosSearch className="text-xl xl:text-2xl" />
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Brands"
                required
              />
              <button
                type="submit"
                class="text-white absolute end-2.5 bottom-2.5 bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
              className="rounded-md w-24 h-11 md:w-28 lg:w-32 xl:w-36 text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lato font-medium  border-gray-400"
            >
              Select Status
              <option value="">Active</option>
              <option value="">Hidden</option>
            </select>
          </div>
        </div>

        {/* brands table */}
        <div className="mx-2 border rounded-sm">
          <div className="flex flex-col ">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-4 font-lato font-semibold uppercase"
                        >
                          Sl/No
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 font-lato font-semibold uppercase"
                        >
                          Image
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 font-lato font-semibold uppercase"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 font-lato font-semibold uppercase"
                        >
                          Active
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 font-lato font-semibold uppercase"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {brands && brands.length > 0 ? (
                        brands.map((data, index) => (
                          <tr
                            key={data.id}
                            className="border-b dark:border-neutral-500"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium font-lato">
                              {index + 1}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <img
                                src={data.image_url}
                                alt={data.name}
                                className="w-10 rounded-md object-contain"
                              />
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-teal-800 font-lato font-medium capitalize text-base">
                              {data.name}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {variants ? (
                                <div
                                  onClick={handleVariants}
                                  className="border flex justify-start items-center border-green-500 bg-gray-100 h-4 w-8 rounded-lg cursor-pointer "
                                >
                                  <div className="border-2 rounded-full w-3 h-3 bg-green-500 my-auto"></div>
                                </div>
                              ) : (
                                <div
                                  onClick={handleVariants}
                                  className="border flex items-center justify-end bg-green-500 h-4 w-8 rounded-lg cursor-pointer "
                                >
                                  <div className=" rounded-full w-2 h-2 bg-white my-auto mr-1"></div>
                                </div>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <TiEdit
                                onClick={() => handleEdit(data.id)}
                                className="cursor-pointer text-xl xl:text-2xl text-blue-800"
                              />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <div className="flex justify-center my-4">
                          <p className="text-lg text-teal-900 font-lato font-semibold ">
                            No Brands Available
                          </p>
                        </div>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* pagination */}
          {/* <div className="my-3 flex items-center justify-between mx-2">
            <div>
              <p>{`Showing ${(currentPage - 1) * 10 + 1}-${
                (currentPage - 1) * 10 + brands.length
              } of 100 results`}</p>
            </div>
            <div className="flex overflow-x-auto sm:justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={10} // Assuming 10 pages for demonstration
                onPageChange={onPageChange}
              />
            </div>
          </div> */}
        </div>
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
            disabled={brands.length < 10}
            className="bg-green-500 rounded-md text-white px-2 py-1 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Brands;
