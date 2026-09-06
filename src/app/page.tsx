import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Heart,
  Languages,
  MessageCircle,
  ClipboardList,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { getServicios, type Servicio } from "@/lib/api";
import { Reveal } from "@/components/Reveal";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { SpecialtiesMarquee } from "@/components/SpecialtiesMarquee";
import { TiltCard } from "@/components/TiltCard";
import { MomentsCarousel } from "@/components/MomentsCarousel";

const IDIOMA_LABEL: Record<Servicio["idioma"], string> = {
  ALEMAN: "Alemán",
  ESPANOL: "Español",
  INGLES: "Inglés",
};

const PROCESO = [
  {
    icon: MessageCircle,
    title: "Primer contacto",
    text: "Nos cuentas tu situación y resolvemos tus primeras dudas.",
  },
  {
    icon: ClipboardList,
    title: "Valoración inicial",
    text: "Evaluamos tus necesidades y objetivos con calma.",
  },
  {
    icon: Target,
    title: "Plan personalizado",
    text: "Diseñamos un tratamiento a tu medida, no una plantilla.",
  },
  {
    icon: TrendingUp,
    title: "Seguimiento",
    text: "Ajustamos el proceso según cómo evoluciona tu caso.",
  },
];

const RAZONES = [
  { icon: Heart, title: "Enfoque centrado en la persona", text: "Cada plan parte de tus objetivos, no al revés." },
  { icon: Users, title: "Comunicación cercana", text: "Contacto directo y cercano en todo el proceso." },
  { icon: Clock, title: "Horarios flexibles", text: "Buscamos el hueco que mejor encaje contigo." },
  { icon: Languages, title: "Atención multilingüe", text: "Sesiones en español, alemán e inglés." },
];

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
      <Hero />
      <SpecialtiesMarquee />

      {/* CARRUSEL */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <h2 className="text-2xl font-bold text-primary-dark">¿En qué podemos ayudarte?</h2>
          <p className="mt-2 text-foreground/70">Algunas de las áreas en las que trabajamos.</p>
        </Reveal>

        <div className="mt-8">
          <MomentsCarousel />
        </div>
      </section>

      {/* SERVICIOS DESTACADOS */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <h2 className="text-2xl font-bold text-primary-dark">Servicios destacados</h2>
          <p className="mt-2 text-foreground/70">Algunas de las cosas en las que podemos ayudarte.</p>
        </Reveal>

        {servicios === null && (
          <p className="mt-8 text-sm text-foreground/60">
            No se han podido cargar los servicios en este momento.
          </p>
        )}

        {servicios !== null && servicios.length === 0 && (
          <p className="mt-8 text-sm text-foreground/60">
            Próximamente publicaremos aquí nuestros servicios.
          </p>
        )}

        {servicios !== null && servicios.length > 0 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicios.map((servicio, i) => (
              <Reveal key={servicio.id} delay={i * 0.08}>
                <TiltCard className="h-full">
                  <article className="group h-full rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg hover:shadow-primary/10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Sparkles size={18} />
                    </div>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-accent">
                      {IDIOMA_LABEL[servicio.idioma]} · {servicio.duracionMinutos} min
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-foreground">
                      {servicio.nombre}
                    </h3>
                    {servicio.descripcion && (
                      <p className="mt-2 text-sm text-foreground/70">{servicio.descripcion}</p>
                    )}
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* COMO TRABAJAMOS */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-bold text-primary-dark">Cómo trabajamos</h2>
            <p className="mt-2 text-foreground/70">Un proceso claro, de principio a fin.</p>
          </Reveal>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESO.map((paso, i) => (
              <Reveal key={paso.title} delay={i * 0.08}>
                <div className="group relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
                    <paso.icon size={22} />
                  </div>
                  <p className="mt-4 text-xs font-semibold text-accent">
                    Paso {i + 1}
                  </p>
                  <h3 className="mt-1 font-semibold text-foreground">{paso.title}</h3>
                  <p className="mt-1 text-sm text-foreground/70">{paso.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUE ELEGIRNOS */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <h2 className="text-2xl font-bold text-primary-dark">¿Por qué elegirnos?</h2>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {RAZONES.map((razon, i) => (
            <Reveal key={razon.title} delay={i * 0.06}>
              <TiltCard>
                <div className="flex h-full gap-4 rounded-2xl border border-black/5 bg-white p-6 transition-shadow hover:shadow-md">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <razon.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{razon.title}</h3>
                    <p className="mt-1 text-sm text-foreground/70">{razon.text}</p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-center text-2xl font-bold text-primary-dark">
              Preguntas frecuentes
            </h2>
          </Reveal>
          <div className="mt-10">
            <Faq />
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden bg-primary-dark">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-primary-light/20 blur-3xl"
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-white">¿Hablamos?</h2>
          <p className="max-w-xl text-white/80">
            Cuéntanos qué necesitas y te responderemos lo antes posible.
          </p>
          <Link
            href="/contacto"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary-dark shadow-lg transition-all hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-xl"
          >
            Ir al formulario de contacto
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}
