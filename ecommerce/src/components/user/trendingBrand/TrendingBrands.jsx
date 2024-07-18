import React from "react";

const TrendingBrand = () => {
  const brands = [
    {
      id: 1,
      image:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1717432901_Oneplus.jpg?im=Resize=(368,452)",
    },
    {
      id: 2,
      image:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1717656832_Classela.jpg?im=Resize=(368,452)",
    },
    {
      id: 3,
      image:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1717432895_Levis.jpg?im=Resize=(368,452)",
    },
    {
      id: 4,
      image:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1717432943_Everteen.jpg?im=Resize=(368,452)",
    },
    {
      id: 5,
      image:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1717433036_Rice_Villa.jpg?im=Resize=(368,452)",
    },
    {
      id: 6,
      image:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1717656832_Classela.jpg?im=Resize=(368,452)",
    },
  ];
  return (
    <div className="mx-4 mt-14 mb-4">
      <h1 className="font-poetsen font-medium text-gray-900 text-2xl">Trending Brands</h1>
      <div className="flex items-center justify-around my-2">
        {brands && brands.length > 0
          ? brands.map((image) => (
              <div key={image.id} className="cursor-pointer">
                <img src={image.image} alt="image" className="w-10/12 rounded-2xl" />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default TrendingBrand;
