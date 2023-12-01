import express from "express";

import {
  getBorrowers,
  getBorrower,
  registerBorrower,
  updateBorrower,
  deleteBorrower,
  loginBorrower,
} from "../controllers/borrower.controller.js";

import {
  createBorrowerValidator,
  updateBorrowerValidator,
  deleteBorrowerValidator,
  getBorrowerValidator,
} from "../utils/validators/borrower.validator.js";

import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.route("/borrower").get(verifyToken, getBorrowers);

router.post("/register", createBorrowerValidator, registerBorrower);

router.route("/login").post(verifyToken, loginBorrower);

router
  .route("/borrower/:borrower_id")
  .get(verifyToken, getBorrowerValidator, getBorrower)
  .put(verifyToken, updateBorrowerValidator, updateBorrower)
  .delete(verifyToken, deleteBorrowerValidator, deleteBorrower);

export default router;
