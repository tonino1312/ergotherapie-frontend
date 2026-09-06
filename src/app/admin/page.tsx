import { CalendarClock, Mail, Sparkles, Users } from "lucide-react";
import { getSession } from "@/lib/session";

const SECCIONES = [
  { icon: Users, title: "Pacientes", text: "Gestiona el listado de pacientes y sus notas clínicas." },
  { icon: CalendarClock, title: "Citas", text: "Consulta y organiza la agenda del equipo." },
  { icon: Sparkles, title: "Servicios", text: "Edita el catálogo de servicios publicado en la web." },
  { icon: Mail, title: "Contacto", text: "Revisa los mensajes recibidos desde el formulario público." },
];

export default async function AdminHomePage() {
  const session = await getSession();

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-dark">
        Bienvenido, {session?.nombre?.split(" ")[0]}
      </h1>
      <p className="mt-1 text-foreground/70">
        Este es el panel de administración. Elige qué quieres gestionar.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SECCIONES.map((seccion) => (
          <div
            key={seccion.title}
            className="relative rounded-2xl border border-black/5 bg-white p-6 opacity-60"
          >
            <span className="absolute right-4 top-4 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
              Próximamente
            </span>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <seccion.icon size={20} />
            </div>
            <h2 className="mt-4 font-semibold text-foreground">{seccion.title}</h2>
            <p className="mt-1 text-sm text-foreground/70">{seccion.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
