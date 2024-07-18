import React, { useEffect, useState } from "react";
import DashNavbar from "../dashboard/components/DashNavbar";
import "../users/users.css";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import { Pagination } from "flowbite-react";
import toast from "react-hot-toast";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [variants, setVariants] = useState(false);
  const [users, setUsers] = useState([]);

  const onPageChange = (page) => setCurrentPage(page);

  const handleVariants = () => {
    setVariants(!variants);
  };
console.log(users)
  const fetchUsers = async () => {
    try {
      const res = await fetch(`/api/admin/admin-getusers?page${currentPage}`);
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      return toast.error("Internal Error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="main_section">
      <DashNavbar />

      <div>
        <div className="flex flex-col md:flex- sm:flex-row items-center py-4 mx-2 my-6 justify-between px-6 border h-28 rounded-md bg-white">
          <h3 className="text-md font-medium font-poetsen lg:text-lg xl:text-xl">
            Customers
          </h3>
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
                placeholder="Search Customers"
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
              className="rounded-md w-24 h-11 md:w-28 lg:w-36 xl:w-40 text-xs md:text-sm lg:text-sm xl:text-base text-slate-900  py-1 font-lora font-medium  border-gray-400"
            >
              Select Status
              <option disabled>select status</option>
              <option value="">Active</option>
              <option value="">Hidden</option>
            </select>
          </div>
        </div>

        {/* customers table */}
        <div className="flex flex-col mx-2 border my-4">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Sl/No
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Phone
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Banned
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users &&
                      users.length > 0 &&
                      users.map((data) => (
                        <tr key={data.id} className="border-b dark:border-neutral-500">
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-sm text-teal-900">
                            {data.id}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-sm text-teal-900">
                            <div className="flex items-center gap-1">
                              <img
                                className="w-8 rounded-full"
                                src={data.profilePic}
                                alt={data.username}
                              />
                              <p>{data.username}</p>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-sm text-teal-900">
                            {data.email}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-sm text-teal-900">
                            {data.mobile}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-sm text-teal-900">
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
            disabled={users.length < 10}
            className="bg-green-500 rounded-md text-white px-2 py-1 cursor-pointer"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
};

export default Users;
