/*
  Warnings:

  - You are about to alter the column `title` on the `bookmarks` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `description` on the `bookmarks` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(800)`.
  - You are about to alter the column `link` on the `bookmarks` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `firstName` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `lastName` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "bookmarks" ALTER COLUMN "title" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(800),
ALTER COLUMN "link" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "firstName" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "lastName" SET DATA TYPE VARCHAR(100);
