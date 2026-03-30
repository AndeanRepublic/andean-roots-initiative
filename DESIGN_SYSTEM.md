# Sistema de Diseño - Andean Roots Initiative

Tokens extraídos de Figma para uso consistente en el proyecto.

## Colores

| Token | Valor | Uso Tailwind |
|-------|-------|--------------|
| Dark Green | `#666832` | `bg-dark-green`, `text-dark-green`, `border-dark-green` |
| Light Green | `#f7f7f5` | `bg-light-green`, `text-light-green` |
| White | `#ffffff` | `bg-white`, `text-white` |
| Black | `#222222` | `bg-black`, `text-black` |
| Grey | `#7a7a7a` | `bg-grey`, `text-grey` |

**CSS:** `var(--color-dark-green)`, etc.

---

## Spacing

| Token | Valor | Uso Tailwind |
|-------|-------|--------------|
| xs | 4px | `p-xs`, `m-xs`, `gap-xs` |
| sm | 8px | `p-sm`, `m-sm` |
| lg | 16px | `p-lg`, `m-lg` |
| xl | 24px | `p-xl`, `m-xl` |
| 2xl | 32px | `p-2xl`, `m-2xl` |
| 3xl | 40px | `p-3xl`, `m-3xl` |
| 4xl | 48px | `p-4xl`, `m-4xl` |
| 6xl | 64px | `p-6xl`, `m-6xl` |
| 7xl | 80px | `p-7xl`, `m-7xl` |
| 8xl | 120px | `p-8xl`, `m-8xl` |

---

## Border Radius

| Token | Valor | Uso Tailwind |
|-------|-------|--------------|
| none | 0 | `rounded-none` |
| sm | 8px | `rounded-sm` |
| pill | 100px | `rounded-pill` |
| full | 100px | `rounded-full` |

---

## Tipografía

### Familias
- **Body:** Manrope (300, 500, 600, 700)
- **Heading:** Nunito Sans (400, 600, 700)

### Clases de utilidad (design-tokens.css)
- `.body-sm-light` — 14px, Light
- `.body-md-light` — 16px, Light
- `.body-md-semibold` — 16px, SemiBold
- `.heading-h4` — 32px, Medium
- `.heading-h5` — 24px, SemiBold
- `.heading-h6` — 18px, SemiBold
- `.heading-lg` — 56px, Nunito Sans SemiBold
- `.heading-xl` — 86px, Nunito Sans SemiBold
- `.heading-display` — 320px, Display
- `.label` — 16px, Uppercase, Dark Green

### Uso con Tailwind
```
font-body      → Manrope
font-heading   → Nunito Sans
text-body-sm   → 14px
text-body-md   → 16px
text-heading-xl → 86px (si definido en @theme)
```

---

## Ejemplo de uso

```html
<button class="bg-dark-green text-white px-xl py-sm rounded-pill font-body font-semibold">
  GET INVOLVED
</button>

<h1 class="font-heading text-heading-xl text-white">
  Protect Nature, Preserve Our Future
</h1>
```
