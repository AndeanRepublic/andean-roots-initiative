/**
 * Módulo de generadores CSS modulares para variables de Figma
 * Cada función procesa un tipo específico de variable y retorna CSS
 */

// ==================== UTILIDADES ====================

/**
 * Convierte valores RGB (0-1) a formato hexadecimal
 * @param {number} r - Componente rojo (0-1)
 * @param {number} g - Componente verde (0-1)
 * @param {number} b - Componente azul (0-1)
 * @returns {string} Color en formato hexadecimal (#RRGGBB)
 */
export function rgbToHex(r, g, b) {
	const toHex = (n) => {
		const hex = Math.round(n * 255).toString(16);
		return hex.length === 1 ? "0" + hex : hex;
	};
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Mapea nombres de peso de fuente a valores CSS numéricos
 * @param {string} style - Nombre del estilo (Regular, Medium, SemiBold, Bold)
 * @returns {string} Valor CSS de font-weight
 */
export function getFontWeight(style) {
	const weightMap = {
		Thin: "100",
		ExtraLight: "200",
		Light: "300",
		Regular: "400",
		Medium: "500",
		SemiBold: "600",
		Bold: "700",
		ExtraBold: "800",
		Black: "900",
	};
	return weightMap[style] || "400";
}

/**
 * Convierte line height a formato CSS
 * @param {number} lineHeight - Line height en porcentaje o píxeles
 * @returns {string} Line height en formato CSS
 */
export function getLineHeight(lineHeight) {
	return `${lineHeight}%`;
}

/**
 * Sanitiza nombres para clases CSS genéricas
 * @param {string} name - Nombre original
 * @returns {string} Nombre sanitizado
 */
export function sanitizeClassName(name) {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "");
}

/**
 * Sanitiza nombres para clases de texto (toma última parte)
 * @param {string} name - Nombre con formato "path/to/name"
 * @returns {string} Nombre sanitizado
 */
export function sanitizeTextClassName(name) {
	const parts = name.split("/");
	const lastPart = parts.slice(-1).join("-");

	return lastPart
		.toLowerCase()
		.replace(/[^a-z0-9]/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "");
}

/**
 * Sanitiza nombres para clases de color (toma últimas 2 partes)
 * @param {string} name - Nombre con formato "path/to/color/shade"
 * @returns {string} Nombre sanitizado
 */
export function sanitizeColorClassName(name) {
	const parts = name.split("/");
	const lastTwoParts = parts.slice(-2).join("-");

	return lastTwoParts
		.toLowerCase()
		.replace(/[^a-z0-9]/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "");
}

/**
 * Extrae el valor resuelto de una variable de Figma
 * @param {Object} variable - Variable de Figma
 * @returns {*} Valor resuelto
 */
export function getResolvedValue(variable) {
	const modes = Object.keys(
		variable.resolvedValuesByMode || variable.valuesByMode,
	);
	const firstMode = modes[0];
	return (
		variable.resolvedValuesByMode?.[firstMode]?.resolvedValue ||
		variable.valuesByMode?.[firstMode]
	);
}

/**
 * Extrae todos los valores resueltos por modo (breakpoint) de una variable de Figma
 * @param {Object} variable - Variable de Figma
 * @param {Object} modesMap - Mapa de modos del collection (opcional, para identificar correctamente los modos)
 * @returns {Object} Objeto con valores por breakpoint { desktop, tablet, mobile }
 */
export function getResolvedValuesByMode(variable, modesMap = null) {
	const resolvedValues = {};
	const valuesByMode = variable.resolvedValuesByMode || variable.valuesByMode;

	if (!valuesByMode) return null;

	// Mapear los modos de Figma a nombres de breakpoint
	Object.keys(valuesByMode).forEach((modeKey) => {
		const value =
			variable.resolvedValuesByMode?.[modeKey]?.resolvedValue ||
			variable.valuesByMode?.[modeKey];

		// Si tenemos el mapa de modos, usarlo para identificar el modo
		if (modesMap && modesMap[modeKey]) {
			const modeName = modesMap[modeKey];
			if (modeName === "Desktop") {
				resolvedValues.desktop = value;
			} else if (modeName === "Tablet") {
				resolvedValues.tablet = value;
			} else if (modeName === "Mobile") {
				resolvedValues.mobile = value;
			}
		} else {
			// Fallback: identificar por el key (para retrocompatibilidad)
			// Los modos típicos son: "129:11" (Desktop), "129:12" (Tablet), "129:13" (Mobile)
			if (modeKey.includes("11") || modeKey.includes("8")) {
				resolvedValues.desktop = value;
			} else if (modeKey.includes("12") || modeKey.includes("9")) {
				resolvedValues.tablet = value;
			} else if (modeKey.includes("13") || modeKey.includes("10")) {
				resolvedValues.mobile = value;
			}
		}
	});

	return resolvedValues;
}

