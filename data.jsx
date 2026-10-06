/* ============================================================
   DATA — Portfolio Elena García
   Expone window.PORTFOLIO con proyectos, servicios, sectores, proceso.
   ============================================================ */
(function () {
  const PROJECTS = [
    {
      id: "balzar",
      cover: null,
      gallery: [],
      name: "Balzar Architects",
      cat: "Arquitectura",
      tags: ["UX/UI", "WordPress", "Editorial"],
      link: "https://balzararchitects.com/",
      objetivo:
        "Diseñar una web capaz de transmitir el carácter premium y arquitectónico del estudio, potenciando la calidad visual de sus proyectos y reforzando la percepción de marca.",
      trabajo: [
        "UX/UI Design",
        "Diseño editorial",
        "Arquitectura de información",
        "Diseño responsive",
        "Desarrollo WordPress",
        "Optimización visual",
      ],
      resultado:
        "Una experiencia digital elegante y minimalista donde la arquitectura se convierte en protagonista, utilizando espacios amplios, tipografía cuidada y una navegación limpia que transmite exclusividad y profesionalidad.",
    },
    {
      id: "parada",
      cover: "assets/parada.png",
      gallery: ["assets/parada-2.png"],
      name: "Parada Beach Camp",
      cat: "Hospitality · Turismo",
      tags: ["Branding", "UX/UI", "Conversión"],
      link: "https://paradabeachcamp.com/",
      objetivo:
        "Crear una web capaz de transmitir la experiencia única del glamping en Palawan y aumentar las reservas directas.",
      trabajo: [
        "Branding digital",
        "Diseño UX/UI",
        "Diseño web",
        "Desarrollo WordPress",
        "Estrategia visual",
        "Optimización de conversión",
      ],
      resultado:
        "Una web inmersiva enfocada en la experiencia del usuario, donde la naturaleza, la aventura y el alojamiento se presentan de forma clara y atractiva para aumentar el interés y las reservas.",
    },
    {
      id: "villakali",
      cover: "assets/villakali.png",
      gallery: [],
      name: "Villa Kali",
      cat: "Hospitality · Boutique",
      tags: ["Branding", "Dirección visual", "UX/UI"],
      link: null,
      objetivo:
        "Desarrollar la identidad digital de una villa boutique ubicada en plena naturaleza, enfocada en desconexión, tranquilidad y diseño mediterráneo orgánico.",
      trabajo: [
        "Branding",
        "Dirección visual",
        "Diseño UX/UI",
        "Diseño web",
        "Estrategia de comunicación",
      ],
      resultado:
        "Una propuesta visual cálida y emocional que transmite exclusividad, naturaleza y confort, alineada con el concepto de alojamiento boutique.",
    },
    {
      id: "batllori",
      cover: null,
      gallery: [],
      name: "Sandra Batllori Interiorismo",
      cat: "Interiorismo · Branding",
      tags: ["Branding", "Dirección de arte", "Social"],
      link: null,
      objetivo:
        "Crear una identidad visual elegante y coherente para una diseñadora de interiores orientada a proyectos residenciales premium.",
      trabajo: [
        "Branding",
        "Dirección de arte",
        "Diseño para redes sociales",
        "Diseño visual",
        "Estrategia de contenido",
      ],
      resultado:
        "Una identidad minimalista, sofisticada y atemporal capaz de transmitir lujo silencioso y profesionalidad.",
    },
    {
      id: "essedi",
      cover: null,
      gallery: [],
      name: "Essedi IT Consulting",
      cat: "Tecnología · Consultoría",
      tags: ["UX/UI", "Web", "Responsive"],
      link: "https://www.essedi.es/",
      objetivo:
        "Modernizar la presencia digital de la empresa y mejorar la comunicación de sus servicios tecnológicos.",
      trabajo: [
        "UX/UI",
        "Diseño web",
        "Arquitectura de información",
        "Optimización visual",
        "Responsive",
      ],
      resultado:
        "Una web más clara y profesional que facilita la comprensión de los servicios y mejora la percepción de la marca.",
    },
    {
      id: "gevotec",
      cover: "assets/gevotec.png",
      gallery: ["assets/gevotec-2.png"],
      name: "Gevotec",
      cat: "Tecnología · SEO",
      tags: ["SEO On-Page", "Arquitectura", "UX"],
      link: "https://gevotec.es/",
      objetivo:
        "Mejorar la estructura, usabilidad y posicionamiento de una empresa tecnológica.",
      trabajo: [
        "Optimización SEO On-Page",
        "Mejora de arquitectura web",
        "Reestructuración de contenidos",
        "Diseño visual",
        "UX",
      ],
      resultado:
        "Una web más organizada, comprensible y preparada para mejorar su visibilidad online.",
    },
    {
      id: "sauceman",
      cover: null,
      gallery: [],
      name: "The Sauce Man",
      cat: "Servicios · E-commerce",
      tags: ["UX/UI", "SEO", "Optimización"],
      link: "https://thesauceman.es/",
      objetivo: "Optimizar la presencia digital y mejorar la experiencia de usuario.",
      trabajo: [
        "UX/UI",
        "Optimización visual",
        "Revisión de estructura",
        "Mejoras SEO",
        "Ajustes técnicos",
      ],
      resultado:
        "Mejora de navegación, claridad visual y experiencia general del usuario.",
    },
    {
      id: "globaldream",
      cover: "assets/globaldream.png",
      gallery: ["assets/globaldream-2.png"],
      name: "Global Dream Network",
      cat: "ONG · Impacto social",
      tags: ["Producto", "UX/UI", "Branding"],
      link: "https://theglobaldreamnetwork.com/",
      objetivo:
        "Desarrollar una plataforma capaz de conectar proyectos sociales, medioambientales y empresas interesadas en generar impacto positivo.",
      trabajo: [
        "UX/UI",
        "Diseño de producto",
        "Arquitectura de información",
        "Diseño web",
        "Branding digital",
      ],
      resultado:
        "Una plataforma con enfoque social y corporativo capaz de transmitir confianza, transparencia e impacto.",
    },
    {
      id: "purplefish",
      cover: null,
      gallery: [],
      name: "Go Purple Fish",
      cat: "Servicios digitales",
      tags: ["UX/UI", "Web", "Responsive"],
      link: "https://gopurplefish.com/",
      objetivo:
        "Crear una presencia digital moderna y profesional para una empresa de servicios digitales.",
      trabajo: ["Diseño UX/UI", "Diseño web", "Optimización visual", "Responsive"],
      resultado:
        "Una web moderna y orientada a reforzar la credibilidad de la marca.",
    },
    {
      id: "natuurlijk",
      cover: "assets/natuurlijk.png",
      gallery: [],
      name: "Natuurlijk Schoon",
      cat: "Belleza · Bienestar",
      tags: ["UX Research", "UI", "Figma"],
      link: null,
      objetivo: "Diseñar la experiencia digital para un centro de belleza y bienestar.",
      trabajo: [
        "Investigación UX",
        "Wireframes",
        "Diseño UI",
        "Diseño responsive",
        "Sistema visual",
      ],
      resultado:
        "Una experiencia elegante y enfocada en transmitir bienestar, confianza y profesionalidad.",
    },
    {
      id: "alcaldia",
      cover: null,
      gallery: [],
      name: "Alcaldía Digital Panamá",
      cat: "Producto digital · Gobierno",
      tags: ["Producto", "UX/UI", "Arquitectura"],
      link: null,
      objetivo:
        "Diseñar una plataforma digital para conectar ciudadanos, negocios y servicios municipales.",
      trabajo: [
        "UX/UI",
        "Diseño de producto",
        "Arquitectura de información",
        "Sistemas de navegación",
        "Diseño responsive",
      ],
      resultado:
        "Una plataforma compleja organizada de forma intuitiva para facilitar el acceso a servicios públicos y privados.",
    },
    {
      id: "nutricion",
      cover: "assets/nutricion.png",
      gallery: [],
      name: "Nutrición y Bienestar",
      cat: "Salud · Nutrición",
      tags: ["UX/UI", "Web", "Responsive"],
      link: null,
      objetivo:
        "Crear una web enfocada en transmitir confianza, cercanía y profesionalidad dentro del sector salud y nutrición.",
      trabajo: [
        "Diseño UX/UI",
        "Diseño web",
        "Arquitectura de contenidos",
        "Responsive",
      ],
      resultado:
        "Una experiencia clara y accesible orientada a la captación de pacientes y consultas.",
    },
    {
      id: "granada",
      cover: "assets/granada.png",
      gallery: ["assets/granada-2.png"],
      name: "Granada Origen",
      cat: "Deporte · Club",
      tags: ["UX/UI", "WordPress", "Arquitectura"],
      link: "https://cdgranadaorigen.com/",
      objetivo:
        "Diseñar una web moderna y fácil de gestionar para un club deportivo, permitiendo comunicar información del club, captar nuevos jugadores y ofrecer una experiencia clara tanto para familias como para futuros integrantes de la academia.",
      trabajo: [
        "UX/UI Design",
        "Arquitectura de información",
        "Diseño web responsive",
        "WordPress",
        "Optimización de navegación",
        "Organización de contenidos",
      ],
      resultado:
        "Una web estructurada para facilitar el acceso a la información más importante del club, mejorando la experiencia de navegación tanto en escritorio como en dispositivos móviles. El proyecto se centró en crear una imagen más profesional y cercana, alineada con el crecimiento de la entidad deportiva.",
    },
  ];

  const SERVICES = [
    {
      n: "01",
      title: "Estrategia & UX",
      desc: "Entiendo el negocio antes que el píxel. Investigación, arquitectura de información y flujos pensados para el usuario y para los objetivos.",
      items: [
        "Investigación UX",
        "Arquitectura de información",
        "Diseño de producto digital",
        "Optimización de experiencia",
      ],
    },
    {
      n: "02",
      title: "Diseño UX/UI & Visual",
      desc: "Interfaces claras y atractivas, con un sistema visual coherente que comunica el valor de cada marca.",
      items: [
        "Diseño UX/UI",
        "Branding digital",
        "Diseño editorial",
        "Dirección de arte",
      ],
    },
    {
      n: "03",
      title: "Desarrollo Web",
      desc: "Maquetación y desarrollo en WordPress + Elementor, responsive y cuidado hasta el último detalle.",
      items: [
        "WordPress & Elementor",
        "Diseño web responsive",
        "Landing pages de conversión",
        "Mantenimiento",
      ],
    },
    {
      n: "04",
      title: "Crecimiento",
      desc: "Una web bonita que además funciona: optimizada para buscadores y orientada a generar oportunidades.",
      items: [
        "SEO On-Page",
        "Optimización de conversión (CRO)",
        "Mejora continua",
        "Analítica básica",
      ],
    },
    {
      n: "05",
      title: "Comunicación Visual & Sistemas",
      desc: "Apoyo a marcas y profesionales en la creación de contenido visual coherente con su identidad, con sistemas de plantillas y recursos para mantener una imagen profesional de forma sencilla.",
      items: [
        "Sistemas de plantillas editables",
        "Diseño de contenido para redes",
        "Adaptaciones visuales de marca",
        "Material promocional digital",
        "Recursos gráficos para campañas",
      ],
    },
  ];

  const SECTORS = [
    "Arquitectura",
    "Hospitality y turismo",
    "Hoteles y alojamientos",
    "Bienestar y salud",
    "Nutrición",
    "Belleza y estética",
    "Tecnología",
    "SaaS y producto digital",
    "Formación",
    "Consultoría",
    "Organizaciones deportivas",
    "ONG e impacto social",
    "Servicios profesionales",
  ];

  const PROCESS = [
    {
      n: "01",
      title: "Descubrimiento",
      desc: "Entendemos el negocio, los objetivos y a quién nos dirigimos. Sin esto, ningún diseño funciona.",
    },
    {
      n: "02",
      title: "Estrategia & arquitectura",
      desc: "Definimos estructura, contenidos y recorridos. Ordenar la información es la mitad del trabajo.",
    },
    {
      n: "03",
      title: "Diseño UX/UI",
      desc: "Wireframes, sistema visual y prototipo navegable. Decisiones de diseño con intención.",
    },
    {
      n: "04",
      title: "Desarrollo",
      desc: "Construcción en WordPress & Elementor, responsive y optimizado en cada dispositivo.",
    },
    {
      n: "05",
      title: "Optimización",
      desc: "SEO On-Page, mejoras de conversión y ajustes finos para que la web siga creciendo.",
    },
  ];

  const ABOUT =
    "Soy Elena, diseñadora UX/UI y desarrolladora web. Ayudo a marcas y profesionales a construir una presencia digital clara, cuidada y que funcione de verdad. Mi forma de trabajar une tres cosas que casi nunca van juntas: estrategia, diseño y desarrollo. Entiendo primero el negocio y a quién nos dirigimos, y desde ahí diseño y construyo webs y productos digitales intuitivos, bonitos y optimizados. He trabajado en sectores muy diversos —arquitectura, hospitality, salud, tecnología, deporte, consultoría— y en todos busco lo mismo: que la web no solo se vea bien, sino que comunique y convierta.";

  window.PORTFOLIO = { PROJECTS, SERVICES, SECTORS, PROCESS, ABOUT };
})();
