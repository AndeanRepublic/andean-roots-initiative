export const headerContent = {
  brandAriaLabel: 'Andean Roots Initiative - Inicio',
  mobileMenuAriaLabel: 'Abrir navegación',
  navLinks: [
    { label: 'Home', href: '/Home' },
    { label: 'Sobre nosotros', href: '/About' },
    { label: 'Programas', href: '/Home#programs' },
    { label: 'Contacto', href: '/contact' },
  ],
};

export const heroContent = {
  titleTop: 'Raíces andinas',
  titleBottom: 'que transforman el futuro',
  subheading:
    'Impulsamos educación, innovación y emprendimiento en comunidades andinas para generar oportunidades sostenibles y conectar el talento local con el mundo.',
  ctaText: 'SÉ UN ALIADO',
  ctaHref: '#impacto',
  scrollLabel: 'SCROLL DOWN',
  scrollAriaLabel: 'Desplazarse hacia abajo',
};

export const challengeContent = {
  label: 'EL DESAFIO QUE ENFRENTAMOS',
  // stickyHeadline: 'Tres frentes, un mismo desafío',
  firstCardCoverSrc: '/home-assets/Problem/card_cover_1.png',
  secondCardCoverSrc: '/home-assets/Problem/card_cover_2.png',
  thirdCardCoverSrc: '/home-assets/Problem/card_cover_3.png',
  introStart:
    'Muchas comunidades andinas enfrentan barreras para acceder a educacion de calidad, herramientas tecnologicas y oportunidades economicas.',
  introMutedStart: ' A pesar del enorme potencial cultural y productivo de los Andes, existe una ',
  introHighlight: 'brecha significativa',
  introEnd: ' que limita el desarrollo sostenible.',
  firstCardTitle: 'ACCESO LIMITADO A LA EDUCACION DEL FUTURO',
  firstCardHeadline: 'Barrera',
  firstCardDescription:
    'La brecha digital y la falta de formacion en habilidades STEAM y tecnologias emergentes limitan las oportunidades de jovenes en zonas rurales.',
  secondCardTitle: 'Paradoja',
  secondCardDescription:
    'Los productores poseen un enorme potencial productivo y cultural, pero carecen de acceso a herramientas de calidad y mercados sostenibles.',
  thirdCardTag: 'Tradicion, Estancamiento, Riesgo',
  thirdCardTitle: 'El trabajo que no genera riqueza',
  thirdCardDescription:
    'Sin acceso a mercados digitales, los mejores productos del mundo son invisibles.',
  secondCardImageAlt: 'Comunidad andina en un espacio rural',
  thirdCardImageAlt: 'Manos de artesano andino',
};

export type AboutTagIconKey = 'computer' | 'gear' | 'cart' | 'bulb' | 'handshake' | 'target';

export const aboutContent = {
  label: 'SOBRE LA INICIATIVA',
  titleTop: 'Arquitectos del',
  titleBottom: 'Desarrollo andino',
  tags: [
    { label: 'Educacion del Futuro', icon: 'computer' },
    { label: 'Desarrollo Productivo', icon: 'gear' },
    { label: 'Acceso a Mercados', icon: 'cart' },
    { label: 'Tecnologias Emergentes', icon: 'bulb' },
    { label: 'Alianzas Estrategicas', icon: 'handshake' },
    { label: 'Estandares de Calidad', icon: 'target' },
  ] as const satisfies readonly { label: string; icon: AboutTagIconKey }[],
  description:
    'Andean Roots Initiative es una plataforma de innovacion social que opera en la interseccion del talento local y las oportunidades globales. Nuestro modelo fortalece comunidades andinas mediante un sistema de tres dimensiones: desarrollamos capacidades en habilidades digitales y productivas, articulamos alianzas con instituciones clave y garantizamos el acceso a mercados competitivos. No solo impulsamos emprendimientos; construimos las cadenas de valor sostenibles que el futuro exige.',
  originTitle: 'EL ORIGEN DEL CAMBIO',
  originDescription:
    'Descubre la historia y los valores que impulsan nuestra mision de transformar los Andes a traves de la innovacion social.',
  originCtaText: 'CONOCE NUESTRA HISTORIA',
  originCtaHref: '#history',
  bannerImageAlt: 'Miembros de la iniciativa en comunidad andina',
};

