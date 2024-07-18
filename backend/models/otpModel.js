import { pool } from "../config/db_connect.js";

export const createOtp = async () => {
  try {
    const createOtpTableSQL = `
    CREATE TABLE IF NOT EXISTS otp (
        number BIGINT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) `;
    await pool.query(createOtpTableSQL);
    // console.log("otp table created");
  } catch (error) {
    console.error("error creating otp table ", error.message);
  }
};

export const otpSaving = async (otp) => {
  console.log("this is otp saving model");
  try {
    await pool.query(`INSERT INTO otp (number) VALUES (?)`, [otp]);
    console.log(`OTP ${otp} saved successfully.`);
    return { success: true, message: `OTP ${otp} saved successfully.` };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const otpChecking = async (otp) => {
  console.log(otp, "this is my otp");
  try {
    const [rows] = await pool.query(`SELECT * FROM otp WHERE number = ?`, [
      otp,
    ]);

    if (rows.length > 0) {
      // OTP found, delete it
      await pool.query(`DELETE FROM otp WHERE number = ?`, [otp]);
      console.log(`OTP ${otp} deleted successfully.`);
      return { success: true, message: `OTP ${otp} deleted successfully.` };
    } else {
      console.log(`OTP ${otp} not found.`);
      return { success: false, message: `OTP ${otp} not found.` };
    }
  } catch (error) {
    return { success: false, message: error.message };
    console.error("Error checking and deleting OTP:", error);
    throw error;
  }
};
