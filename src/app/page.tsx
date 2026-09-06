import Link from "next/link";
import { getServicios, type Servicio } from "@/lib/api";
import { siteConfig } from "@/lib/site-config";

const IDIOMA_LABEL: Record<Servicio["idioma"], string> = {
  ALEMAN: "Alemán",
  ESPANOL: "Español",
  INGLES: "Inglés",
};

async function loadServiciosDestacados(): Promise<Servicio[] | null> {
  try {
    const servicios = await getServicios();
    return servicios.slice(0, 3);
  } catch {
    return null;
  }
}

export default async function Home() {
  const servicios = await loadServiciosDestacados();

  return (
    <>
      <section className="bg-primary/5">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-20 sm:px-6 sm:py-28">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-primary-dark sm:text-5xl">
            {siteConfig.tagline}
          </h1>
          <p className="max-w-xl text-lg text-foreground/80">
            {siteConfig.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contacto"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Pide información
            </Link>
            <Link
              href="/servicios"
              className="rounded-full border border-primary/30 px-6 py-3 text-sm font-semibold text-primary-dark transition-colors hover:bg-primary/10"
            >
              Ver servicios
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-2xl font-bold text-primary-dark">Servicios destacados</h2>

        {servicios === null && (
          <p className="mt-4 text-sm text-foreground/60">
            No se han podido cargar los servicios en este momento.
          </p>
        )}

        {servicios !== null && servicios.length === 0 && (
          <p className="mt-4 text-sm text-foreground/60">
            Próximamente publicaremos aquí nuestros servicios.
          </p>
        )}

        {servicios !== null && servicios.length > 0 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicios.map((servicio) => (
              <article
                key={servicio.id}
                className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  {IDIOMA_LABEL[servicio.idioma]} · {servicio.duracionMinutos} min
                </p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {servicio.nombre}
                </h3>
                {servicio.descripcion && (
                  <p className="mt-2 text-sm text-foreground/70">{servicio.descripcion}</p>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="bg-primary-dark">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-white">¿Hablamos?</h2>
          <p className="max-w-xl text-white/80">
            Cuéntanos qué necesitas y te responderemos lo antes posible.
          </p>
          <Link
            href="/contacto"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary-dark transition-colors hover:bg-white/90"
          >
            Ir al formulario de contacto
          </Link>
        </div>
      </section>
    </>
  );
}
