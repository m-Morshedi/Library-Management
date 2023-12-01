-- CreateTable
CREATE TABLE `Book` (
    `book_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `available_quantity` INTEGER NOT NULL DEFAULT 0,
    `isbn` VARCHAR(191) NOT NULL,
    `shelf_location` INTEGER NOT NULL,

    PRIMARY KEY (`book_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Borrower` (
    `borrower_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `register_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Borrower_email_key`(`email`),
    PRIMARY KEY (`borrower_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `book_checkout` (
    `checkout_id` VARCHAR(191) NOT NULL,
    `bookBook_id` VARCHAR(191) NOT NULL,
    `borrowerBorrower_id` VARCHAR(191) NOT NULL,
    `chechout_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `return_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`checkout_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `book_checkout` ADD CONSTRAINT `book_checkout_bookBook_id_fkey` FOREIGN KEY (`bookBook_id`) REFERENCES `Book`(`book_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `book_checkout` ADD CONSTRAINT `book_checkout_borrowerBorrower_id_fkey` FOREIGN KEY (`borrowerBorrower_id`) REFERENCES `Borrower`(`borrower_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
