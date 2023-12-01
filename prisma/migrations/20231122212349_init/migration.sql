/*
  Warnings:

  - Added the required column `password` to the `Borrower` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Borrower` ADD COLUMN `password` VARCHAR(191) NOT NULL;
