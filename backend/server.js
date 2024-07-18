import cluster from "cluster";
import os from "os";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import Stripe from "stripe";
import cloudinary from "cloudinary";
import routes from "./routes/index.js";
import { createTables } from "./config/createTables.js";

dotenv.config();

export const stripe = new Stripe(process.env.STRIPE_API_SECRET);

//cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  console.log(numCPUs);
  console.log(`master ${process.pid} is running`);

  // for worker
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (Worker, code, signal) => {
    console.log(`worker ${Worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
  process.on("SIGTERM", () => {
    server.close(() => {
      console.log(`Worker ${process.pid} gracefully shutting down`);
      process.exit(0);
    });
  });
} else {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors());
  app.use(morgan("dev"));

  // await createTables();
  createTables();

  // routes
  app.use("/api", routes);

  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log("server is running");
  });

  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });
}
