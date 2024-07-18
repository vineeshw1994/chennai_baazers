import React from "react";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
const CartIcon = ({ cartCount }) => {
  return (
    <div className="relative">
      <PiShoppingCartSimpleFill className="text-3xl  m-2 cursor-pointer text-white" />
      {cartCount > 0 && (
        <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
          {cartCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