// ==================== GENERADORES DE CSS ====================

/**
 * Genera clases utilitarias Tailwind para padding y margin con breakpoints
 * @param {Object} spacingTokens - { xs: '2px', xl: '12px', ... }
 * @returns {string} CSS con clases utilitarias
 */
export function generateSpacingUtilityClasses(spacingData) {
	// spacingData: Figma JSON completo
	const sizes = [
		"2xs",
		"xs",
		"sm",
		"md",
		"lg",
		"xl",
		"2xl",
		"3xl",
		"4xl",
		"5xl",
		"6xl",
		"7xl",
		"8xl",
		"9xl",
		"10xl",
	];
	let devicesModes = Object.entries(spacingData.modes);
	// Mapear los valores por breakpoint
	const values = {};
	if (spacingData && spacingData.variables) {
		spacingData.variables.forEach((variable) => {
			const name = variable.name.replace(/^spacing-/i, "");
			const valueByMode = variable.valuesByMode;
			values[name] = {};
			// por cada breakpoint, añadir el valor a la variable
			devicesModes.forEach(([key, value]) => {
				values[name][value.toLowerCase()] = valueByMode[key];
			});
		});
	}
	let out = "\n/* Padding & Margin Utility Classes */\n@layer {\n";
	sizes.forEach((size) => {
		const v = values[size];
		if (!v) return;
		// Padding
		out += `  .p-${size} { @apply p-[${v.mobile}px] tablet:p-[${v.tablet}px] desktop:p-[${v.desktop}px]; }\n`;
		out += `  .pt-${size} { @apply pt-[${v.mobile}px] tablet:pt-[${v.tablet}px] desktop:pt-[${v.desktop}px]; }\n`;
		out += `  .pb-${size} { @apply pb-[${v.mobile}px] tablet:pb-[${v.tablet}px] desktop:pb-[${v.desktop}px]; }\n`;
		out += `  .pl-${size} { @apply pl-[${v.mobile}px] tablet:pl-[${v.tablet}px] desktop:pl-[${v.desktop}px]; }\n`;
		out += `  .pr-${size} { @apply pr-[${v.mobile}px] tablet:pr-[${v.tablet}px] desktop:pr-[${v.desktop}px]; }\n`;
		out += `  .px-${size} { @apply px-[${v.mobile}px] tablet:px-[${v.tablet}px] desktop:px-[${v.desktop}px]; }\n`;
		out += `  .py-${size} { @apply py-[${v.mobile}px] tablet:py-[${v.tablet}px] desktop:py-[${v.desktop}px]; }\n`;
		// Margin
		out += `  .m-${size} { @apply m-[${v.mobile}px] tablet:m-[${v.tablet}px] desktop:m-[${v.desktop}px]; }\n`;
		out += `  .mt-${size} { @apply mt-[${v.mobile}px] tablet:mt-[${v.tablet}px] desktop:mt-[${v.desktop}px]; }\n`;
		out += `  .mb-${size} { @apply mb-[${v.mobile}px] tablet:mb-[${v.tablet}px] desktop:mb-[${v.desktop}px]; }\n`;
		out += `  .ml-${size} { @apply ml-[${v.mobile}px] tablet:ml-[${v.tablet}px] desktop:ml-[${v.desktop}px]; }\n`;
		out += `  .mr-${size} { @apply mr-[${v.mobile}px] tablet:mr-[${v.tablet}px] desktop:mr-[${v.desktop}px]; }\n`;
		out += `  .mx-${size} { @apply mx-[${v.mobile}px] tablet:mx-[${v.tablet}px] desktop:mx-[${v.desktop}px]; }\n`;
		out += `  .my-${size} { @apply my-[${v.mobile}px] tablet:my-[${v.tablet}px] desktop:my-[${v.desktop}px]; }\n`;
		// gap
		out += `  .gap-${size} { @apply gap-[${v.mobile}px] tablet:gap-[${v.tablet}px] desktop:gap-[${v.desktop}px]; }\n`;
		out += `  .gap-x-${size} { @apply gap-x-[${v.mobile}px] tablet:gap-x-[${v.tablet}px] desktop:gap-x-[${v.desktop}px]; }\n`;
		out += `  .gap-y-${size} { @apply gap-y-[${v.mobile}px] tablet:gap-y-[${v.tablet}px] desktop:gap-y-[${v.desktop}px]; }\n`;
		// space
		out += `  .space-x-${size} { @apply space-x-[${v.mobile}px] tablet:space-x-[${v.tablet}px] desktop:space-x-[${v.desktop}px]; }\n`;
		out += `  .space-y-${size} { @apply space-y-[${v.mobile}px] tablet:space-y-[${v.tablet}px] desktop:space-y-[${v.desktop}px]; }\n`;
	});
	out += "}\n";
	return out;
}

