import { check } from "express-validator";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";

export const createBookValidator = [
  check("title").notEmpty().withMessage("Title is required"),
  check("author").notEmpty().withMessage("Author is required"),
  check("available_quantity").optional(),
  check("isbn").notEmpty().withMessage("ISBN is required"),
  check("shelf_location")
    .notEmpty()
    .withMessage("Shelf location is required")
    .isNumeric()
    .withMessage("Shelf location must be a number"),
  validationMiddleware,
];

export const updateBookValidator = [
  check("title").optional(),
  check("author").optional(),
  check("available_quantity").optional(),
  check("isbn").optional(),
  check("shelf_location").optional(),
  validationMiddleware,
];

export const deleteBookValidator = [
  check("book_id").isUUID(4).withMessage("Invalid Input!"),
  validationMiddleware,
];

export const getBookValidator = [
  check("book_id").isUUID(4).withMessage("Invalid Input!"),
  validationMiddleware,
];
