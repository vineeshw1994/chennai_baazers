import { pool } from "../config/db_connect.js";

export const products = async (name) => {
  try {
    const query = `
        SELECT * FROM products
        WHERE name LIKE ?
      `;
    const [result] = await pool.query(query, [`%${name}%`]);

    return {
      success: true,
      products: result,
    };
  } catch (error) {
    return { success: false, message: "Internal Error" };
  }
};

export const products_filter = async (cateId, price, discount) =>{
  try{
   
  }catch(error){
    return {success:false, message:error.message}
  }
}
