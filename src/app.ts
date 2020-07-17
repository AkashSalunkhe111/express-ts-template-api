import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
// import cron from "node-cron";
const xss = require("xss-clean");

import expense from "./routes/expense";
import auth from "./routes/auth";
import connectDB from "./config/db";
import errorHandler from "./middlelware/error";

dotenv.config({ path: __dirname + "/../config.env" });
// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());
// cookie parser
app.use(cookieParser());

// To remove data, use:
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

app.use(limiter);

// Prevent http param polllution
app.use(hpp());

// cron.schedule("* * * * *", function () {
//   console.log("running a task every minute");
// });

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  app.use(cors());
}

// Mount routers
app.use("/api/expense", expense);
app.use("/api/auth", auth);

// Error Middlleware
app.use(errorHandler);

const PORT = process.env.PORT;

process.on("unhandledRejection", (err) => {
  // Send errors to some error logger
  console.log("Unhandled rejection:", err);
});

app.listen(PORT, () => console.log("Server Running"));

module.exports = app;
