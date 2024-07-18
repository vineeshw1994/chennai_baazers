import React, { useEffect, useRef } from "react";

const ImageZoom = () => {
  const imgRef = useRef(null);
  const lensRef = useRef(null);
  const resultRef = useRef(null);

  useEffect(() => {
    imageZoom(imgRef.current, resultRef.current);
  }, []);

  const imageZoom = (img, result) => {
    let lens, cx, cy;
    /*create lens:*/
    lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    /*insert lens:*/
    img.parentElement.insertBefore(lens, img);
    /*calculate the ratio between result DIV and lens:*/
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    /*set background properties for the result DIV:*/
    result.style.backgroundImage = `url(${img.src})`;
    result.style.backgroundSize = `${img.width * cx}px ${img.height * cy}px`;
    /*execute a function when someone moves the cursor over the image, or the lens:*/
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    /*and also for touch screens:*/
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);

    function moveLens(e) {
      let pos, x, y;
      /*prevent any other actions that may occur when moving over the image:*/
      e.preventDefault();
      /*get the cursor's x and y positions:*/
      pos = getCursorPos(e);
      /*calculate the position of the lens:*/
      x = pos.x - lens.offsetWidth / 2;
      y = pos.y - lens.offsetHeight / 2;
      /*prevent the lens from being positioned outside the image:*/
      if (x > img.width - lens.offsetWidth) x = img.width - lens.offsetWidth;
      if (x < 0) x = 0;
      if (y > img.height - lens.offsetHeight)
        y = img.height - lens.offsetHeight;
      if (y < 0) y = 0;
      /*set the position of the lens:*/
      lens.style.left = `${x}px`;
      lens.style.top = `${y}px`;
      /*display what the lens "sees":*/
      result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
    }

    function getCursorPos(e) {
      let a,
        x = 0,
        y = 0;
      e = e || window.event;
      /*get the x and y positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /*consider any page scrolling:*/
      x -= window.pageXOffset;
      y -= window.pageYOffset;
      return { x: x, y: y };
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Image Zoom</h1>
      <p className="mb-4">Mouse over the image:</p>
      <div className="img-zoom-container relative inline-block">
        <img
          id="myimage"
          src="https://via.placeholder.com/300x240"
          width="300"
          height="240"
          className="block"
          ref={imgRef}
          alt="Zoom"
        />
        <div
          id="myresult"
          ref={resultRef}
          className="img-zoom-result absolute w-72 h-72 border border-gray-400"
          style={{ top: 0, right: "-320px" }}
        ></div>
      </div>
      <p className="mt-4">
        The image must be placed inside a container with relative positioning.
      </p>
      <p>
        The result can be put anywhere on the page, but must have the class name
        "img-zoom-result".
      </p>
      <p>
        Make sure both the image and the result have IDs. These IDs are used
        when JavaScript initiates the zoom effect.
      </p>
    </div>
  );
};

export default ImageZoom;