/**
 * Genera clases utilitarias Tailwind para border-radius (solo rounded)
 * @param {Object} radiusTokens - { xs: '3px', xl: '14px', ... }
 * @returns {string} CSS con clases utilitarias
 */
export function generateRadiusUtilityClasses(radiusData) {
	// radiusData: Figma JSON completo
	const sizes = [
		"none",
		"2xs",
		"xs",
		"sm",
		"md",
		"lg",
		"xl",
		"2xl",
		"3xl",
		"4xl",
		"5xl",
		"full",
	];
	let devicesModes = Object.entries(radiusData.modes);
	// Mapear los valores por breakpoint
	const values = {};

	if (radiusData && radiusData.variables) {
		radiusData.variables.forEach((variable) => {
			const name = variable.name.replace(/^radius-/i, "");
			const valuesByMode = variable.valuesByMode;
			values[name] = {};
			// por cada breakpoint, añadir el valor a la variable
			devicesModes.forEach(([key, value]) => {
				values[name][value.toLowerCase()] = valuesByMode[key];
			});
		});
	}
	let out = "\n/* Border Radius Utility Classes */\n@layer {\n";
	sizes.forEach((size) => {
		const v = values[size];
		if (!v) return;
		out += `  .rounded-${size} { @apply rounded-[${v.mobile}px] tablet:rounded-[${v.tablet}px] desktop:rounded-[${v.desktop}px]; }\n`;
		out += `  .rounded-t-${size} { @apply rounded-t-[${v.mobile}px] tablet:rounded-t-[${v.tablet}px] desktop:rounded-t-[${v.desktop}px]; }\n`;
		out += `  .rounded-b-${size} { @apply rounded-b-[${v.mobile}px] tablet:rounded-b-[${v.tablet}px] desktop:rounded-b-[${v.desktop}px]; }\n`;
		out += `  .rounded-l-${size} { @apply rounded-l-[${v.mobile}px] tablet:rounded-l-[${v.tablet}px] desktop:rounded-l-[${v.desktop}px]; }\n`;
		out += `  .rounded-r-${size} { @apply rounded-r-[${v.mobile}px] tablet:rounded-r-[${v.tablet}px] desktop:rounded-r-[${v.desktop}px]; }\n`;
		out += `  .rounded-tl-${size} { @apply rounded-tl-[${v.mobile}px] tablet:rounded-tl-[${v.tablet}px] desktop:rounded-tl-[${v.desktop}px]; }\n`;
		out += `  .rounded-tr-${size} { @apply rounded-tr-[${v.mobile}px] tablet:rounded-tr-[${v.tablet}px] desktop:rounded-tr-[${v.desktop}px]; }\n`;
		out += `  .rounded-bl-${size} { @apply rounded-bl-[${v.mobile}px] tablet:rounded-bl-[${v.tablet}px] desktop:rounded-bl-[${v.desktop}px]; }\n`;
		out += `  .rounded-br-${size} { @apply rounded-br-[${v.mobile}px] tablet:rounded-br-[${v.tablet}px] desktop:rounded-br-[${v.desktop}px]; }\n`;
	});
	out += "}\n";
	return out;
}

/**
 * Genera variables CSS para números base
 * @param {Object} numberData - Datos del archivo "Number base.json"
 * @param {Object} options - Opciones de configuración
 * @param {string} options.prefix - Prefijo para las variables (default: "number")
 * @param {string} options.unit - Unidad a aplicar (default: "px")
 * @returns {string} CSS con variables de números
 */
