/*
  Warnings:

  - You are about to drop the column `clerkInvitationId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_clerkInvitationId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "clerkInvitationId",
ADD COLUMN     "clerkInvitationData" JSONB;
