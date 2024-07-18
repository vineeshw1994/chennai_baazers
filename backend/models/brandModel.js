import { pool } from "../config/db_connect.js";
import cloudinary from "cloudinary";

export const brandTable = async () => {
  try {
    const createBrandTableSQL = `
    CREATE TABLE IF NOT EXISTS brand (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      published VARCHAR(30) NOT NULL, 
      description VARCHAR(500) NOT NULL,
      image_url VARCHAR(1000) NOT NULL,
      image_public_id VARCHAR(1000) NOT NULL,
      UNIQUE KEY (name)
    )`;
    await pool.query(createBrandTableSQL);
    // console.log("Brand table created successfully");
  } catch (error) {
    console.error("Error creating brand table", error);
  }
};

export const addBrand = async (brandName, description, activity, file) => {
  try {
    console.log("one");
    const [data] = await pool.query(`SELECT * FROM brand WHERE name = ?`, [
      brandName,
    ]);
    if (data.length > 0) {
      return { success: false, message: "Brand already exist" };
    } else {
      const cbd = await cloudinary.v2.uploader.upload(file.content);
      const image = {
        public_id: cbd.public_id,
        url: cbd.secure_url,
      };
      console.log("two");
      const [brand] = await pool.query(
        `INSERT INTO brand (name, description, image_url, image_public_id, published) VALUES (?, ?, ?, ?,?)`,
        [brandName, description, image.url, image.public_id, activity]
      );
      console.log("three");

      return {
        success: true,
        message: "created successfully",
      };
    }
  } catch (error) {
    console.error("brand create error ", error);
    return { success: false, message: "Internal Error" };
  }
};

export const editBrand = async (id, name, description, published) => {
  console.log("one");
  try {
    const [existingCategory] = await pool.query(
      `SELECT * FROM brand WHERE id = ?`,
      [id]
    );
    if (existingCategory.length === 0) {
      return { success: false, message: "brand not found" };
    }
    console.log("two");
    // Update the brand
    const [result] = await pool.query(
      `UPDATE brand SET name = ?,description = ?, published = ?  WHERE id = ?`,
      [name, description, published, id]
    );
    console.log("three");
    if (result.affectedRows > 0) {
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

export const editBrand_Image = async (id, file) => {
  try {
    console.log("one");
    const [existingBrand] = await pool.query(
      `SELECT * FROM brand WHERE id = ?`,
      [id]
    );
    console.log("two", existingBrand[0]);
    if (existingBrand.length === 0) {
      return { success: false, message: "brand not found" };
    }
    console.log("three");
    await cloudinary.v2.uploader.destroy(existingBrand[0].image_public_id);
    const cbd = await cloudinary.v2.uploader.upload(file.content);
    const image = {
      public_id: cbd.public_id,
      url: cbd.secure_url,
    };
    console.log("four");
    // Update the brand image
    const [result] = await pool.query(
      `UPDATE brand SET image_url = ?, image_public_id = ?  WHERE id = ?`,
      [image.url, image.public_id, id]
    );
    console.log("five");
    if (result.affectedRows > 0) {
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

// Function to fetch brands from the database with pagination
export const brands = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;
    console.log(offset);
    const [brands] = await pool.query(`SELECT * FROM brand LIMIT ?, ?`, [
      offset,
      limit,
    ]);

    if (brands.length > 0) {
      return {
        success: true,
        brand: brands,
        message: "All brands",
      };
    } else {
      return { success: false, message: "No brands found" };
    }
  } catch (error) {
    console.error("Error on fetching brands:", error);
    throw new Error(error.message);
  }
};
export const brands_all = async () => {
  try {
    const [brands] = await pool.query(`SELECT * FROM brand `);

    if (brands.length > 0) {
      return {
        success: true,
        brand: brands,
        message: "All brands",
      };
    } else {
      return { success: false, message: "No brands found" };
    }
  } catch (error) {
    console.error("Error on fetching brands:", error);
    throw new Error(error.message);
  }
};

export const getBrandById = async (id) => {
  try {
    const [brands] = await pool.query(`SELECT * FROM brand WHERE id = ?`, [id]);

    if (brands.length > 0) {
      return {
        success: true,
        brand: brands[0],
        message: "single brand",
      };
    } else {
      return { success: false, message: "No brands " };
    }
  } catch (error) {
    return { success: false, message: "Internal Error" };
  }
};
