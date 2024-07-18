import { pool } from "../config/db_connect.js";
import bcriptjs from "bcryptjs";
export const createUserTable = async () => {
  try {
    const createUserTableSQL = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255)  NULL,
        email VARCHAR(255)  NULL UNIQUE,
        mobile VARCHAR(20)  NULL UNIQUE,
        profilePic VARCHAR(1000) DEFAULT 'https://banner2.cleanpng.com/20180319/pde/kisspng-computer-icons-icon-design-avatar-flat-face-icon-5ab06e33bee962.122118601521511987782.jpg',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await pool.query(createUserTableSQL);
    // console.log("Users table created successfully");
  } catch (error) {
    console.error("Error creating users table:", error.message);
  }
};

export const createAddressTable = async () => {
  try {
    const createAddressTableSQL = `
  CREATE TABLE IF NOT EXISTS address (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100)  NULL,
      mobile VARCHAR(20)  NULL,
      houseNo VARCHAR(100),
      flatNo VARCHAR(100),
      address VARCHAR(500) NOT NULL,
      district VARCHAR(100) NOT NULL,
      state VARCHAR(50) NOT NULL,
      pincode VARCHAR(10) NOT NULL,
      landmark VARCHAR(100),
      type VARCHAR(20),
      user_id INT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`;

    await pool.query(createAddressTableSQL);
    // console.log("address table created successfully");
  } catch (error) {
    console.log("errro creating address table ", error.message);
  }
};

// SIGN-UP USER
export const createUser = async (mobile) => {
  console.log(mobile, "its create user model");
  try {
    const [existingUsers] = await pool.query(
      `SELECT * FROM users WHERE  mobile = ?`,
      [mobile]
    );
    if (existingUsers.length > 0) {
      return {
        success: true,
        message: "Login Successfully",
        user: existingUsers[0],
      };
    } else {
      // const hashedPassword = bcriptjs.hashSync(password, 10);
      // console.log(hashedPassword, "this is my hashed password");

      const [result] = await pool.query(
        `INSERT INTO users ( mobile)
         VALUES (?)`,
        [mobile.toString()]
      );
      const [userData] = await pool.query(`SELECT * FROM users WHERE id = ?`, [
        result.insertId,
      ]);

      console.log("User created:", userData);

      return {
        success: true,
        message: "Login successfully",
        user: userData[0],
      };
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, message: "Internal Error" };
  }
};

// export const userChecking = async ( mobile) => {
//   try {
//     const [existingUsers] = await pool.query(
//       `SELECT * FROM users WHERE email = ? OR mobile = ?`,
//       [email, mobile]
//     );
//     if (existingUsers.length > 0) {
//       if (existingUsers[0].email === email) {
//         return {
//           success: true,
//           message: "user email already exists",
//         };
//       }
//       if (existingUsers[0].mobile === mobile) {
//         return {
//           success: true,
//           message: "User mobile already exists",
//         };
//       }
//     } else {
//       return { success: false, message: "user not found" };
//     }
//   } catch (error) {
//     return { success: false, message: error.message };
//   }
// };

// LOGIN USER
// export const loginUser = async (email, password) => {
//   console.log(email, password, "its login model");
//   try {
//     const [existingUser] = await pool.query(
//       `SELECT* FROM users where  email = ?`,
//       [email]
//     );
//     let message;
//     if (existingUser.length > 0) {
//       const validPassword = bcriptjs.compareSync(
//         password,
//         existingUser[0].password
//       );
//       console.log(validPassword);
//       if (!validPassword) {
//         return { success: false, message: "Invalid password" };
//       }
//       const [userData] = await pool.query(`SELECT * FROM users WHERE id = ? `, [
//         existingUser[0].id,
//       ]);
//       return {
//         success: true,
//         message: "login successfully",
//         user: userData[0],
//       };
//     } else {
//       return { success: false, message: "User not exist" };
//     }
//   } catch (error) {
//     return { success: false, message: "Internal Error" };
//   }
// };

