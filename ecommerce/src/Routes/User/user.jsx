import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/app/user/home/Home";
import Cart from "../../pages/app/user/cart/Cart";
import ProductPage from "../../pages/app/user/product/ProductPage";
import Checkout from "../../pages/app/user/checkout/Checkout";
import Login from "../../pages/app/user/Auth/Login";
import Signup from "../../pages/app/user/Auth/Signup";
import Otp from "../../pages/app/user/Auth/Otp";
import Shop from "../../pages/app/user/shop/Shop";
import Cropper from "../../pages/app/user/Login/Login";
import CategoryShop from "../../pages/app/user/categoryShop/CategoryShop";
import Profile from "../../pages/app/user/profile/Profile";
import SingleOrder from "../../pages/app/user/profile/SingleOrder";
const User = () => {
  return (
    <div>
      <Routes>
        <Route path="/crop" element={<Cropper />} />
        <Route path="/login" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/productpage/:id" element={<ProductPage />} />
        <Route path="/check-out" element={<Checkout />} />
        <Route path="/shop/:proId" element={<Shop />} />
        <Route path="/cate-shop/:id" element={<CategoryShop />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order/:id" element={<SingleOrder />} />
      </Routes>
    </div>
  );
};

export default User;
