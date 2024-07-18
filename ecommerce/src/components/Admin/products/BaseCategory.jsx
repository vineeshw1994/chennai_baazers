import React, { useEffect, useState } from "react";
import DashNavbar from "../dashboard/components/DashNavbar";
import "../products/style/products.css";
import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { TiEdit } from "react-icons/ti";
import { Pagination } from "flowbite-react";
import toast from "react-hot-toast";

const BaseCategory = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);

  const onPageChange = (page) => setCurrentPage(page);
  console.log(categories, "this is my categories");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`/api/category/categories?page=${currentPage}`);
        const data = await res.json();
        if (!res.ok) {
          return toast.error(data.message);
        }

        if (data.success) {
          setCategories(data.category);
        }
      } catch (error) {
        return toast.error("Internal Error");
      }
    };

    fetchCategory();
  }, []);

  const handleEdit = (cateId) =>{
    toast.success(cateId)
    navigate(`/admin/category-edit/${cateId}`)
  }

  return (
    <div className="main_section">
      <DashNavbar />

      <div>
        <div className="flex flex-col md:flex- sm:flex-row items-center py-3 mx-2 my-6 justify-between px-6 border h-28 rounded-md bg-white">
          <h3 className="text-md font-medium font-poetsen lg:text-lg xl:text-xl">
            Base Categories
          </h3>
          <div className="flex items-center gap-5">
            <Link to="/admin?tab=addbasecategory">
              <button className="border rounded-md py-2 px-2 bg-green-500 hover:bg-green-600 text-white">
                <span className="text-xl">+</span> Add Category
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
                  placeholder="Search Category"
                  required
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
                defaultValue=""
                className="rounded-md w-24 h-11 md:w-28 lg:w-32 xl:w-36 text-xs md:text-sm lg:text-base xl:text-base text-slate-900 py-1 font-lato font-medium  border-gray-400"
              >
                <option disabled>Select</option>
                <option value="">By Name</option>
                <option value="">Recent</option>
              </select>
            </div>
          </div>

          {/* categories table */}
          <div className="mx-2 border rounded-sm">
            <div className="flex flex-col ">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th scope="col" className="px-6 py-4 font-lato ">
                            Sl/No
                          </th>
                          <th scope="col" className="px-6 py-4 font-lato">
                            Image
                          </th>
                          <th scope="col" className="px-6 py-4 font-lato">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-4 font-lato">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories &&
                          categories.map((category, index) => (
                            <tr className="border-b dark:border-neutral-500">
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                {index + 1}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 ">
                                <img src={category.image_url} alt="Image" className="w-16 rounded-lg cursor-pointer object-contain" />
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 capitalize font-lato font-medium">
                                {category.name}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <TiEdit onClick={()=>handleEdit(category.id)} className="cursor-pointer text-xl xl:text-2xl text-amber-800" />
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
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
            disabled={categories.length < 10}
            className="bg-green-500 rounded-md text-white px-2 py-1 cursor-pointer"
          >
            Next
          </button>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseCategory;