export function generateNumberVariables(numberData, options = {}) {
	const { prefix = "number", unit = "px" } = options;

	let css = `/* Number Variables */\n@theme {\n`;

	numberData.variables.forEach((variable) => {
		const name = variable.name.replace("Number ", "").toLowerCase();
		const value = getResolvedValue(variable);
		const className = sanitizeClassName(name);

		css += `\t--${prefix}-${className}: ${value}${unit};\n`;
	});

	return css + "}\n\n";
}

export function generateDevicesVariables(devicesData, options = {}) {
	const { prefix = "breakpoint", unit = "px" } = options;

	let css = `/* Devices Variables */\n@theme {\n`;
	let devicesModes = Object.entries(devicesData.modes);

	devicesModes.forEach(([key, value]) => {
		const name = value.toLowerCase();
		const val = devicesData.variables[0].valuesByMode[key];
		const className = sanitizeClassName(name);

		css += `\t--${prefix}-${className}: ${val}${unit};\n`;
	});

	return css + "}\n\n";
}

/**
 * Genera variables CSS responsive para espaciados (con breakpoints)
 * Optimizado para Tailwind CSS v4 con @theme inline
 * @param {Object} spacingData - Datos del archivo "Spacing Tokens.json" con modos
 * @param {Object} options - Opciones de configuración
 * @param {string} options.prefix - Prefijo para las variables (default: "spacing")
 * @param {boolean} options.removePrefix - Remover prefijo del nombre original (default: true)
 * @param {boolean} options.inlineMediaQueries - Usar inline media queries en un solo @theme (default: true)
 * @returns {string} CSS con variables responsive de espaciado
 */
// Deshabilitado: ya no se generan variables :root para spacing
export function generateSpacingVariables() {
	return "";
}

/**
 * Genera variables CSS responsive para border radius (con breakpoints)
 * Optimizado para Tailwind CSS v4 con @theme inline
 * @param {Object} radiusData - Datos del archivo "Radius Tokens.json" con modos
 * @param {Object} options - Opciones de configuración
 * @param {string} options.prefix - Prefijo para las variables (default: "radius")
 * @param {boolean} options.removePrefix - Remover prefijo del nombre original (default: true)
 * @param {boolean} options.inlineMediaQueries - Usar inline media queries en un solo @theme (default: true)
 * @returns {string} CSS con variables responsive de border radius
 */
// Deshabilitado: ya no se generan variables :root para radius
export function generateRadiusVariables() {
	return "";
}

/**
 * Genera variables CSS para colores
 * @param {Object} primitivesData - Datos del archivo "Primitives.json"
 * @param {Object} options - Opciones de configuración
 * @param {string} options.prefix - Prefijo para las variables (default: "color")
 * @param {boolean} options.alphabeticalSort - Ordenar alfabéticamente (default: true)
 * @returns {string} CSS con variables de colores
 */
export function generateColorVariables(primitivesData, options = {}) {
	const { prefix = "color", alphabeticalSort = true } = options;

	let css = `/* Color Variables */\n@theme {\n`;

	const colorEntries = [];

	primitivesData.variables.forEach((variable) => {
		if (variable.type === "COLOR") {
			const name = variable.name;
			const colorValue = getResolvedValue(variable);

			if (colorValue && colorValue.r !== undefined) {
				const hexColor = rgbToHex(colorValue.r, colorValue.g, colorValue.b);
				const className = sanitizeColorClassName(name);

				colorEntries.push({
					className,
					hexColor,
					originalName: name,
				});
			}
		}
	});

	// Ordenar si está habilitado
	if (alphabeticalSort) {
		colorEntries.sort((a, b) => a.className.localeCompare(b.className));
	}

	// Generar CSS
	colorEntries.forEach(({ className, hexColor }) => {
		css += `\t--${prefix}-${className}: ${hexColor};\n`;
	});

	return css + "}\n\n";
}

/**
 * Genera variables CSS responsive para tamaños de fuente (con breakpoints)
 * Optimizado para Tailwind CSS v4 con @theme inline
 * @param {Object} textStyleData - Datos del archivo "Text Style.json" con modos
 * @param {Object} options - Opciones de configuración
 * @param {string} options.prefix - Prefijo para las variables (default: "text")
 * @param {string} options.filterPrefix - Filtrar solo variables que empiecen con esto (default: "fontSize/")
 * @param {boolean} options.inlineMediaQueries - Usar inline media queries en un solo @theme (default: true)
 * @param {boolean} options.useVariableReferences - Usar var(--num-X) en vez de valores directos (default: false)
 * @param {string} options.variablePrefix - Prefijo de las variables de Number base (default: "num")
 * @returns {string} CSS con variables responsive de tamaños de fuente
 */
