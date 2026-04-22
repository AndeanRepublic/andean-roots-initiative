/**
 * Contact page copy and configuration.
 *
 * Form delivery uses FormSubmit. Set this in your environment (public, safe to expose):
 * `PUBLIC_CONTACT_FORMSUBMIT_EMAIL=you@yourdomain.com`
 */
export const contactPageMeta = {
  title: 'Contacto | Andean Roots Initiative',
  description:
    'Escríbenos para alianzas, voluntariado o preguntas sobre programas. Respondemos con claridad y rapidez.',
};

export const contactHeroContent = {
  backgroundImageSrc: '/home-assets/Hero/Hero.png',
  backgroundImageAlt: 'Paisaje andino y comunidad en las montañas',
  title: 'Trabajemos juntos',
  breadcrumbAriaLabel: 'Ruta de navegación',
  breadcrumb: [
    { label: 'Home', href: '/Home' },
    { label: 'Contacto', href: '/contact', current: true },
  ],
};

export const contactImpactContent = {
  label: 'IMPACTO',
  headlineBefore: 'AYÚDANOS A CONSTRUIR OPORTUNIDADES DONDE MÁS SE NECESITAN ',
  headlineHighlight: 'AHORA',
  paragraphs: [
    'Cada alianza, inversión e iniciativa impulsa un objetivo claro: fortalecer comunidades andinas mediante educación, innovación y acceso a oportunidades sostenibles y medibles.',
    'Si buscas generar impacto, explorar colaboraciones estratégicas o apoyar el desarrollo de nuevos proyectos, este es el punto de partida. Hablemos.',
  ],
};

export type ContactSocialPlatform = 'twitter' | 'facebook' | 'instagram' | 'linkedin';

export const contactSocialContent = {
  links: [
    { platform: 'twitter' as const, ariaLabel: 'X (Twitter)', href: 'https://twitter.com' },
    { platform: 'facebook' as const, ariaLabel: 'Facebook', href: 'https://facebook.com' },
    { platform: 'instagram' as const, ariaLabel: 'Instagram', href: 'https://instagram.com' },
    { platform: 'linkedin' as const, ariaLabel: 'LinkedIn', href: 'https://linkedin.com' },
  ] as const satisfies readonly {
    platform: ContactSocialPlatform;
    ariaLabel: string;
    href: string;
  }[],
};

export const contactChannelsContent = {
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
      lines: [{ text: 'Lun–Vie: 9:00 – 18:00' }, { text: 'Sábados: 9:00 – 13:00' }],
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
};

export const contactFormContent = {
  sectionId: 'contacto-form',
  title: 'Contactanos y construyamos impacto juntos.',
  socialPrompt: 'Encuentranos en',
  submitLabel: 'Enviar',
  sendingLabel: 'Enviando…',
  successMessage: 'Listo. Revisa tu correo: te enviamos una copia de confirmación.',
  errorMessage: 'No pudimos enviar el mensaje. Intenta de nuevo o usa email/teléfono directo.',
  missingConfigMessage:
    'Configura PUBLIC_CONTACT_FORMSUBMIT_EMAIL para habilitar el envío (FormSubmit).',
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
};

export const contactFaqContent = {
  label: 'FAQ',
  title: 'Preguntas frecuentes',
  sideImageSrc: '/about-assets/enfoque/enfoque-1.png',
  sideImageAlt: 'Equipo local en actividad comunitaria',
  items: [
    {
      q: '¿Puedo solicitar una charla o taller?',
      a: 'Sí. Indica ciudad/país, audiencia, fecha tentativa y objetivo del evento.',
    },
    {
      q: '¿Aceptan donaciones o patrocinio?',
      a: 'Sí. Cuéntanos el monto aproximado, el tipo de apoyo y si buscas visibilidad o impacto silencioso.',
    },
    {
      q: '¿Respondes en inglés?',
      a: 'Sí. Escríbenos en el idioma que prefieras (ES/EN).',
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
      a: 'Actualmente estamos trabajando en proyectos de educación, innovación y acceso a oportunidades sostenibles y medibles.',
    },
  ],
};

export const contactQuoteContent = {
  quote:
    'Creemos que el cambio territorial empieza con conversaciones honestas, alianzas claras y acciones que respeten la identidad de cada comunidad.',
  attributionName: 'Daniel Yupanqui',
  attributionRole: 'Fundador & Director',
  portraitSrc: '/about-assets/team/team-1.png',
  portraitAlt: 'Retrato de Daniel Yupanqui',
};
