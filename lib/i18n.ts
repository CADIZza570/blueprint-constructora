export type Lang = "en" | "es"

export const translations = {
  en: {
    nav: {
      services: "Services",
      projects:  "Projects",
      about:     "About",
      cta:       "Get a Quote",
    },
    hero: {
      tag:      "Columbus, Ohio",
      title:    "We Transform Your Home",
      subtitle: "Expert remodeling — kitchens, bathrooms, basements & full renovations. Quality craftsmanship, transparent pricing.",
      cta:      "Get a Free Quote",
      trust:    "100+ projects completed in Columbus",
    },
    services: {
      tag:      "What We Do",
      title:    "Full Remodeling Services",
      subtitle: "Every project, from a single bathroom to a complete home transformation.",
      items: [
        { title: "Kitchen Remodeling",  desc: "Custom cabinets, countertops, islands and full kitchen redesigns that add value and style." },
        { title: "Bathroom Renovation", desc: "Walk-in showers, tile work, vanities and complete bathroom makeovers." },
        { title: "Basement Finishing",  desc: "Turn your unfinished basement into a living space, home office or entertainment room." },
        { title: "Room Additions",      desc: "Expand your home with seamlessly integrated new rooms, sunrooms or garage conversions." },
        { title: "Full Home Renovation",desc: "Whole-house remodels that reimagine your space from the ground up." },
        { title: "Outdoor Spaces",      desc: "Decks, patios and outdoor kitchens to extend your living area." },
      ],
    },
    portfolio: {
      tag:      "Our Work",
      title:    "Recent Projects",
      subtitle: "A sample of what we've built for homeowners across Columbus.",
      items: [
        { title: "Modern Kitchen · Clintonville",  type: "Kitchen",   area: "280 sqft" },
        { title: "Master Bath · Upper Arlington",   type: "Bathroom",  area: "95 sqft"  },
        { title: "Basement Suite · Worthington",    type: "Basement",  area: "600 sqft" },
        { title: "Open Floor Plan · Short North",   type: "Full Home", area: "1,400 sqft"},
        { title: "Sunroom Addition · Bexley",       type: "Addition",  area: "220 sqft" },
        { title: "Outdoor Kitchen · Dublin",        type: "Outdoor",   area: "180 sqft" },
      ],
    },
    about: {
      tag:     "About Us",
      title:   "Built on Trust, Finished with Pride",
      body:    "Ventura Construcciones was founded by a team of craftsmen who believe a remodel should feel easy for the homeowner. We handle permits, timelines and communication so you can focus on the exciting part — watching your home transform.",
      values:  ["Licensed & Insured", "On-time Delivery", "Transparent Pricing", "5-Year Workmanship Warranty"],
    },
    cta: {
      title:    "Ready to Start Your Project?",
      subtitle: "Tell us about your home and we'll send you a detailed estimate within 48 hours — no commitment needed.",
      button:   "Request a Free Quote",
    },
    footer: {
      rights: "All rights reserved.",
      location: "Columbus, Ohio",
    },
  },
  es: {
    nav: {
      services: "Servicios",
      projects:  "Proyectos",
      about:     "Nosotros",
      cta:       "Cotizar",
    },
    hero: {
      tag:      "Columbus, Ohio",
      title:    "Transformamos Tu Hogar",
      subtitle: "Remodelaciones expertas — cocinas, baños, sótanos y renovaciones completas. Calidad artesanal, precios transparentes.",
      cta:      "Solicitar Cotización Gratis",
      trust:    "Más de 100 proyectos completados en Columbus",
    },
    services: {
      tag:      "Qué Hacemos",
      title:    "Servicios Completos de Remodelación",
      subtitle: "Cada proyecto, desde un baño hasta la transformación completa de tu hogar.",
      items: [
        { title: "Remodelación de Cocina",    desc: "Gabinetes a medida, encimeras, islas y rediseños completos que añaden valor y estilo." },
        { title: "Renovación de Baño",        desc: "Duchas de vidrio, azulejos, vanidades y transformaciones completas de baño." },
        { title: "Acabado de Sótano",         desc: "Convierte tu sótano en sala, oficina en casa o sala de entretenimiento." },
        { title: "Adiciones de Cuartos",      desc: "Ampliamos tu hogar con nuevas habitaciones, soláriums o conversiones de garaje." },
        { title: "Renovación Total del Hogar",desc: "Remodelaciones completas que reimaginan tu espacio desde cero." },
        { title: "Espacios Exteriores",       desc: "Decks, patios y cocinas exteriores para extender tu área de vida." },
      ],
    },
    portfolio: {
      tag:      "Nuestro Trabajo",
      title:    "Proyectos Recientes",
      subtitle: "Una muestra de lo que hemos construido para propietarios en Columbus.",
      items: [
        { title: "Cocina Moderna · Clintonville",     type: "Cocina",      area: "26 m²" },
        { title: "Baño Principal · Upper Arlington",  type: "Baño",        area: "9 m²"  },
        { title: "Suite Sótano · Worthington",        type: "Sótano",      area: "56 m²" },
        { title: "Planta Abierta · Short North",      type: "Hogar Completo", area: "130 m²"},
        { title: "Solarium · Bexley",                 type: "Adición",     area: "20 m²" },
        { title: "Cocina Exterior · Dublin",          type: "Exterior",    area: "17 m²" },
      ],
    },
    about: {
      tag:     "Nosotros",
      title:   "Construidos en Confianza, Terminados con Orgullo",
      body:    "Ventura Construcciones fue fundada por artesanos que creen que una remodelación debe ser fácil para el propietario. Nos encargamos de permisos, plazos y comunicación para que te enfoques en la parte emocionante — ver cómo tu hogar se transforma.",
      values:  ["Licenciados y Asegurados", "Entrega a Tiempo", "Precios Transparentes", "5 Años de Garantía"],
    },
    cta: {
      title:    "¿Listo para Empezar tu Proyecto?",
      subtitle: "Cuéntanos sobre tu hogar y te enviamos un presupuesto detallado en 48 horas — sin compromiso.",
      button:   "Solicitar Cotización Gratis",
    },
    footer: {
      rights: "Todos los derechos reservados.",
      location: "Columbus, Ohio",
    },
  },
} satisfies Record<Lang, unknown>

export type Translations = typeof translations.en
