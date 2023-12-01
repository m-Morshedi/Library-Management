import "dotenv/config";
import express from "express";
import ApiError from "./utils/apiError.js";
import { PrismaClient } from "@prisma/client";

import bookRouter from "./routes/book.route.js";
import borrowerRouter from "./routes/borrower.route.js";
import bookCheckout from "./routes/bookCheckout.route.js";

const app = express();

const prisma = new PrismaClient();

prisma.$connect().then(() => {
  console.log("Connected to database");
});

app.use(express.json());

app.use("/api", bookRouter);
app.use("/api", borrowerRouter);
app.use("/api", bookCheckout);

app.all("*", (req, res, next) => {
  next(new ApiError(404, "this route does not exist"));
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    error: err,
    message: err.message,
    stack: err.stack,
  });
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
