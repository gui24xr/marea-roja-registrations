import { PrismaClient, Stroke } from "../src/generated/prisma";

const prisma = new PrismaClient();

const persons = [
  { dni: "20345678", firstName: "Lucas",     lastName: "Fernández" },
  { dni: "24123456", firstName: "Martina",   lastName: "Gómez" },
  { dni: "27654321", firstName: "Sebastián", lastName: "López" },
  { dni: "30987654", firstName: "Valentina", lastName: "Rodríguez" },
  { dni: "22456789", firstName: "Nicolás",   lastName: "Martínez" },
  { dni: "25321098", firstName: "Camila",    lastName: "García" },
  { dni: "28765432", firstName: "Facundo",   lastName: "Pereyra" },
  { dni: "31234567", firstName: "Lucía",     lastName: "Sánchez" },
  { dni: "23876543", firstName: "Matías",    lastName: "Torres" },
  { dni: "26543210", firstName: "Agustina",  lastName: "Ramírez" },
  { dni: "29012345", firstName: "Tomás",     lastName: "Flores" },
  { dni: "32109876", firstName: "Julieta",   lastName: "Díaz" },
  { dni: "21987654", firstName: "Gonzalo",   lastName: "Moreno" },
  { dni: "24678901", firstName: "Sofía",     lastName: "Suárez" },
  { dni: "27234567", firstName: "Leandro",   lastName: "Castro" },
  { dni: "30543210", firstName: "Florencia", lastName: "Ortega" },
  { dni: "22901234", firstName: "Ignacio",   lastName: "Ruiz" },
  { dni: "25432109", firstName: "Rocío",     lastName: "Vega" },
  { dni: "28123456", firstName: "Diego",     lastName: "Herrera" },
  { dni: "31890123", firstName: "Antonella", lastName: "Romero" },
];

const tournamentData = {
  label: "Torneo Marea Roja 2026",
  rounds: [
    {
      events: [
        { label: "50m Crol",      stroke: Stroke.FREESTYLE },
        { label: "50m Mariposa",  stroke: Stroke.BUTTERFLY },
        { label: "50m Espalda",   stroke: Stroke.BACKSTROKE },
      ],
    },
    {
      events: [
        { label: "100m Pecho",    stroke: Stroke.BREASTSTROKE },
        { label: "100m Crol",     stroke: Stroke.FREESTYLE },
        { label: "200m Medley",   stroke: Stroke.MEDLEY },
      ],
    },
  ],
};

const personsWithoutProfile = [
  { dni: "40123456", firstName: "Bruno",     lastName: "Acosta" },
  { dni: "41234567", firstName: "Catalina",  lastName: "Benítez" },
  { dni: "42345678", firstName: "Emilio",    lastName: "Cabrera" },
  { dni: "43456789", firstName: "Daniela",   lastName: "Esquivel" },
  { dni: "44567890", firstName: "Federico",  lastName: "Figueroa" },
  { dni: "45678901", firstName: "Gabriela",  lastName: "Godoy" },
  { dni: "46789012", firstName: "Hernán",    lastName: "Ibáñez" },
  { dni: "47890123", firstName: "Irene",     lastName: "Juárez" },
  { dni: "48901234", firstName: "Joaquín",   lastName: "Leal" },
  { dni: "49012345", firstName: "Karina",    lastName: "Medina" },
  { dni: "50123456", firstName: "Leonardo",  lastName: "Navarro" },
  { dni: "51234567", firstName: "Miriam",    lastName: "Ojeda" },
];

async function main() {
  console.log("Seeding persons with swimmer profiles...");
  for (const person of persons) {
    await prisma.person.upsert({
      where: { dni: person.dni },
      update: {},
      create: {
        ...person,
        swimmer: { create: {} },
      },
    });
  }
  console.log(`${persons.length} persons (with swimmer profiles) inserted.`);

  console.log("Seeding persons without swimmer profile (miembros)...");
  for (const person of personsWithoutProfile) {
    await prisma.person.upsert({
      where: { dni: person.dni },
      update: {},
      create: { ...person },
    });
  }
  console.log(`${personsWithoutProfile.length} persons (without swimmer profile) inserted.`);

  console.log("Seeding tournament, rounds and events...");
  const tournament = await prisma.tournament.create({
    data: {
      label: tournamentData.label,
      rounds: {
        create: tournamentData.rounds.map((round) => ({
          events: {
            create: round.events.map((event) => ({
              label: event.label,
              stroke: event.stroke,
              registrationOpen: true,
            })),
          },
        })),
      },
    },
  });
  console.log(`Tournament "${tournament.label}" created with ${tournamentData.rounds.length} rounds.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
