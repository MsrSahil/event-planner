import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import connectDB from "./src/config/db.js";
import AuthRouter from "./src/routes/authRoutes.js";

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use("/auth", AuthRouter);

app.get("/", (req, res) => {
  res.json({ message: "server Connected" });
});

app.use((error, req, res, next) => {
  const errorMessage = error.message || "Internal Server Error";
  const errorCode = error.statusCode || 500;
  res.status(errorCode).json({
    success: false,
    message: errorMessage,
  });
});

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log("sever stsart ho gya at", port);
  connectDB();
});