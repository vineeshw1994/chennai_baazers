import { pool } from "../config/db_connect.js";

export const createCart = async () => {
  try {
    const createCartTableSQL = `
    CREATE TABLE IF NOT EXISTS cart(
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT NOT NULL,
      items JSON,
      total DECIMAL(10, 2),
      discount DECIMAL(10, 2), 
      FOREIGN KEY (userId) REFERENCES users(id)
  ) 
`;
    await pool.query(createCartTableSQL);
    // console.log('cart table created');
  } catch (error) {
    console.error("error creating carttable", error);
  }
};

export const add_to_cart = async (proId, userId) => {
  console.log("this is a add to cart model");
  try {
    // Check if the product exists
    let [products] = await pool.query(`SELECT * FROM products WHERE id = ?`, [
      proId,
    ]);
    let product = products[0];
    console.log(product);

    // Fetch cart data for the user
    const [cartData] = await pool.query(`SELECT * FROM cart WHERE userId = ?`, [
      userId,
    ]);

    if (cartData.length > 0) {
      // If cart exists for the user
      // console.log("one",cartData[0]);
      const cartItem = cartData[0];
      console.log(cartData);
      cartData.total = 0;
      console.log(cartData);
      let items =
        typeof cartItem.items === "string"
          ? JSON.parse(cartItem.items)
          : cartItem.items;

      // Find the index of the product in the items array
      const matchingItems = items.find((item) => item.productId === proId);

      if (matchingItems) {
        // Product already exists in the cart, update its quantity
        console.log(matchingItems.quantity);
        matchingItems.quantity += 1;
      } else {
        // Product doesn't exist in the cart, add it to the items array
        items.push({
          productId: product.id,
          quantity: 1, // Set initial quantity to 1
          name: product.name,
          price: product.price,
          realprice: product.realprice,
          description: product.description,
          discount: product.discount,
          image: product.images[0].url,
        });
      }

      let total = 0;
      let discount = 0;

      // Loop through each item in the cart
      items.forEach((item) => {
        // Calculate total for the item (price * quantity)
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        // Calculate discount for the item (discount amount)
        const itemDiscount = (item.price * item.quantity * item.discount) / 100;
        discount += itemDiscount;
      });

      console.log(total, discount);

      // Convert the updated items array back to JSON
      items = JSON.stringify(items);

      // Update the items JSON in the cart table
      await pool.query(
        `UPDATE cart SET items = ?, total = ?, discount = ? WHERE userId = ?`,
        [items, total, discount, userId]
      );
      const [cartCount] = await pool.query(
        `SELECT * FROM cart WHERE userId = ?`,
        [userId]
      );

      return {
        success: true,
        message: "Added Successfully",
        cartCount: cartCount[0],
      };
    } else {
      // Cart doesn't exist for the user, create a new cart and add the product to it
      let total = 0;
      let discount = 0;
      const items = [
        {
          productId: product.id,
          quantity: 1, // Set initial quantity to 1
          name: product.name,
          price: product.price,
          realprice: product.realprice,
          description: product.description,
          discount: product.discount,
          image: product.images[0].url,
        },
      ];

      items.forEach((item) => {
        // Calculate total for the item (price * quantity)
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        // Calculate discount for the item (discount amount)
        const itemDiscount = itemTotal * (item.discount / 100); // Assuming discount is a percentage
        discount += itemDiscount;
      });

      // After looping through all items, you have the total and discount for the entire cart
      console.log("Total:", total);
      console.log("Discount:", discount);
      // Convert the items array to JSON
      const itemsJSON = JSON.stringify(items);

      // Insert a new cart for the user
      await pool.query(
        `INSERT INTO cart (userId, items,total,discount) VALUES (?, ?, ?, ?)`,
        [userId, itemsJSON, total, discount]
      );
      const [cartCount] = await pool.query(
        `SELECT * FROM cart WHERE userId = ?`,
        [userId]
      );

      return {
        success: true,
        message: "Added Successfully",
        cartCount: cartCount[0],
      };
    }
  } catch (error) {
    console.error("Error adding to cart: ", error.message);
    return {
      success: false,
      message: "An error occurred while adding the product to cart",
    };
  }
};

export const get_cart_items = async (userId) => {
  try {
    const [cartData] = await pool.query(`SELECT * FROM cart WHERE userId = ?`, [
      userId,
    ]);

    if (cartData.length > 0) {
      return { success: true, message: "All items", cartData: cartData[0] };
    } else {
      return { success: false, message: "Cart is empty" };
    }
  } catch (error) {
    console.error("error getting cart items");
  }
};

