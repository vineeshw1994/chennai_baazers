import { pool } from "../config/db_connect.js";

export const createWhishlist = async () => {
  try {
    const createWhishListTableSQL = `
        CREATE TABLE IF NOT EXISTS wishlist (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userId INT NOT NULL,
            items JSON,
            FOREIGN KEY (userId) REFERENCES users(id)
        )
        `;
    await pool.query(createWhishListTableSQL);
    // console.log('whish list table created');
  } catch (error) {
    console.error("error create whishlist table", error);
  }
};

export const add_wishlist = async (proId, userId) => {
  console.log(proId,userId)
  console.log('add wishlist model')
  try {
    // Check if the product exists
    const [products] = await pool.query(`SELECT * FROM products WHERE id = ?`, [
      proId,
    ]);

    if (products.length === 0) {
      return { success: false, message: "Product not found" };
    }

    const product = products[0];
    const newWishlistStatus = product.iswishlist === "false" ? "true" : "false";

    // Update product's iswishlist status
    await pool.query(`UPDATE products SET iswishlist = ? WHERE id = ?`, [
      newWishlistStatus,
      proId,
    ]);

    // Fetch wishlist data for the user
    const [wishlistData] = await pool.query(
      `SELECT * FROM wishlist WHERE userId = ?`,
      [userId]
    );

    if (wishlistData.length > 0) {
      // If wishlist exists for the user, update it
      const listItem = wishlistData[0];
      let items =
        typeof listItem.items === "string"
          ? JSON.parse(listItem.items)
          : listItem.items;

      // Check if the product already exists in the wishlist
      const matchingItem = items.find((item) => item.productId === proId);

      if (matchingItem) {
        return { success: false, message: "Product Already in Wishlist" };
      } else {
        // Add the product to the wishlist items array
        items.push({
          productId: product.id,
          quantity: product.quantity,
          name: product.name,
          price: product.price,
          realprice: product.realprice,
          description: product.description,
          discount: product.discount,
          iswishlist: product.iswishlist,
          image: product.images.length > 0 ? product.images[0].url : null,
        });

        // Update items JSON in the wishlist table
        await pool.query(`UPDATE wishlist SET items = ? WHERE userId = ?`, [
          JSON.stringify(items),
          userId,
        ]);
      }
    } else {
      // If no wishlist exists, create a new one
      const newItems = [
        {
          productId: product.id,
          quantity: product.quantity,
          name: product.name,
          price: product.price,
          realprice: product.realprice,
          description: product.description,
          discount: product.discount,
          iswishlist: product.iswishlist,
          image: product.images.length > 0 ? product.images[0].url : null,
        },
      ];

      // Insert new wishlist for the user
      await pool.query(`INSERT INTO wishlist (userId, items) VALUES (?, ?)`, [
        userId,
        JSON.stringify(newItems),
      ]);
    }

    return { success: true, message: "Product added to wishlist successfully" };
  } catch (error) {
    console.error("Error adding to wishlist: ", error.message);
    return {
      success: false,
      message: "An error occurred while adding the product to wishlist",
    };
  }
};

export const get_wishlist_items = async (userId) => {
  console.log("this is the wishlist model");
  try {
    const [wishlistData] = await pool.query(
      `SELECT * FROM wishlist WHERE userId = ?`,
      [userId]
    );

    if (wishlistData.length > 0) {
      return { success: true, message: "All items", items: wishlistData };
    } else {
      return { success: false, message: "wishlist is empty" };
    }
  } catch (error) {
    console.error("error getting wishlist items");
  }
};

export const wishlist_item_remove = async (proId, userId) => {
  try {
    // Update product's iswishlist status to "false"
    await pool.query(`UPDATE products SET iswishlist = ? WHERE id = ?`, [
      "false",
      proId,
    ]);

    // Fetch wishlist data for the user
    const [wishlistData] = await pool.query(
      `SELECT * FROM wishlist WHERE userId = ?`,
      [userId]
    );

    if (wishlistData.length > 0) {
      const listItem = wishlistData[0];
      let items =
        typeof listItem.items === "string"
          ? JSON.parse(listItem.items)
          : listItem.items;

      // Find the index of the item to be removed
      const removedIndex = items.findIndex((item) => item.productId === proId);

      if (removedIndex !== -1) {
        // Remove the item from the items array
        items.splice(removedIndex, 1);

        // Convert the updated items array back to JSON
        const itemsJSON = JSON.stringify(items);

        // Update the items JSON in the wishlist table
        await pool.query(`UPDATE wishlist SET items = ? WHERE userId = ?`, [
          itemsJSON,
          userId,
        ]);

        return {
          success: true,
          message: " Removed successfully",
        };
      } else {
        return { success: false, message: "Product not found in wishlist" };
      }
    } else {
      return { success: false, message: "No wishlist data found for the user" };
    }
  } catch (error) {
    console.error("Error removing wishlist item:", error.message);
    return {
      success: false,
      message: "An error occurred while removing the product from wishlist",
    };
  }
};
