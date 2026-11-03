# Design System Specification — Warm White Atelier
> Thozha Associates | Architecture & Civil Engineering

This design specification codifies the visual identity, tokens, component contracts, and craft floor rules for Thozha Associates, calibrated against `/myui`, `awesome-design-md`, and Emil Kowalski design engineering principles.

---

## 1. Brand Concept & Archetype

- **Identity:** High-trust, editorial architectural studio & licensed turnkey civil contractor.
- **Atmosphere:** Warm white limestone atelier (`#FAF8F5`), monolithic travertine hairlines (`#E8E4DC`), warm brushed gold accents (`#B88628`), and deep charcoal ink (`#18181B`).
- **Tone:** Quiet precision, generational durability, transparent engineering, zero contractor slop.

---

## 2. Color Palette & Tokens

```css
:root {
  /* Surface Layers */
  --color-canvas: #FAF8F5;       /* Warm White limestone atelier background */
  --color-surface-card: #FFFFFF;  /* Crisp white card container */
  --color-surface-subtle: #F4F0E6;/* Warm alabaster secondary background */
  --color-surface-dark: #1E1912;  /* Deep espresso obsidian for high-contrast CTA */

  /* Hairline Borders */
  --border-subtle: #E8E4DC;      /* Hairline limestone border */
  --border-accent: rgba(184, 134, 40, 0.35); /* Subtle warm gold accent line */

  /* Ink & Typography */
  --ink-primary: #18181B;        /* Deep charcoal for headlines */
  --ink-body: #44403C;           /* Stone-700 for legible body prose */
  --ink-muted: #78716C;          /* Stone-500 for captions & labels */

  /* Primary Brand Gold */
  --brand-gold: #B88628;         /* Warm bronze gold */
  --brand-gold-light: #C59940;   /* Hover glow */
  --brand-gold-dark: #8C6215;    /* Deep gradient anchor */
  --brand-gold-pill: #FBF7EE;    /* Soft tinted pill background */
}
```

---

## 3. Typography Hierarchy

| Role | Font Family | Size / Leading | Weight | Sample Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Editorial Hero** | `Cormorant Garamond`, serif | `text-5xl lg:text-7xl` / `leading-[0.98]` | Semi-bold (600) | *"Spaces Crafted with Quiet Precision."* |
| **Section Title** | `Cormorant Garamond`, serif | `text-3xl lg:text-5xl` / `leading-[1.08]` | Semi-bold (600) | *"From raw masonry to completed sanctuary."* |
| **Section Eyebrow** | `Plus Jakarta Sans`, sans | `text-[10px] sm:text-xs` / `tracking-[0.2em]` | Extra-bold (800) | `OUR CORE PILLARS • BENTO ARCHITECTURE` |
| **Prose / Body** | `Plus Jakarta Sans`, sans | `text-sm lg:text-base` / `leading-relaxed` | Regular (400) | Descriptive paragraphs, explanations |
| **Technical Specs** | `JetBrains Mono` / Monospace | `text-[11px]` / `tracking-widest` | Bold (700) | `CAD1+S // SITE SPEC`, `M25 Monolithic RCC` |

---

## 4. Craft Floor Rules (`impeccable` + Emil Polish)

1. **Concentric Squircle Radii:**
   - Outer sections/frames: `rounded-3xl` ($24\text{px}$)
   - Inner interactive cards: `rounded-2xl` ($16\text{px}$)
   - Small nested tags / inputs: `rounded-xl` ($12\text{px}$)
   - CTA buttons & pill badges: `rounded-full` ($9999\text{px}$)

2. **Tactile Micro-Feedback:**
   - All interactive buttons must have `active:scale-[0.97]` with `transition-all duration-150`.
   - Never animate high-frequency input keystrokes.

3. **Motion Constraints:**
   - Composite-only animations: only animate `transform` and `opacity`.
   - Easing curve: `cubic-bezier(0.16, 1, 0.3, 1)` (Apple fluid spring curve).
   - Enter duration: $300\text{ms}–400\text{ms}$; Exit duration: $200\text{ms}$.

4. **Mobile Touch & Input Ergonomics:**
   - Minimum touch target: $44\times44\text{pt}$ for primary interactive elements.
   - Form inputs: font size must be $\ge 16\text{px}$ (`text-base sm:text-xs`) to prevent iOS Safari auto-zoom.
   - Safe areas: `env(safe-area-inset-bottom)` and `viewport-fit=cover`.

---

## 5. Component Contracts

- **Navbar:** Floating liquid glass capsule (`bg-[#FAF8F5]/90 backdrop-blur-2xl border border-[#E8E4DC]`). Only ONE single navbar per viewport.
- **Hero:** Framed dusk villa with Big bold serif headlines, floating liquid glass badges, and architectural CAD blueprint registration marks.
- **Transformation Slider:** 50/50 interactive slider with window-level touch arbitration (`touch-action: pan-y`) and smooth cursor scrubbing.
- **Footer:** Editorial 4-column layout on desktop, stacked with regional certifications and office credentials on mobile.
