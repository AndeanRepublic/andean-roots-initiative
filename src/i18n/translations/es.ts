import type { AboutTagIconKey, ContactSocialPlatform } from '../types';

const es = {
  common: {
    socialLinks: [
      {
        platform: 'twitter' as ContactSocialPlatform,
        ariaLabel: 'X (Twitter)',
        href: 'https://twitter.com',
      },
      {
        platform: 'facebook' as ContactSocialPlatform,
        ariaLabel: 'Facebook',
        href: 'https://facebook.com',
      },
      {
        platform: 'instagram' as ContactSocialPlatform,
        ariaLabel: 'Instagram',
        href: 'https://instagram.com',
      },
      {
        platform: 'linkedin' as ContactSocialPlatform,
        ariaLabel: 'LinkedIn',
        href: 'https://linkedin.com',
      },
    ],
    whatsappHref: 'https://wa.me/51984000000',
    floatingDonateLabel: 'Donar ahora',
    floatingWhatsappAriaLabel: 'Contáctanos por WhatsApp',
  },
  header: {
    brandAriaLabel: 'Andean Roots Initiative - Inicio',
    mobileMenuAriaLabel: 'Abrir navegación',
    navLinks: [
      { label: 'Home', slug: 'Home' },
      { label: 'Sobre nosotros', slug: 'About' },
      { label: 'Programas', slug: 'programs' },
      { label: 'Contacto', slug: 'contact' },
    ],
  },

  hero: {
    titleTop: 'Raíces andinas',
    titleBottom: 'que transforman el futuro',
    subheading:
      'Impulsamos educación, innovación y emprendimiento en comunidades andinas para generar oportunidades sostenibles y conectar el talento local con el mundo.',
    ctaText: 'SÉ UN ALIADO',
    ctaHref: '#impacto',
    scrollLabel: 'SCROLL DOWN',
    scrollAriaLabel: 'Desplazarse hacia abajo',
  },

  challenge: {
    label: 'EL DESAFÍO QUE ENFRENTAMOS',
    firstCardCoverSrc: '/home-assets/Problem/card_cover_1.png',
    secondCardCoverSrc: '/home-assets/Problem/card_cover_2.png',
    thirdCardCoverSrc: '/home-assets/Problem/card_cover_3.png',
    introStart:
      'Muchas comunidades andinas enfrentan barreras para acceder a educación de calidad, herramientas tecnológicas y oportunidades económicas.',
    introMutedStart:
      ' A pesar del enorme potencial cultural y productivo de los Andes, existe una ',
    introHighlight: 'brecha significativa',
    introEnd: ' que limita el desarrollo sostenible.',
    firstCardTitle: 'ACCESO LIMITADO A LA EDUCACIÓN DEL FUTURO',
    firstCardHeadline: 'Barrera',
    firstCardDescription:
      'La brecha digital y la falta de formación en habilidades STEAM y tecnologías emergentes limitan las oportunidades de jóvenes en zonas rurales.',
    secondCardTitle: 'Paradoja',
    secondCardDescription:
      'Los productores poseen un enorme potencial productivo y cultural, pero carecen de acceso a herramientas de calidad y mercados sostenibles.',
    thirdCardTag: 'Tradición, estancamiento, riesgo',
    thirdCardTitle: 'El trabajo que no genera riqueza',
    thirdCardDescription:
      'Sin acceso a mercados digitales, los mejores productos del mundo son invisibles.',
    secondCardImageAlt: 'Comunidad andina en un espacio rural',
    thirdCardImageAlt: 'Manos de artesano andino',
  },

  about: {
    label: 'SOBRE LA INICIATIVA',
    titleTop: 'Arquitectos del',
    titleBottom: 'Desarrollo andino',
    tags: [
      { label: 'Educación del futuro', icon: 'computer' as AboutTagIconKey },
      { label: 'Desarrollo productivo', icon: 'gear' as AboutTagIconKey },
      { label: 'Acceso a mercados', icon: 'cart' as AboutTagIconKey },
      { label: 'Tecnologías emergentes', icon: 'bulb' as AboutTagIconKey },
      { label: 'Alianzas estratégicas', icon: 'handshake' as AboutTagIconKey },
      { label: 'Estándares de calidad', icon: 'target' as AboutTagIconKey },
    ],
    description:
      'Andean Roots Initiative es una plataforma de innovación social que opera en la intersección del talento local y las oportunidades globales. Nuestro modelo fortalece comunidades andinas mediante un sistema de tres dimensiones: desarrollamos capacidades en habilidades digitales y productivas, articulamos alianzas con instituciones clave y garantizamos el acceso a mercados competitivos. No solo impulsamos emprendimientos; construimos las cadenas de valor sostenibles que el futuro exige.',
    originTitle: 'EL ORIGEN DEL CAMBIO',
    originDescription:
      'Descubre la historia y los valores que impulsan nuestra misión de transformar los Andes a través de la innovación social.',
    originCtaText: 'CONOCE MÁS SOBRE NOSOTROS',
    originCtaHref: 'About',
    bannerImageAlt: 'Miembros de la iniciativa en comunidad andina',
  },

  action: {
    label: 'NUESTRA ACCIÓN',
    headingTop: 'Transformando el talento en',
    headingBottom: 'Oportunidad sostenible',
    subheading:
      'Impulsamos programas que cierran la brecha entre el potencial rural y los mercados globales, integrando educación tecnológica con desarrollo productivo de alto nivel.',
    programs: [
      {
        imageSrc: '/home-assets/Actions/education-img.png',
        imageAlt: 'Formación digital en comunidad andina',
        title: 'Educación del futuro',
        description:
          'Formamos a jóvenes en habilidades digitales y pensamiento crítico, preparándolos para liderar la economía digital desde sus comunidades.',
        icon: 'computer' as const,
      },
      {
        imageSrc: '/home-assets/Actions/development-img.png',
        imageAlt: 'Participante del programa de desarrollo productivo',
        title: 'Desarrollo productivo',
        description:
          'Elevamos la competitividad local mediante innovación en diseño de producto, estándares de calidad y branding con identidad cultural.',
        icon: 'gear' as const,
      },
      {
        imageSrc: '/home-assets/Actions/estrategic-img.png',
        imageAlt: 'Alianza estratégica para desarrollo territorial',
        title: 'Articulación estratégica',
        description:
          'Actuamos como motor de enlace entre gobiernos y empresas privadas para financiar y escalar el desarrollo territorial.',
        icon: 'chess' as const,
      },
      {
        imageSrc: '/home-assets/Actions/market-img.png',
        imageAlt: 'Acceso a mercados digitales para productos andinos',
        title: 'Acceso a mercados',
        description:
          'Conectamos el talento andino con plataformas de comercio electrónico y canales de exportación para asegurar ingresos justos y sostenibles.',
        icon: 'cart' as const,
      },
    ],
  },

  numbers: {
    description:
      'Sincronizamos el talento andino con la economía global para crear un impacto territorial sostenible.',
    stats: [
      { value: '5+', label: 'Comunidades articuladas y fortalecidas' },
      { value: '10+', label: 'Emprendedores con acceso a mercado' },
      { value: '100%', label: 'Comercio justo garantizado para productores y emprendedores' },
    ],
  },

  strategicPrograms: {
    label: 'PROGRAMAS ESTRATÉGICOS',
    heading: 'Innovación social en acción',
    ctaText: 'VER TODOS LOS PROGRAMAS',
    ctaSlug: 'programs',
    location: 'Cusco, Perú',
    readMoreText: 'LEER MÁS',
    readMoreHref: '#program-detail',
    items: [
      {
        title: 'Andean Future Lab',
        imageSrc: '/home-assets/Programs/andean-future-lab-img.png',
        imageAlt: 'Jóvenes participando en sesión de trabajo',
        description:
          'Empoderamos a la juventud andina con habilidades en STEAM, inteligencia artificial y pensamiento crítico, cerrando brechas tecnológicas en zonas rurales.',
        metrics: [
          { label: 'JÓVENES CAPACITADOS', value: '50+' },
          { label: 'IMPACTO', value: 'Aumento en habilidades digitales' },
        ],
      },
      {
        title: 'Andean Makers Program',
        imageSrc: '/home-assets/Programs/andean-makers-program-img.png',
        imageAlt: 'Programa de tejido y producción artesanal',
        description:
          'Fortalecemos la competitividad de artesanos y productores con innovación en diseño, control de calidad premium y branding cultural.',
        metrics: [
          { label: 'PRODUCTORES FORTALECIDOS', value: '100+' },
          { label: 'COMUNIDADES FORTALECIDAS', value: '5+' },
          { label: 'IMPACTO', value: 'Mejora en rentabilidad productiva' },
        ],
      },
      {
        title: 'Andean Market Access',
        imageSrc: '/home-assets/Programs/andean-market-access-img.png',
        imageAlt: 'Alianza comercial para acceso a mercado',
        description:
          'Articulamos la conexión con mercados de alto valor, ferias comerciales y el marketplace Andean Republic, asegurando comercio justo y sostenible.',
        metrics: [
          { label: 'EMPRENDIMIENTOS CONECTADOS', value: '10+' },
          { label: 'ALIANZAS COMERCIALES', value: '12 empresas compradoras' },
          { label: 'INGRESOS GENERADOS', value: 'S/ 50 000+' },
        ],
      },
    ],
  },

  partners: {
    label: 'NUESTROS COLABORADORES',
    description:
      'Sumamos esfuerzos con instituciones que comparten nuestra visión de un mundo donde el talento andino no tiene fronteras ni brechas tecnológicas.',
    logos: [
      { src: '/home-assets/Partners/Logo 1.png', alt: 'Logo de institución colaboradora' },
      { src: '/home-assets/Partners/Logo 2.png', alt: 'Logo de institución colaboradora' },
      { src: '/home-assets/Partners/Logo 3.png', alt: 'Logo de institución colaboradora' },
      { src: '/home-assets/Partners/Logo 4.png', alt: 'Logo de institución colaboradora' },
    ],
  },

  cta: {
    title: 'Transformemos juntos el territorio andino',
    description:
      'Únete como aliado estratégico y ayúdanos a conectar el talento de nuestras comunidades con las oportunidades de la economía global.',
    ctaText: 'SÉ UN ALIADO',
    ctaSlug: 'contact',
    donateText: 'DONAR AHORA',
  },

  footer: {
    quickLinksTitle: 'Enlaces rápidos',
    quickLinks: [
      { label: 'Home', slug: 'Home' },
      { label: 'Sobre nosotros', slug: 'About' },
      { label: 'Programas', slug: 'programs' },
      { label: 'Contacto', slug: 'contact' },
    ],
    supportTitle: 'Soporte',
    supportLinks: [
      { label: 'Política de privacidad', href: '#' },
      { label: 'Términos y condiciones', slug: 'terms' },
    ],
    contactsTitle: 'Contacto',
    contacts: {
      email: { label: 'hello@onearth.com', href: 'mailto:hello@onearth.com' },
      phone: { label: '(123) 456-7890', href: 'tel:+11234567890' },
    },
    socialLinks: [
      { label: 'IG', href: '#' },
      { label: 'FB', href: '#' },
      { label: 'YT', href: '#' },
    ],
    copyright: '© 2026 Andean Roots Initiative. Todos los derechos reservados.',
  },

  aboutPage: {
    hero: {
      backgroundImageSrc: '/about-assets/hero/hero-img.png',
      backgroundImageAlt: 'Comunidad andina en paisaje rural',
      title: 'Sobre nosotros',
      breadcrumbAriaLabel: 'Ruta de navegación',
      breadcrumb: [
        { label: 'Home', slug: 'Home' },
        { label: 'Sobre nosotros', slug: 'About', current: true },
      ],
    },
    history: {
      title: 'Nuestra historia',
      cards: [
        {
          imageSrc: '/about-assets/history/history-1.png',
          imageAlt: 'Mujer andina en campo de cultivo',
          offsetClass: 'desktop:pt-16',
          paragraphs: [
            'En los Andes, el talento está en todas partes. En las manos que tejen, en quienes cultivan la tierra, en jóvenes con ideas y ganas de aprender.',
            'Pero durante años, ese talento ha crecido con oportunidades limitadas, sin acceso a educación de calidad, herramientas tecnológicas o caminos claros para desarrollarse.',
          ],
        },
        {
          imageSrc: '/about-assets/history/history-2.png',
          imageAlt: 'Joven andina mostrando artesanía',
          offsetClass: '',
          paragraphs: [
            'Con el tiempo, una idea se vuelve evidente: el desafío no es la falta de talento, sino la falta de oportunidades para potenciarlo.',
            'En cada comunidad hay creatividad, conocimiento y capacidad, pero sin acceso a formación, innovación y conexiones, ese potencial difícilmente logra proyectarse más allá de su propio territorio.',
          ],
        },
        {
          imageSrc: '/about-assets/history/history-3.png',
          imageAlt: 'Niña andina con vestimenta tradicional',
          offsetClass: 'desktop:pt-35',
          paragraphs: [
            'Es desde esta realidad que nace Andean Roots Initiative.',
            'Una iniciativa que busca cerrar esa brecha, fortaleciendo capacidades locales y construyendo un puente entre las comunidades andinas y las oportunidades del mundo actual.',
          ],
        },
      ],
    },
    organization: {
      label: 'NUESTRA ORGANIZACIÓN',
      title: 'Nuestro propósito y visión',
      coverImageSrc: '/about-assets/mision-vision/mission-vision.png',
      coverImageAlt: 'Representante andino en paisaje altoandino',
      points: [
        {
          title: 'MISIÓN',
          description:
            'Impulsar la educación, la innovación y el emprendimiento en comunidades andinas, fortaleciendo sus capacidades y generando oportunidades sostenibles que contribuyan al desarrollo territorial.',
          iconSrc: '/about-assets/mision-vision/flag-icon.png',
          iconAlt: 'Icono de bandera',
        },
        {
          title: 'VISIÓN',
          description:
            'Ser una organización referente en América Latina en innovación social y desarrollo comunitario, promoviendo un modelo sostenible que conecte el talento de los territorios andinos con oportunidades globales.',
          iconSrc: '/about-assets/mision-vision/target-icon.png',
          iconAlt: 'Icono de objetivo',
        },
      ],
    },
    values: {
      label: 'NUESTROS VALORES',
      title: 'Lo que nos mueve',
      description:
        'Nuestros valores guían cada acción, decisión y colaboración que impulsamos en las comunidades andinas.',
      items: [
        {
          title: 'Compromiso',
          description:
            'Actuamos con responsabilidad y compromiso para generar un impacto real y sostenible en las comunidades andinas, construyendo soluciones que perduren en el tiempo.',
          icon: 'commitment' as const,
        },
        {
          title: 'Identidad cultural',
          description:
            'Reconocemos y valoramos el conocimiento, las tradiciones y la riqueza cultural de los Andes como base para un desarrollo auténtico y sostenible.',
          icon: 'chakana' as const,
        },
        {
          title: 'Colaboración',
          description:
            'Creemos en el trabajo conjunto entre comunidades, instituciones y aliados estratégicos para generar impacto real y duradero.',
          icon: 'handshake' as const,
        },
      ],
    },
    focus: {
      label: 'ENFOQUE',
      title: 'Fortaleciendo capacidades locales',
      description:
        'Creemos que el desarrollo sostenible en los Andes no depende únicamente de recursos externos, sino de potenciar el talento, la identidad y las capacidades que ya existen en las comunidades, conectándolas con oportunidades reales.',
      sideImages: [
        {
          src: '/about-assets/enfoque/enfoque-1.png',
          alt: 'Equipo local en actividad comunitaria',
        },
        {
          src: '/about-assets/enfoque/enfoque-2.png',
          alt: 'Comunidad andina en paisaje montañoso',
        },
      ],
      cards: [
        {
          title: 'Desarrollo desde lo local',
          description:
            'Trabajamos desde el conocimiento, la cultura y las capacidades propias de cada comunidad.',
          icon: 'group' as const,
          offsetClass: 'desktop:self-start',
        },
        {
          title: 'Innovación con propósito',
          description:
            'Integramos tecnología, educación e innovación para generar soluciones relevantes y sostenibles.',
          icon: 'bulb' as const,
          offsetClass: 'desktop:self-end',
        },
        {
          title: 'Articulación de actores',
          description: 'Conectamos comunidades con empresas, instituciones y aliados estratégicos.',
          icon: 'handshake' as const,
          offsetClass: 'desktop:self-end',
        },
        {
          title: 'Sostenibilidad a largo plazo',
          description:
            'Buscamos generar capacidades que permanezcan en el tiempo y no dependan de intervenciones externas.',
          icon: 'sustainability' as const,
          offsetClass: 'desktop:self-start',
        },
      ],
    },
    team: {
      backgroundWord: 'TEAM',
      label: 'EL EQUIPO DETRÁS DE LA INICIATIVA',
      description:
        'Un equipo que cree en el talento de los Andes y trabaja para convertirlo en oportunidades reales.',
      members: [
        {
          name: 'Daniel Yupanqui',
          role: 'Fundador y director',
          imageSrc: '/about-assets/team/team-1.png',
          imageAlt: 'Retrato de Daniel Yupanqui',
          offsetClass: 'desktop:pt-20',
        },
        {
          name: 'Cecilia Núñez',
          role: 'Gerente de operaciones',
          imageSrc: '/about-assets/team/team-2.png',
          imageAlt: 'Retrato de Cecilia Núñez',
          offsetClass: '',
        },
        {
          name: 'Ruth Arce',
          role: 'Desarrolladora de proyectos',
          imageSrc: '/about-assets/team/team-3.png',
          imageAlt: 'Retrato de Ruth Arce',
          offsetClass: 'desktop:pt-20',
        },
        {
          name: 'Marcelo Luna',
          role: 'Diseñador',
          imageSrc: '/about-assets/team/team-4.png',
          imageAlt: 'Retrato de Marcelo Luna',
          offsetClass: '',
        },
      ],
      slider: {
        current: '01',
        total: '03',
        prevAriaLabel: 'Anterior',
        nextAriaLabel: 'Siguiente',
      },
    },
  },

  programsPage: {
    meta: {
      title: 'Programas | Andean Roots Initiative',
      description:
        'Conoce nuestros programas estratégicos para impulsar educación, innovación y acceso a mercados en comunidades andinas.',
    },
    hero: {
      backgroundImageSrc: '/programs-assets/programs-hero.png',
      backgroundImageAlt: 'Comunidades andinas en una jornada cultural',
      title: 'Nuestros programas',
      breadcrumbAriaLabel: 'Ruta de navegación',
      breadcrumb: [
        { label: 'Home', slug: 'Home' },
        { label: 'Programas', slug: 'programs', current: true },
      ],
    },
    intro: {
      titleLeading: 'Grandes retos. ',
      titleMiddle: ' No hay problema.',
      titleTrailingStart: 'Tenemos ',
      titleTrailingEmphasis: 'ideas aún más grandes.',
      descriptionLead:
        'En Andean Roots Initiative diseñamos programas que responden directamente a las necesidades de las comunidades andinas.',
      descriptionMutedA: ' A través de educación, tecnología y desarrollo productivo',
      descriptionMiddle: ', buscamos cerrar brechas y generar oportunidades sostenibles ',
      descriptionMutedB: 'que nacen desde el propio contexto local.',
      stats: [
        { value: '300+', label: 'Beneficiarios' },
        { value: '5+', label: 'Comunidades articuladas' },
        { value: '3', label: 'Programas activos' },
      ],
    },
    catalog: {
      sectionId: 'programs-catalog',
      location: 'Cusco, Perú',
      statusLabel: 'Activo',
      ctaText: 'CONOCER MÁS',
      items: [
        {
          title: 'Andean Future Lab',
          imageSrc: '/home-assets/Programs/andean-future-lab-img.png',
          imageAlt: 'Jóvenes participando en sesión de trabajo',
          href: '#andean-future-lab',
          description:
            'Empoderamos a la juventud andina con habilidades en STEAM, inteligencia artificial y pensamiento crítico, cerrando brechas tecnológicas en zonas rurales.',
        },
        {
          title: 'Andean Makers Program',
          imageSrc: '/home-assets/Programs/andean-makers-program-img.png',
          imageAlt: 'Programa de tejido y producción artesanal',
          href: '#andean-makers-program',
          description:
            'Fortalecemos la competitividad de artesanos y productores con innovación en diseño, control de calidad premium y branding cultural.',
        },
        {
          title: 'Andean Market Access',
          imageSrc: '/home-assets/Programs/andean-market-access-img.png',
          imageAlt: 'Alianza comercial para acceso a mercado',
          href: '#andean-market-access',
          description:
            'Articulamos la conexión con mercados de alto valor, ferias comerciales y comercio justo para escalar emprendimientos andinos.',
        },
      ],
    },
    cta: {
      title: 'Transformemos juntos el territorio andino',
      description:
        'Únete como aliado estratégico y ayúdanos a conectar el talento de nuestras comunidades con las oportunidades de la economía global.',
      ctaText: 'SÉ UN ALIADO',
      ctaSlug: 'contact',
      backgroundVectorSrc: '/home-assets/Numbers/vector.png',
    },
  },

  contactPage: {
    meta: {
      title: 'Contacto | Andean Roots Initiative',
      description:
        'Escríbenos para alianzas, voluntariado o preguntas sobre programas. Respondemos con claridad y rapidez.',
    },
    hero: {
      backgroundImageSrc: '/contact-assets/Hero/contact-hero.png',
      backgroundImageAlt: 'Paisaje andino y comunidad en las montañas',
      title: 'Trabajemos juntos',
      breadcrumbAriaLabel: 'Ruta de navegación',
      breadcrumb: [
        { label: 'Home', slug: 'Home' },
        { label: 'Contacto', slug: 'contact', current: true },
      ],
    },
    impact: {
      label: 'IMPACTO',
      headlineBefore: 'AYÚDANOS A CONSTRUIR OPORTUNIDADES DONDE MÁS SE NECESITAN ',
      headlineHighlight: 'AHORA',
      paragraphs: [
        'Cada alianza, inversión e iniciativa impulsa un objetivo claro: fortalecer comunidades andinas mediante educación, innovación y acceso a oportunidades sostenibles y medibles.',
        'Si buscas generar impacto, explorar colaboraciones estratégicas o apoyar el desarrollo de nuevos proyectos, este es el punto de partida. Hablemos.',
      ],
    },
    channels: {
      sectionId: 'canales',
      columns: [
        {
          kind: 'phone' as const,
          title: 'Llama y WhatsApp',
          lines: [
            { text: '+51 984 000 000', href: 'tel:+51984000000' },
            { text: 'WhatsApp', href: 'https://wa.me/51984000000' },
          ],
        },
        {
          kind: 'hours' as const,
          title: 'Horario de atención',
          lines: [{ text: 'De lunes a viernes: 9:00 – 18:00' }, { text: 'Sábados: 9:00 – 13:00' }],
        },
        {
          kind: 'email' as const,
          title: 'Escríbenos',
          lines: [
            { text: 'contacto@andeanroots.org', href: 'mailto:contacto@andeanroots.org' },
            { text: 'hola@andeanroots.org', href: 'mailto:hola@andeanroots.org' },
          ],
        },
      ],
    },
    form: {
      sectionId: 'contacto-form',
      title: 'Contáctanos y construyamos impacto juntos.',
      subtitle:
        'Completa los campos y te responderemos con una propuesta clara para avanzar juntos.',
      socialPrompt: 'Encuéntranos en',
      submitLabel: 'Enviar',
      sendingLabel: 'Enviando…',
      successMessage:
        '¡Gracias por contactarnos! Tu mensaje ha sido enviado. Te responderemos pronto.',
      errorMessage:
        'No pudimos enviar el mensaje. Intenta de nuevo o usa el correo o el teléfono directamente.',
      missingConfigMessage:
        'Configura PUBLIC_CONTACT_FORMSUBMIT_EMAIL para habilitar el envío (FormSubmit).',
      selectTopicError: 'Selecciona un tipo de consulta antes de enviar.',
      inquiryTypePlaceholder: 'Tipo de consulta',
      fullNameLabel: 'Nombre completo',
      emailLabel: 'Correo electrónico',
      messageLabel: 'Mensaje',
      inquiryTypes: [
        { value: 'alianzas', label: 'Alianzas / partnerships' },
        { value: 'programas', label: 'Programas y convocatorias' },
        { value: 'medios', label: 'Medios y prensa' },
        { value: 'voluntariado', label: 'Voluntariado' },
        { value: 'otro', label: 'Otro' },
      ],
    },
    faq: {
      label: 'FAQ',
      title: 'Preguntas frecuentes',
      subtitle:
        'Estas son las preguntas más frecuentes sobre Andean Roots. Si tienes alguna pregunta adicional, no dudes en contactarnos.',
      ctaText: 'Ver más FAQs',
      sideImageSrc: '/about-assets/enfoque/enfoque-1.png',
      sideImageAlt: 'Equipo local en actividad comunitaria',
      items: [
        {
          q: '¿Puedo solicitar una charla o taller?',
          a: 'Sí. Indica ciudad o país, audiencia, fecha tentativa y objetivo del evento.',
        },
        {
          q: '¿Aceptan donaciones o patrocinio?',
          a: 'Sí. Cuéntanos el monto aproximado, el tipo de apoyo y si buscas visibilidad o impacto silencioso.',
        },
        {
          q: '¿Responden en inglés?',
          a: 'Sí. Escríbanos en el idioma que prefieran (ES/EN).',
        },
        {
          q: '¿Qué información debo incluir?',
          a: 'Contexto, plazo, presupuesto (si aplica) y el resultado que buscas.',
        },
        {
          q: '¿Cuál es el objetivo de Andean Roots?',
          a: 'Fortalecer comunidades andinas mediante educación, innovación y acceso a oportunidades sostenibles y medibles.',
        },
        {
          q: '¿Qué proyectos están en desarrollo?',
          a: 'Actualmente trabajamos en proyectos de educación, innovación y acceso a oportunidades sostenibles y medibles.',
        },
      ],
    },
    quote: {
      quote:
        'Creemos que el cambio territorial empieza con conversaciones honestas, alianzas claras y acciones que respeten la identidad de cada comunidad.',
      attributionName: 'Daniel Yupanqui',
      attributionRole: 'Fundador y director',
      portraitSrc: '/about-assets/team/team-1.png',
      portraitAlt: 'Retrato de Daniel Yupanqui',
    },
  },

  termsPage: {
    meta: {
      title: 'Términos y condiciones | Andean Roots Initiative',
      description:
        'Conoce los términos y condiciones de uso del sitio web de Andean Roots Initiative, incluyendo política de donaciones, protección de datos y propiedad intelectual.',
    },
    hero: {
      title: 'Términos y condiciones',
      backgroundImageSrc: '/about-assets/hero/hero-img.png',
      backgroundImageAlt: 'Comunidad andina en paisaje rural',
      breadcrumbAriaLabel: 'Ruta de navegación',
      breadcrumb: [
        { label: 'Home', slug: 'Home' },
        { label: 'Términos y condiciones', slug: 'terms', current: true },
      ],
    },
    content: {
      lastUpdated: 'Última actualización: 23 de abril de 2026',
      intro:
        'Al acceder y utilizar el sitio web de Andean Roots Initiative, usted acepta quedar vinculado por los presentes Términos y Condiciones de Uso. Si no está de acuerdo con alguno de estos términos, le pedimos que se abstenga de utilizar el sitio.',
      sections: [
        {
          number: '01',
          title: 'Información de la organización',
          paragraphs: [
            'Andean Roots Initiative es una organización sin fines de lucro con sede en Cusco, Perú, comprometida con el fortalecimiento de comunidades andinas mediante educación de calidad, innovación tecnológica y acceso a oportunidades económicas sostenibles.',
            'El sitio web es operado y administrado por Andean Roots Initiative. Su contenido es de carácter exclusivamente informativo y no constituye asesoramiento legal, financiero ni de ningún otro tipo.',
          ],
        },
        {
          number: '02',
          title: 'Finalidad del sitio web',
          paragraphs: [
            'El sitio web tiene como objetivo informar sobre los programas, proyectos e iniciativas de la organización; facilitar el contacto entre la comunidad y Andean Roots Initiative; permitir donaciones voluntarias para el financiamiento de los programas; y difundir el impacto y los resultados de nuestra labor.',
          ],
          items: [
            'Informar sobre los programas, proyectos e iniciativas de la organización.',
            'Facilitar el contacto entre la comunidad y Andean Roots Initiative.',
            'Permitir donaciones voluntarias para el financiamiento de los programas.',
            'Difundir el impacto y los resultados de nuestra labor.',
          ],
        },
        {
          number: '03',
          title: 'Propiedad intelectual',
          paragraphs: [
            'Todos los contenidos publicados en el sitio —incluyendo, sin limitación, textos, imágenes, fotografías, videos, logotipos, marcas, diseños, código fuente y material audiovisual— son propiedad de Andean Roots Initiative o de sus respectivos titulares de derechos, y están protegidos por las leyes de propiedad intelectual vigentes en la República del Perú.',
            'Se prohíbe la reproducción, distribución, modificación, transmisión pública o cualquier otro uso de dichos contenidos sin autorización previa y escrita de Andean Roots Initiative, salvo en los casos expresamente permitidos por la legislación aplicable.',
          ],
        },
        {
          number: '04',
          title: 'Uso permitido y conducta del usuario',
          paragraphs: [
            'El usuario se compromete a utilizar el sitio de manera lícita y de buena fe, absteniéndose de realizar cualquier actividad que pueda dañar, inutilizar o deteriorar el sitio o interferir con su normal funcionamiento.',
          ],
          items: [
            'Utilizar el sitio de manera lícita y de buena fe.',
            'No realizar actividades que puedan dañar o deteriorar el sitio.',
            'No introducir datos falsos, engañosos o que vulneren derechos de terceros.',
            'No intentar acceder de forma no autorizada a sistemas o bases de datos relacionados con el sitio.',
          ],
        },
        {
          number: '05',
          title: 'Donaciones',
          paragraphs: [
            'Las donaciones realizadas a través del sitio son voluntarias y, como norma general, no reembolsables, salvo error técnico o cargo duplicado debidamente verificado. Son procesadas de forma segura a través de PayPal; Andean Roots Initiative no almacena datos financieros del donante.',
            'Los fondos recibidos se destinan exclusivamente al financiamiento de los programas y operaciones de la organización. Andean Roots Initiative emitirá acuse de recibo al correo electrónico registrado durante el proceso de donación. Para consultas, escríbanos a contacto@andeanroots.org.',
          ],
        },
        {
          number: '06',
          title: 'Comunicaciones y formulario de contacto',
          paragraphs: [
            'Los datos proporcionados a través del formulario de contacto serán utilizados exclusivamente para responder a su consulta y no serán cedidos a terceros sin su consentimiento previo, salvo obligación legal.',
            'Al enviar el formulario, el usuario acepta que Andean Roots Initiative pueda comunicarse con él mediante el correo electrónico facilitado para dar respuesta a su solicitud.',
          ],
        },
        {
          number: '07',
          title: 'Protección de datos personales',
          paragraphs: [
            'En cumplimiento de la Ley N° 29733 (Ley de Protección de Datos Personales del Perú) y su Reglamento aprobado por Decreto Supremo N° 003-2013-JUS, Andean Roots Initiative informa que los datos personales recopilados —nombre, correo electrónico y otros voluntariamente proporcionados— son incorporados a un banco de datos de titularidad de la organización.',
            'Serán tratados con la finalidad de gestionar donaciones, responder consultas y, en su caso, enviar información sobre actividades y programas previa aceptación del usuario. El titular podrá ejercer sus derechos de acceso, rectificación, cancelación, oposición y revocación escribiendo a: contacto@andeanroots.org.',
          ],
        },
        {
          number: '08',
          title: 'Cookies',
          paragraphs: [
            'El sitio puede utilizar cookies y tecnologías similares para mejorar la experiencia del usuario, analizar el tráfico y personalizar el contenido. El usuario puede configurar su navegador para rechazar las cookies; sin embargo, esto podría afectar algunas funcionalidades del sitio.',
            'Al continuar navegando, el usuario acepta el uso de cookies conforme a la presente política.',
          ],
        },
        {
          number: '09',
          title: 'Enlace a sitios de terceros',
          paragraphs: [
            'El sitio puede incluir hipervínculos a páginas web de terceros. Andean Roots Initiative no controla ni es responsable del contenido, las políticas de privacidad ni las prácticas de dichos sitios externos, y su inclusión no implica recomendación ni respaldo de ningún tipo.',
          ],
        },
        {
          number: '10',
          title: 'Limitación de responsabilidad',
          paragraphs: [
            'Andean Roots Initiative no garantiza la disponibilidad, continuidad o infalibilidad del sitio y, en la medida en que lo permita la legislación aplicable, no será responsable por interrupciones o errores técnicos en el acceso al sitio, daños causados por virus informáticos u otros elementos tecnológicos dañinos, los contenidos de sitios web enlazados, ni el uso indebido del sitio por parte de terceros.',
          ],
        },
        {
          number: '11',
          title: 'Modificaciones',
          paragraphs: [
            'Andean Roots Initiative se reserva el derecho de actualizar o modificar los presentes Términos en cualquier momento y sin previo aviso. La versión vigente siempre estará disponible en esta página. El uso continuado del sitio tras la publicación de cambios implica la aceptación de los nuevos Términos.',
          ],
        },
        {
          number: '12',
          title: 'Ley aplicable y jurisdicción',
          paragraphs: [
            'Los presentes Términos se rigen e interpretan de conformidad con las leyes de la República del Perú. Para cualquier controversia derivada de su aplicación, las partes se someten a la jurisdicción de los tribunales competentes de la ciudad de Cusco, renunciando expresamente a cualquier otro fuero que pudiera corresponderles.',
          ],
        },
        {
          number: '13',
          title: 'Contacto',
          paragraphs: [
            'Para cualquier consulta o aclaración relacionada con estos Términos, puede comunicarse con nosotros en:',
          ],
          items: [
            'Correo electrónico: contacto@andeanroots.org',
            'Dirección: Cusco, Perú',
            'Teléfono: +51 984 000 000',
          ],
        },
      ],
    },
  },
};

export default es;
export type Translations = typeof es;
