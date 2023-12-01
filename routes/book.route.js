import express from "express";

import {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/book.controller.js";

import {
  createBookValidator,
  updateBookValidator,
  deleteBookValidator,
  getBookValidator,
} from "../utils/validators/book.validator.js";

import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router
  .route("/book")
  .get(verifyToken, getBooks)
  .post(verifyToken, createBookValidator, createBook);
router
  .route("/book/:book_id")
  .get(verifyToken, getBookValidator, getBook)
  .put(verifyToken, updateBookValidator, updateBook)
  .delete(verifyToken, deleteBookValidator, deleteBook);

export default router;
