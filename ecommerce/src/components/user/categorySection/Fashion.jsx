import React from "react";

const Fashion = () => {
  const brands = [
    {
      id: 1,
      image:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1717054529_T_Shirts_and_Trackpants.jpg?im=Resize=(368,538)",
    },
    {
      id: 2,
      image:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1717054548_Tops_and_Dresses.jpg?im=Resize=(368,538)",
    },
    {
      id: 3,
      image:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1717054568_Kids_T_Shirts_and_Dresses.jpg?im=Resize=(368,538)",
    },
    {
      id: 4,
      image:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1717054587_Kurtis_and_Salwaars.jpg?im=Resize=(368,538)",
    },
    {
      id: 5,
      image:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1717054607_Jeans_Shirts_Shorts_and_More.jpg?im=Resize=(368,538)",
    },
    {
      id: 6,
      image:
        "https://www.jiomart.com/images/cms/aw_rbslider/slides/1717054625_Night_and_Loungewear.jpg?im=Resize=(368,538)",
    },
  ];
    return (
      <div className="mx-4 mt-14 mb-4">
        <h1 className="font-poetsen font-medium text-gray-900 text-2xl">
          Fashion Apparels
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

export default Fashion;
