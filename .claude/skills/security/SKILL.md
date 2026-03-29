---
name: security
description: Web security guidelines for Estación KUS FM. Covers OWASP Top 10, HTTP security headers, input sanitization, rate limiting, CORS, XSS/CSRF prevention, and secure Express.js patterns. Use when writing or reviewing server.js, API endpoints, forms, or any code that handles user input or external data.
---

# Security Skill — Estación KUS FM

Use this skill whenever writing or reviewing backend code (`server.js`), form handling, API integrations (WhatsApp API, AzuraCast), or any HTML/JS that processes user input.

---

## OWASP Top 10 — Quick Reference

| # | Risk | Mitigation for this project |
|---|------|-----------------------------|
| A01 | Broken Access Control | Validate all inputs server-side; never trust client-side checks |
| A02 | Cryptographic Failures | Use HTTPS always; never store secrets in HTML/JS |
| A03 | Injection | Sanitize all form inputs; use parameterized queries if DB is added |
| A04 | Insecure Design | Validate file types in multer uploads; restrict accepted MIME types |
| A05 | Security Misconfiguration | Set security headers; disable X-Powered-By |
| A06 | Vulnerable Components | Keep `axios`, `express`, `multer` updated; run `npm audit` regularly |
| A07 | Auth Failures | Use environment variables for API keys; never hardcode credentials |
| A08 | Software Integrity | Verify npm package integrity; use `package-lock.json` |
| A09 | Logging Failures | Log errors server-side; never expose stack traces to clients |
| A10 | SSRF | Validate and whitelist URLs before making outbound requests with axios |

---

## HTTP Security Headers

Add these headers to `server.js` using the `helmet` middleware or manually:

```js
import helmet from 'helmet';
app.use(helmet());
```

Or manually:

```js
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; media-src 'self' https:; connect-src 'self' https:"
  );
  res.removeHeader('X-Powered-By');
  next();
});
```

### Recommended Headers Checklist

- [ ] `Content-Security-Policy` — restricts resource loading origins
- [ ] `X-Frame-Options: SAMEORIGIN` — prevents clickjacking
- [ ] `X-Content-Type-Options: nosniff` — prevents MIME sniffing
- [ ] `Referrer-Policy` — controls referrer info sent to third parties
- [ ] `Permissions-Policy` — restricts browser features (camera, mic, geo)
- [ ] Remove `X-Powered-By: Express` — don't expose stack info

---

## Input Sanitization

Always sanitize user input before processing. Install `express-validator`:

```bash
npm install express-validator
```

```js
import { body, validationResult } from 'express-validator';

app.post('/contact', [
  body('name').trim().escape().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
  body('message').trim().escape().isLength({ min: 10, max: 1000 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // safe to process
});
```

### Rules

- **Never** use `innerHTML` with user-provided data — use `textContent` instead
- **Always** trim and escape strings from forms
- **Never** `eval()` or `new Function()` with user input
- **Validate file uploads** — restrict MIME type and size in multer:

```js
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'audio/mpeg'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('File type not allowed'), false);
    }
  }
});
```

---

## Rate Limiting

Install `express-rate-limit`:

```bash
npm install express-rate-limit
```

```js
import rateLimit from 'express-rate-limit';

// General API rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// Stricter limit for contact/form endpoints
const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: { error: 'Too many submissions, please wait before trying again.' }
});
app.use('/contact', formLimiter);
```

---

## CORS Configuration

```js
import cors from 'cors';

const corsOptions = {
  origin: [
    'https://estacionkusmedios.org',
    'https://www.estacionkusmedios.org',
    // Add other trusted origins here
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
};
app.use(cors(corsOptions));
```

> ⚠️ **Never use `cors({ origin: '*' })`** in production for endpoints that handle sensitive data.

---

## Environment Variables

- **Never** hardcode API keys, tokens, or secrets in source code
- Use `.env` file for local development and environment variables in Coolify/Docker for production
- Add `.env` to `.gitignore`

```js
// Good
const apiKey = process.env.WHATSAPP_API_KEY;

// BAD — never do this
const apiKey = 'EAAxxxxxxxxxxxxxxxxxx';
```

### Required `.env` variables for this project

```env
WHATSAPP_API_KEY=
WHATSAPP_PHONE_ID=
AZURACAAST_API_KEY=
PORT=3000
```

---

## XSS Prevention (Frontend)

```js
// Safe — use textContent
document.getElementById('username').textContent = userInput;

// UNSAFE — never use innerHTML with user data
document.getElementById('username').innerHTML = userInput; // ❌

// If you need HTML, sanitize first with DOMPurify
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userInput);
document.getElementById('content').innerHTML = clean;
```

---

## Secure Express.js Checklist

- [ ] Use `helmet()` or manual security headers
- [ ] Remove `X-Powered-By` header
- [ ] Validate and sanitize ALL form inputs
- [ ] Restrict file upload MIME types and sizes
- [ ] Apply rate limiting to all API and form endpoints
- [ ] Configure CORS with explicit whitelist
- [ ] Store all secrets in environment variables
- [ ] Add `.env` to `.gitignore`
- [ ] Run `npm audit` before each deployment
- [ ] Never expose error stack traces to the client in production
- [ ] Use HTTPS in production (managed by Coolify/reverse proxy)
- [ ] Validate outbound URLs before making axios requests

---

## Quick npm audit workflow

```bash
npm audit
npm audit fix
# For critical issues:
npm audit fix --force
```

> Run this before every deployment to catch vulnerable dependency versions.
