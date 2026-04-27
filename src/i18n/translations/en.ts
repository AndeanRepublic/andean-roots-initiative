import type { Translations } from './es';
import type { ContactSocialPlatform } from '../types';

const en: Translations = {
  common: {
    socialLinks: [
      { platform: 'twitter' as ContactSocialPlatform, ariaLabel: 'X (Twitter)', href: 'https://twitter.com' },
      { platform: 'facebook' as ContactSocialPlatform, ariaLabel: 'Facebook', href: 'https://facebook.com' },
      { platform: 'instagram' as ContactSocialPlatform, ariaLabel: 'Instagram', href: 'https://instagram.com' },
      { platform: 'linkedin' as ContactSocialPlatform, ariaLabel: 'LinkedIn', href: 'https://linkedin.com' },
    ],
    whatsappHref: 'https://wa.me/51984000000',
    floatingDonateLabel: 'Donate now',
    floatingWhatsappAriaLabel: 'Contact us on WhatsApp',
  },
  header: {
    brandAriaLabel: 'Andean Roots Initiative - Home',
    mobileMenuAriaLabel: 'Open navigation',
    navLinks: [
      { label: 'Home', slug: 'Home' },
      { label: 'About Us', slug: 'About' },
      { label: 'Programs', slug: 'programs' },
      { label: 'Contact', slug: 'contact' },
    ],
  },

  hero: {
    titleTop: 'Andean roots',
    titleBottom: 'that transform the future',
    subheading:
      'We drive education, innovation and entrepreneurship in Andean communities to generate sustainable opportunities and connect local talent with the world.',
    ctaText: 'BE AN ALLY',
    ctaHref: '#impacto',
    scrollLabel: 'SCROLL DOWN',
    scrollAriaLabel: 'Scroll down',
  },

  challenge: {
    label: 'THE CHALLENGE WE FACE',
    firstCardCoverSrc: '/home-assets/Problem/card_cover_1.png',
    secondCardCoverSrc: '/home-assets/Problem/card_cover_2.png',
    thirdCardCoverSrc: '/home-assets/Problem/card_cover_3.png',
    introStart:
      'Many Andean communities face barriers to accessing quality education, technological tools and economic opportunities.',
    introMutedStart:
      ' Despite the enormous cultural and productive potential of the Andes, there is a ',
    introHighlight: 'significant gap',
    introEnd: ' that limits sustainable development.',
    firstCardTitle: 'LIMITED ACCESS TO FUTURE EDUCATION',
    firstCardHeadline: 'Barrier',
    firstCardDescription:
      'The digital divide and the lack of training in STEAM skills and emerging technologies limit opportunities for young people in rural areas.',
    secondCardTitle: 'Paradox',
    secondCardDescription:
      'Producers have enormous productive and cultural potential, but lack access to quality tools and sustainable markets.',
    thirdCardTag: 'Tradition, stagnation, risk',
    thirdCardTitle: 'Work that generates no wealth',
    thirdCardDescription: "Without access to digital markets, the world's best products are invisible.",
    secondCardImageAlt: 'Andean community in a rural setting',
    thirdCardImageAlt: 'Andean artisan hands',
  },

  about: {
    label: 'ABOUT THE INITIATIVE',
    titleTop: 'Architects of',
    titleBottom: 'Andean development',
    tags: [
      { label: 'Future education', icon: 'computer' as const },
      { label: 'Productive development', icon: 'gear' as const },
      { label: 'Market access', icon: 'cart' as const },
      { label: 'Emerging technologies', icon: 'bulb' as const },
      { label: 'Strategic alliances', icon: 'handshake' as const },
      { label: 'Quality standards', icon: 'target' as const },
    ],
    description:
      "Andean Roots Initiative is a social innovation platform that operates at the intersection of local talent and global opportunities. Our model strengthens Andean communities through a three-dimensional system: we develop capabilities in digital and productive skills, forge alliances with key institutions, and ensure access to competitive markets. We don't just drive ventures; we build the sustainable value chains the future demands.",
    originTitle: 'THE ORIGIN OF CHANGE',
    originDescription:
      'Discover the history and values that drive our mission to transform the Andes through social innovation.',
    originCtaText: 'KNOW OUR HISTORY',
    originCtaHref: '/About',
    bannerImageAlt: 'Initiative members in an Andean community',
  },

  action: {
    label: 'OUR ACTION',
    headingTop: 'Transforming talent into',
    headingBottom: 'Sustainable opportunity',
    subheading:
      'We drive programs that close the gap between rural potential and global markets, integrating tech education with high-level productive development.',
    programs: [
      {
        imageSrc: '/home-assets/Actions/education-img.png',
        imageAlt: 'Digital training in an Andean community',
        title: 'Future education',
        description:
          'We train young people in digital skills and critical thinking, preparing them to lead the digital economy from their communities.',
        icon: 'computer' as const,
      },
      {
        imageSrc: '/home-assets/Actions/development-img.png',
        imageAlt: 'Participant in productive development program',
        title: 'Productive development',
        description:
          'We elevate local competitiveness through innovation in product design, quality standards and cultural branding.',
        icon: 'gear' as const,
      },
      {
        imageSrc: '/home-assets/Actions/estrategic-img.png',
        imageAlt: 'Strategic alliance for territorial development',
        title: 'Strategic articulation',
        description:
          'We act as a link between governments and private companies to fund and scale territorial development.',
        icon: 'chess' as const,
      },
      {
        imageSrc: '/home-assets/Actions/market-img.png',
        imageAlt: 'Market access for Andean products',
        title: 'Market access',
        description:
          'We connect Andean talent with e-commerce platforms and export channels to ensure fair and sustainable income.',
        icon: 'cart' as const,
      },
    ],
  },

  numbers: {
    description:
      'We synchronize Andean talent with the global economy to create sustainable territorial impact.',
    stats: [
      { value: '5+', label: 'Articulated and strengthened communities' },
      { value: '10+', label: 'Entrepreneurs with market access' },
      { value: '100%', label: 'Fair trade guaranteed for producers and entrepreneurs' },
    ],
  },

  strategicPrograms: {
    label: 'STRATEGIC PROGRAMS',
    heading: 'Social innovation in action',
    ctaText: 'SEE ALL PROGRAMS',
    ctaSlug: 'programs',
    location: 'Cusco, Peru',
    readMoreText: 'READ MORE',
    readMoreHref: '#program-detail',
    items: [
      {
        title: 'Andean Future Lab',
        imageSrc: '/home-assets/Programs/andean-future-lab-img.png',
        imageAlt: 'Youth participating in a working session',
        description:
          'We empower Andean youth with STEAM, artificial intelligence and critical thinking skills, closing technological gaps in rural areas.',
        metrics: [
          { label: 'YOUTH TRAINED', value: '50+' },
          { label: 'IMPACT', value: 'Increase in digital skills' },
        ],
      },
      {
        title: 'Andean Makers Program',
        imageSrc: '/home-assets/Programs/andean-makers-program-img.png',
        imageAlt: 'Weaving and artisanal production program',
        description:
          'We strengthen the competitiveness of artisans and producers with design innovation, premium quality control and cultural branding.',
        metrics: [
          { label: 'PRODUCERS STRENGTHENED', value: '100+' },
          { label: 'COMMUNITIES STRENGTHENED', value: '5+' },
          { label: 'IMPACT', value: 'Improvement in productive profitability' },
        ],
      },
      {
        title: 'Andean Market Access',
        imageSrc: '/home-assets/Programs/andean-market-access-img.png',
        imageAlt: 'Commercial alliance for market access',
        description:
          'We articulate connections with high-value markets, trade fairs and the Andean Republic marketplace, ensuring fair and sustainable commerce.',
        metrics: [
          { label: 'CONNECTED VENTURES', value: '10+' },
          { label: 'COMMERCIAL ALLIANCES', value: '12 buying companies' },
          { label: 'INCOME GENERATED', value: 'S/ 50,000+' },
        ],
      },
    ],
  },

  partners: {
    label: 'OUR COLLABORATORS',
    description:
      "We join efforts with institutions that share our vision of a world where Andean talent has no borders or technological gaps.",
    logos: [
      { src: '/home-assets/Partners/Logo 1.png', alt: 'Collaborating institution logo' },
      { src: '/home-assets/Partners/Logo 2.png', alt: 'Collaborating institution logo' },
      { src: '/home-assets/Partners/Logo 3.png', alt: 'Collaborating institution logo' },
      { src: '/home-assets/Partners/Logo 4.png', alt: 'Collaborating institution logo' },
    ],
  },

  cta: {
    title: "Let's transform the Andean territory together",
    description:
      'Join us as a strategic ally and help us connect the talent of our communities with the opportunities of the global economy.',
    ctaText: 'BE AN ALLY',
    ctaSlug: 'contact',
    donateText: 'DONATE NOW',
  },

  footer: {
    quickLinksTitle: 'Quick links',
    quickLinks: [
      { label: 'Home', slug: 'Home' },
      { label: 'About Us', slug: 'About' },
      { label: 'Programs', slug: 'programs' },
      { label: 'Contact', slug: 'contact' },
    ],
    supportTitle: 'Support',
    supportLinks: [
      { label: 'Privacy policy', href: '#' },
      { label: 'Terms and conditions', slug: 'terms' },
    ],
    contactsTitle: 'Contact',
    contacts: {
      email: { label: 'hello@onearth.com', href: 'mailto:hello@onearth.com' },
      phone: { label: '(123) 456-7890', href: 'tel:+11234567890' },
    },
    socialLinks: [
      { label: 'IG', href: '#' },
      { label: 'FB', href: '#' },
      { label: 'YT', href: '#' },
    ],
    copyright: '© 2026 Andean Roots Initiative. All rights reserved.',
  },

  aboutPage: {
    hero: {
      backgroundImageSrc: '/about-assets/hero/hero-img.png',
      backgroundImageAlt: 'Andean community in rural landscape',
      title: 'About us',
      breadcrumbAriaLabel: 'Breadcrumb',
      breadcrumb: [
        { label: 'Home', slug: 'Home' },
        { label: 'About us', slug: 'About', current: true },
      ],
    },
    history: {
      title: 'Our history',
      cards: [
        {
          imageSrc: '/about-assets/history/history-1.png',
          imageAlt: 'Andean woman in a crop field',
          offsetClass: 'desktop:pt-16',
          paragraphs: [
            'In the Andes, talent is everywhere. In the hands that weave, in those who cultivate the land, in young people with ideas and a desire to learn.',
            'But for years, that talent has grown with limited opportunities, without access to quality education, technological tools or clear paths for development.',
          ],
        },
        {
          imageSrc: '/about-assets/history/history-2.png',
          imageAlt: 'Young Andean woman showing craftsmanship',
          offsetClass: '',
          paragraphs: [
            'Over time, an idea becomes clear: the challenge is not the lack of talent, but the lack of opportunities to harness it.',
            'In every community there is creativity, knowledge and capacity, but without access to training, innovation and connections, that potential rarely projects beyond its own territory.',
          ],
        },
        {
          imageSrc: '/about-assets/history/history-3.png',
          imageAlt: 'Andean girl in traditional clothing',
          offsetClass: 'desktop:pt-35',
          paragraphs: [
            'It is from this reality that Andean Roots Initiative was born.',
            'An initiative that seeks to close that gap, strengthening local capacities and building a bridge between Andean communities and the opportunities of the modern world.',
          ],
        },
      ],
    },
    organization: {
      label: 'OUR ORGANIZATION',
      title: 'Our purpose and vision',
      coverImageSrc: '/about-assets/mision-vision/mission-vision.png',
      coverImageAlt: 'Andean representative in highland landscape',
      points: [
        {
          title: 'MISSION',
          description:
            'To drive education, innovation and entrepreneurship in Andean communities, strengthening their capabilities and generating sustainable opportunities that contribute to territorial development.',
          iconSrc: '/about-assets/mision-vision/flag-icon.png',
          iconAlt: 'Flag icon',
        },
        {
          title: 'VISION',
          description:
            'To be a leading organization in Latin America in social innovation and community development, promoting a sustainable model that connects the talent of Andean territories with global opportunities.',
          iconSrc: '/about-assets/mision-vision/target-icon.png',
          iconAlt: 'Target icon',
        },
      ],
    },
    values: {
      label: 'OUR VALUES',
      title: 'What moves us',
      description: 'Our values guide every action, decision and collaboration we drive in Andean communities.',
      items: [
        {
          title: 'Commitment',
          description:
            'We act with responsibility and commitment to generate real and sustainable impact in Andean communities, building solutions that endure over time.',
          icon: 'commitment' as const,
        },
        {
          title: 'Cultural identity',
          description:
            'We recognize and value the knowledge, traditions and cultural richness of the Andes as the foundation for authentic and sustainable development.',
          icon: 'chakana' as const,
        },
        {
          title: 'Collaboration',
          description:
            'We believe in working together with communities, institutions and strategic allies to generate real and lasting impact.',
          icon: 'handshake' as const,
        },
      ],
    },
    focus: {
      label: 'FOCUS',
      title: 'Strengthening local capacities',
      description:
        'We believe that sustainable development in the Andes does not depend solely on external resources, but on enhancing the talent, identity and capabilities that already exist in communities, connecting them to real opportunities.',
      sideImages: [
        { src: '/about-assets/enfoque/enfoque-1.png', alt: 'Local team in community activity' },
        { src: '/about-assets/enfoque/enfoque-2.png', alt: 'Andean community in mountain landscape' },
      ],
      cards: [
        {
          title: 'Development from the local',
          description: 'We work from the knowledge, culture and capacities of each community.',
          icon: 'group' as const,
          offsetClass: 'desktop:self-start',
        },
        {
          title: 'Innovation with purpose',
          description:
            'We integrate technology, education and innovation to generate relevant and sustainable solutions.',
          icon: 'bulb' as const,
          offsetClass: 'desktop:self-end',
        },
        {
          title: 'Actor articulation',
          description: 'We connect communities with companies, institutions and strategic allies.',
          icon: 'handshake' as const,
          offsetClass: 'desktop:self-end',
        },
        {
          title: 'Long-term sustainability',
          description:
            'We seek to generate capacities that endure over time and do not depend on external interventions.',
          icon: 'sustainability' as const,
          offsetClass: 'desktop:self-start',
        },
      ],
    },
    team: {
      backgroundWord: 'TEAM',
      label: 'THE TEAM BEHIND THE INITIATIVE',
      description: 'A team that believes in the talent of the Andes and works to turn it into real opportunities.',
      members: [
        {
          name: 'Daniel Yupanqui',
          role: 'Founder and director',
          imageSrc: '/about-assets/team/team-1.png',
          imageAlt: 'Portrait of Daniel Yupanqui',
          offsetClass: 'desktop:pt-20',
        },
        {
          name: 'Cecilia Núñez',
          role: 'Operations manager',
          imageSrc: '/about-assets/team/team-2.png',
          imageAlt: 'Portrait of Cecilia Núñez',
          offsetClass: '',
        },
        {
          name: 'Ruth Arce',
          role: 'Project developer',
          imageSrc: '/about-assets/team/team-3.png',
          imageAlt: 'Portrait of Ruth Arce',
          offsetClass: 'desktop:pt-20',
        },
        {
          name: 'Marcelo Luna',
          role: 'Designer',
          imageSrc: '/about-assets/team/team-4.png',
          imageAlt: 'Portrait of Marcelo Luna',
          offsetClass: '',
        },
      ],
      slider: {
        current: '01',
        total: '03',
        prevAriaLabel: 'Previous',
        nextAriaLabel: 'Next',
      },
    },
  },

  programsPage: {
    meta: {
      title: 'Programs | Andean Roots Initiative',
      description:
        'Discover our strategic programs to drive education, innovation and market access in Andean communities.',
    },
    hero: {
      backgroundImageSrc: '/programs-assets/programs-hero.png',
      backgroundImageAlt: 'Andean communities at a cultural event',
      title: 'Our programs',
      breadcrumbAriaLabel: 'Breadcrumb',
      breadcrumb: [
        { label: 'Home', slug: 'Home' },
        { label: 'Programs', slug: 'programs', current: true },
      ],
    },
    intro: {
      titleLeading: 'Big challenges. ',
      titleMiddle: ' No problem.',
      titleTrailingStart: 'We have ',
      titleTrailingEmphasis: 'even bigger ideas.',
      descriptionLead:
        'At Andean Roots Initiative we design programs that respond directly to the needs of Andean communities.',
      descriptionMutedA: ' Through education, technology and productive development',
      descriptionMiddle: ', we seek to close gaps and generate sustainable opportunities ',
      descriptionMutedB: 'that emerge from the local context itself.',
      stats: [
        { value: '300+', label: 'Beneficiaries' },
        { value: '5+', label: 'Articulated communities' },
        { value: '3', label: 'Active programs' },
      ],
    },
    catalog: {
      sectionId: 'programs-catalog',
      location: 'Cusco, Peru',
      statusLabel: 'Active',
      ctaText: 'LEARN MORE',
      items: [
        {
          title: 'Andean Future Lab',
          imageSrc: '/home-assets/Programs/andean-future-lab-img.png',
          imageAlt: 'Youth participating in a working session',
          href: '#andean-future-lab',
          description:
            'We empower Andean youth with STEAM, artificial intelligence and critical thinking skills, closing technological gaps in rural areas.',
        },
        {
          title: 'Andean Makers Program',
          imageSrc: '/home-assets/Programs/andean-makers-program-img.png',
          imageAlt: 'Weaving and artisanal production program',
          href: '#andean-makers-program',
          description:
            'We strengthen the competitiveness of artisans and producers with design innovation, premium quality control and cultural branding.',
        },
        {
          title: 'Andean Market Access',
          imageSrc: '/home-assets/Programs/andean-market-access-img.png',
          imageAlt: 'Commercial alliance for market access',
          href: '#andean-market-access',
          description:
            'We articulate connections with high-value markets, trade fairs and fair trade to scale Andean ventures.',
        },
      ],
    },
    cta: {
      title: "Let's transform the Andean territory together",
      description:
        'Join us as a strategic ally and help us connect the talent of our communities with the opportunities of the global economy.',
      ctaText: 'BE AN ALLY',
      ctaSlug: 'contact',
      backgroundVectorSrc: '/home-assets/Numbers/vector.png',
    },
  },

  contactPage: {
    meta: {
      title: 'Contact | Andean Roots Initiative',
      description:
        'Write to us for alliances, volunteering or questions about programs. We respond with clarity and speed.',
    },
    hero: {
      backgroundImageSrc: '/contact-assets/Hero/contact-hero.png',
      backgroundImageAlt: 'Andean landscape and mountain community',
      title: "Let's work together",
      breadcrumbAriaLabel: 'Breadcrumb',
      breadcrumb: [
        { label: 'Home', slug: 'Home' },
        { label: 'Contact', slug: 'contact', current: true },
      ],
    },
    impact: {
      label: 'IMPACT',
      headlineBefore: 'HELP US BUILD OPPORTUNITIES WHERE THEY ARE NEEDED MOST ',
      headlineHighlight: 'NOW',
      paragraphs: [
        'Every alliance, investment and initiative drives a clear goal: strengthen Andean communities through education, innovation and access to sustainable and measurable opportunities.',
        "If you seek to generate impact, explore strategic collaborations or support the development of new projects, this is the starting point. Let's talk.",
      ],
    },
    channels: {
      sectionId: 'canales',
      columns: [
        {
          kind: 'phone' as const,
          title: 'Call and WhatsApp',
          lines: [
            { text: '+51 984 000 000', href: 'tel:+51984000000' },
            { text: 'WhatsApp', href: 'https://wa.me/51984000000' },
          ],
        },
        {
          kind: 'hours' as const,
          title: 'Business hours',
          lines: [
            { text: 'Monday to Friday: 9:00 – 18:00' },
            { text: 'Saturday: 9:00 – 13:00' },
          ],
        },
        {
          kind: 'email' as const,
          title: 'Write to us',
          lines: [
            { text: 'contacto@andeanroots.org', href: 'mailto:contacto@andeanroots.org' },
            { text: 'hola@andeanroots.org', href: 'mailto:hola@andeanroots.org' },
          ],
        },
      ],
    },
    form: {
      sectionId: 'contacto-form',
      title: "Contact us and let's build impact together.",
      subtitle: 'Fill in the fields and we will respond with a clear proposal to move forward together.',
      socialPrompt: 'Find us on',
      submitLabel: 'Send',
      sendingLabel: 'Sending…',
      successMessage: 'Thank you for reaching out! Your message has been sent. We will get back to you soon.',
      errorMessage: 'We could not send the message. Try again or use email or phone directly.',
      missingConfigMessage:
        'Set PUBLIC_CONTACT_FORMSUBMIT_EMAIL to enable sending (FormSubmit).',
      selectTopicError: 'Please select an inquiry type before submitting.',
      inquiryTypePlaceholder: 'Inquiry type',
      fullNameLabel: 'Full name',
      emailLabel: 'Email address',
      messageLabel: 'Message',
      inquiryTypes: [
        { value: 'alliances', label: 'Alliances / partnerships' },
        { value: 'programs', label: 'Programs and calls' },
        { value: 'media', label: 'Media and press' },
        { value: 'volunteering', label: 'Volunteering' },
        { value: 'other', label: 'Other' },
      ],
    },
    faq: {
      label: 'FAQ',
      title: 'Frequently asked questions',
      subtitle:
        'These are the most frequently asked questions about Andean Roots. If you have any additional questions, feel free to contact us.',
      ctaText: 'See more FAQs',
      sideImageSrc: '/about-assets/enfoque/enfoque-1.png',
      sideImageAlt: 'Local team in community activity',
      items: [
        {
          q: 'Can I request a talk or workshop?',
          a: 'Yes. Indicate city or country, audience, tentative date and event objective.',
        },
        {
          q: 'Do you accept donations or sponsorship?',
          a: 'Yes. Tell us the approximate amount, the type of support and whether you seek visibility or silent impact.',
        },
        {
          q: 'Do you respond in Spanish?',
          a: 'Yes. Write to us in the language you prefer (ES/EN).',
        },
        {
          q: 'What information should I include?',
          a: 'Context, deadline, budget (if applicable) and the result you seek.',
        },
        {
          q: "What is Andean Roots' goal?",
          a: 'To strengthen Andean communities through education, innovation and access to sustainable and measurable opportunities.',
        },
        {
          q: 'What projects are in development?',
          a: 'We currently work on projects in education, innovation and access to sustainable and measurable opportunities.',
        },
      ],
    },
    quote: {
      quote:
        'We believe that territorial change begins with honest conversations, clear alliances and actions that respect the identity of each community.',
      attributionName: 'Daniel Yupanqui',
      attributionRole: 'Founder and director',
      portraitSrc: '/about-assets/team/team-1.png',
      portraitAlt: 'Portrait of Daniel Yupanqui',
    },
  },

  termsPage: {
    meta: {
      title: 'Terms and Conditions | Andean Roots Initiative',
      description:
        'Read the terms and conditions of use for the Andean Roots Initiative website, including donation policy, data protection, and intellectual property.',
    },
    hero: {
      title: 'Terms and Conditions',
      backgroundImageSrc: '/about-assets/hero/hero-img.png',
      backgroundImageAlt: 'Andean community in rural landscape',
      breadcrumbAriaLabel: 'Breadcrumb navigation',
      breadcrumb: [
        { label: 'Home', slug: 'Home' },
        { label: 'Terms and Conditions', slug: 'terms', current: true },
      ],
    },
    content: {
      lastUpdated: 'Last updated: April 23, 2026',
      intro:
        'By accessing and using the Andean Roots Initiative website, you agree to be bound by these Terms and Conditions of Use. If you do not agree with any of these terms, please refrain from using the site.',
      sections: [
        {
          number: '01',
          title: 'About the Organization',
          paragraphs: [
            'Andean Roots Initiative is a non-profit organization based in Cusco, Peru, committed to strengthening Andean communities through quality education, technological innovation, and access to sustainable economic opportunities.',
            'The website is operated and managed by Andean Roots Initiative. Its content is purely informational and does not constitute legal, financial, or any other type of advice.',
          ],
        },
        {
          number: '02',
          title: 'Purpose of the Website',
          paragraphs: [
            'The website aims to provide information about the organization\'s programs, projects, and initiatives; facilitate contact between the community and Andean Roots Initiative; enable voluntary donations to fund programs; and share the impact and results of our work.',
          ],
          items: [
            'Provide information about the organization\'s programs, projects, and initiatives.',
            'Facilitate contact between the community and Andean Roots Initiative.',
            'Enable voluntary donations to fund programs.',
            'Share the impact and results of our work.',
          ],
        },
        {
          number: '03',
          title: 'Intellectual Property',
          paragraphs: [
            'All content published on the site —including, without limitation, texts, images, photographs, videos, logos, trademarks, designs, source code, and audiovisual material— is the property of Andean Roots Initiative or its respective rights holders, and is protected by the intellectual property laws in force in the Republic of Peru.',
            'Reproduction, distribution, modification, public transmission, or any other use of such content without prior written authorization from Andean Roots Initiative is prohibited, except as expressly permitted by applicable law.',
          ],
        },
        {
          number: '04',
          title: 'Permitted Use and User Conduct',
          paragraphs: [
            'Users agree to use the site lawfully and in good faith, refraining from any activity that may damage, disable, or impair the site or interfere with its normal operation.',
          ],
          items: [
            'Use the site lawfully and in good faith.',
            'Refrain from activities that may damage or impair the site.',
            'Not submit false, misleading, or third-party rights-infringing data.',
            'Not attempt to gain unauthorized access to systems or databases related to the site.',
          ],
        },
        {
          number: '05',
          title: 'Donations',
          paragraphs: [
            'Donations made through the site are voluntary and, as a general rule, non-refundable, except in cases of verified technical errors or duplicate charges. They are processed securely through PayPal; Andean Roots Initiative does not store donor financial data.',
            'Funds received are exclusively allocated to financing the organization\'s programs and operations. Andean Roots Initiative will send an acknowledgment to the email address registered during the donation process. For inquiries, contact us at contacto@andeanroots.org.',
          ],
        },
        {
          number: '06',
          title: 'Communications and Contact Form',
          paragraphs: [
            'Data provided through the contact form will be used solely to respond to your inquiry and will not be shared with third parties without your prior consent, except as required by law.',
            'By submitting the form, you consent to Andean Roots Initiative contacting you via the email address provided to address your request.',
          ],
        },
        {
          number: '07',
          title: 'Personal Data Protection',
          paragraphs: [
            'In accordance with Law No. 29733 (Peruvian Personal Data Protection Act) and its Regulations approved by Supreme Decree No. 003-2013-JUS, Andean Roots Initiative informs that personal data collected —name, email address, and other voluntarily provided information— is incorporated into a database owned by the organization.',
            'It will be processed to manage donations, respond to inquiries, and, with your consent, send information about activities and programs. Data subjects may exercise their rights of access, rectification, cancellation, opposition, and revocation by contacting: contacto@andeanroots.org.',
          ],
        },
        {
          number: '08',
          title: 'Cookies',
          paragraphs: [
            'The site may use cookies and similar technologies to enhance user experience, analyze traffic, and personalize content. Users may configure their browsers to reject cookies; however, this may affect some site features.',
            'By continuing to browse, you accept the use of cookies in accordance with this policy.',
          ],
        },
        {
          number: '09',
          title: 'Third-Party Links',
          paragraphs: [
            'The site may include hyperlinks to third-party websites. Andean Roots Initiative does not control and is not responsible for the content, privacy policies, or practices of such external sites, and their inclusion does not imply recommendation or endorsement of any kind.',
          ],
        },
        {
          number: '10',
          title: 'Limitation of Liability',
          paragraphs: [
            'Andean Roots Initiative does not guarantee the availability, continuity, or infallibility of the site and, to the extent permitted by applicable law, shall not be liable for technical interruptions or errors in accessing the site, damage caused by computer viruses or other harmful technological elements, the content of linked websites, or misuse of the site by third parties.',
          ],
        },
        {
          number: '11',
          title: 'Modifications',
          paragraphs: [
            'Andean Roots Initiative reserves the right to update or modify these Terms at any time without prior notice. The current version will always be available on this page. Continued use of the site after changes are published implies acceptance of the new Terms.',
          ],
        },
        {
          number: '12',
          title: 'Governing Law and Jurisdiction',
          paragraphs: [
            'These Terms are governed by and interpreted in accordance with the laws of the Republic of Peru. For any disputes arising from their application, the parties submit to the jurisdiction of the competent courts of the city of Cusco, expressly waiving any other jurisdiction that may apply.',
          ],
        },
        {
          number: '13',
          title: 'Contact',
          paragraphs: [
            'For any questions or clarifications regarding these Terms, you may contact us at:',
          ],
          items: [
            'Email: contacto@andeanroots.org',
            'Address: Cusco, Peru',
            'Phone: +51 984 000 000',
          ],
        },
      ],
    },
  },
};

export default en;
