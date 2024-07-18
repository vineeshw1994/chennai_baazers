import { pool } from "../config/db_connect.js";
import cloudinary from "cloudinary";

export const createNavBanner = async () => {
  try {
    const createNavBannerTableSQL = `
        CREATE TABLE IF NOT EXISTS navbanner (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(50) NOT NULL,
          description VARCHAR(500) NOT NULL,
          image_url VARCHAR(1000) NOT NULL,
          image_public_id VARCHAR(1000) NOT NULL,
          items JSON,
          start_date DATE,
          end_date DATE,
          published VARCHAR(10) DEFAULT 'true',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `;
    await pool.query(createNavBannerTableSQL);
    // console.log("Navbanner table created successfully");
  } catch (error) {
    console.error("Error creating navbanner table", error);
  }
};

export const add_navbanner = async (
  catname,
  description,
  start_date,
  end_date,
  products,
  file
) => {
  const placeholders = products.map(() => "?").join(",");
  console.log(placeholders);

  try {
    // Query to get the related products
    const query = `SELECT * FROM products WHERE id IN (${placeholders})`;
    const [relatedProducts] = await pool.query(query, products);
    console.log(relatedProducts);

    // Check if banner with the same name exists
    const [existingBanner] = await pool.query(
      `SELECT * FROM navbanner WHERE name = ?`,
      [catname]
    );
    if (existingBanner.length > 0) {
      return { success: false, message: "Banner already exists" };
    } else {
      // Upload the image to cloudinary
      const cloudinaryResponse = await cloudinary.v2.uploader.upload(
        file.content
      );
      const image = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };

      // Insert the new banner
      const [banner] = await pool.query(
        `INSERT INTO navbanner (name, description, start_date, end_date, image_url, image_public_id, items) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          catname,
          description,
          start_date,
          end_date,
          image.url,
          image.public_id,
          JSON.stringify(relatedProducts),
        ]
      );

      return {
        success: true,
        message: "Banner created successfully",
      };
    }
  } catch (error) {
    console.error("Banner create error", error);
    return { success: false, message: "Internal Error" };
  }
};

export const nav_banners = async () => {
  try {
    const [banners] = await pool.query(`SELECT * FROM navbanner`);
    if (banners.length > 0) {
      return { success: true, banners: banners };
    }
    return { success: false, message: "No Banners" };
  } catch (error) {
    console.log("getting banners error");
    return { success: true, message: "Internal Error" };
  }
};
