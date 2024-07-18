import React from "react";
import DashNavbar from "../dashboard/components/DashNavbar";
import { Link } from "react-router-dom";

const SpecialDayBanner = () => {
  return (
    <div className="main_section">
      <DashNavbar />

      <div>
        <div className="flex flex-col md:flex- sm:flex-row items-center py-3 mx-2 my-6 justify-between px-6 border h-28 rounded-md bg-white">
          <h3 className="text-md font-medium font-poetsen lg:text-lg xl:text-xl">
            Special-Day Banner
          </h3>
          <div className="flex items-center gap-5">
            <Link to="/admin?tab=addbasecategory">
              <button className="border rounded-md py-2 px-2 bg-green-500 hover:bg-green-600 text-white">
                <span className="text-xl">+</span> Add Banner
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialDayBanner;
