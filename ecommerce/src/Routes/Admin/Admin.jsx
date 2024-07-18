import React from "react";
import { Route, Routes as AdminRoutes } from "react-router-dom";
import Dashboard from "../../pages/app/Admin/dashboard/Dashboard";
import OrderStatus from "../../components/Admin/orders/OrderStatus";
import AdiminLogin from "../../pages/app/Admin/login/AdminLogin";
import EditCategory from "../../components/Admin/categories/EditCategory";
import PrivateRoute from "../../components/Admin/privateRoute/adminPrivateRoute";
import EditSubCategory from "../../components/Admin/categories/EditSubCategory";
import EditBrand from "../../components/Admin/brand/EditBrand";
import EditProduct from "../../components/Admin/products/EditProduct";
const AdminRoutesComponent = () => {
  return (
    <div>
      <AdminRoutes>
        {/* Route for Admin dashboard */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orderstatus/:id" element={<OrderStatus />} />
          <Route path="/category-edit/:id" element={<EditCategory />} />
          <Route path="/sub-category-edit/:id" element={<EditSubCategory />} />
          <Route path="/update-brand/:id" element={<EditBrand />} />
          <Route path="/update-product/:id" element={<EditProduct />} />
        </Route>
        <Route path="/login" element={<AdiminLogin />} />
      </AdminRoutes>
    </div>
  );
};

export default AdminRoutesComponent;
