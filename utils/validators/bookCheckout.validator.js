import { check } from "express-validator";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";

export const checkoutBookValidator = [
  check("bookBook_id")
    .isUUID(4)
    .withMessage("Invalid Input!")
    .custom((book_id) => {
      if (!book_id) {
        throw new Error("Book ID is required");
      }
      return true;
    }),
  check("borrowerBorrower_id")
    .isUUID(4)
    .withMessage("Invalid Input!")
    .custom((borrower_id) => {
      if (!borrower_id) {
        throw new Error("Borrower ID is required");
      }
      return true;
    }),
  validationMiddleware,
];
