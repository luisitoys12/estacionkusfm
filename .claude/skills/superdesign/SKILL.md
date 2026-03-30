---
name: superdesign
description: SuperDesign helps you (1) find design inspirations/styles and (2) generate/iterate design drafts on an infinite canvas. Use when designing new pages, features, flows, improving existing UI, or setting a design system.
---

# superdesign

SuperDesign helps you (1) find design inspirations/styles and (2) generate/iterate design drafts on an infinite canvas.

> **Source:** https://skills.sh/superdesigndev/superdesign-skill/superdesign  
> **Repository:** https://github.com/superdesigndev/superdesign-skill

---

# Core scenarios (what this skill handles)

**superdesign init** — Analyze the repo and build UI context to `.superdesign/init/`

- **Help me design X** (feature/page/flow)
- **Set design system**
- **Help me improve design of X**

---

# Init: Repo Analysis

When `.superdesign/init/` directory doesn't exist or is empty, you MUST automatically:

- Create the `.superdesign/init/` directory
- Fetch the init prompt from the URL below
- Follow the prompt instructions to analyze the repo and write context files

```
https://raw.githubusercontent.com/superdesigndev/superdesign-skill/main/skills/superdesign/INIT.md
```

Do NOT ask the user to do this manually — just do it.

---

# Mandatory Init Files

If `.superdesign/init/` exists, you MUST read ALL files in this directory FIRST before any design task:

- `components.md` — shared UI primitives with full source code
- `layouts.md` — shared layout components (nav, sidebar, header, footer)
- `routes.md` — page/route mapping
- `theme.md` — design tokens, CSS variables, Tailwind config
- `pages.md` — page component dependency trees (which files each page needs)

**When designing for an existing page:** First check `pages.md` for the page's complete dependency tree. Every file in that tree MUST be passed as `--context-file`. Then also add globals.css, tailwind.config, and design-system.md.

---

# Superdesign CLI (MUST run before any command)

**IMPORTANT: Before running ANY superdesign command, you MUST ensure the CLI is installed and logged in.**

Follow these steps in order — do NOT skip any step:

1. Check if CLI is already installed:
   ```bash
   superdesign --version
   ```
   - If the command succeeds (prints a version), **skip installation** and go to step 2.
   - If the command fails (not found), install the CLI:
   ```bash
   npm install -g @superdesign/cli@latest
   ```

2. Check login status by running any command (e.g. `superdesign --help`). If you see an auth/login error, run:
   ```bash
   superdesign login
   ```
   Wait for login to complete successfully before proceeding.

3. Only after login succeeds, run your intended superdesign commands.

Never assume the user is already logged in. Always verify login first.

---

# How it works

MUST MANDATORY — Fetch fresh guidelines below:

```
https://raw.githubusercontent.com/superdesigndev/superdesign-skill/main/skills/superdesign/SUPERDESIGN.md
```

Action accordingly based on instruction in the SUPERDESIGN.md.
