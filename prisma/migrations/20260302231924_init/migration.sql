-- CreateEnum
CREATE TYPE "Estilo" AS ENUM ('CROL', 'MARIPOSA', 'ESPALDA', 'PECHO', 'MEDLEY');

-- CreateTable
CREATE TABLE "Torneo" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Torneo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jornada" (
    "id" SERIAL NOT NULL,
    "torneoId" INTEGER NOT NULL,

    CONSTRAINT "Jornada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" SERIAL NOT NULL,
    "jornadaId" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "estilo" "Estilo" NOT NULL,
    "statusInscripcion" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nadador" (
    "id" SERIAL NOT NULL,
    "dni" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,

    CONSTRAINT "Nadador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inscripcion" (
    "id" SERIAL NOT NULL,
    "eventoId" INTEGER NOT NULL,
    "nadadorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inscripcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resultado" (
    "id" SERIAL NOT NULL,
    "inscripcionId" INTEGER NOT NULL,
    "resultadoPropio" DOUBLE PRECISION,
    "resultadoOficial" DOUBLE PRECISION,

    CONSTRAINT "Resultado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nadador_dni_key" ON "Nadador"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Inscripcion_nadadorId_eventoId_key" ON "Inscripcion"("nadadorId", "eventoId");

-- CreateIndex
CREATE UNIQUE INDEX "Resultado_inscripcionId_key" ON "Resultado"("inscripcionId");

-- AddForeignKey
ALTER TABLE "Jornada" ADD CONSTRAINT "Jornada_torneoId_fkey" FOREIGN KEY ("torneoId") REFERENCES "Torneo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_jornadaId_fkey" FOREIGN KEY ("jornadaId") REFERENCES "Jornada"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_nadadorId_fkey" FOREIGN KEY ("nadadorId") REFERENCES "Nadador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resultado" ADD CONSTRAINT "Resultado_inscripcionId_fkey" FOREIGN KEY ("inscripcionId") REFERENCES "Inscripcion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
