import { PrismaClient } from "@prisma/client";
import ApiError from "../utils/apiError.js";
import asyncHandler from "express-async-handler";

const prisma = new PrismaClient();

export const getBooks = asyncHandler(async (req, res, next) => {
  const book = await prisma.book.findMany();
  if (!book) {
    return next(new ApiError(404, "Book not found"));
  }
  return res.status(200).json(book);
});

export const getBook = asyncHandler(async (req, res, next) => {
  const { book_id } = req.params;
  const book = await prisma.book.findUnique({
    where: { book_id: book_id },
  });
  if (!book) {
    return next(new ApiError(404, "Book not found"));
  }
  return res.status(200).json(book);
});

export const createBook = asyncHandler(async (req, res, next) => {
  const { title, author, available_quantity, isbn, shelf_location } = req.body;
  const book = await prisma.book.create({
    data: { title, author, available_quantity, isbn, shelf_location },
  });
  return res.status(201).json(book);
});

export const updateBook = asyncHandler(async (req, res, next) => {
  const { book_id } = req.params;
  const { title, author, available_quantity, isbn, shelf_location } = req.body;
  const book = await prisma.book.update({
    where: { book_id: book_id },
    data: { title, author, available_quantity, isbn, shelf_location },
  });
  if (!book) {
    return next(new ApiError(404, "Book not found"));
  }
  return res.status(200).json(book);
});

export const deleteBook = asyncHandler(async (req, res, next) => {
  const { book_id } = req.params;
  const book = await prisma.book.delete({ where: { book_id: book_id } });
  if (!book) {
    return next(new ApiError(404, "Book not found"));
  }
  return res.status(200).json(book);
});
