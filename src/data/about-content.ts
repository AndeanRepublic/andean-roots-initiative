export const aboutHeroContent = {
  backgroundImageSrc: '/about-assets/hero/hero-img.png',
  backgroundImageAlt: 'Comunidad andina en paisaje rural',
  title: 'Sobre nosotros',
  breadcrumbAriaLabel: 'Ruta de navegación',
  breadcrumb: [
    { label: 'Home', href: '/Home' },
    { label: 'Sobre nosotros', href: '/About', current: true },
  ],
};

export const aboutHistoryContent = {
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
};

export const aboutOrganizationContent = {
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
};

export const aboutValuesContent = {
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
};

export const aboutFocusContent = {
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
      description:
        'Conectamos comunidades con empresas, instituciones y aliados estratégicos.',
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
};

export const aboutTeamContent = {
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
};
