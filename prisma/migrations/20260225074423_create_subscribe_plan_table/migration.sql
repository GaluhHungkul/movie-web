/*
  Warnings:

  - You are about to drop the column `subscribePlan` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "subscribePlan",
ADD COLUMN     "subscribePlanId" TEXT;

-- CreateTable
CREATE TABLE "SubscribePlan" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "timePeriod" TEXT DEFAULT 'Month',

    CONSTRAINT "SubscribePlan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_subscribePlanId_fkey" FOREIGN KEY ("subscribePlanId") REFERENCES "SubscribePlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
