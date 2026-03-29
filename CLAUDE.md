# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Estación KUS FM** is an internet radio streaming platform built with vanilla HTML/CSS/JS, Node.js (Express), and AzuraCast. It serves as the web presence and toolset for KUS FM community radio in Irapuato, México.

## Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (no framework)
- **Backend:** Node.js + Express (`server.js`)
- **Radio Streaming:** AzuraCast + Icecast
- **Deployment:** Coolify / Docker
- **Automation:** n8n workflows
- **APIs:** WhatsApp API, Gemini AI

## Active Skills

### UI/UX Pro Max
```
@.claude/skills/ui-ux-pro-max/SKILL.md
```
Use for all design decisions — styles, color palettes, typography, UX guidelines, component patterns.
Installed from: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill

### Security
```
@.claude/skills/security/SKILL.md
```
Use when writing or reviewing any server-side code, form handling, API endpoints, or HTML that handles user input.

### Design System KUS FM
```
@.claude/skills/design/SKILL.md
```
Use for brand-specific decisions — KUS FM colors, typography, radio UI patterns.

## Key Files

- `server.js` — Express backend, handles form submissions and WhatsApp API integration
- `index.html` — Main landing page with radio player
- `contacto.html` — Contact form
- `design.html` — Design system reference
- `generator.html` — Content generator tool
- `minis.html` — Mini player / widget
- `package.json` — Node.js dependencies

## Development Notes

- Always check `server.js` for security headers and input sanitization before deploying
- Radio stream URLs are configured in AzuraCast, referenced in the HTML player
- WhatsApp API integration uses form-data + multer for media uploads
- No build step required — static files served directly
