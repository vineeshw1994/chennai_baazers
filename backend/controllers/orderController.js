import {
  accept_order,
  admin_orders,
  create_order,
  get_orders_export,
  get_products,
  orders,
  reject_order,
  single_order,
  single_order_product_delete,
  single_order_product_return,
  single_order_status,
  success_order,
  whole_order_status,
} from "../models/orderModel.js";
import easyinvoice from "easyinvoice";
import xlsx from "node-xlsx";
import fs from "fs";

export const order_create = async (req, res, next) => {
  try {
    const { userId, grandTotal, selectedPaymentMethod, selectedAddressId } =
      req.body;
    console.log(req.body);
    const total = parseInt(grandTotal);

    const method = selectedPaymentMethod.toLowerCase();
    console.log(method);

    const data = await create_order(userId, total, method, selectedAddressId);
    if (data.success) {
      return res.status(200).json({
        success: data.success,
        message: data.message,
        orderId: data.orderId,
        addressId: data.addressId,
        method: data.method,
      });
    } else {
      return res
        .status(400)
        .json({ success: data.success, message: data.message });
    }
  } catch (error) {
    next(error);
  }
};

export const order_success = async (req, res, next) => {
  try {
    const { userId, orderId, paymentId, addressId, method } = req.body;
    console.log(req.body);
    const data = await success_order(
      userId,
      orderId,
      paymentId,
      addressId,
      method
    );
    if (!data.success) {
      return res
        .status(400)
        .json({ success: data.success, message: data.message });
    }
    if (data.success) {
      return res.status(200).json({
        success: data.success,
        message: data.message,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const get_orders = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const { userId } = req.params;
    const data = await orders(userId, page, limit);
    if (!data.success) {
      return res
        .status(400)
        .json({ success: data.success, message: data.message });
    }
    if (data.success) {
      return res.status(200).json({
        success: data.success,
        message: data.message,
        orders: data.orders,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const get_order = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { orderId } = req.params;
    console.log(userId, orderId);
    const data = await single_order(userId, orderId);
    if (!data.success) {
      return res
        .status(400)
        .json({ success: data.success, message: data.message });
    }
    if (data.success) {
      return res.status(200).json({
        success: data.success,
        order: data.order,
        message: data.message,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const cancel_order_product = async (req, res, next) => {
  try {
    const { proId } = req.params;
    const { userId, orderId } = req.body;
    console.log(typeof proId, userId, orderId);
    const productId = parseInt(proId);
    console.log(typeof productId, userId, orderId);

    const data = await single_order_product_delete(userId, productId, orderId);
    if (!data.success) {
      return res
        .status(400)
        .json({ message: data.message, success: data.success });
    }
    if (data.success) {
      return res
        .status(200)
        .json({ success: data.success, message: data.message });
    }
  } catch (error) {
    next(error);
  }
};
export const return_order_product = async (req, res, next) => {
  try {
    const { proId } = req.params;
    const { userId, orderId } = req.body;
    console.log(typeof proId, userId, orderId);
    const productId = parseInt(proId);
    console.log(typeof productId, userId, orderId);

    const data = await single_order_product_return(userId, productId, orderId);
    if (!data.success) {
      return res
        .status(400)
        .json({ message: data.message, success: data.success });
    }
    if (data.success) {
      return res
        .status(200)
        .json({ success: data.success, message: data.message });
    }
  } catch (error) {
    next(error);
  }
};

export const invoice = async (req, res, next) => {
  console.log("this is the invoice download function");
  try {
    const { orderId } = req.body;
    const { userId } = req.params;
    console.log(userId, orderId);

    // Call your 'order' function to fetch data
    const orderData = await single_order(userId, orderId);

    // Check if fetching data was successful
    if (!orderData.success) {
      return res
        .status(400)
        .json({ success: false, message: "Invoice data not found" });
    }

    // Extract order details from fetched data
    const order = orderData.order;

    let addressLine = order.address.houseNo
      ? `${order.address.houseNo}, ${order.address.address}, ${order.address.landmark}`
      : `${order.address.flatNo}, ${order.address.address}, ${order.address.landmark}`;
    // Construct the invoice information dynamically
    const information = {
      client: {
        company: order.address.username, // Assuming username is the client's name
        address: `${addressLine}, ${order.address.address}, ${order.address.landmark}`,
        city: order.address.district,
        country: order.address.state,
        zip: order.address.pincode,
      },
      sender: {
        company: "E-Shop ",
        address: "Chennai,",
        city: "Tamilnadu,",
        country: "India.",
        zip: "600001",
      },
      images: {
        logo: "https://public.easyinvoice.cloud/img/logo_en_original.png",
      },
      information: {
        number: `INV-${order.id}`, // Invoice number based on order ID
        date: new Date(order.orderDate).toLocaleDateString("en-US"), // Format order date
      },
      products: order.products.map((product) => ({
        quantity: product.quantity,
        description: product.name,
        "tax-rate": 0, // Example tax rate, modify as per your requirement
        price: parseFloat(product.realprice).toFixed(2), // Format price accordingly
      })),
      bottomNotice:
        "We hope you love your purchase! Visit us again soon for more great deals.",
      settings: {
        currency: "INR",
      },
    };

    // Generate invoice PDF and send as response
    easyinvoice.createInvoice(information, function (result) {
      const pdfBuffer = Buffer.from(result.pdf, "base64");
      // Set headers for file download
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=invoice_${orderId}.pdf`
      );
      // Send the PDF as response
      res.send(pdfBuffer);
    });
  } catch (error) {
    next(error);
  }
};

//////// admin controllers ////////////

export const allAdmin_orders = async (req, res, next) => {
  try {
    const limit = 10
    const page = parseInt(req.query.page) || 1
    const data = await admin_orders(page, limit);
    if (!data.success) {
      return res
        .status(400)
        .json({ success: data.success, message: data.message });
    }
    if (data.success) {
      return res
        .status(200)
        .json({ success: data.success, orders: data.orders });
    }
  } catch (error) {
    next(error);
  }
};

export const order_status_change = async (req, res, next) => {
  try {
    const { userId, proId, orderId, status } = req.body;
    console.log(req.body, "from client");
    const productId = parseInt(proId);
    const data = await single_order_status(userId, productId, orderId, status);
    if (!data.success) {
      return res.status(400).json({ success: false, message: data.message });
    }
    if (data.success) {
      return res
        .status(200)
        .json({ success: data.success, message: data.message });
    }
  } catch (error) {
    next(error);
  }
};

export const orders_status_change = async (req, res, next) => {
  try {
    const { userId, orderId, status } = req.body;
    console.log(req.body);
    const data = await whole_order_status(userId, orderId, status);
    if (!data.success) {
      return res
        .status(400)
        .json({ success: data.success, message: data.message });
    }
    if (data.success) {
      return res
        .status(200)
        .json({ success: data.success, message: data.message });
    }
  } catch (error) {
    next(error);
  }
};

export const order_accept = async (req, res, next) => {
  try {
    const { userId, orderId, proId } = req.body;
    console.log(typeof proId, userId, orderId);
    const productId = parseInt(proId);
    console.log(typeof productId, userId, orderId);

    const data = await accept_order(userId, productId, orderId);
    if (!data.success) {
      return res
        .status(400)
        .json({ message: data.message, success: data.success });
    }
    if (data.success) {
      return res
        .status(200)
        .json({ success: data.success, message: data.message });
    }
  } catch (error) {
    next(error);
  }
};
export const order_reject = async (req, res, next) => {
  try {
    const { userId, orderId, proId } = req.body;
    console.log(typeof proId, userId, orderId);
    const productId = parseInt(proId);
    console.log(typeof productId, userId, orderId);

    const data = await reject_order(userId, productId, orderId);
    if (!data.success) {
      return res
        .status(400)
        .json({ message: data.message, success: data.success });
    }
    if (data.success) {
      return res
        .status(200)
        .json({ success: data.success, message: data.message });
    }
  } catch (error) {
    next(error);
  }
};

export const invoiceDownload = async (req, res, next) => {
  console.log("this is the admin invoice download function");
  try {
    const { orderId, userId } = req.body;
    console.log(userId, orderId);

    // Call your 'order' function to fetch data
    const orderData = await single_order(userId, orderId);

    // Check if fetching data was successful
    if (!orderData.success) {
      return res
        .status(400)
        .json({ success: false, message: "Invoice data not found" });
    }

    // Extract order details from fetched data
    const order = orderData.order;

    let addressLine = order.address.houseNo
      ? `${order.address.houseNo}, ${order.address.address}, ${order.address.landmark}`
      : `${order.address.flatNo}, ${order.address.address}, ${order.address.landmark}`;
    // Construct the invoice information dynamically
    const information = {
      client: {
        company: order.address.username, // Assuming username is the client's name
        address: `${addressLine}, ${order.address.address}, ${order.address.landmark}`,
        city: order.address.district,
        country: order.address.state,
        zip: order.address.pincode,
      },
      sender: {
        company: "E-Shop ",
        address: "Chennai,",
        city: "Tamilnadu,",
        country: "India.",
        zip: "600001",
      },
      images: {
        logo: "https://public.easyinvoice.cloud/img/logo_en_original.png",
      },
      information: {
        number: `INV-${order.id}`, // Invoice number based on order ID
        date: new Date(order.orderDate).toLocaleDateString("en-US"), // Format order date
      },
      products: order.products.map((product) => ({
        quantity: product.quantity,
        description: product.name,
        "tax-rate": 0, // Example tax rate, modify as per your requirement
        price: parseFloat(product.realprice).toFixed(2), // Format price accordingly
      })),
      bottomNotice:
        "We hope you love your purchase! Visit us again soon for more great deals.",
      settings: {
        currency: "INR",
      },
    };

    // Generate invoice PDF and send as response
    easyinvoice.createInvoice(information, function (result) {
      const pdfBuffer = Buffer.from(result.pdf, "base64");
      // Set headers for file download
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=invoice_${orderId}.pdf`
      );
      // Send the PDF as response
      res.send(pdfBuffer);
    });
  } catch (error) {
    next(error);
  }
};

// products excel export contorller function
export const products_export = async (req, res, next) => {
  try {
    console.log("this is the controller function ");
    const data = await get_products();
    if (!data.success) {
      return res
        .status(400)
        .json({ sucess: data.success, message: data.message });
    }
    console.log("one");
    const excelData = [
      [
        "ID",
        "Name",
        "Price",
        "Discount",
        "RealPrice",
        "Quantity",
        "Category",
        "Sub-Category",
        "Availability",
        "Color",
        "Size",
      ], // Header row
      ...data.products.map((product) => [
        product.product_id,
        product.product_name,
        product.product_price,
        product.product_discount,
        product.product_realprice,
        product.product_quantity,
        product.base_category_name,
        product.subcategory_name,
        product.product_published,
        product.product_color,
        product.product_size,
      ]), // Example mapping, adjust as per your product schema
    ];
    console.log("two");
    const sheetOptions = {
      "!cols": [
        { wch: 10 },
        { wch: 30 },
        { wch: 15 },
        { wch: 5 },
        { wch: 15 },
        { wch: 10 },
        { wch: 20 },
        { wch: 20 },
      ], // Adjust column widths as needed
    };
    console.log("three");
    const buffer = xlsx.build([{ name: "Products", data: excelData }], {
      sheetOptions,
    });
    console.log("four");
    // Set headers for file download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    console.log("five");
    res.setHeader("Content-Disposition", "attachment; filename=products.xlsx");
    console.log("six");
    // Send the buffer as the response
    res.status(200).send(buffer);
    console.log("seven");
  } catch (error) {
    next(error);
  }
};


export const orders_export = async (req, res, next) => {
  try {
    console.log("this is the controller function ");
    const data = await get_orders_export();
    if (!data.success) {
      return res
        .status(400)
        .json({ sucess: data.success, message: data.message });
    }
    console.log("one");
    const excelData = [
      [
        "ID",
        "Date",
        "Payment Method",
        "Payment Status",
        "Order Status",
        "Cancelled Date",
        "Total",
        "User Name",
        "User Mobile",
        "Address",
        "State",
        "Pincode",
        "Address Type",
      ], // Header row
      ...data.orders.map((product) => [
        `# ${product.id}`,
        product.orderDate,
        product.paymentMethod.toUpperCase(),
        product.paymentStatus.toUpperCase(),
        product.status.toUpperCase(),
        `-${product.cancelDate}`,
        product.total - product.subTotal,
        product.address.username,
        product.address.mobile,
        product.address.address.toUpperCase(),
        product.address.state,
        product.address.pincode,
        product.address.type,
      ]), // Example mapping, adjust as per your product schema
    ];
    console.log("two");
    const sheetOptions = {
      "!cols": [
        { wch: 10 },
        { wch: 30 },
        { wch: 15 },
        { wch: 5 },
        { wch: 15 },
        { wch: 10 },
        { wch: 20 },
        { wch: 20 },
      ], // Adjust column widths as needed
    };
    console.log("three");
    const buffer = xlsx.build([{ name: "Products", data: excelData }], {
      sheetOptions,
    });
    console.log("four");
    // Set headers for file download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    console.log("five");
    res.setHeader("Content-Disposition", "attachment; filename=products.xlsx");
    console.log("six");
    // Send the buffer as the response
    res.status(200).send(buffer);
    console.log("seven");
  } catch (error) {
    next(error);
  }
};
