import { Mail, MessageCircle, Phone, Sparkles } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ContactoForm } from "@/components/contacto/ContactoForm";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Contacto",
  description: "Cuéntanos el caso de tu hijo/a y te responderemos lo antes posible.",
};

export default function ContactoPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary-dark">
          <Sparkles size={14} className="text-accent" />
          Contacto
        </span>
        <h1 className="mt-3 max-w-xl text-3xl font-bold text-primary-dark sm:text-4xl">
          Cuéntanos el caso
        </h1>
        <p className="mt-3 max-w-xl text-foreground/80">
          Cuantos más detalles nos des sobre el niño o la niña y su situación, mejor
          podremos orientaros desde el primer contacto.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_2fr]">
        <Reveal delay={0.05}>
          <div className="space-y-6 lg:sticky lg:top-24">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Email</p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-sm text-foreground/70 hover:text-primary"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Teléfono</p>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-sm text-foreground/70 hover:text-primary"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MessageCircle size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">WhatsApp</p>
                <a
                  href={siteConfig.contact.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-foreground/70 hover:text-primary"
                >
                  Escríbenos directamente
                </a>
              </div>
            </div>

            <p className="text-xs text-foreground/50">
              Los datos que nos facilites se usan únicamente para valorar el caso y
              responder a tu solicitud.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactoForm />
        </Reveal>
      </div>
    </section>
  );
}
