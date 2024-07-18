import { pool } from "../config/db_connect.js";
import cloudinary from "cloudinary";

export const createProducts = async () => {
  try {
    const createProductsTableSQL = `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(500) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        realprice DECIMAL(10, 2) NULL,
        quantity INT NOT NULL,
        sku INT NULL,
        code INT NULL,
        size VARCHAR(30) NULL,
        color VARCHAR(30) NULL,
        discount INT NULL,
        discount_status VARCHAR(20) NULL,
        start_date DATE,
        end_date DATE,
        units VARCHAR(30) NULL,
        published VARCHAR(30) NOT NULL,
        iswishlist VARCHAR(10) DEFAULT 'false',
        images JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        sub_category_id INT NOT NULL,
        FOREIGN KEY (sub_category_id) REFERENCES subcategories(id)
      );
    `;
    await pool.query(createProductsTableSQL);
    // console.log("Products table created successfully");
  } catch (error) {
    console.error("Error creating products table", error);
  }
};

export const createProduct = async (
  product_name,
  description,
  price,
  realprice,
  stock,
  sku,
  code,
  size,
  color,
  discount,
  start_date,
  end_date,
  units,
  product_status,
  discount_status,
  sub_cateId,
  datauri
) => {
  try {
    const [existingProduct] = await pool.query(
      `SELECT * FROM products WHERE name = ? AND color = ? AND size = ?`,
      [product_name, color, size]
    );

    if (existingProduct.length > 0) {
      return { success: false, message: "Product already exists" };
    } else {
      const uploadedImages = await Promise.all(
        datauri.map((uri) => cloudinary.v2.uploader.upload(uri))
      );

      const images = uploadedImages.map((upload) => ({
        public_id: upload.public_id,
        url: upload.secure_url,
      }));

      const imagesJSON = JSON.stringify(images);

      const [createProduct] = await pool.query(
        `INSERT INTO products 
        (name, description, price, realprice, quantity, sku, code, size, color, discount, start_date, end_date, units, published, discount_status, sub_category_id, images) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          product_name,
          description,
          price,
          realprice,
          stock,
          sku,
          code,
          size,
          color,
          discount,
          start_date,
          end_date,
          units,
          product_status,
          discount_status,
          sub_cateId,
          imagesJSON,
        ]
      );

      return {
        success: true,
        message: "Product created successfully",
      };
    }
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, message: error.message };
  }
};

export const get_products = async (page = 1, limit = 10) => {
  console.log("this is the get products  model", page, limit);

  try {
    const offset = (page - 1) * limit;
    console.log(offset);
    const [products] = await pool.query(
      `SELECT
       bc.id AS base_category_id,
    bc.name AS base_category_name,
    sc.id AS subcategory_id,
    sc.name AS subcategory_name,
    p.id AS id,
    p.name AS name,
    p.description AS product_description,
    p.price AS price,
    p.realprice AS realprice,
    p.quantity AS product_quantity,
    p.discount AS discount,
    p.color AS product_color,
    p.size AS product_size,
    p.published AS product_published,
    p.iswishlist AS iswishlist,
    p.images AS images
      FROM
        basecategory bc
        JOIN subcategories sc ON bc.id = sc.base_category_id
        JOIN products p ON sc.id = p.sub_category_id
      GROUP BY
        bc.id, bc.name, sc.id, sc.name, p.id, p.name, p.description, p.price, p.realprice, p.quantity, p.discount
      ORDER BY
        p.created_at DESC  -- Assuming created_at column exists and stores timestamp of creation
      LIMIT ?
      OFFSET ?`,
      [limit, offset]
    );

    // console.log(products);
    if (products.length > 0) {
      return { success: true, message: "all products", products: products };
    } else {
      return { success: false, message: "No products found" };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const products_all = async () => {
  console.log("model");

  try {
    const [products] = await pool.query(
      `SELECT
    bc.id AS base_category_id,
    bc.name AS base_category_name,
    sc.id AS subcategory_id,
    sc.name AS subcategory_name,
    p.id AS id,
    p.name AS name,
    p.description AS product_description,
    p.price AS price,
    p.realprice AS realprice,
    p.quantity AS product_quantity,
    p.discount AS discount,
    p.color AS product_color,
    p.size AS product_size,
    p.published AS product_published,
    p.iswishlist AS iswishlist,
    p.images AS images
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
    console.log(products);
    if (products.length > 0) {
      return { success: true, message: "all products", products: products };
    } else {
      return { success: false, message: "No products found" };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const product_update = async (
  product_name,
  description,
  product_price,
  realprice,
  product_stock,
  product_discount,
  product_start_date,
  product_end_date,
  product_status,
  product_code,
  product_sku,
  product_size,
  product_color,
  units,
  cateId,
  proId
) => {
  try {
    console.log("start");
    const [result] = await pool.query(`SELECT * FROM products WHERE id = ?`, [
      proId,
    ]);
    if (result.length === 0) {
      return { success: false, message: "product not found" };
    }
    console.log("one");
    const [product] = await pool.query(
      `UPDATE products SET name = ?, price = ?, quantity = ?, description = ?, discount = ?, sub_category_id = ?, published = ?, realprice = ?,start_date = ?, end_date = ? , sku = ? , code = ?, size = ? , color = ?, units = ?  WHERE id = ?`,
      [
        product_name,
        product_price,
        product_stock,
        description,
        product_discount,
        cateId,
        product_status,
        realprice,
        product_start_date,
        product_end_date,
        product_sku,
        product_code,
        product_size,
        product_color,
        units,
        proId, // Replace productId with the ID of the product you want to update
      ]
    );

    if (product.affectedRows > 0) {
      return {
        success: true,
        message: "Updated successfully",
      };
    } else {
      return { success: false, message: "Product update failed" };
    }
  } catch (error) {
    console.error("error updating product", error.message);
  }
};

export const product_image_update = async (proId, datauri) => {
  try {
    // Fetch existing product from database
    const [result] = await pool.query(`SELECT * FROM products WHERE id = ?`, [
      proId,
    ]);

    // Check if product exists
    if (result.length === 0) {
      return { success: false, message: "Product not found" };
    }

    const product = result[0];
    const images = product.images;

    // Delete old images from Cloudinary
    const publicIds = images.map((img) => img.public_id);
    console.log("Deleting old images:", publicIds);
    const deleteResults = await Promise.all(
      publicIds.map((publicId) => cloudinary.v2.uploader.destroy(publicId))
    );

    // Upload new images to Cloudinary
    const uploadedImages = await Promise.all(
      datauri.map((uri) => cloudinary.v2.uploader.upload(uri))
    );

    // Prepare new images data for database update
    const Images = uploadedImages.map((upload) => ({
      public_id: upload.public_id,
      url: upload.secure_url,
    }));
    const imagesJSON = JSON.stringify(Images);

    // Update product images in the database
    const [updated_product] = await pool.query(
      `UPDATE products SET images = ? WHERE id = ?`,
      [imagesJSON, proId]
    );

    // Check if update was successful
    if (updated_product.affectedRows > 0) {
      return {
        success: true,
        message: "Updated successfully",
      };
    } else {
      return { success: false, message: "Image Update Failed" };
    }
  } catch (error) {
    console.error("Error in product_image_update:", error);
    return { success: false, message: "Internal Error" };
  }
};

export const product_published = async (id, published) => {
  try {
    const [data] = await pool.query(`SELECT * FROM products WHERE id = ?`, [
      id,
    ]);

    if (data.length > 0) {
      if (data[0].published !== published) {
        await pool.query("UPDATE products SET published = ? WHERE id = ?", [
          published,
          id,
        ]);
        return { success: true, message: "Update Status" };
      } else {
        return { success: true, message: "No change in status" };
      }
    } else {
      return { success: false, message: "Product not found" };
    }
  } catch (error) {
    return { success: false, message: "Internal Error" };
  }
};

export const single_product = async (proId) => {
  try {
    const [data] = await pool.query("SELECT * FROM products WHERE id = ?", [
      proId,
    ]);
    if (data.length > 0) {
      return { success: true, product: data[0], message: "singel product" };
    } else {
      return { success: false, message: "product not found" };
    }
  } catch (error) {
    return { success: false, message: "Internal Error" };
  }
};
export const product = async (proId) => {
  try {
    const [data] = await pool.query("SELECT * FROM products WHERE id = ?", [
      proId,
    ]);
    if (data.length > 0) {
      return { success: true, product: data, message: "singel product" };
    } else {
      return { success: false, message: "product not found" };
    }
  } catch (error) {
    return { success: false, message: "Internal Error" };
  }
};

export const deleteProduct = async (proId) => {
  console.log("this is product delete model");
  try {
    console.log("one");
    const [product] = await pool.query(`SELECT * FROM products WHERE id = ?`, [
      proId,
    ]);

    if (!product || product.length === 0) {
      return { success: false, message: "Product not found" };
    }
    console.log("two");
    // Delete images from Cloudinary
    const imagesToDelete = product[0].images.map((image) => image.public_id);
    for (const public_id of imagesToDelete) {
      await cloudinary.uploader.destroy(public_id);
    }

    // Delete product from database
    const [result] = await pool.query(`DELETE FROM products WHERE id = ?`, [
      proId,
    ]);

    console.log("three");

    // Check if deletion was successful
    if (result.affectedRows > 0) {
      return {
        success: true,
        message: "Deleted successfully",
      };
    } else {
      return { success: false, message: "Failed to delete product" };
    }
  } catch (error) {
    console.log("error deleteing product ", error.message);
    return { success: false, message: "Internal Error" };
  }
};
