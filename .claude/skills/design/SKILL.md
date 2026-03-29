---
name: design
description: Brand design system for Estación KUS FM — community radio in Irapuato, México. Covers brand colors, typography, radio player UI patterns, component guidelines, and visual identity rules for web properties.
---

# Design System — Estación KUS FM

Use this skill for all brand-specific design decisions on KUS FM web properties (estacionkusmedios.org and related sites).

---

## Brand Identity

**Estación KUS FM** is a community radio station based in Irapuato, Guanajuato, México. The brand personality is:
- **Local & warm** — community-focused, approachable
- **Modern & digital** — internet radio, streaming-native
- **Energetic** — music, events, entertainment
- **Trustworthy** — established media presence

---

## Color Palette

```css
:root {
  /* Primary */
  --kus-primary: #E63946;       /* KUS Red — main brand color */
  --kus-primary-dark: #C1121F;  /* Dark red for hover states */
  --kus-primary-light: #FF6B6B; /* Light red for accents */

  /* Secondary */
  --kus-secondary: #1D3557;     /* Deep navy — authority, trust */
  --kus-secondary-light: #457B9D; /* Medium blue — links, icons */

  /* Neutral */
  --kus-dark: #111111;          /* Near-black for main backgrounds */
  --kus-surface: #1A1A2E;       /* Dark surface cards */
  --kus-border: #2A2A3E;        /* Subtle borders */
  --kus-text-primary: #F1FAEE;  /* Light text on dark backgrounds */
  --kus-text-secondary: #A8DADC; /* Secondary text / captions */
  --kus-text-muted: #6B7280;    /* Muted / placeholder text */

  /* Accent */
  --kus-gold: #FFB703;          /* Highlight / premium / featured */
  --kus-green: #2DC653;         /* Online / live indicator */
  --kus-white: #FFFFFF;
}
```

### Color Usage Rules

| Element | Color |
|---------|-------|
| CTA buttons (primary) | `--kus-primary` |
| Links | `--kus-secondary-light` |
| "EN VIVO" / live badge | `--kus-green` with pulse animation |
| Featured content | `--kus-gold` |
| Body background | `--kus-dark` |
| Cards / surfaces | `--kus-surface` |
| Primary text | `--kus-text-primary` |
| Subtext / metadata | `--kus-text-secondary` |

---

## Typography

```html
<!-- Primary font: Inter for UI elements -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@700;800;900&display=swap" rel="stylesheet">
```

```css
:root {
  /* Headings — Montserrat bold/black */
  --font-heading: 'Montserrat', sans-serif;
  /* Body / UI — Inter regular/medium */
  --font-body: 'Inter', sans-serif;

  /* Scale */
  --text-xs: 0.75rem;    /* 12px — badges, labels */
  --text-sm: 0.875rem;   /* 14px — captions, meta */
  --text-base: 1rem;     /* 16px — body text */
  --text-lg: 1.125rem;   /* 18px — lead text */
  --text-xl: 1.25rem;    /* 20px — section headings */
  --text-2xl: 1.5rem;    /* 24px — card titles */
  --text-3xl: 1.875rem;  /* 30px — page headings */
  --text-4xl: 2.25rem;   /* 36px — hero headings */
}
```

---

## Radio Player UI Patterns

### Live Player Bar
- Fixed bottom bar (or top), always visible on mobile
- Contains: station logo, current track info, play/pause button, volume control
- "EN VIVO" badge with green pulse dot
- Background: `--kus-surface` with slight blur (backdrop-filter)

```css
.player-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 72px;
  background: rgba(26, 26, 46, 0.95);
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--kus-border);
  z-index: 1000;
}

.live-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(45, 198, 83, 0.15);
  color: var(--kus-green);
  border: 1px solid var(--kus-green);
  border-radius: 9999px;
  padding: 2px 10px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--kus-green);
  animation: pulse-live 1.5s ease-in-out infinite;
}

@keyframes pulse-live {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.3); }
}
```

### Program/Schedule Card
```css
.program-card {
  background: var(--kus-surface);
  border: 1px solid var(--kus-border);
  border-radius: 12px;
  padding: 16px;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.program-card:hover {
  border-color: var(--kus-primary);
  transform: translateY(-2px);
}
```

---

## Spacing System

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
}
```

Always use multiples of 4px. Section spacing: 48px–64px. Component padding: 16px–24px. Inline gaps: 8px–12px.

---

## Component Guidelines

### Buttons

```css
.btn-primary {
  background: var(--kus-primary);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: var(--text-base);
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
  min-height: 44px; /* accessibility */
}

.btn-primary:hover {
  background: var(--kus-primary-dark);
}

.btn-primary:active {
  transform: scale(0.98);
}

.btn-secondary {
  background: transparent;
  color: var(--kus-text-primary);
  border: 1px solid var(--kus-border);
  border-radius: 8px;
  padding: 12px 24px;
  font-family: var(--font-body);
  font-weight: 500;
  min-height: 44px;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.btn-secondary:hover {
  border-color: var(--kus-primary);
  color: var(--kus-primary);
}
```

### Navigation
- Desktop: horizontal nav with logo left, links right
- Mobile: hamburger menu with slide-in drawer
- Active state: left border accent `--kus-primary` on mobile; underline on desktop
- Always show current page in nav as active

### Images & Media
- Always use `loading="lazy"` for images below the fold
- Provide `alt` text for all images
- Podcast/program covers: square aspect ratio (1:1), border-radius 8px
- Event banners: 16:9 or 3:1 aspect ratio

---

## Responsive Breakpoints

```css
/* Mobile first */
/* xs: 0px — base styles */
/* sm: 480px */
@media (min-width: 480px) { }
/* md: 768px — tablet */
@media (min-width: 768px) { }
/* lg: 1024px — desktop */
@media (min-width: 1024px) { }
/* xl: 1280px — large desktop */
@media (min-width: 1280px) { }
```

---

## Accessibility Rules

- All interactive elements must have a minimum touch target of 44×44px
- Color contrast ratio: ≥4.5:1 for body text, ≥3:1 for large text / UI components
- Never use color as the only indicator of state
- All form inputs must have visible labels (not just placeholder text)
- Use `aria-label` for icon-only buttons
- Radio player controls must be keyboard accessible

---

## Design Do's and Don'ts

| Do ✅ | Don't ❌ |
|------|----------|
| Use the KUS red as primary CTA color | Use more than 2 brand colors in a single component |
| Use dark backgrounds for the radio player area | Use pure white (#FFF) backgrounds in the main UI — use off-white |
| Show "EN VIVO" with the green pulse animation | Use static text for live status without visual indicator |
| Use Montserrat for headings | Mix more than 2 font families |
| Keep card borders subtle (`--kus-border`) | Use heavy drop shadows that feel outdated |
| Use `transition` for hover states (0.2s ease) | Use abrupt state changes with no animation |
| Provide loading states for async content | Leave empty containers while loading |