export function generateResponsiveFontSizeVariables(
	textStyleData,
	options = {},
) {
	const {
		prefix = "text",
		filterPrefix = "fontSize/",
		inlineMediaQueries = true,
		useVariableReferences = false,
		variablePrefix = "num",
	} = options;

	// Helper para formatear el valor
	const valueTransform = useVariableReferences
		? (value) => `var(--${variablePrefix}-${value})`
		: (value) => value;

	// Función para transformar nombres (remover el filterPrefix y "fontSize ")
	const nameTransform = (name) => name.replace("fontSize ", "");

	return generateResponsiveVariables(textStyleData, {
		prefix,
		filterPrefix,
		unit: useVariableReferences ? "" : "px",
		nameTransform,
		valueTransform,
		inlineMediaQueries,
		commentHeader: "Font Size Variables",
	});
}

/**
 * Genera variables CSS responsive para line-height desde Figma Text Style JSON
 * Optimizado para Tailwind CSS v4 con soporte para 3 breakpoints (Desktop/Tablet/Mobile)
 * @param {Object} textStyleData - Datos del archivo "3.Text Style.json" de Figma
 * @param {Object} options - Opciones de configuración
 * @param {string} options.prefix - Prefijo para las variables CSS (default: "leading")
 * @param {string} options.filterPrefix - Filtrar solo variables que empiecen con esto (default: "lineHeight/")
 * @param {string} options.unit - Unidad a aplicar: "px", "rem", "" para sin unidad (default: "px")
 * @param {Function} options.valueTransform - Función para transformar valores antes de aplicar unidad
 * @param {boolean} options.inlineMediaQueries - Usar inline media queries en un solo @theme (default: true)
 * @param {boolean} options.useVariableReferences - Usar var(--num-X) en vez de valores directos (default: false)
 * @param {string} options.variablePrefix - Prefijo de las variables de Number base (default: "num")
 * @param {Object} options.breakpoints - Breakpoints personalizados
 * @returns {string} CSS con variables de line-height responsive
 *
 * @example
 * // Ejemplo básico con valores directos
 * const css = generateResponsiveLineHeightVariables(textStyleData);
 * // Output: --leading-0: 12px; (mobile) -> 14px (tablet) -> 16px (desktop)
 *
 * @example
 * // Con referencias a variables de Number base
 * const css = generateResponsiveLineHeightVariables(textStyleData, {
 *   useVariableReferences: true,
 *   unit: ""  // Sin unidad porque var() ya contiene el valor
 * });
 * // Output: --leading-0: var(--num-12);
 *
 * @example
 * // Con valores sin unidad (para usar con font-size relativo)
 * const css = generateResponsiveLineHeightVariables(textStyleData, {
 *   prefix: "lh",
 *   unit: "",
 *   valueTransform: (value) => (value / 16).toFixed(2) // Convertir px a factor
 * });
 */
export function generateResponsiveLineHeightVariables(
	textStyleData,
	options = {},
) {
	const {
		prefix = "leading",
		filterPrefix = "lineHeight/",
		unit = "px",
		valueTransform,
		inlineMediaQueries = true,
		useVariableReferences = false,
		variablePrefix = "num",
		breakpoints,
	} = options;

	// Si se usan referencias a variables, el valueTransform debe formatear correctamente
	const finalValueTransform = useVariableReferences
		? (value) => `var(--${variablePrefix}-${value})`
		: valueTransform;

	// Si se usan referencias a variables, no usar unidad (ya está en la variable referenciada)
	const finalUnit = useVariableReferences ? "" : unit;

	return generateResponsiveVariables(textStyleData, {
		prefix,
		filterPrefix,
		unit: finalUnit,
		valueTransform: finalValueTransform,
		inlineMediaQueries,
		breakpoints,
	});
}

/**
 * Generador genérico de variables CSS responsive (para cualquier propiedad)
 * Optimizado para Tailwind CSS v4
 * @param {Object} data - Datos del archivo JSON de Figma con modos
 * @param {Object} options - Opciones de configuración
 * @param {string} options.prefix - Prefijo para las variables
 * @param {string} options.filterPrefix - Filtrar solo variables que empiecen con esto
 * @param {string} options.unit - Unidad a aplicar (default: "px")
 * @param {Function} options.nameTransform - Función para transformar nombres de variables
 * @param {Function} options.valueTransform - Función para transformar valores
 * @param {boolean} options.inlineMediaQueries - Usar inline media queries (default: true)
 * @param {Object} options.breakpoints - Breakpoints personalizados { mobile: "640px", tablet: "768px", desktop: "1024px" }
 * @param {string} options.commentHeader - Comentario personalizado para el header (default: usa el prefix)
 * @returns {string} CSS con variables responsive
 */
