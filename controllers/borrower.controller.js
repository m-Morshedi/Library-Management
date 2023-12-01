import { PrismaClient } from "@prisma/client";
import ApiError from "../utils/apiError.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { generateJWT } from "../utils/generateJWT.js";

const prisma = new PrismaClient();

export const getBorrowers = asyncHandler(async (req, res, next) => {
  const borrower = await prisma.borrower.findMany();
  if (!borrower) {
    return next(new ApiError(404, "Borrower not found"));
  }
  return res.status(200).json(borrower);
});

export const getBorrower = asyncHandler(async (req, res, next) => {
  const { borrower_id } = req.params;
  const borrower = await prisma.borrower.findUnique({
    where: { borrower_id: borrower_id },
  });
  if (!borrower) {
    return next(new ApiError(404, "Borrower not found"));
  }
  return res.status(200).json(borrower);
});

export const registerBorrower = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const oldBorrower = await prisma.borrower.findUnique({
    where: { email: email },
  });
  if (oldBorrower) {
    return next(new ApiError(400, "Borrower already exists"));
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const borrower = await prisma.borrower.create({
    data: { name, email, password: hashedPassword },
  });
  const token = generateJWT({
    email: borrower.email,
    borrower_id: borrower.borrower_id,
  });
  return res.status(201).json({ data: borrower, token });
});

export const loginBorrower = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const borrower = await prisma.borrower.findUnique({
    where: { email: email },
  });
  if (!borrower) {
    return next(new ApiError(401, "Invalid credentials"));
  }
  const isMatch = await bcrypt.compare(password, borrower.password);
  if (!isMatch) {
    return next(new ApiError(401, "Invalid credentials"));
  }
  if (borrower && isMatch) {
    const token = generateJWT({
      email: borrower.email,
      borrower_id: borrower.borrower_id,
    });
    return res.status(200).json({ token });
  } else {
    return next(new ApiError(401, "Invalid credentials"));
  }
});

export const updateBorrower = asyncHandler(async (req, res, next) => {
  const { borrower_id } = req.params;
  const { name, email, password } = req.body;
  const borrower = await prisma.borrower.update({
    where: { borrower_id: borrower_id },
    data: { name, email, password: await bcrypt.hash(password, 10) },
  });
  if (!borrower) {
    return next(new ApiError(404, "Borrower not found"));
  }
  return res.status(200).json(borrower);
});

export const deleteBorrower = asyncHandler(async (req, res, next) => {
  const { borrower_id } = req.params;
  const borrower = await prisma.borrower.delete({
    where: { borrower_id: borrower_id },
  });
  if (!borrower) {
    return next(new ApiError(404, "Borrower not found"));
  }
  return res.status(200).json(borrower);
});
