import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";

import { checkoutBookValidator } from "../utils/validators/bookCheckout.validator.js";

import {
  checkoutBook,
  getBookCheckouts,
  returnedBook,
  borrowerHistory,
} from "../controllers/bookCheckout.controller.js";

const router = express.Router();

router.post("/checkout", verifyToken, checkoutBookValidator, checkoutBook);
router.put("/returned/:checkout_id", verifyToken, returnedBook);
router.get("/booksCheckout", verifyToken, getBookCheckouts);
router.get("/borrower/books/:borrower_id", verifyToken, borrowerHistory);

export default router;
