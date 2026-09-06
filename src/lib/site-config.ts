export const siteConfig = {
  name: "ErgoTerapia",
  tagline: "Terapia ocupacional para recuperar tu autonomía",
  description:
    "Consulta de terapia ocupacional centrada en la persona: evaluación, tratamiento y acompañamiento para el día a día.",
  contact: {
    // TODO: sustituir por los datos reales del negocio
    email: "info@ergoterapia.example",
    phone: "+34 600 000 000",
    whatsapp: "https://wa.me/34600000000",
  },
  nav: [
    { href: "/", label: "Inicio" },
    { href: "/servicios", label: "Servicios" },
    { href: "/sobre-mi", label: "Sobre mí" },
    { href: "/contacto", label: "Contacto" },
  ],
} as const;