export const cart_item_remove = async (proId, userId) => {
  try {
    // Fetch cart data for the user
    const [cartData] = await pool.query(`SELECT * FROM cart WHERE userId = ?`, [
      userId,
    ]);

    if (cartData.length > 0) {
      const cartItem = cartData[0];
      let items =
        typeof cartItem.items === "string"
          ? JSON.parse(cartItem.items)
          : cartItem.items;

      // Find the index of the item to be removed
      const removedIndex = items.findIndex((item) => item.productId === proId);

      if (removedIndex !== -1) {
        // Remove the item from the items array
        items.splice(removedIndex, 1);

        // Recalculate total and discount
        let total = 0;
        let discount = 0;

        items.forEach((item) => {
          const itemTotal = item.price * item.quantity;
          total += itemTotal;

          const itemDiscount =
            (item.price * item.quantity * item.discount) / 100;
          discount += itemDiscount;
        });

        // Convert the updated items array back to JSON
        const itemsJSON = JSON.stringify(items);

        // Update the items JSON, total, and discount in the cart table
        await pool.query(
          `UPDATE cart SET items = ?, total = ?, discount = ? WHERE userId = ?`,
          [itemsJSON, total, discount, userId]
        );

        return {
          success: true,
          message: "Removed successfully",
        };
      } else {
        return { success: false, message: "Product not found in cart" };
      }
    } else {
      return { success: false, message: "No cart data found for the user" };
    }
  } catch (error) {
    console.error("Error removing cart items", error.message);
    return {
      success: false,
      message: "An error occurred while removing the product from cart",
    };
  }
};

export const quantity_update = async (proId, userId) => {
  try {
    console.log("one");
    let [products] = await pool.query(`SELECT * FROM products WHERE id = ?`, [
      proId,
    ]);
    let product = products[0];
    console.log("two");
    const [cartData] = await pool.query(
      `SELECT * FROM cart WHERE userId = ? `,
      [userId]
    );
    if (cartData.length > 0) {
      console.log("three");
      const cartItem = cartData[0];
      let items =
        typeof cartItem.items === "string"
          ? JSON.parse(cartItem.items)
          : cartItem.items;
      console.log("four");
      // Find the index of the product in the items array
      const matchingItems = items.find((item) => item.productId === proId);
      if (matchingItems.quantity < product.quantity) {
        matchingItems.quantity += 1;
      } else {
        return { success: false, message: "Maxium Quantity Reached" };
      }
      // Recalculate total and discount
      let total = 0;
      let discount = 0;

      items.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemDiscount = (item.price * item.quantity * item.discount) / 100;
        discount += itemDiscount;
      });

      // Convert the updated items array back to JSON
      const itemsJSON = JSON.stringify(items);
      console.log("five");
      // Update the items JSON, total, and discount in the cart table
      await pool.query(
        `UPDATE cart SET items = ?, total = ?, discount = ? WHERE userId = ?`,
        [itemsJSON, total, discount, userId]
      );

      return {
        success: true,
        message: "updated successfully",
      };
    } else {
      return { success: false, message: "Product not found" };
    }
  } catch (errro) {
    console.error("error increasing quantity", errro.message);
  }
};

export const quantity_reduce = async (proId, userId, count) => {
  try {
    let [products] = await pool.query(`SELECT * FROM products WHERE id = ?`, [
      proId,
    ]);
    let product = products[0];
    const [cartData] = await pool.query(`SELECT * FROM cart WHERE userId = ?`, [
      userId,
    ]);
    if (cartData.length > 0) {
      const cartItem = cartData[0];
      let items =
        typeof cartItem.items === "string"
          ? JSON.parse(cartItem.items)
          : cartItem.items;

      // Find the index of the product in the items array
      const matchingItems = items.find((item) => item.productId === proId);
      if (matchingItems.quantity && matchingItems.quantity !== 1) {
        matchingItems.quantity -= 1;
      } else {
        return { success: false, message: "Minimum Quantity" };
      }
      // Recalculate total and discount
      let total = 0;
      let discount = 0;

      items.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemDiscount = (item.price * item.quantity * item.discount) / 100;
        discount += itemDiscount;
      });

      // Convert the updated items array back to JSON
      const itemsJSON = JSON.stringify(items);

      // Update the items JSON, total, and discount in the cart table
      await pool.query(
        `UPDATE cart SET items = ?, total = ?, discount = ? WHERE userId = ?`,
        [itemsJSON, total, discount, userId]
      );

      return {
        success: true,
        message: "Reduced ",
      };
    } else {
      return { success: false, message: "Product not found" };
    }
  } catch (errro) {
    console.error("error increasing quantity", errro.message);
  }
};
