import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MobileAccess = () => {
  const [categories, setCategories] = useState([]);
  const [mobiles, setMobiles] = useState([]);
  console.log(categories);
  console.log(mobiles);

  useEffect(() => {
    const mobile = categories.filter(
      (data) => data.basecategory_name.trim() === "mobile"
    );
    setMobiles(mobile);
  }, [categories]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category/sub-category");
        const data = await res.json();
        if (!res.ok) {
          return toast.error(data.message);
        }
        if (data.success) {
          setCategories(data.category);
        }
      } catch (error) {
        toast.error("Internal Error");
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className=" mx-4 mt-14 mb-4">
      {mobiles && mobiles.length > 0 ? (
        <div className="flex justify-between items-center mx-4">
          <h1 className="font-poetsen font-medium text-gray-900 text-2xl">
            Mobiles & Accessories
          </h1>
        </div>
      ) : null}
      <div className="flex items-center gap-2  mt-4">
        {mobiles && mobiles.length > 0
          ? mobiles.map((data) => (
              <div
                key={data.id}
                className="rounded-lg cursor-pointer relative w-36 h-fit py-4 md:w-40 lg:w-44 xl:w-48 2xl:w-52 bg-gradient-to-r from-blue-200 from-10% via-sky-200 via-30% to-sky-300 to-90%"
              >
                <img
                  src={data.image_url}
                  alt="image"
                  className="w-36 rounded mx-2 mt-6"
                />
                <div className="absolute top-1 left- sm:left-10 ">
                  <p className="text-xs  xl:text-base font-semibold capitalize font-poetsen text-black ">
                    {data.subcategory_name}
                  </p>
                  {/* <p className="text-xs xl:text-sm font-medium capitalize font-lora text-black ">
                    {data.description}
                  </p> */}
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default MobileAccess;
