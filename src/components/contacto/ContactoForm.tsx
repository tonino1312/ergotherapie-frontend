"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary";
const labelClass = "mb-1 block text-sm font-medium text-foreground/80";

export function ContactoForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nombrePaciente, setNombrePaciente] = useState("");
  const [edadPaciente, setEdadPaciente] = useState("");
  const [motivoConsulta, setMotivoConsulta] = useState("");
  const [tratamientoPrevio, setTratamientoPrevio] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enviado, setEnviado] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          email,
          telefono: telefono || undefined,
          asunto: `Solicitud de información — ${nombrePaciente}`,
          nombrePaciente,
          edadPaciente: Number(edadPaciente),
          motivoConsulta,
          tratamientoPrevio: tratamientoPrevio || undefined,
          mensaje: mensaje || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.message ?? "No se pudo enviar el formulario. Inténtalo de nuevo.");
        setLoading(false);
        return;
      }

      setEnviado(true);
    } catch {
      setError("No se pudo conectar con el servidor. Inténtalo de nuevo en unos minutos.");
      setLoading(false);
    }
  }

  if (enviado) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-black/5 bg-white p-10 text-center shadow-sm">
        <CheckCircle2 size={40} className="text-primary" />
        <h3 className="text-lg font-semibold text-primary-dark">¡Mensaje enviado!</h3>
        <p className="max-w-sm text-sm text-foreground/70">
          Gracias por contarnos el caso. Te responderemos lo antes posible al email o
          teléfono que nos has facilitado.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contacto-nombre" className={labelClass}>
            Tu nombre
          </label>
          <input
            id="contacto-nombre"
            required
            maxLength={150}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={inputClass}
            placeholder="Nombre y apellidos"
          />
        </div>

        <div>
          <label htmlFor="contacto-email" className={labelClass}>
            Email
          </label>
          <input
            id="contacto-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="tucorreo@example.com"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contacto-telefono" className={labelClass}>
            Teléfono <span className="font-normal text-foreground/50">(opcional)</span>
          </label>
          <input
            id="contacto-telefono"
            type="tel"
            maxLength={30}
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className={inputClass}
            placeholder="+34 600 000 000"
          />
        </div>
      </div>

      <div className="mt-8 border-t border-black/5 pt-6">
        <h3 className="text-sm font-semibold text-primary-dark">Datos del paciente</h3>
        <p className="mt-1 text-xs text-foreground/60">
          Cuéntanos sobre la persona a la que queréis que atendamos, para poder valorar
          el caso antes de la primera cita.
        </p>

        <div className="mt-4 grid gap-5 sm:grid-cols-[2fr_1fr]">
          <div>
            <label htmlFor="contacto-paciente" className={labelClass}>
              Nombre del paciente
            </label>
            <input
              id="contacto-paciente"
              required
              maxLength={150}
              value={nombrePaciente}
              onChange={(e) => setNombrePaciente(e.target.value)}
              className={inputClass}
              placeholder="Nombre del niño/a o paciente"
            />
          </div>

          <div>
            <label htmlFor="contacto-edad" className={labelClass}>
              Edad
            </label>
            <input
              id="contacto-edad"
              type="number"
              required
              min={0}
              max={120}
              value={edadPaciente}
              onChange={(e) => setEdadPaciente(e.target.value)}
              className={inputClass}
              placeholder="Años"
            />
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="contacto-motivo" className={labelClass}>
            Motivo de la consulta
          </label>
          <textarea
            id="contacto-motivo"
            required
            rows={4}
            maxLength={3000}
            value={motivoConsulta}
            onChange={(e) => setMotivoConsulta(e.target.value)}
            className={`${inputClass} resize-none`}
            placeholder="Describe brevemente qué dificultades presenta o por qué buscáis terapia ocupacional"
          />
        </div>

        <div className="mt-5">
          <label htmlFor="contacto-tratamiento" className={labelClass}>
            Tratamiento previo <span className="font-normal text-foreground/50">(opcional)</span>
          </label>
          <textarea
            id="contacto-tratamiento"
            rows={3}
            maxLength={3000}
            value={tratamientoPrevio}
            onChange={(e) => setTratamientoPrevio(e.target.value)}
            className={`${inputClass} resize-none`}
            placeholder="¿Ha recibido antes logopedia, fisioterapia, otra terapia ocupacional...?"
          />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="contacto-mensaje" className={labelClass}>
          Algo más que quieras contarnos <span className="font-normal text-foreground/50">(opcional)</span>
        </label>
        <textarea
          id="contacto-mensaje"
          rows={3}
          maxLength={5000}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className={`${inputClass} resize-none`}
          placeholder="Horarios preferidos, dudas sobre el proceso, etc."
        />
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60 sm:w-auto"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        Enviar solicitud
      </button>
    </form>
  );
}
