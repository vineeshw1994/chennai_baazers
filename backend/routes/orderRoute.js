import express from "express";
import {
  allAdmin_orders,
  cancel_order_product,
  get_order,
  get_orders,
  invoice,
  invoiceDownload,
  order_accept,
  order_create,
  order_reject,
  order_status_change,
  order_success,
  orders_export,
  orders_status_change,
  products_export,
  return_order_product,
} from "../controllers/orderController.js";

const route = express.Router();

// CREATE ORDER
route.post("/create-order", order_create);

//PAYMENT SUCCESS
route.post("/payment-success", order_success);

// GET ORDERS
route.get("/get-orders/:userId", get_orders);

//GET SINGLE ORDER
route.post("/get-order/:orderId", get_order);

// CANCEL SINGLE PRODUCT ON THE ORDER
route.delete("/order-delete/:proId", cancel_order_product);

// RETURN SINGLE PRODUT ON THE ORDER
route.delete("/order-return/:proId", return_order_product);

route.post("/invoice/:userId", invoice);

//////////// admin routes /////////////

route.get("/admin-orders", allAdmin_orders);

// this is the single order status change route
route.put("/order-status-change", order_status_change);

// this is the whole order status change route
route.put("/orders-status-change", orders_status_change);

// RETURN ACCEPCT
route.put("/order-accept", order_accept);
// RETURN REJECT
route.put("/order-reject", order_reject);

//ADMIN SINGLE ORDER INVOICE DOWNLOAD
route.post("/invoice-download", invoiceDownload);

//admin all products export excel sheet
route.get("/products-export", products_export);

// admin all orders export excel sheet
route.get("/orders-export", orders_export);

route.put("/orders-status-chage", orders_status_change);

export default route;
