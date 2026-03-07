import TournamentRegistrationForm from "@/components/TournamentRegistrationForm";



const eventoMock = {
    nameTorneo: "Inscripción Nadadores\nMarea Roja",
    fecha: "Por confirmar",
    lugar: "Club Defensores de Glew",
    hora: "13:00 hs (ablande)",
    statusInscripcion: true,
    pruebas: [
        { id: 14, nameEvento: "50m Libres — Varones" },
        { id: 15, nameEvento: "50m Libres — Mujeres" },
        { id: 16, nameEvento: "50m Mariposa — Varones" },
        { id: 17, nameEvento: "50m Mariposa — Mujeres" },
        { id: 18, nameEvento: "50m Pecho — Varones" },
        { id: 19, nameEvento: "50m Pecho — Mujeres" },
    ],
};

export default function InscripcionPage() {

  return (
    <>
      <TournamentRegistrationForm evento={eventoMock}/>
    </>
  )
}

    