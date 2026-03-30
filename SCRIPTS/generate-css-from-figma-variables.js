import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  generateDevicesVariables,
  generateNumberVariables,
  generateSpacingVariables,
  generateRadiusVariables,
  generateColorVariables,
  generateResponsiveFontSizeVariables,
  generateResponsiveLineHeightVariables,
  generateFontFamilyVariables,
  generateTextUtilityClasses,
  generateSpacingUtilityClasses,
  generateRadiusUtilityClasses,
} from "./css-generators.js";

const __filename = fileURLToPath(import.meta.url);
const __filename_dir = path.dirname(__filename);
const __dirname = path.join(__filename_dir, "Figma variables");

// Load and parse JSON files
function loadJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error.message);
    return null;
  }
}

// Main function to generate all CSS
function generateCSS() {
  const variablesDir = path.join(__dirname);

  console.log(
    "╔════════════════════════════════════════════════════════════════════╗"
  );
  console.log(
    "║                                                                    ║"
  );
  console.log(
    "║          🎨 GENERANDO CSS DESDE VARIABLES DE FIGMA 🎨             ║"
  );
  console.log(
    "║                    AstroBioHub Frontend                            ║"
  );
  console.log(
    "║                                                                    ║"
  );
  console.log(
    "╚════════════════════════════════════════════════════════════════════╝\n"
  );

  // Load all JSON files
  console.log("📂 Cargando archivos JSON de Figma...\n");

  const devicesData = loadJsonFile(path.join(variablesDir, "Devices.json"));
  const numberData = loadJsonFile(path.join(variablesDir, "Number base.json"));
  const primitivesData = loadJsonFile(
    path.join(variablesDir, "Primitives.json")
  );
  const textStyleData = loadJsonFile(
    path.join(variablesDir, "Text Style.json")
  );
  const textTokensData = loadJsonFile(
    path.join(variablesDir, "Text Tokens.json")
  );
  const spacingData = loadJsonFile(
    path.join(variablesDir, "Spacing Tokens.json")
  );
  const radiusData = loadJsonFile(
    path.join(variablesDir, "Radius Tokens.json")
  );

  // Validar archivos críticos
  if (
    !devicesData ||
    !numberData ||
    !primitivesData ||
    !textStyleData ||
    !textTokensData ||
    !spacingData ||
    !radiusData
  ) {
    console.error("❌ Error: No se pudieron cargar los archivos requeridos");
    console.error("   Archivos necesarios:");
    console.error("   - 1. Number base.json");
    console.error("   - 2.Primitives.json");
    console.error("   - 3.Text Style.json");
    console.error("   - 4.Text Tokens.json");
    console.error("   - Spacing Tokens.json");
    console.error("   - Radius Tokens.json");
    return;
  }

  console.log("✅ Archivos cargados correctamente:");
  console.log("   ✓ 0. Devices.json");
  console.log("   ✓ 1. Number base.json");
  console.log("   ✓ 2.Primitives.json");
  console.log("   ✓ 3.Text Style.json");
  console.log("   ✓ 4.Text Tokens.json");
  console.log("   ✓ Spacing Tokens.json");
  console.log("   ✓ Radius Tokens.json");
  console.log();
  console.log(
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
  );

  let css = `/* ============================================ */
/* SISTEMA DE DISEÑO - AstroBioHub Frontend   */
/* Generado desde Variables de Figma          */
/* Fecha: ${new Date().toISOString()}         */
/* ============================================ */

`;

  // ==================== SECCIÓN 0: DEVICES ====================
  console.log("📊 Generando variables de Devices...");
  if (devicesData) {
    css += `/* ========================================== */
/* 0. DEVICES VARIABLES                     */
/* Desde: Devices.json                   */
/* ========================================== */

`;
    css += generateDevicesVariables(devicesData, {
      prefix: "breakpoint",
    });
    console.log("   ✓ Variables de Devices generadas\n");
  }

  // ==================== SECCIÓN 1: NUMBER BASE ====================
  console.log("📊 Generando variables de Number base...");
  if (numberData) {
    css += `/* ========================================== */
/* 1. NUMBER BASE VARIABLES                  */
/* Desde: Number base.json                */
/* ========================================== */

`;
    css += generateNumberVariables(numberData, {
      prefix: "num",
    });
    console.log("   ✓ Variables numéricas generadas\n");
  }

  // ==================== SECCIÓN 2: SPACING ====================
  // Ya no se generan variables :root para spacing

  // ==================== CLASES UTILITARIAS DE SPACING ====================
  console.log("📏 Generando clases utilitarias de spacing...");
  css += generateSpacingUtilityClasses(spacingData);
  console.log("   ✓ Clases utilitarias de spacing generadas\n");

  // ==================== SECCIÓN 3: RADIUS ====================
  // Ya no se generan variables :root para radius

  // ==================== CLASES UTILITARIAS DE RADIUS ====================
  console.log("🔘 Generando clases utilitarias de radius...");
  css += generateRadiusUtilityClasses(radiusData);
  console.log("   ✓ Clases utilitarias de radius generadas\n");

  // ==================== SECCIÓN 4: COLORES ====================
  console.log("🎨 Generando variables de colores...");
  css += `/* ========================================== */
/* 4. COLOR VARIABLES                        */
/* Desde: Primitives.json                  */
/* ========================================== */

`;
  css += generateColorVariables(primitivesData, {
    prefix: "color",
  });
  console.log("   ✓ Variables de colores generadas\n");

  // ==================== SECCIÓN 5: TIPOGRAFÍA RESPONSIVE ====================
  console.log("✍️  Generando tipografía responsive...");
  css += `/* ========================================== */
/* 5. TYPOGRAPHY - RESPONSIVE                */
/* Desde: Text Style.json                  */
/* Con referencias a Number base             */
/* ========================================== */

`;

  // Font Sizes Responsive (con referencias a Number base)
  console.log("   → Font sizes responsive (con referencias a --num-X)");
  css += generateResponsiveFontSizeVariables(textStyleData, {
    prefix: "text",
    filterPrefix: "fontSize/",
    useVariableReferences: true, // ← Usar referencias a variables
    variablePrefix: "num",
    inlineMediaQueries: true,
  });

  // Line Heights Responsive (con referencias a Number base)
  console.log("   → Line heights responsive (con referencias a --num-X)");
  css += generateResponsiveLineHeightVariables(textStyleData, {
    prefix: "leading",
    filterPrefix: "lineHeight/",
    useVariableReferences: true, // ← Usar referencias a variables
    variablePrefix: "num",
    inlineMediaQueries: true,
  });

  console.log("   ✓ Tipografía responsive generada\n");

  // ==================== SECCIÓN 6: FONT FAMILIES ====================
  console.log("🔤 Generando font families...");
  css += `/* ========================================== */
/* 6. FONT FAMILIES                          */
/* Desde: Text Style.json                  */
/* ========================================== */

`;
  css += generateFontFamilyVariables(textStyleData, {
    prefix: "font",
    filterPrefix: "fontFamily/",
  });
  console.log("   ✓ Font families generadas\n");

  // ==================== SECCIÓN 7: CLASES DE UTILIDAD DE TEXTO ====================
  console.log("✍️  Generando clases de utilidad de texto...");
  css += `/* ========================================== */
/* 7. TEXT UTILITY CLASSES                   */
/* Desde: Text Tokens.json                 */
/* Clases Tailwind para estilos completos    */
/* ========================================== */

`;
  css += generateTextUtilityClasses(textTokensData, {
    prefix: "text",
  });
  console.log("   ✓ Clases de utilidad generadas\n");

  // ==================== GUARDAR ARCHIVO ====================
  console.log(
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
  );
  console.log("💾 Guardando archivo CSS...\n");

  const outputPath = path.join(__dirname, "figma_var.css");
  fs.writeFileSync(outputPath, css);

  console.log(
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  );
  console.log("✨ ¡CSS GENERADO EXITOSAMENTE! ✨");
  console.log(
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
  );

  console.log("📄 Archivo: figma-variables.css");
  console.log(`📍 Ubicación: ${outputPath}`);
  console.log(`📊 Tamaño: ${css.length} caracteres`);
  console.log(`📦 Tamaño: ${(css.length / 1024).toFixed(2)} KB\n`);

  console.log("🎯 Siguiente paso:");
  console.log("   Importa el archivo en tu CSS principal:\n");
  console.log('   @import "tailwindcss";');
  console.log('   @import "./figma_data/figma-variables.css";\n');

  return css;
}

// Run the script
generateCSS();

export { generateCSS };