export function generateResponsiveVariables(data, options = {}) {
	const {
		prefix = "custom",
		filterPrefix = "",
		unit = "px",
		nameTransform = (name) => name,
		valueTransform = (value) => value,
		inlineMediaQueries = true,
		breakpoints = {
			mobile: "430px", // Base (mobile-first)
			tablet: "744px", // tablet en Tailwind
			desktop: "1440px", // desktop en Tailwind
		},
		commentHeader = null,
	} = options;

	const header =
		commentHeader ||
		`${prefix.charAt(0).toUpperCase() + prefix.slice(1)} Variables`;
	let css = `/* Responsive ${header} - Tailwind CSS v4 */\n`;

	// Obtener el mapa de modos del data (si existe)
	const modesMap = data.modes || null;

	if (inlineMediaQueries) {
		// Tailwind v4: Variables CSS regulares con media queries (fuera de @theme)
		css += `:root {\n`;

		// Variables base (mobile)
		data.variables.forEach((variable) => {
			if (!filterPrefix || variable.name.startsWith(filterPrefix)) {
				const name = nameTransform(variable.name.replace(filterPrefix, ""));
				const values = getResolvedValuesByMode(variable, modesMap);
				if (!values || values.mobile === undefined) return;

				const className = sanitizeClassName(name);
				const transformedValue = valueTransform(values.mobile);
				css += `\t--${prefix}-${className}: ${transformedValue}${unit};\n`;
			}
		});

		// Media query para tablet (usando sintaxis moderna de range)
		css += `\n\t@media (width >= ${breakpoints.tablet}) {\n`;
		data.variables.forEach((variable) => {
			if (!filterPrefix || variable.name.startsWith(filterPrefix)) {
				const name = nameTransform(variable.name.replace(filterPrefix, ""));
				const values = getResolvedValuesByMode(variable, modesMap);
				if (!values || values.tablet === undefined) return;

				const className = sanitizeClassName(name);
				const transformedValue = valueTransform(values.tablet);
				css += `\t\t--${prefix}-${className}: ${transformedValue}${unit};\n`;
			}
		});
		css += `\t}\n`;

		// Media query para desktop
		css += `\n\t@media (width >= ${breakpoints.desktop}) {\n`;
		data.variables.forEach((variable) => {
			if (!filterPrefix || variable.name.startsWith(filterPrefix)) {
				const name = nameTransform(variable.name.replace(filterPrefix, ""));
				const values = getResolvedValuesByMode(variable, modesMap);
				if (!values || values.desktop === undefined) return;

				const className = sanitizeClassName(name);
				const transformedValue = valueTransform(values.desktop);
				css += `\t\t--${prefix}-${className}: ${transformedValue}${unit};\n`;
			}
		});
		css += `\t}\n`;

		css += `}\n\n`;
	} else {
		// Método alternativo: Bloques @theme separados
		// Generar variables base (mobile-first)
		css += `@theme {\n`;

		data.variables.forEach((variable) => {
			if (!filterPrefix || variable.name.startsWith(filterPrefix)) {
				const name = nameTransform(variable.name.replace(filterPrefix, ""));
				const values = getResolvedValuesByMode(variable, modesMap);
				if (!values || values.mobile === undefined) return;

				const className = sanitizeClassName(name);
				const transformedValue = valueTransform(values.mobile);
				css += `\t--${prefix}-${className}: ${transformedValue}${unit};\n`;
			}
		});

		css += `}\n\n`;

		// Generar variables para tablet (md)
		css += `@theme {\n`;
		css += `\t@media (min-width: ${breakpoints.tablet}) {\n`;

		data.variables.forEach((variable) => {
			if (!filterPrefix || variable.name.startsWith(filterPrefix)) {
				const name = nameTransform(variable.name.replace(filterPrefix, ""));
				const values = getResolvedValuesByMode(variable, modesMap);
				if (!values || values.tablet === undefined) return;

				const className = sanitizeClassName(name);
				const transformedValue = valueTransform(values.tablet);
				css += `\t\t--${prefix}-${className}: ${transformedValue}${unit};\n`;
			}
		});

		css += `\t}\n`;
		css += `}\n\n`;

		// Generar variables para desktop (lg)
		css += `@theme {\n`;
		css += `\t@media (min-width: ${breakpoints.desktop}) {\n`;

		data.variables.forEach((variable) => {
			if (!filterPrefix || variable.name.startsWith(filterPrefix)) {
				const name = nameTransform(variable.name.replace(filterPrefix, ""));
				const values = getResolvedValuesByMode(variable, modesMap);
				if (!values || values.desktop === undefined) return;

				const className = sanitizeClassName(name);
				const transformedValue = valueTransform(values.desktop);
				css += `\t\t--${prefix}-${className}: ${transformedValue}${unit};\n`;
			}
		});

		css += `\t}\n`;
		css += `}\n\n`;
	}

	return css;
}

