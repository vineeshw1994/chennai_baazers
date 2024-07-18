import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Category = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

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
  useEffect(() => {
    fetchCategory();
  }, []);
  const handleClick = (cateId) => {
    navigate(`/cate-shop/${cateId}`);
  };
  return (
    <div className="shadow-md mb-6 bg-cyan-800 sticky z-10  top-20 hidden lg:block xl:block 2xl:block">
      <div className="flex justify-center gap-6 items-center 2xl:mx-40 xl:mx-36">
        {categories &&
          categories.map((category) => (
            <div
              key={category.id}
              className="my-3 text-center"
              onClick={() => handleClick(category.id)}
            >
              <h3 className="font-medium font-lato text-white capitalize xl:text-base lg:text-base md:text-sm sm:text-sm text-xs cursor-pointer border border-cyan-800 hover:border hover:border-white hover:border-solid px-2">
                {category.name}
              </h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Category;
