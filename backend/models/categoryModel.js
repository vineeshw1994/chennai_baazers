import { pool } from "../config/db_connect.js";
import cloudinary from "cloudinary";

export const createCategory = async () => {
  try {
    const createBaseCategoryTableSQL = `
    CREATE TABLE IF NOT EXISTS basecategory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(500) NOT NULL,
    image_url VARCHAR(1000) NOT NULL,
    image_public_id VARCHAR(1000) NOT NULL)
`;
    await pool.query(createBaseCategoryTableSQL);
    // console.log('category table created successfully');
  } catch (error) {
    console.error("error creating category table", error);
  }
};

// CREATE CATEGORY

export const createCat = async (catname, description, file) => {
  try {
    const [data] = await pool.query(
      `SELECT * FROM basecategory WHERE name = ?`,
      [catname]
    );
    if (data.length > 0) {
      return { success: false, message: "Category already exist" };
    } else {
      console.log("tell me why");
      const cbd = await cloudinary.v2.uploader.upload(file.content);
      const image = {
        public_id: cbd.public_id,
        url: cbd.secure_url,
      };
      const [category] = await pool.query(
        `INSERT INTO basecategory (name, description, image_url, image_public_id) VALUES (?, ?, ?, ?)`,
        [catname, description, image.url, image.public_id]
      );

      return {
        success: true,
        message: "created successfully",
      };
    }
  } catch (error) {
    console.error("category create error ", error);
    return { success: false, message: "Internal Error" };
  }
};

export const editCategoryImage = async (id, file) => {
  console.log("two");
  try {
    const [existingCategory] = await pool.query(
      `SELECT * FROM basecategory WHERE id = ?`,
      [id]
    );
    console.log(existingCategory[0]);
    if (existingCategory.length === 0) {
      return { success: false, message: "Category not found" };
    }
    console.log("three");
    await cloudinary.v2.uploader.destroy(existingCategory[0].image_public_id);
    console.log("four");
    const cbd = await cloudinary.v2.uploader.upload(file.content);
    const image = {
      public_id: cbd.public_id,
      url: cbd.secure_url,
    };
    console.log("five");

    // Update the category
    const [result] = await pool.query(
      `UPDATE basecategory SET  image_url = ? , image_public_id = ?  WHERE id = ?`,
      [image.url, image.public_id, id]
    );
    if (result.affectedRows > 0) {
      // Fetch the updated category

      return {
        success: true,
        message: "Image updated successfully",
      };
    } else {
      return { success: false, message: "Failed to update " };
    }
  } catch (error) {
    return { message: "Internal Error", success: false };
  }
};
export const editCategory = async (id, name, description) => {
  console.log("two");
  try {
    const [existingCategory] = await pool.query(
      `SELECT * FROM basecategory WHERE id = ?`,
      [id]
    );
    console.log(existingCategory[0]);
    if (existingCategory.length === 0) {
      return { success: false, message: "Category not found" };
    }
    console.log("hello man");
    // Update the category
    const [result] = await pool.query(
      `UPDATE basecategory SET name = ?,description = ?  WHERE id = ?`,
      [name, description, id]
    );
    console.log("updated");
    if (result.affectedRows > 0) {
      // Fetch the updated category

      return {
        success: true,
        message: "updated successfully",
      };
    } else {
      return { success: false, message: "Failed to update " };
    }
  } catch (error) {
    return { message: "Internal Error", success: false };
  }
};

export const categories = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;
    const [categories] = await pool.query(
      `SELECT * FROM basecategory ORDER BY id DESC LIMIT ?, ?`,
      [offset, limit]
    );
    console.log(categories);
    if (categories.length > 0) {
      return {
        success: true,
        category: categories,
        message: "All categories",
      };
    } else {
      return { success: false, message: "No categories " };
    }
  } catch (error) {
    console.error("error on get categories", error);
  }
};
export const all_categories = async () => {
  try {
    const [categories] = await pool.query(
      `SELECT * FROM basecategory ORDER BY id DESC `
    );
    console.log(categories);
    if (categories.length > 0) {
      return {
        success: true,
        category: categories,
        message: "All categories",
      };
    } else {
      return { success: false, message: "No categories " };
    }
  } catch (error) {
    console.error("error on get categories", error);
  }
};

export const getCategoryById = async (id) => {
  try {
    const [categories] = await pool.query(
      `SELECT * FROM basecategory WHERE id = ?`,
      [id]
    );

    if (categories.length > 0) {
      return {
        success: true,
        category: categories[0],
        message: "All categories",
      };
    } else {
      return { success: false, message: "No categories " };
    }
  } catch (error) {
    return { success: false, message: "Internal Error" };
  }
};