export const actionContent = {
  label: 'NUESTRA ACCION',
  headingTop: 'Transformando el Talento en',
  headingBottom: 'Oportunidad Sostenible',
  subheading:
    'Impulsamos programas que cierran la brecha entre el potencial rural y los mercados globales, integrando educacion tecnologica con desarrollo productivo de alto nivel.',
  programs: [
    {
      imageSrc: '/home-assets/Actions/education-img.png',
      imageAlt: 'Formacion digital en comunidad andina',
      title: 'Educacion del Futuro',
      description:
        'Formamos a jovenes en habilidades digitales y pensamiento critico, preparandolos para liderar la economia digital desde sus comunidades.',
      icon: 'computer' as const,
    },
    {
      imageSrc: '/home-assets/Actions/development-img.png',
      imageAlt: 'Participante del programa de desarrollo productivo',
      title: 'Desarrollo Productivo',
      description:
        'Elevamos la competitividad local mediante innovacion en diseno de producto, estandares de calidad y branding con identidad cultural.',
      icon: 'gear' as const,
    },
    {
      imageSrc: '/home-assets/Actions/estrategic-img.png',
      imageAlt: 'Alianza estrategica para desarrollo territorial',
      title: 'Articulacion Estrategica',
      description:
        'Actuamos como el motor de enlace entre gobiernos, empresas privadas para financiar y escalar el desarrollo territorial.',
      icon: 'chess' as const,
    },
    {
      imageSrc: '/home-assets/Actions/market-img.png',
      imageAlt: 'Acceso a mercados digitales para productos andinos',
      title: 'Acceso a Mercados',
      description:
        'Conectamos el talento andino con plataformas de e-commerce y canales de exportacion para asegurar ingresos justos y sostenibles.',
      icon: 'cart' as const,
    },
  ],
};

export const numbersContent = {
  description:
    'Sincronizamos el talento andino con la economía global para crear un impacto territorial sostenible.',
  stats: [
    { value: '5+', label: 'Comunidades Articuladas y Fortalecidas' },
    { value: '10+', label: 'Emprendedores con Acceso a Mercado' },
    { value: '100%', label: 'Comercio Justo Garantizado para Productores y Emprendedores' },
  ],
};

export const strategicProgramsContent = {
  label: 'PROGRAMAS ESTRATÉGICOS',
  heading: 'Innovación Social en Acción',
  ctaText: 'VER TODOS LOS PROGRAMAS',
  ctaHref: '#programs',
  location: 'Cusco, Peru',
  readMoreText: 'LEER MAS',
  readMoreHref: '#program-detail',
  items: [
    {
      title: 'Andean Future Lab',
      imageSrc: '/home-assets/Programs/andean-future-lab-img.png',
      imageAlt: 'Jovenes participando en sesion de trabajo',
      description:
        'Empoderamos a la juventud andina con habilidades en STEAM, Inteligencia Artificial y pensamiento crítico, cerrando brechas tecnológicas en zonas rurales.',
      metrics: [
        { label: 'JÓVENES CAPACITADOS', value: '50+' },
        { label: 'IMPACTO', value: 'Aumento en habilidades digitales' },
      ],
    },
    {
      title: 'Andean Makers Program',
      imageSrc: '/home-assets/Programs/andean-makers-program-img.png',
      imageAlt: 'Programa de tejido y produccion artesanal',
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
        { label: 'INGRESOS GENERADOS', value: 'S/.50 000+' },
      ],
    },
  ],
};

export const partnersContent = {
  label: 'NUESTROS COLABORADORES',
  description:
    'Sumamos esfuerzos con instituciones que comparten nuestra visión de un mundo donde el talento andino no tiene fronteras ni brechas tecnológicas.',
  logos: [
    {
      src: '/home-assets/Partners/Logo 1.png',
      alt: 'Logo de institución colaboradora',
    },
    {
      src: '/home-assets/Partners/Logo 2.png',
      alt: 'Logo de institución colaboradora',
    },
    {
      src: '/home-assets/Partners/Logo 3.png',
      alt: 'Logo de institución colaboradora',
    },
    {
      src: '/home-assets/Partners/Logo 4.png',
      alt: 'Logo de institución colaboradora',
    },
  ],
};

export const ctaContent = {
  title: 'Transformemos juntos el territorio andino',
  description:
    'Únete como aliado estratégico y ayúdanos a conectar el talento de nuestras comunidades con las oportunidades de la economía global',
  ctaText: 'SÉ UN ALIADO',
  ctaHref: '#contact',
};