/**
 * Genera variables CSS para familias tipográficas
 * @param {Object} textStyleData - Datos del archivo "Text Style.json"
 * @param {Object} options - Opciones de configuración
 * @param {string} options.prefix - Prefijo para las variables (default: "font")
 * @param {string} options.filterPrefix - Filtrar solo variables que empiecen con esto (default: "fontFamily/")
 * @param {string} options.fallback - Fuente fallback (default: "sans-serif")
 * @returns {string} CSS con variables de familias tipográficas
 */
export function generateFontFamilyVariables(textStyleData, options = {}) {
	const {
		prefix = "font",
		filterPrefix = "fontFamily/",
		fallback = "sans-serif",
	} = options;

	let css = `/* Font Family Variables */\n@theme {\n`;

	textStyleData.variables.forEach((variable) => {
		if (variable.name.startsWith(filterPrefix)) {
			const name = variable.name.replace(filterPrefix, "");
			const value = getResolvedValue(variable);
			const className = sanitizeClassName(name);

			css += `\t--${prefix}-${className}: "${value}", ${fallback};\n`;
		}
	});

	return css + "}\n\n";
}

/**
 * Genera clases de utilidad de Tailwind para estilos de texto completos
 * Agrupa todas las propiedades tipográficas (font-size, font-family, line-height, etc.)
 * de cada estilo de texto en una sola clase reutilizable.
 *
 * @param {Object} textTokensData - Datos del archivo "4.Text Tokens.json"
 * @param {Object} options - Opciones de configuración
 * @param {string} options.prefix - Prefijo para las clases (default: "text")
 * @returns {string} CSS con clases de utilidad Tailwind
 *
 * @example
 * // Input: "Heading/Heading xl (B)/Font Size", "Heading/Heading xl (B)/Font Family", etc.
 * // Output: .heading-xl-b { font-size: var(--text-12); font-family: var(--font-montserrat); ... }
 */
