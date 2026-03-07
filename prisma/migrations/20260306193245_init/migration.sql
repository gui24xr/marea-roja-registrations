/*
  Warnings:

  - You are about to drop the `Evento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Inscripcion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Jornada` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Nadador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Resultado` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Torneo` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Stroke" AS ENUM ('FREESTYLE', 'BUTTERFLY', 'BACKSTROKE', 'BREASTSTROKE', 'MEDLEY');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'SWIMMER', 'GUARDIAN');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- DropForeignKey
ALTER TABLE "Evento" DROP CONSTRAINT "Evento_jornadaId_fkey";

-- DropForeignKey
ALTER TABLE "Inscripcion" DROP CONSTRAINT "Inscripcion_eventoId_fkey";

-- DropForeignKey
ALTER TABLE "Inscripcion" DROP CONSTRAINT "Inscripcion_nadadorId_fkey";

-- DropForeignKey
ALTER TABLE "Jornada" DROP CONSTRAINT "Jornada_torneoId_fkey";

-- DropForeignKey
ALTER TABLE "Resultado" DROP CONSTRAINT "Resultado_inscripcionId_fkey";

-- DropTable
DROP TABLE "Evento";

-- DropTable
DROP TABLE "Inscripcion";

-- DropTable
DROP TABLE "Jornada";

-- DropTable
DROP TABLE "Nadador";

-- DropTable
DROP TABLE "Resultado";

-- DropTable
DROP TABLE "Torneo";

-- DropEnum
DROP TYPE "Estilo";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "type" "UserType" NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tournament" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Round" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "roundId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "stroke" "Stroke" NOT NULL,
    "registrationOpen" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Swimmer" (
    "id" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "Swimmer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registration" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "swimmerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SwimmerUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SwimmerUsers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "Swimmer_dni_key" ON "Swimmer"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Registration_swimmerId_eventId_key" ON "Registration"("swimmerId", "eventId");

-- CreateIndex
CREATE INDEX "_SwimmerUsers_B_index" ON "_SwimmerUsers"("B");

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_swimmerId_fkey" FOREIGN KEY ("swimmerId") REFERENCES "Swimmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SwimmerUsers" ADD CONSTRAINT "_SwimmerUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Swimmer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SwimmerUsers" ADD CONSTRAINT "_SwimmerUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
