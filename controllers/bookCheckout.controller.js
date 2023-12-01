import { PrismaClient } from "@prisma/client";
import ApiError from "../utils/apiError.js";
import asyncHandler from "express-async-handler";

const prisma = new PrismaClient();

export const checkoutBook = asyncHandler(async (req, res, next) => {
  const { bookBook_id, borrowerBorrower_id } = req.body;
  const bookCheckout = await prisma.book_checkout.create({
    data: { bookBook_id, borrowerBorrower_id },
  });
  if (!bookCheckout) {
    return next(new ApiError(404, "Book checkout not found"));
  }
  return res.status(200).json(bookCheckout);
});

export const getBookCheckouts = asyncHandler(async (req, res, next) => {
  const bookCheckout = await prisma.book_checkout.findMany();
  if (!bookCheckout) {
    return next(new ApiError(404, "Book checkout not found"));
  }
  return res.status(200).json(bookCheckout);
});

export const returnedBook = asyncHandler(async (req, res, next) => {
  const { checkout_id } = req.params;
  const bookReturn = await prisma.book_checkout.update({
    where: { checkout_id: checkout_id },
    data: { return_date: new Date() },
  });
  if (!bookReturn) {
    return next(new ApiError(404, "Book checkout not found"));
  }
  return res.status(200).json({ msg: "Book returned" });
});

export const borrowerHistory = asyncHandler(async (req, res, next) => {
  const { borrower_id } = req.params;
  const bookCheckout = await prisma.book_checkout.findMany({
    where: { borrowerBorrower_id: borrower_id },
  });
  if (!bookCheckout) {
    return next(new ApiError(404, "Book checkout not found"));
  }
  return res.status(200).json(bookCheckout);
});
