import { check } from "express-validator";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";

export const createBorrowerValidator = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email").notEmpty().withMessage("Email is required"),
  check("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error("Password Confirmation incorrect");
      }
      return true;
    }),

  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password confirmation required"),
  validationMiddleware,
];

export const updateBorrowerValidator = [
  check("name").optional(),
  check("email").optional(),
  check("password").optional(),
  check("passwordConfirm").optional(),
  validationMiddleware,
];

export const deleteBorrowerValidator = [
  check("borrower_id").isUUID(4).withMessage("Invalid Input!"),
  validationMiddleware,
];

export const getBorrowerValidator = [
  check("borrower_id").isUUID(4).withMessage("Invalid Input!"),
  validationMiddleware,
];
