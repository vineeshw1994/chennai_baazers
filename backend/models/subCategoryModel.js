import { pool } from "../config/db_connect.js";
import cloudinary from "cloudinary";

export const createSubCategory = async () => {
  try {
    const createSubCategoryTableSQL = `
      CREATE TABLE IF NOT EXISTS subcategories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        description VARCHAR(500) NOT NULL,
        brand VARCHAR(50),
        image_url VARCHAR(1000) NOT NULL,
        image_public_id VARCHAR(1000) NOT NULL,
        base_category_id INT NOT NULL,
        FOREIGN KEY (base_category_id) REFERENCES basecategory(id)
      );
    `;
    await pool.query(createSubCategoryTableSQL);
    // console.log("Subcategory table created successfully");
  } catch (error) {
    console.error("Error creating subcategory table:", error.message);
  }
};

export const subcategory_create = async (
  name,
  description,
  brand,
  baseCateId,
  file
) => {
  try {
    console.log("one", baseCateId, name, brand, description);
    const [existingCategory] = await pool.query(
      `SELECT * FROM subcategories WHERE name = ?`,
      [name]
    );
    console.log("two");
    if (existingCategory.length > 0) {
      return { success: false, message: "Category Already Exist" };
    } else {
      const cbd = await cloudinary.v2.uploader.upload(file.content);
      const image = {
        public_id: cbd.public_id,
        url: cbd.secure_url,
      };
      console.log("three");
      const [categories] = await pool.query(
        `INSERT INTO subcategories (name, description, brand,base_category_id,image_url, image_public_id) values(?,?,?,?,?,?)`,
        [name, description, brand, baseCateId, image.url, image.public_id]
      );
      return {
        success: true,
        message: "created successfully",
      };
    }
  } catch (error) {
    return { success: false, message: "Internal Error" };
  }
};

export const subcategory_edit = async (
  name,
  description,
  brand,
  baseCateId,
  cateId
) => {
  console.log(name, description, brand, baseCateId, cateId);
  console.log("this is the sub category edit model");
  try {
    const [existingCate] = await pool.query(
      `SELECT * FROM subcategories WHERE id = ?`,
      [cateId]
    );
    console.log("one");
    if (existingCate.length === 0) {
      return { success: false, message: "category not found" };
    }
    console.log("man its two");
    const [result] = await pool.query(
      `UPDATE subcategories SET name = ?, description = ?, brand = ?, base_category_id = ? WHERE id = ?`,
      [name, description, brand, baseCateId, cateId]
    );
    console.log("two");
    if (result.affectedRows > 0) {
      return {
        success: true,
        message: "Updated  Successfully",
      };
    } else {
      return { success: false, message: "Faild to update category" };
    }
  } catch (error) {
    return { success: false, message: "Internal Error" };
  }
};

export const edit_subcate_image = async (id, file) => {
  console.log("two");
  try {
    const [existingCategory] = await pool.query(
      `SELECT * FROM subcategories WHERE id = ?`,
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
      `UPDATE subcategories SET  image_url = ? , image_public_id = ?  WHERE id = ?`,
      [image.url, image.public_id, id]
    );
    if (result.affectedRows > 0) {
      return {
        success: true,
        message: " updated successfully",
      };
    } else {
      return { success: false, message: "Failed to update " };
    }
  } catch (error) {
    return { message: "Internal Error", success: false };
  }
};

export const subcategories = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;
    const [data] = await pool.query(
      `
     SELECT 
    subcategories.id,
    subcategories.name AS subcategory_name,
    subcategories.description,
    subcategories.brand,
    subcategories.image_url,
    subcategories.image_public_id,
    basecategory.name AS basecategory_name
     FROM 
    basecategory
     INNER JOIN 
    subcategories ON basecategory.id = subcategories.base_category_id
     ORDER BY 
    subcategories.id DESC
    LIMIT ? , ?

    `,
      [offset, limit]
    );

    if (data.length > 0) {
      return { success: true, category: data, message: "all categories" };
    } else {
      return { success: false, message: "No categories found" };
    }
  } catch (error) {
    return { success: false, message: "Internal Error" };
  }
};
export const subcategories_all = async () => {
  try {
    const [data] = await pool.query(
      `
     SELECT 
    subcategories.id,
    subcategories.name AS subcategory_name,
    subcategories.description,
    subcategories.brand,
    subcategories.image_url,
    subcategories.image_public_id,
    basecategory.name AS basecategory_name
     FROM 
    basecategory
     INNER JOIN 
    subcategories ON basecategory.id = subcategories.base_category_id
     ORDER BY 
    subcategories.id DESC
   
    `
    );

    if (data.length > 0) {
      return { success: true, category: data, message: "all categories" };
    } else {
      return { success: false, message: "No categories found" };
    }
  } catch (error) {
    return { success: false, message: "Internal Error" };
  }
};

export const getSubCategoryById = async (id) => {
  try {
    const [categories] = await pool.query(
      `SELECT * FROM subcategories WHERE id = ?`,
      [id]
    );

    if (categories.length > 0) {
      return {
        success: true,
        category: categories[0],
        message: " categories",
      };
    } else {
      return { success: false, message: "No categories " };
    }
  } catch (error) {
    return { success: false, message: "Internal Error" };
  }
};