export function generateTextUtilityClasses(textTokensData, options = {}) {
	const { prefix = "text" } = options;

	if (!textTokensData || !textTokensData.variables) {
		console.error("❌ Datos de Text Tokens inválidos");
		return "";
	}

	// Agrupar variables por estilo de texto (ej: "Heading/Heading xl (B)")
	const textStyles = {};

	textTokensData.variables.forEach((variable) => {
		const name = variable.name;

		// Buscar patrón: "Category/Style Name/Property"
		// Ejemplos: "Heading/Heading xl (B)/Font Size", "Body/Body lg (M)/Line Height"
		const match = name.match(
			/^(Heading|Body|Display|Auxiliar)\/([^\/]+)\/(.+)$/,
		);

		if (!match) return;

		const [, category, styleName, property] = match;
		const styleKey = `${category}/${styleName}`;

		// Inicializar objeto del estilo si no existe
		if (!textStyles[styleKey]) {
			textStyles[styleKey] = {
				category,
				styleName,
				properties: {},
			};
		}

		// Guardar la propiedad
		textStyles[styleKey].properties[property] = variable;
	});

	// Generar CSS
	let css = `/* ==========================================\n`;
	css += `   TEXT UTILITY CLASSES\n`;
	css += `   Clases de utilidad Tailwind para estilos de texto completos\n`;
	css += `   ========================================== */\n\n`;
	css += `@layer utilities {\n\n`;

	// Ordenar estilos: Display > Heading > Body
	const sortedStyles = Object.entries(textStyles).sort(([keyA], [keyB]) => {
		const orderMap = { Display: 0, Heading: 1, Body: 2 };
		const [catA] = keyA.split("/");
		const [catB] = keyB.split("/");
		return (orderMap[catA] || 999) - (orderMap[catB] || 999);
	});

	sortedStyles.forEach(([styleKey, styleData]) => {
		const { category, styleName, properties } = styleData;

		// Generar nombre de clase con prefijo de categoría para evitar colisiones
		// Ejemplo: "heading-xl-b", "body-lg-m", "display-xl"
		const categoryPrefix = category.toLowerCase();

		// Extraer la parte distintiva del styleName
		// "Heading xl (B)" → "xl (B)"
		let styleNameShort = styleName;
		const styleNameParts = styleName.split(" ");
		if (
			styleNameParts.length > 1 &&
			styleNameParts[0].toLowerCase() === categoryPrefix
		) {
			styleNameShort = styleNameParts.slice(1).join(" ");
		}

		const className = `${categoryPrefix}-${sanitizeTextClassName(
			styleNameShort,
		)}`;

		css += `\t/* ${category} / ${styleName} */\n`;
		css += `\t.${className} {\n`;

		// Mapeo de propiedades Figma → CSS
		const propertyMap = {
			"Font Size": "font-size",
			"Font Family": "font-family",
			"Font Style": "font-weight",
			"Line Height": "line-height",
			"Letter Spacing": "letter-spacing",
			"Paragraph Spacing": null, // No se usa en CSS directo
		};

		// Procesar cada propiedad
		Object.entries(properties).forEach(([propName, variable]) => {
			const uniqueModeKey = Object.keys(variable.resolvedValuesByMode)[0];
			const cssProp = propertyMap[propName];
			if (!cssProp) return;

			// Obtener valor resuelto
			const resolvedValue = getResolvedValue(variable);

			// Verificar que el valor no sea null, undefined o un objeto
			if (
				resolvedValue === null ||
				resolvedValue === undefined ||
				typeof resolvedValue === "object"
			)
				return;

			// Formatear valor según el tipo de propiedad
			let cssValue;

			if (propName === "Font Size") {
				// Font Size: usar variable de --text-X

				const aliasName =
					variable.resolvedValuesByMode?.[uniqueModeKey]?.aliasName;

				if (aliasName && aliasName.startsWith("fontSize/")) {
					const numPart = aliasName.replace("fontSize/fontSize ", "");
					cssValue = `var(--text-${numPart})`;
				} else {
					cssValue = `${resolvedValue}px`;
				}
			} else if (propName === "Line Height") {
				// Line Height: usar variable de --leading-X
				const aliasName =
					variable.resolvedValuesByMode?.[uniqueModeKey]?.aliasName;
				if (aliasName && aliasName.startsWith("lineHeight/")) {
					const numPart = aliasName.replace("lineHeight/lineHeight ", "");
					cssValue = `var(--leading-${numPart})`;
				} else {
					cssValue = resolvedValue === 0 ? "1" : `${resolvedValue}%`;
				}
			} else if (propName === "Font Family") {
				// Font Family: usar variable de --font-X
				const fontName = String(resolvedValue)
					.toLowerCase()
					.replace(/\s+/g, "-");
				cssValue = `var(--font-${fontName})`;
			} else if (propName === "Font Style") {
				// Font Style: convertir a font-weight
				const weight = getFontWeight(resolvedValue);
				cssValue = weight;
			} else if (propName === "Letter Spacing") {
				// Letter Spacing: 0 o valor en px
				cssValue = resolvedValue === 0 ? "0" : `${resolvedValue}px`;
			} else {
				cssValue = resolvedValue;
			}

			css += `\t\t${cssProp}: ${cssValue};\n`;
		});

		css += `\t}\n\n`;
	});

	css += `}\n`;

	return css;
}

// Exportar todas las funciones
export default {
	// Utilidades
	rgbToHex,
	getFontWeight,
	getLineHeight,
	sanitizeClassName,
	sanitizeTextClassName,
	sanitizeColorClassName,
	getResolvedValue,
	getResolvedValuesByMode,

	// Generadores
	generateDevicesVariables,
	generateNumberVariables,
	generateSpacingVariables,
	generateRadiusVariables,
	generateColorVariables,
	generateResponsiveFontSizeVariables,
	generateResponsiveLineHeightVariables,
	generateResponsiveVariables,
	generateFontFamilyVariables,
	generateTextUtilityClasses,
};
