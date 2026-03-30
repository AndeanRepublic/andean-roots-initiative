export const headerContent = {
	brandAriaLabel: "Andean Roots Initiative - Inicio",
	mobileMenuAriaLabel: "Abrir navegación",
	navLinks: [
		{ label: "Home", href: "#", active: true },
		{ label: "Sobre nosotros", href: "#about" },
		{ label: "Programas", href: "#actions" },
		{ label: "Contacto", href: "#contact" },
	],
};

export const heroContent = {
	titleTop: "Raíces andinas",
	titleBottom: "que transforman el futuro",
	subheading:
		"Impulsamos educación, innovación y emprendimiento en comunidades andinas para generar oportunidades sostenibles y conectar el talento local con el mundo.",
	ctaText: "SÉ UN ALIADO",
	ctaHref: "#impacto",
	scrollLabel: "SCROLL DOWN",
	scrollAriaLabel: "Desplazarse hacia abajo",
};

export const challengeContent = {
	label: "EL DESAFIO QUE ENFRENTAMOS",
	introStart:
		"Muchas comunidades andinas enfrentan barreras para acceder a educacion de calidad, herramientas tecnologicas y oportunidades economicas.",
	introMutedStart:
		" A pesar del enorme potencial cultural y productivo de los Andes, existe una ",
	introHighlight: "brecha significativa",
	introEnd: " que limita el desarrollo sostenible.",
	firstCardTitle: "ACCESO LIMITADO A LA EDUCACION DEL FUTURO",
	firstCardHeadline: "Barrera",
	firstCardDescription:
		"La brecha digital y la falta de formacion en habilidades STEAM y tecnologias emergentes limitan las oportunidades de jovenes en zonas rurales.",
	secondCardTitle: "Paradoja",
	secondCardDescription:
		"Los productores poseen un enorme potencial productivo y cultural, pero carecen de acceso a herramientas de calidad y mercados sostenibles.",
	thirdCardTag: "Tradicion, Estancamiento, Riesgo",
	thirdCardTitle: "El trabajo que no genera riqueza",
	thirdCardDescription:
		"Sin acceso a mercados digitales, los mejores productos del mundo son invisibles.",
	secondCardImageAlt: "Comunidad andina en un espacio rural",
	thirdCardImageAlt: "Manos de artesano andino",
};

export const aboutContent = {
	label: "SOBRE LA INICIATIVA",
	titleTop: "Arquitectos del",
	titleBottom: "Desarrollo andino",
	tags: [
		"Educacion del Futuro",
		"Desarrollo Productivo",
		"Acceso a Mercados",
		"Tecnologias Emergentes",
		"Alianzas Estrategicas",
		"Estandares de Calidad",
	],
	description:
		"Andean Roots Initiative es una plataforma de innovacion social que opera en la interseccion del talento local y las oportunidades globales. Nuestro modelo fortalece comunidades andinas mediante un sistema de tres dimensiones: desarrollamos capacidades en habilidades digitales y productivas, articulamos alianzas con instituciones clave y garantizamos el acceso a mercados competitivos. No solo impulsamos emprendimientos; construimos las cadenas de valor sostenibles que el futuro exige.",
	originTitle: "EL ORIGEN DEL CAMBIO",
	originDescription:
		"Descubre la historia y los valores que impulsan nuestra mision de transformar los Andes a traves de la innovacion social.",
	originCtaText: "CONOCE NUESTRA HISTORIA",
	originCtaHref: "#history",
	bannerImageAlt: "Miembros de la iniciativa en comunidad andina",
};

export const actionContent = {
	label: "NUESTRA ACCION",
	heading: "Transformando el Talento en Oportunidad Sostenible",
	subheading:
		"Impulsamos programas que cierran la brecha entre el potencial rural y los mercados globales, integrando educacion tecnologica con desarrollo productivo de alto nivel.",
	programs: [
		{
			imageSrc: "/home-assets/Actions/education-img.png",
			imageAlt: "Formacion digital en comunidad andina",
			title: "Educacion del Futuro",
			description:
				"Formamos a jovenes en habilidades digitales y pensamiento critico, preparandolos para liderar la economia digital desde sus comunidades.",
			icon: "computer" as const,
		},
		{
			imageSrc: "/home-assets/Actions/development-img.png",
			imageAlt: "Participante del programa de desarrollo productivo",
			title: "Desarrollo Productivo",
			description:
				"Elevamos la competitividad local mediante innovacion en diseno de producto, estandares de calidad y branding con identidad cultural.",
			icon: "gear" as const,
		},
		{
			imageSrc: "/home-assets/Actions/estrategic-img.png",
			imageAlt: "Alianza estrategica para desarrollo territorial",
			title: "Articulacion Estrategica",
			description:
				"Actuamos como el motor de enlace entre gobiernos, empresas privadas para financiar y escalar el desarrollo territorial.",
			icon: "chess" as const,
		},
		{
			imageSrc: "/home-assets/Actions/market-img.png",
			imageAlt: "Acceso a mercados digitales para productos andinos",
			title: "Acceso a Mercados",
			description:
				"Conectamos el talento andino con plataformas de e-commerce y canales de exportacion para asegurar ingresos justos y sostenibles.",
			icon: "cart" as const,
		},
	],
};
