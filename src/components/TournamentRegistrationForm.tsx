"use client";

import { useState } from "react";
import { newInscription } from "@/actions.ts/tournamentsRegistrations";


export default function TournamentRegistrationForm({evento}:{evento:any}) {
    
    const [form, setForm] = useState({ dni: "", apellido: "", nombre: "", email: "" });



    const [pruebas, setPruebas] = useState<number[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<null | "loading" | "ok">(null);

    function togglePrueba(id: number) {
        setPruebas((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
        );
    }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const errs = validate(formData);
  if (Object.keys(errs).length) { setErrors(errs); return; }
  setErrors({});
  setStatus("loading");
  await newInscription(formData);
  setStatus("ok");
}

function validate(formData: FormData) {
  const e: Record<string, string> = {};
  const dni = formData.get("dni") as string;
  const apellido = formData.get("apellido") as string;
  const nombre = formData.get("nombre") as string;
  const email = formData.get("email") as string;

  if (!dni || dni.length < 7 || dni.length > 8 || isNaN(Number(dni)))
    e.dni = "DNI inválido";
  if (!apellido?.trim()) e.apellido = "Requerido";
  if (!nombre?.trim()) e.nombre = "Requerido";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    e.email = "Email inválido";
  if (pruebas.length === 0) e.pruebas = "Seleccioná al menos una prueba";

  return e;
}
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&display=swap');

        .insc-body {
          min-height: 100vh;
          background: #0a1628;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          position: relative;
          overflow-x: hidden;
        }

        .insc-body::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(200,16,46,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 100%, rgba(17,32,64,0.8) 0%, transparent 50%);
          pointer-events: none;
        }

        .insc-body::after {
          content: '〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜';
          position: fixed;
          bottom: 2rem;
          left: 0; right: 0;
          text-align: center;
          font-size: 1.5rem;
          color: rgba(200,16,46,0.12);
          letter-spacing: 4px;
          pointer-events: none;
          white-space: nowrap;
          overflow: hidden;
        }

        .insc-card {
          width: 100%;
          max-width: 560px;
          background: #112040;
          border-radius: 16px;
          border: 1px solid rgba(200,16,46,0.25);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.04), 0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(200,16,46,0.08);
          overflow: hidden;
          position: relative;
          animation: fadeUp 0.6s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .insc-header {
          background: linear-gradient(135deg, #9b0b22 0%, #c8102e 60%, #ff2244 100%);
          padding: 2rem 2rem 1.6rem;
          position: relative;
          overflow: hidden;
        }

        .insc-header::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0; right: 0;
          height: 40px;
          background: #112040;
          clip-path: ellipse(55% 100% at 50% 100%);
        }

        .insc-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 20px;
          padding: 4px 12px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.9);
          margin-bottom: 1rem;
        }

        .insc-h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.2rem;
          color: #fff;
          line-height: 1.1;
          letter-spacing: 1px;
          margin-bottom: 1.2rem;
        }

        .insc-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0.75rem;
          position: relative;
          z-index: 1;
        }

        .insc-meta-label {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          display: block;
        }

        .insc-meta-value {
          font-size: 0.82rem;
          font-weight: 500;
          color: #fff;
          line-height: 1.3;
          display: block;
        }

        .insc-body-inner { padding: 2rem; }

        .insc-section-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #c8102e;
          margin-bottom: 1.2rem;
        }

        .insc-section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(200,16,46,0.25);
        }

        .insc-fields {
          display: grid;
          grid-template-columns: 1fr 1.6fr 1.6fr;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .insc-field-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: #a0aec0;
          display: block;
          margin-bottom: 6px;
        }

        .insc-input {
          background: #162a50;
          border: 1.5px solid rgba(255,255,255,0.07);
          border-radius: 8px;
          padding: 10px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: #f8f9ff;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%;
        }

        .insc-input::placeholder { color: rgba(160,174,192,0.4); }

        .insc-input:focus {
          border-color: #c8102e;
          box-shadow: 0 0 0 3px rgba(200,16,46,0.15);
        }

        .insc-input-error { border-color: #c8102e !important; }

        .insc-error-text {
          font-size: 0.68rem;
          color: #f87171;
          margin-top: 4px;
          display: block;
        }

        .insc-divider {
          height: 1px;
          background: rgba(200,16,46,0.25);
          margin: 0 0 2rem;
        }

        .insc-check-grid {
          display: grid;
          gap: 0.6rem;
          margin-bottom: 2rem;
        }

        .insc-check-item {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #162a50;
          border: 1.5px solid rgba(255,255,255,0.06);
          border-radius: 8px;
          padding: 10px 14px;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          user-select: none;
        }

        .insc-check-item:hover {
          border-color: rgba(200,16,46,0.4);
          background: rgba(200,16,46,0.05);
        }

        .insc-check-item.checked {
          border-color: rgba(200,16,46,0.5);
          background: rgba(200,16,46,0.07);
        }

        .insc-checkbox {
          appearance: none;
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          min-width: 18px;
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 4px;
          background: transparent;
          cursor: pointer;
          transition: all 0.15s;
          position: relative;
        }

        .insc-checkbox:checked {
          background: #c8102e;
          border-color: #c8102e;
        }

        .insc-checkbox:checked::after {
          content: '';
          position: absolute;
          left: 4px; top: 1px;
          width: 6px; height: 10px;
          border: 2px solid #fff;
          border-top: none;
          border-left: none;
          transform: rotate(45deg);
        }

        .insc-evento-num {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #c8102e;
        }

        .insc-evento-name {
          font-size: 0.88rem;
          font-weight: 500;
          color: #f8f9ff;
        }

        .insc-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #9b0b22, #c8102e);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.15rem;
          letter-spacing: 2px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.1s, box-shadow 0.2s;
          box-shadow: 0 4px 24px rgba(200,16,46,0.3);
        }

        .insc-btn:hover {
          opacity: 0.92;
          box-shadow: 0 6px 32px rgba(200,16,46,0.45);
          transform: translateY(-1px);
        }

        .insc-btn:active { transform: translateY(0); }
        .insc-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .insc-btn-ok { background: #1a6b3a !important; }

        .insc-footer {
          text-align: center;
          margin-top: 1rem;
          font-size: 0.72rem;
          color: rgba(160,174,192,0.4);
          font-style: italic;
        }

        .insc-pruebas-error {
          font-size: 0.72rem;
          color: #f87171;
          margin-bottom: 0.75rem;
          display: block;
        }
      `}</style>

            <div className="insc-body">
                <div className="insc-card">

                    {/* HEADER */}
                    <div className="insc-header">
                        <div className="insc-badge">🏊 Liga Lensur</div>
                        <h1 className="insc-h1">
                            Inscripción Nadadores<br />Marea Roja
                        </h1>
                        <div className="insc-meta-grid">
                            {[
                                { label: "Fecha", value: evento.fecha },
                                { label: "Lugar", value: evento.lugar },
                                { label: "Hora", value: evento.hora },
                            ].map(({ label, value }) => (
                                <div key={label}>
                                    <span className="insc-meta-label">{label}</span>
                                    <span className="insc-meta-value">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* BODY */}
                    <div className="insc-body-inner">
                        <form onSubmit={handleSubmit} noValidate>

                            {/* Sección 1 */}
                            <div className="insc-section-label">Datos del Nadador</div>
                            <div className="insc-fields">
                                {[
                                    { id: "dni", label: "DNI", type: "text", placeholder: "12345678", name:"dni" },
                                    { id: "apellido", label: "Apellido", type: "text", placeholder: "García", name:"apellido" },
                                    { id: "nombre", label: "Nombre", type: "text", placeholder: "Martín", name:"nombre" },
                                ].map(({ id, label, type, placeholder }) => (
                                    <div key={id}>
                                        <label htmlFor={id} className="insc-field-label">{label}</label>
                                        <input
                                            id={id}
                                            name={id}
                                            type={type}
                                            placeholder={placeholder}
                                            value={form[id as keyof typeof form]}
                                            onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                                            className={`insc-input${errors[id] ? " insc-input-error" : ""}`}
                                        />
                                        {errors[id] && <span className="insc-error-text">{errors[id]}</span>}
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginBottom: "2rem" }}>
                                <label htmlFor="email" className="insc-field-label">E-mail</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="miemail@gmail.com"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className={`insc-input${errors.email ? " insc-input-error" : ""}`}
                                />
                                {errors.email && <span className="insc-error-text">{errors.email}</span>}
                            </div>



                            <div className="insc-divider" />

                            {/* Sección 2 */}
                            <div className="insc-section-label">Seleccionar Pruebas</div>
                            {errors.pruebas && (
                                <span className="insc-pruebas-error">{errors.pruebas}</span>
                            )}
                            <div className="insc-check-grid">
                                {evento.pruebas.map((prueba:any) => {
                                    const checked = pruebas.includes(prueba.id);
                                    return (
                                        <label
                                            key={prueba.id}
                                            className={`insc-check-item${checked ? " checked" : ""}`}
                                        >
                                            <input
                                                type="checkbox"
                                                className="insc-checkbox"
                                                checked={checked}
                                                onChange={() => togglePrueba(prueba.id)}
                                            />
                                            <div>
                                                <div className="insc-evento-num">Evento {prueba.id}</div>
                                                <div className="insc-evento-name">{prueba.nameEvento}</div>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>

                            {/* Botón */}
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className={`insc-btn${status === "ok" ? " insc-btn-ok" : ""}`}
                            >
                                {status === "loading"
                                    ? "Enviando..."
                                    : status === "ok"
                                        ? "✓ INSCRIPCIÓN ENVIADA"
                                        : "CONFIRMAR INSCRIPCIÓN"}
                            </button>

                            <p className="insc-footer">Liga Lensur · Marea Roja · 2025</p>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
}