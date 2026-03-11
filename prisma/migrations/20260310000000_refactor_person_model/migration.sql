-- AlterEnum
BEGIN;
CREATE TYPE "UserType_new" AS ENUM ('ADMIN', 'USER');
ALTER TABLE "User" ALTER COLUMN "type" TYPE "UserType_new" USING ("type"::text::"UserType_new");
ALTER TYPE "UserType" RENAME TO "UserType_old";
ALTER TYPE "UserType_new" RENAME TO "UserType";
DROP TYPE "public"."UserType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Registration" DROP CONSTRAINT "Registration_swimmerId_fkey";

-- DropForeignKey
ALTER TABLE "_SwimmerUsers" DROP CONSTRAINT "_SwimmerUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_SwimmerUsers" DROP CONSTRAINT "_SwimmerUsers_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "personId" TEXT NOT NULL,
ALTER COLUMN "type" SET DEFAULT 'USER';

-- DropTable
DROP TABLE "Swimmer";

-- DropTable
DROP TABLE "_SwimmerUsers";

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SwimmerProfile" (
    "id" TEXT NOT NULL,
    "personId" TEXT NOT NULL,

    CONSTRAINT "SwimmerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonAccess" (
    "accessorId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,

    CONSTRAINT "PersonAccess_pkey" PRIMARY KEY ("accessorId","subjectId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_dni_key" ON "Person"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "SwimmerProfile_personId_key" ON "SwimmerProfile"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "User_personId_key" ON "User"("personId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SwimmerProfile" ADD CONSTRAINT "SwimmerProfile_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonAccess" ADD CONSTRAINT "PersonAccess_accessorId_fkey" FOREIGN KEY ("accessorId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonAccess" ADD CONSTRAINT "PersonAccess_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_swimmerId_fkey" FOREIGN KEY ("swimmerId") REFERENCES "SwimmerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
