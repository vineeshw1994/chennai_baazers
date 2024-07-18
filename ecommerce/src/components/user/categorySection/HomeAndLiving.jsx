import React from "react";

const HomeAndLiving = () => {
  const brands = [
    {
      id: 1,
      image:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1717052520_Luggage_Deals.jpg?im=Resize=(368,538)",
    },
    {
      id: 2,
      image:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1717052610_Fitness.jpg?im=Resize=(368,538)",
    },
    {
      id: 3,
      image:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1717053455_Bean_Bags.jpg?im=Resize=(368,538)",
    },
    {
      id: 4,
      image:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1717481820_Umbrella.jpg?im=Resize=(368,538)",
    },
    {
      id: 5,
      image:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1717657175_Complete_Garden_Care_4th_to_7th.jpg?im=Resize=(368,538)",
    },
    {
      id: 6,
      image:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1717053634_Pooja_Needs.jpg?im=Resize=(368,538)",
    },
  ];
  return (
    <div className="mx-4 mt-14 mb-4">
      <h1 className="font-poetsen font-medium text-gray-900 text-2xl">
        Home & Living
      </h1>
      <div className="flex items-center justify-around my-2">
        {brands && brands.length > 0
          ? brands.map((image) => (
              <div key={image.id} className="cursor-pointer">
                <img
                  src={image.image}
                  alt="image"
                  className="w-10/12 rounded-2xl"
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default HomeAndLiving;