// UPDATE USER
export const updateUser = async (user_id, username, email, mobile) => {
  console.log("Executing user update operation...");

  try {
    // Ensure user_id is treated as an integer
    const [result] = await pool.query(
      `UPDATE users SET username = ?, mobile = ?, email = ? WHERE id = ?`,
      [username, mobile, email, user_id]
    );

    // Check if any rows were affected by the update query
    if (result.affectedRows === 0) {
      return { success: false, message: "User not found" };
    }

    return {
      success: true,
      message: `updated successfully`,
    };
  } catch (error) {
    console.error("Error updating user:", error.message);
    return { success: false, message: "Internal Error" };
  }
};

// DELETE USER
export const userDelete = async (id) => {
  try {
    const [data] = await pool.query(`DELETE FROM users WHERE id = ? `[id]);
    if (data.length > 0) {
      return { success: true, message: "User deleted successfully" };
    } else {
      return { success: false, message: "User not found already deleted" };
    }
  } catch (error) {
    console.error("error delete user", error);
    return { success: false, message: "Internal Error" };
  }
};

export const user_get = async (id) => {
  const [data] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
  if (data.length > 0) {
    return { success: true, user: data[0], message: "user" };
  } else {
    return { success: false, message: "User Not Found" };
  }
};

export const createAddress = async (
  houseNo,
  flatNo,
  place,
  district,
  state,
  pincode,
  landmark,
  type,
  id,
  username,
  mobile
) => {
  console.log("this is the cerate address model");
  try {
    const [data] = await pool.query(
      "INSERT INTO address (houseNo,flatNo,address,district,state,pincode,landmark,type,user_Id,username,mobile) values(?,?,?,?,?,?,?,?,?,?,?)",
      [
        houseNo,
        flatNo,
        place,
        district,
        state,
        pincode,
        landmark,
        type,
        id,
        username,
        mobile,
      ]
    );
    if (data.affectedRows > 0) {
      return { success: true, message: "Created Successfully" };
    } else {
      return { success: false, message: "Address Not Added" };
    }
  } catch (error) {
    console.error("Error creating address:", error);
    return { success: false, message: "Internal Error" };
  }
};

// GET ADDRESS
export const address = async (id) => {
  try {
    const [address] = await pool.query(
      "SELECT * FROM address WHERE user_Id = ?",
      [id]
    );
    if (address.length > 0) {
      return { success: true, message: "All Addresses", address: address };
    } else {
      return { success: false, message: "Add New Address" };
    }
  } catch (error) {
    console.log("getting address error ", error.message);
    return { success: false, message: "Internal Error" };
  }
};

export const user_address = async (userId, id) => {
  try {
    const [address] = await pool.query(
      `SELECT * FROM address WHERE id = ? AND  user_id = ?`,
      [id, userId]
    );
    console.log(address[0]);
    if (address.length > 0) {
      return { success: true, message: "address", address: address[0] };
    } else {
      return { success: false, message: "No Address" };
    }
  } catch (errro) {
    return { success: false, message: errro.message };
  }
};

export const update_address = async (
  houseNo,
  flatNo,
  address,
  district,
  state,
  pincode,
  landmark,
  saveAs,
  username,
  user_Id,
  id
) => {
  try {
    const result = await pool.query(
      `UPDATE address SET houseNo = ?, flatNo = ?, address = ?, district = ?, state = ?, pincode = ?, landmark = ?, type = ?, username = ? WHERE user_id = ? AND id = ?`,
      [
        houseNo,
        flatNo,
        address,
        district,
        state,
        pincode,
        landmark,
        saveAs,
        username,
        user_Id,
        id,
      ]
    );
    console.log("one");

    if (result.affectedRows === 0) {
      return { success: false, message: " Address Not Updated" };
    }
    return { success: true, message: "Updated Successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
