/*
  Warnings:

  - Added the required column `isMovie` to the `FavoriteMovie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FavoriteMovie" ADD COLUMN     "isMovie" BOOLEAN NOT NULL;
