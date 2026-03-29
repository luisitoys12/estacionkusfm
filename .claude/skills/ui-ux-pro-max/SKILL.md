---
name: ui-ux-pro-max
description: UI/UX design intelligence. 67 styles, 161 palettes, 57 font pairings, 25 charts, 16 stacks (React, Next.js, Vue, Svelte, Astro, SwiftUI, React Native, Flutter, Nuxt, Nuxt UI, Tailwind, shadcn/ui, Jetpack Compose, Three.js, Angular, Laravel). Actions: plan, build, create, design, implement, review, fix, improve, optimize, enhance, refactor, check UI/UX code. Projects: website, landing page, dashboard, admin panel, e-commerce, SaaS, portfolio, blog, mobile app, .html, .tsx, .vue, .svelte. Elements: button, modal, navbar, sidebar, card, table, form, chart. Styles: glassmorphism, claymorphism, minimalism, brutalism, neumorphism, bento grid, dark mode, responsive, skeuomorphism, flat design. Topics: color palette, accessibility, animation, layout, typography, font pairing, spacing, hover, shadow, gradient. Integrations: shadcn/ui MCP for component search and examples.
---

# UI/UX Pro Max - Design Intelligence

Comprehensive design guide for web and mobile applications. Contains 67 styles, 161 color palettes, 57 font pairings, 99 UX guidelines, and 25 chart types across 16 technology stacks. Searchable database with priority-based recommendations.

> **Source:** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill  
> **Homepage:** https://uupm.cc  
> **Version:** 2.5.0  
> **Author:** NextLevelBuilder  

---

# Prerequisites

Check if Python is installed:

```bash
python3 --version || python --version
```

If Python is not installed, install it based on user's OS:

**macOS:**
```bash
brew install python3
```

**Ubuntu/Debian:**
```bash
sudo apt update && sudo apt install python3
```

**Windows:**
```powershell
winget install Python.Python.3.12
```

---

## How to Use This Skill

Use this skill when the user requests any of the following:

| Scenario | Trigger Examples | Start From |
|----------|-----------------|------------|
| **New project / page** | "Build a landing page", "Create a dashboard" | Step 1 → Step 2 (design system) |
| **New component** | "Create a pricing card", "Add a modal" | Step 3 (domain search: style, ux) |
| **Choose style / color / font** | "What style fits a radio app?", "Recommend color palette" | Step 2 (design system) |
| **Review existing UI** | "Review this page for UX issues", "Check accessibility" | Quick Reference checklist |
| **Fix a UI bug** | "Button hover is broken", "Layout shifts on load" | Quick Reference → relevant section |
| **Improve / optimize** | "Make this faster", "Improve mobile experience" | Step 3 (domain search: ux) |
| **Implement dark mode** | "Add dark mode support" | Step 3 (domain: style "dark mode") |
| **Add charts / data viz** | "Add an analytics dashboard chart" | Step 3 (domain: chart) |
| **Stack best practices** | "HTML performance tips", "Vanilla JS optimization" | Step 4 (stack search) |

Follow this workflow:

### Step 1: Analyze User Requirements

Extract key information from user request:
- **Product type**: Entertainment (social, video, music, gaming), Tool (scanner, editor, converter), Productivity (task manager, notes, calendar), or hybrid
- **Target audience**: C-end consumer users; consider age group, usage context (commute, leisure, work)
- **Style keywords**: playful, vibrant, minimal, dark mode, content-first, immersive, etc.
- **Stack**: HTML/CSS/Vanilla JS (this project's primary tech stack)

### Step 2: Generate Design System (REQUIRED)

**Always start with `--design-system`** to get comprehensive recommendations with reasoning:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<product_type> <industry> <keywords>" --design-system [-p "Project Name"]
```

This command:
1. Searches domains in parallel (product, style, color, landing, typography)
2. Applies reasoning rules to select best matches
3. Returns complete design system: pattern, style, colors, typography, effects
4. Includes anti-patterns to avoid

**Example for KUS FM:**
```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "community radio entertainment music streaming" --design-system -p "KUS FM"
```

### Step 2b: Persist Design System

To save the design system for retrieval across sessions:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "KUS FM"
```

This creates:
- `design-system/MASTER.md` — Global Source of Truth with all design rules
- `design-system/pages/` — Folder for page-specific overrides

### Step 3: Supplement with Detailed Searches

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <domain> [-n <max_results>]
```

| Need | Domain | Example |
|------|--------|---------|
| Product type patterns | `product` | `--domain product "entertainment radio"` |
| Style options | `style` | `--domain style "glassmorphism dark"` |
| Color palettes | `color` | `--domain color "entertainment vibrant"` |
| Font pairings | `typography` | `--domain typography "playful modern"` |
| Chart recommendations | `chart` | `--domain chart "real-time dashboard"` |
| UX best practices | `ux` | `--domain ux "animation accessibility"` |
| Landing structure | `landing` | `--domain landing "hero social-proof"` |
| AI prompt / CSS keywords | `prompt` | `--domain prompt "minimalism"` |

### Step 4: Stack Guidelines

For HTML/Tailwind implementation:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --stack html-tailwind
```

---

## Common Rules for Professional UI

### Icons & Visual Elements

- Default icon library: **Phosphor** or **Heroicons** (vector-only, no emojis as icons)
- Consistent stroke width within the same visual layer (1.5px or 2px)
- Touch target minimum: 44×44pt interactive area
- Icon contrast: follow WCAG 4.5:1 for small elements, 3:1 minimum for larger UI glyphs

| Rule | Standard | Avoid |
|------|----------|-------|
| **No Emoji as Structural Icons** | Use vector icons (Phosphor, Heroicons) | Using emojis (🎨 🚀) for navigation or system controls |
| **Vector-Only Assets** | SVG or platform vector icons | Raster PNG icons that blur or pixelate |
| **Consistent Icon Sizing** | Design tokens (icon-sm, icon-md = 24pt, icon-lg) | Mixing arbitrary values like 20pt/24pt/28pt |
| **Touch Target Minimum** | ≥44×44pt interactive area | Small icons without expanded tap area |

### Light/Dark Mode Contrast

| Rule | Do | Don't |
|------|----|---------|
| **Text contrast (light)** | Body text contrast ≥4.5:1 against light surfaces | Low-contrast gray body text |
| **Text contrast (dark)** | Primary text ≥4.5:1, secondary ≥3:1 on dark surfaces | Dark mode text blending into background |
| **Token-driven theming** | Semantic color tokens mapped per theme | Hardcoded per-screen hex values |

### Layout & Spacing

| Rule | Do | Don't |
|------|----|---------|
| **8px spacing rhythm** | Consistent 4/8px spacing system for padding/gaps | Random spacing with no rhythm |
| **Responsive breakpoints** | Define consistent breakpoints (mobile 375px, tablet 768px, desktop 1280px) | Ad-hoc breakpoints per component |
| **Readable text measure** | Max ~75 characters per line for long-form text | Full-width paragraphs edge-to-edge |

---

## Pre-Delivery Checklist

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from a consistent icon family and style
- [ ] Primary text contrast ≥4.5:1 in both light and dark mode
- [ ] Dividers/borders distinguishable in both modes
- [ ] Verified on 375px (small phone), 768px (tablet), 1280px (desktop)
- [ ] 4/8px spacing rhythm maintained across components
- [ ] All meaningful images/icons have alt text / aria-labels
- [ ] Form fields have labels, hints, and clear error messages
- [ ] Color is not the only indicator of state
