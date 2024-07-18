import { pool } from "../config/db_connect.js";
import Razorpay from "razorpay";
export const createOrder = async () => {
  try {
    const createOrderTableSQL = `
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        orderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        total DECIMAL(10, 2),
        subTotal DECIMAL(10, 2),
        level VARCHAR(50),
        paymentMethod VARCHAR(20),
        paymentStatus VARCHAR(20),
        returnDate TIMESTAMP,
        cancelDate TIMESTAMP,
        deliveryDate TIMESTAMP,
        items INT,
        status ENUM('processing', 'shipped', 'inRoute', 'delivered', 'canceled', 'return', 'pending') DEFAULT 'processing',
        products JSON,
        address JSON,
        orderId VARCHAR(100),
        paymentId VARCHAR(100),
        FOREIGN KEY (userId) REFERENCES users(id)
      )
    `;

    // Assuming pool.query is correctly defined and connected to your database
    await pool.query(createOrderTableSQL);
    // console.log("Orders table created successfully.");
  } catch (error) {
    console.error("Error creating orders table:", error);
  }
};

const razorpay = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
});

export const create_order = async (userId, grandTotal, method, addressId) => {
  try {
    const [address] = await pool.query(
      `SELECT * FROM address WHERE user_id = ? AND id = ?`,
      [userId, addressId]
    );
    const userAddress = address.length > 0 ? address[0] : null;
    if (!userAddress) {
      return {
        success: false,
        message: "Address not found for the given user and addressId",
      };
    }
    const [cartData] = await pool.query(`SELECT * FROM cart WHERE userID = ?`, [
      userId,
    ]);
    if (cartData.length > 0) {
      const cartItem = cartData[0];
      let items =
        typeof cartItem.items === "string"
          ? JSON.parse(cartItem.items)
          : cartItem.items;

      let userAdd =
        typeof userAddress === "string" ? JSON.parse(userAddress) : userAddress;

      const address = userAdd;
      const products = items.map((item) => ({
        ...item,
        status: "processing",
        level: "processing",
        returnDate: "",
        cancelDate: "",
        deliveryDate: "",
      }));
      const total = cartItem.total;
      const subTotal = cartItem.discount;
      const paymentMethod = method;
      const status = "processing";
      const item = items.length;
      const level = "processing";
      const paymentStatus = "unpaid";

      if (method === "online") {
        console.log("online");
        if (!total) {
          return { success: false, message: "total amount is required" };
        }
        console.log("two");
        const options = {
          amount: grandTotal * 100, // amount in smallest currency unit
          currency: "INR",
        };
        const order = await razorpay.orders.create(options);
        const orderId = order.id;
        return {
          success: true,
          orderId: orderId,
          addressId: addressId,
          method: method,
        };
      }

      if (method === "cash") {
        // Insert order into the database
        const insertOrderSQL = `
           INSERT INTO orders (userId, total, subTotal, paymentMethod, status, items,level, products, address,paymentStatus)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         `;
        const insertOrderValues = [
          userId,
          total,
          subTotal,
          paymentMethod,
          status,
          item,
          level,
          JSON.stringify(products),
          JSON.stringify(address),
          paymentStatus,
        ];

        await pool.query(insertOrderSQL, insertOrderValues);

        // Clear the cart after successful order creation
        await clearUserCart(userId);

        // Decrease product quantities after order creation (assuming you have a function for this)
        await decreaseProductQuantities(products);

        return { success: true, message: "Order created successfully" };
      }
    } else {
      return { success: false, message: "Select the products" };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const success_order = async (
  userId,
  orderId,
  paymentId,
  addressId,
  method
) => {
  console.log("this is the online order model");
  try {
    console.log("one");
    const [address] = await pool.query(
      `SELECT * FROM address WHERE user_id = ? AND id = ?`,
      [userId, addressId]
    );
    console.log("one");
    const userAddress = address.length > 0 ? address[0] : null;
    if (!userAddress) {
      return {
        success: false,
        message: "Address not found for the given user and addressId",
      };
    }
    console.log("two");
    let userAdd =
      typeof userAddress === "string" ? JSON.parse(userAddress) : userAddress;

    const [cartData] = await pool.query(`SELECT * FROM cart WHERE userID = ?`, [
      userId,
    ]);
    if (cartData.length > 0) {
      const cartItem = cartData[0];
      let items =
        typeof cartItem.items === "string"
          ? JSON.parse(cartItem.items)
          : cartItem.items;

      console.log("three");

      const products = items.map((item) => ({
        ...item,
        status: "processing",
        level: "processing",
        returnDate: "",
        cancelDate: "",
        deliveryDate: "",
      }));
      const total = cartItem.total;
      const subTotal = cartItem.discount;
      const paymentMethod = method;
      const status = "processing";
      const item = items.length;
      const level = "processing";
      const paymentStatus = "paid";

      console.log("four");
      const insertOrderSQL = `
      INSERT INTO orders ( total, subTotal, paymentMethod, status, items,level, products,paymentId,address,userId, orderId,paymentStatus)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
      const insertOrderValues = [
        total,
        subTotal,
        paymentMethod,
        status,
        item,
        level,
        JSON.stringify(products),
        paymentId,
        JSON.stringify(userAdd),
        userId,
        orderId,
        paymentStatus,
      ];
      console.log(insertOrderValues);
      console.log("five");
      await pool.query(insertOrderSQL, insertOrderValues);
      // Clear the cart after successful order creation
      await clearUserCart(userId);

      // Decrease product quantities after order creation (assuming you have a function for this)
      await decreaseProductQuantities(products);
      return { success: true, message: "Order created successfully" };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false, message: "order not successfully" };
  }
};

export const orders = async (userId, page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;
    const [orders] = await pool.query(
      `SELECT * FROM orders WHERE userId = ? LIMIT ?,? `,
      [userId, offset, limit]
    );
    console.log(orders);
    if (orders.length > 0) {
      return { success: true, message: "all orders", orders: orders };
    } else {
      return { success: false, message: "No Orders " };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// GET THE SINGLE ORDER
export const single_order = async (userId, orderId) => {
  try {
    const [orders] = await pool.query(
      `SELECT * FROM orders WHERE userId = ? AND id = ?`,
      [userId, orderId]
    );

    if (orders.length === 0) {
      return { success: false, message: "Order not found" };
    }
    const order = orders[0];
    return { success: true, order };
  } catch (error) {
    return { success: true, message: error.message };
  }
};

export const single_order_product_delete = async (userId, proId, orderId) => {
  try {
    console.log("this is the order model");
    const [orders] = await pool.query(
      `SELECT * FROM orders WHERE userId = ? AND id = ?`,
      [userId, orderId]
    );
    if (orders.length > 0) {
      const order = orders[0];
      console.log(order.products, "this is the orders");

      // Find index of product to cancel
      const productIndex = order.products.find(
        (product) => product.productId === proId
      );

      console.log("Product index:", productIndex);

      if (productIndex) {
        productIndex.status = "cancelled";
        productIndex.cancelDate = new Date().toISOString().slice(0, 10);
      }
      const updatedProducts = JSON.stringify(order.products);
      console.log("Updated products:", updatedProducts);

      const updateQuery = `
      UPDATE orders 
      SET products = ?
      WHERE id = ?
    `;
      await pool.query(updateQuery, [updatedProducts, orderId]);

      return { success: true, message: "Order Canceled" };
    } else {
      return { success: false, message: "Order Not Found" };
    }
  } catch (error) {
    return { success: true, message: error.message };
  }
};

//SINGLE ORDER RETURN
export const single_order_product_return = async (userId, proId, orderId) => {
  try {
    console.log("this is the return order model");
    const [orders] = await pool.query(
      `SELECT * FROM orders WHERE userId = ? AND id = ?`,
      [userId, orderId]
    );
    if (orders.length > 0) {
      const order = orders[0];
      console.log(order.products, "this is the orders");

      // Find index of product to cancel
      const productIndex = order.products.find(
        (product) => product.productId === proId
      );

      console.log("Product index:", productIndex);

      if (productIndex) {
        productIndex.status = "return";
        productIndex.level = "delivered";
        productIndex.returnDate = new Date().toISOString().slice(0, 10);
      }
      const updatedProducts = JSON.stringify(order.products);
      console.log("Updated products:", updatedProducts);

      const updateQuery = `
      UPDATE orders 
      SET products = ?
      WHERE id = ?
    `;
      await pool.query(updateQuery, [updatedProducts, orderId]);

      return { success: true, message: "Return Successfully" };
    } else {
      return { success: false, message: "Order Not Found" };
    }
  } catch (error) {
    return { success: true, message: error.message };
  }
};

const clearUserCart = async (userId) => {
  const clearCartSQL = `
    DELETE FROM cart
    WHERE userId = ?
  `;
  await pool.query(clearCartSQL, [userId]);
};

const decreaseProductQuantities = async (products) => {
  for (const product of products) {
    const decreaseQuantitySQL = `
      UPDATE products
      SET quantity = quantity - ?
      WHERE id = ?
    `;
    await pool.query(decreaseQuantitySQL, [
      product.quantity,
      product.productId,
    ]);
  }
};

///////// admin models //////////////

export const admin_orders = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;
    const [orders] = await pool.query(`SELECT * FROM orders LIMIT ?, ? `, [
      offset,
      limit,
    ]);
    if (orders.length > 0) {
      return { success: true, orders: orders };
    } else {
      return { success: false, message: "No orders" };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const single_order_status = async (userId, proId, orderId, status) => {
  try {
    const [orders] = await pool.query(
      `SELECT * FROM orders WHERE userId = ? AND id = ?`,
      [userId, orderId]
    );
    if (orders.length > 0) {
      const order = orders[0];
      console.log(order.products, "this is the orders");

      // Find index of product to cancel
      const productIndex = order.products.find(
        (product) => product.productId === proId
      );

      console.log("Product index:", productIndex);
      if (status === "delivered") {
        if (productIndex) {
          productIndex.status = status;
          productIndex.deliveryDate = new Date().toISOString().slice(0, 10);
        }
      } else {
        if (productIndex) {
          productIndex.status = status;
        }
      }

      const updatedProducts = JSON.stringify(order.products);
      console.log("Updated products:", updatedProducts);

      const updateQuery = `
      UPDATE orders 
      SET products = ?
      WHERE id = ?
    `;
      await pool.query(updateQuery, [updatedProducts, orderId]);

      return { success: true, message: "Status Changed" };
    } else {
      return { success: false, message: "Order Not Found" };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const whole_order_status = async (userId, orderId, status) => {
  console.log("this is the whole order change model");
  try {
    const [orders] = await pool.query(
      `SELECT * FROM orders WHERE userId = ? AND id = ?`,
      [userId, orderId]
    );

    if (orders.length > 0) {
      const order = orders[0];

      // Update status and relevant dates
      if (status === "canceled") {
        order.cancelDate = new Date().toISOString().slice(0, 10); // Update cancelDate to current date
        order.status = status;
      } else if (status === "delivered") {
        order.deliveryDate = new Date().toISOString().slice(0, 10); // Update deliveryDate to current date
        order.status = status;
      } else {
        order.status = status; // Update status for other statuses
      }

      const updateQuery = `
        UPDATE orders 
        SET status = ?, 
            cancelDate = ?,
            deliveryDate = ?
        WHERE id = ?
      `;

      const updateValues = [
        order.status,
        order.cancelDate,
        order.deliveryDate,
        orderId,
      ];

      await pool.query(updateQuery, updateValues);

      return { success: true, message: "Status Changed" };
    } else {
      return { success: false, message: "Order Not Found" };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// ACCEPT ORDER return
export const accept_order = async (userId, proId, orderId) => {
  try {
    console.log("this is the accept order model");
    const [orders] = await pool.query(
      `SELECT * FROM orders WHERE userId = ? AND id = ?`,
      [userId, orderId]
    );
    if (orders.length > 0) {
      const order = orders[0];
      console.log(order.products, "this is the orders");

      // Find index of product to cancel
      const productIndex = order.products.find(
        (product) => product.productId === proId
      );

      console.log("Product index:", productIndex);

      if (productIndex) {
        productIndex.status = "ReturnAccepted";
        productIndex.returnDate = new Date().toISOString().slice(0, 10);
      }
      const updatedProducts = JSON.stringify(order.products);
      console.log("Updated products:", updatedProducts);

      const updateQuery = `
      UPDATE orders 
      SET products = ?
      WHERE id = ?
    `;
      await pool.query(updateQuery, [updatedProducts, orderId]);

      return { success: true, message: "Accepted Successfully" };
    } else {
      return { success: false, message: "Order Not Found" };
    }
  } catch (error) {
    return { success: true, message: error.message };
  }
};
// REJECT ORDER RETURN
export const reject_order = async (userId, proId, orderId) => {
  try {
    console.log("this is the accept order model");
    const [orders] = await pool.query(
      `SELECT * FROM orders WHERE userId = ? AND id = ?`,
      [userId, orderId]
    );
    if (orders.length > 0) {
      const order = orders[0];
      console.log(order.products, "this is the orders");

      // Find index of product to cancel
      const productIndex = order.products.find(
        (product) => product.productId === proId
      );

      console.log("Product index:", productIndex);

      if (productIndex) {
        productIndex.status = "ReturnRejected";
        productIndex.returnDate = new Date().toISOString().slice(0, 10);
      }
      const updatedProducts = JSON.stringify(order.products);
      console.log("Updated products:", updatedProducts);

      const updateQuery = `
      UPDATE orders 
      SET products = ?
      WHERE id = ?
    `;
      await pool.query(updateQuery, [updatedProducts, orderId]);

      return { success: true, message: "Rejected Successfully" };
    } else {
      return { success: false, message: "Order Not Found" };
    }
  } catch (error) {
    return { success: true, message: error.message };
  }
};

export const get_products = async () => {
  console.log("this is the get_products model");

  try {
    const [products] = await pool.query(
      `SELECT
    bc.id AS base_category_id,
    bc.name AS base_category_name,
    sc.id AS subcategory_id,
    sc.name AS subcategory_name,
    p.id AS product_id,
    p.name AS product_name,
    p.description AS product_description,
    p.price AS product_price,
    p.realprice AS product_realprice,
    p.quantity AS product_quantity,
    p.discount AS product_discount,
    p.color AS product_color,
    p.size AS product_size,
    p.published AS product_published,
    p.iswishlist AS product_iswishlist,
    p.images AS product_images
  FROM
    basecategory bc
    JOIN subcategories sc ON bc.id = sc.base_category_id
    JOIN products p ON sc.id = p.sub_category_id
  GROUP BY
    bc.id, bc.name, sc.id, sc.name, p.id, p.name, p.description, p.price, p.realprice, p.quantity, p.discount
  ORDER BY
    bc.id, sc.id, p.id
`
    );
    if (products.length > 0) {
      return { success: true, message: "all products", products: products };
    } else {
      return { success: false, message: "No products found" };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const get_orders_export = async () => {
  try {
    const [orders] = await pool.query(`SELECT * FROM orders`);
    if (orders.length > 0) {
      return { success: true, orders: orders };
    } else {
      return { success: false, message: "No orders" };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};
