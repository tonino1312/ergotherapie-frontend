"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  ChevronLeft,
  ChevronRight,
  Hand,
  HeartHandshake,
  Home,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Imagen } from "@/lib/api";

type IllustratedSlide = {
  icon: LucideIcon;
  title: string;
  text: string;
  gradient: string;
};

const ILLUSTRATED_SLIDES: IllustratedSlide[] = [
  {
    icon: Home,
    title: "Autonomía en el día a día",
    text: "Vestirse, cocinar, organizarse: trabajamos lo que marca la diferencia en tu rutina.",
    gradient: "from-primary to-primary-light",
  },
  {
    icon: Hand,
    title: "Motricidad fina",
    text: "Precisión, fuerza y coordinación para tareas manuales de todo tipo.",
    gradient: "from-accent to-primary",
  },
  {
    icon: Sparkles,
    title: "Integración sensorial",
    text: "Ayudamos a procesar y responder mejor a los estímulos del entorno.",
    gradient: "from-primary-dark to-primary",
  },
  {
    icon: Wrench,
    title: "Adaptación del entorno",
    text: "Ajustamos espacios y herramientas para que trabajen a tu favor.",
    gradient: "from-accent to-primary-light",
  },
  {
    icon: HeartHandshake,
    title: "Acompañamiento emocional",
    text: "El bienestar emocional forma parte del proceso, no es un extra.",
    gradient: "from-primary to-accent",
  },
];

export function MomentsCarousel({ fotos }: { fotos?: Imagen[] }) {
  const usaFotosReales = !!fotos && fotos.length > 0;
  const total = usaFotosReales ? fotos.length : ILLUSTRATED_SLIDES.length;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    queueMicrotask(onSelect);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-[2rem]" ref={emblaRef}>
        <div className="flex">
          {usaFotosReales
            ? fotos!.map((foto, i) => (
                <div key={foto.id} className="relative min-w-0 flex-[0_0_100%]">
                  <div className="relative h-[380px] overflow-hidden sm:h-[420px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={foto.url}
                      alt={foto.textoAlternativo}
                      className="h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

                    <span className="absolute right-6 top-6 font-mono text-xs text-white/70 sm:right-8 sm:top-8">
                      {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>

                    <p className="absolute bottom-6 left-6 right-6 max-w-md rounded-2xl border border-white/20 bg-white/10 p-4 text-sm text-white backdrop-blur-md sm:bottom-8 sm:left-8">
                      {foto.textoAlternativo}
                    </p>
                  </div>
                </div>
              ))
            : ILLUSTRATED_SLIDES.map((slide, i) => (
                <div key={slide.title} className="relative min-w-0 flex-[0_0_100%]">
                  <div
                    className={`relative flex h-[380px] flex-col justify-end overflow-hidden bg-gradient-to-br p-8 sm:h-[420px] sm:p-10 ${slide.gradient}`}
                  >
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-[0.15] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-black/10 blur-3xl"
                    />

                    <span className="absolute right-6 top-6 font-mono text-xs text-white/60 sm:right-8 sm:top-8">
                      {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>

                    <div className="relative max-w-md rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white">
                        <slide.icon size={20} />
                      </div>
                      <h3 className="mt-4 text-xl font-bold text-white">{slide.title}</h3>
                      <p className="mt-1.5 text-sm text-white/85">{slide.text}</p>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Anterior"
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-primary-dark shadow-md backdrop-blur transition-colors hover:bg-white"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        aria-label="Siguiente"
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-primary-dark shadow-md backdrop-blur transition-colors hover:bg-white"
      >
        <ChevronRight size={20} />
      </button>

      <div className="mt-5 flex justify-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir a la diapositiva ${i + 1}`}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-2 rounded-full transition-all ${
              i === selected ? "w-6 bg-primary" : "w-2 bg-primary/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
