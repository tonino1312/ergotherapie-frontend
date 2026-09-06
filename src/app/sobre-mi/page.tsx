import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, GraduationCap, Sparkles } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";

export const metadata = {
  title: "Sobre mí",
  description: "Conoce a Elena Antón, terapeuta ocupacional especializada en pediatría.",
};

const TITULACIONES = [
  {
    icon: GraduationCap,
    titulo: "Grado en Terapia Ocupacional",
    institucion: "Universidad Complutense de Madrid",
  },
  {
    icon: Award,
    titulo: "Postgrado en Intervención Temprana: Prevención, Diagnóstico y Tratamiento",
    institucion: "ISEP",
  },
  {
    icon: Sparkles,
    titulo:
      "Integración Sensorial e Introducción al Modelo DIR/Floortime y su integración en la práctica de la integración sensorial",
    institucion: "APETO",
  },
];

export default function SobreMiPage() {
  return (
    <>
      {/* INTRO */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-12 sm:grid-cols-[280px_1fr]">
          <Reveal>
            <div className="relative mx-auto h-56 w-56 sm:h-64 sm:w-64">
              <div
                aria-hidden
                className="absolute -inset-3 rounded-full bg-gradient-to-br from-primary-light/40 to-accent/30 blur-xl"
              />
              <Image
                src="/elena-anton.jpg"
                alt="Elena Antón, terapeuta ocupacional"
                fill
                className="relative rounded-full object-cover shadow-xl ring-4 ring-white"
                sizes="256px"
                priority
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary-dark">
              <Sparkles size={14} className="text-accent" />
              Sobre mí
            </span>
            <h1 className="mt-3 text-3xl font-bold text-primary-dark sm:text-4xl">
              Elena Antón
            </h1>
            <p className="mt-1 text-lg font-medium text-accent">
              Terapeuta Ocupacional especializada en Pediatría
            </p>
            <p className="mt-4 max-w-2xl text-foreground/80">
              Acompaño a niños, niñas y sus familias en el desarrollo de la autonomía
              necesaria para su día a día, combinando intervención temprana e
              integración sensorial en cada sesión, siempre desde un enfoque cercano
              y adaptado a cada persona.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/contacto"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-shadow hover:shadow-xl hover:shadow-primary/30"
              >
                Pide información
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/servicios"
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-6 py-3 text-sm font-semibold text-primary-dark transition-shadow hover:border-primary/40 hover:shadow-md"
              >
                Ver servicios
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TITULACIONES */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-bold text-primary-dark">Formación y titulaciones</h2>
            <p className="mt-2 text-foreground/70">Formación específica en terapia ocupacional pediátrica.</p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TITULACIONES.map((item, i) => (
              <Reveal key={item.titulo} delay={i * 0.08}>
                <TiltCard className="h-full">
                  <div className="flex h-full flex-col gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg hover:shadow-primary/10">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.titulo}</h3>
                      <p className="mt-1 text-sm font-medium text-accent">{item.institucion}</p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
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
