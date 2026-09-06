"use client";

import Marquee from "react-fast-marquee";
import { Sparkle } from "lucide-react";

const ITEMS = [
  "Integración sensorial",
  "Motricidad fina",
  "Autonomía en el día a día",
  "Terapia individual",
  "Grupos de juego",
  "Apoyo multilingüe",
  "Acompañamiento familiar",
];

export function SpecialtiesMarquee() {
  return (
    <div className="border-y border-primary-dark/10 bg-primary-dark py-3">
      <Marquee autoFill speed={35} gradient={false}>
        {ITEMS.map((item) => (
          <span key={item} className="mx-6 flex items-center gap-2 text-sm font-medium text-white/90">
            <Sparkle size={14} className="text-accent" />
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
