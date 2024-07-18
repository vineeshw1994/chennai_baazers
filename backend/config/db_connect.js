import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT || 3306,
    multipleStatements: true,
  })
  .promise();

const createDatabaseIfNotExists = async () => {
  try {
    const [rows] = await pool.query(
      `SHOW DATABASES LIKE '${process.env.MYSQL_DATABASE}'`
    );
    if (rows.length === 0) {
      await pool.query(`CREATE DATABASE ${process.env.MYSQL_DATABASE}`);
      console.log(
        `Database ${process.env.MYSQL_DATABASE} created successfully.`
      );
    } else {
      console.log(`Database ${process.env.MYSQL_DATABASE} already exists.`);
    }
  } catch (error) {
    console.error("Error occurred while creating database:", error);
  }
};

createDatabaseIfNotExists();
