import React from "react";

const TrendingSlide = () => {
  const brands = [
    {
      id: 1,
      image:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1717524828_Top_Deals_On_Kitchen_and_Dining.jpg?im=Resize=(768,200)",
    },
    {
      id: 2,
      image:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1717134517_Slim_Banner_APP.jpg?im=Resize=(768,200)",
    },
    {
      id: 3,
      image:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1717653844_Paisley_Bedsheets.jpg?im=Resize=(768,200)",
    },
    
  ];
  return (
    <div className="mx-4 my-4">
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

export default TrendingSlide;
