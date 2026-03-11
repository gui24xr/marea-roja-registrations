/*
  Warnings:

  - A unique constraint covering the columns `[clerkInviteId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkInviteId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "UserStatus" ADD VALUE 'INVITED';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "clerkInviteId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkInviteId_key" ON "User"("clerkInviteId");
