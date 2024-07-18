import { pool } from "../config/db_connect.js";
import bcriptjs from "bcryptjs";

export const createAdminTable = async () => {
  try {
    const createAdminTableSQL = ` 
        CREATE TABLE IF NOT EXISTS admin (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          mobile VARCHAR(20) NOT NULL,
          isAdmin VARCHAR(20) DEFAULT 'admin',
          profilePic VARCHAR(1000) DEFAULT 'https://banner2.cleanpng.com/20180319/pde/kisspng-computer-icons-icon-design-avatar-flat-face-icon-5ab06e33bee962.122118601521511987782.jpg',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

    await pool.query(createAdminTableSQL);
    // console.log("Users table created successfully");
  } catch (error) {
    console.error("Error creating admin table:", error.message);
  }
};

export const loginAdmin = async (email, password) => {
  console.log("this is the admin login model");
  try {
    const [existingUser] = await pool.query(
      `SELECT* FROM admin where  email = ?`,
      [email]
    );
    if (existingUser.length > 0) {
      const validPassword = bcriptjs.compareSync(
        password,
        existingUser[0].password
      );
      console.log(validPassword);
      if (!validPassword) {
        return { success: false, message: "Invalid password" };
      }
      const [userData] = await pool.query(`SELECT * FROM admin WHERE id = ? `, [
        existingUser[0].id,
      ]);
      return {
        success: true,
        message: "login successfully",
        admin: userData[0],
      };
    } else {
      return { success: false, message: "Admin not exist" };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const allUsers = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;
    const [users] = await pool.query(`SELECT * FROM users LIMIT ?, ?`, [
      offset,
      limit,
    ]);

    if (users.length > 0) {
      return { success: true, users: users, message: "All users" };
    } else {
      return { success: false, message: "No users" };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getAdmin = async (adminId) => {
  try {
    const [admin] = await pool.query(`SELECT * FROM admin WHERE id = ?`, [
      adminId,
    ]);
    if (admin.length > 0) {
      return { success: true, data: admin[0], message: "success" };
    } else {
      return { success: false, message: "No Information" };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const admin_update = async (
  adminId,
  username,
  email,
  mobile,
  password
) => {
  try {
    // First, fetch the admin record based on adminId
    const [admin] = await pool.query(`SELECT * FROM admin WHERE id = ?`, [
      adminId,
    ]);

    // Check if admin record exists
    if (admin.length > 0) {
      let updateFields = [];
      let updateValues = [];

      // Check and add fields to update based on what is provided in the request
      if (username) {
        // Validate username
        if (username.length < 7 || username.length > 20) {
          return {
            success: false,
            message: "Username must be between 7 and 20 characters",
          };
        }
        if (username.includes(" ")) {
          return { success: false, message: "Username cannot contain spaces" };
        }
        if (username !== username.toLowerCase()) {
          return { success: false, message: "Username must be lowercase" };
        }
        if (!username.match(/^[a-zA-Z0-9]+$/)) {
          return {
            success: false,
            message: "Username can only contain letters and numbers",
          };
        }
        updateFields.push("username = ?");
        updateValues.push(username);
      }

      if (email) {
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return { success: false, message: "Enter a Valid Email Address" };
        }
        updateFields.push("email = ?");
        updateValues.push(email);
      }

      if (mobile) {
        // Validate mobile
        if (mobile.length !== 10) {
          return {
            success: false,
            message: "Mobile Number Must be Ten Numbers",
          };
        }
        updateFields.push("mobile = ?");
        updateValues.push(mobile);
      }

      if (password) {
        // Hash the new password
        const hashedPassword = bcriptjs.hashSync(password, 10);
        updateFields.push("password = ?");
        updateValues.push(hashedPassword);
      }

      // Only execute the update query if there are fields to update
      if (updateFields.length > 0) {
        const updateQuery = `
          UPDATE admin 
          SET ${updateFields.join(", ")}
          WHERE id = ?
        `;
        updateValues.push(adminId);

        await pool.query(updateQuery, updateValues);
      }

      return { success: true, message: "Updated Successfully" };
    } else {
      return { success: false, message: "Admin Not Found" };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};
