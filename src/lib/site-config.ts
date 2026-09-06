export const siteConfig = {
  name: "ErgoTerapia",
  tagline: "Terapia ocupacional para recuperar tu autonomía",
  description:
    "Consulta de terapia ocupacional centrada en la persona: evaluación, tratamiento y acompañamiento para el día a día.",
  contact: {
    email: "info@ergotherapie-kids.de",
    phone: "+49 (0) 1625203634",
    whatsapp: "https://wa.me/491625203634",
  },
  nav: [
    { href: "/", label: "Inicio" },
    { href: "/servicios", label: "Servicios" },
    { href: "/sobre-mi", label: "Sobre mí" },
    { href: "/contacto", label: "Contacto" },
  ],
} as const;
