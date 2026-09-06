"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQS = [
  {
    question: "¿Necesito una derivación médica para empezar?",
    answer:
      "No es imprescindible. Puedes escribirnos directamente y valoramos juntos cuál es el mejor punto de partida para tu caso.",
  },
  {
    question: "¿Cuánto dura una sesión?",
    answer:
      "Depende del servicio: la duración exacta de cada uno está indicada en la sección de Servicios.",
  },
  {
    question: "¿En qué idiomas se ofrece la terapia?",
    answer:
      "Trabajamos en español, alemán e inglés, según el servicio y el profesional disponible.",
  },
  {
    question: "¿Cómo reservo una cita?",
    answer:
      "Escríbenos desde el formulario de contacto contándonos qué necesitas y te responderemos para concretar los detalles.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-black/5 rounded-2xl border border-black/5 bg-white">
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-foreground">{faq.question}</span>
              <ChevronDown
                size={20}
                className={`shrink-0 text-primary transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-relaxed text-foreground/70">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
