---
name: security-best-practices
description: Comprehensive security hardening for web applications covering HTTPS, input validation, authentication, and OWASP Top 10 vulnerabilities. Use for new projects, security audits, public APIs, or compliance requirements (GDPR, PCI-DSS).
---

# Security Best Practices

Comprehensive security hardening for web applications covering HTTPS, input validation, authentication, and OWASP Top 10 vulnerabilities.

> **Source:** https://skills.sh/supercent-io/skills-template/security-best-practices  
> **Repository:** https://github.com/supercent-io/skills-template  
> **Stars:** 88 | **Weekly Installs:** 14.1K  
> **Version:** 1.0.0

---

## When to use this skill

- **New project**: consider security from the start
- **Security audit**: inspect and fix vulnerabilities
- **Public API**: harden APIs accessible externally
- **Compliance**: comply with GDPR, PCI-DSS, etc.

---

## Instructions

### Step 1: Enforce HTTPS and security headers

**Express.js security middleware:**

```js
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();

// Helmet: automatically set security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://trusted-cdn.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.example.com"],
      fontSrc: ["'self'", "https:", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Enforce HTTPS
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && !req.secure) {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
  next();
});

// Rate limiting (DDoS prevention)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Stricter for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true
});
app.use('/api/auth/login', authLimiter);
```

---

### Step 2: Input validation (SQL Injection, XSS prevention)

**Joi validation:**

```js
import Joi from 'joi';

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8)
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .required(),
  name: Joi.string().min(2).max(50).required()
});

app.post('/api/users', async (req, res) => {
  // 1. Validate input
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // 2. Prevent SQL Injection: Parameterized Queries
  // ❌ Bad
  // db.query(`SELECT * FROM users WHERE email = '${email}'`);
  // ✅ Good
  const user = await db.query('SELECT * FROM users WHERE email = ?', [value.email]);

  // 3. Prevent XSS: Output Encoding
  import DOMPurify from 'isomorphic-dompurify';
  const sanitized = DOMPurify.sanitize(userInput);

  res.json({ user: sanitized });
});
```

---

### Step 3: Prevent CSRF

**CSRF Token:**

```js
import csrf from 'csurf';
import cookieParser from 'cookie-parser';

app.use(cookieParser());

const csrfProtection = csrf({ cookie: true });

// Provide CSRF token
app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Validate CSRF on all POST/PUT/DELETE
app.post('/api/*', csrfProtection, (req, res, next) => {
  next();
});

// Use on the client:
// fetch('/api/users', {
//   method: 'POST',
//   headers: { 'CSRF-Token': csrfToken },
//   body: JSON.stringify(data)
// });
```

---

### Step 4: Manage secrets

**`.env` (never commit):**

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/mydb

# JWT
ACCESS_TOKEN_SECRET=your-super-secret-access-token-key-min-32-chars
REFRESH_TOKEN_SECRET=your-super-secret-refresh-token-key-min-32-chars

# API Keys
STRIPE_SECRET_KEY=sk_test_xxx
SENDGRID_API_KEY=SG.xxx
```

```js
// Always read from env — never hardcode
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  throw new Error('DATABASE_URL environment variable is required');
}
```

---

### Step 5: Secure API authentication

**JWT + Refresh Token Rotation:**

```js
// Short-lived access token (15 minutes)
const accessToken = jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: '15m' });

// Long-lived refresh token (7 days), store in DB
const refreshToken = jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: '7d' });
await db.refreshToken.create({
  userId,
  token: refreshToken,
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
});

// Refresh token rotation: re-issue on each use
app.post('/api/auth/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  const payload = jwt.verify(refreshToken, REFRESH_SECRET);

  // Invalidate existing token
  await db.refreshToken.delete({ where: { token: refreshToken } });

  // Issue new tokens
  const newAccessToken = jwt.sign({ userId: payload.userId }, ACCESS_SECRET, { expiresIn: '15m' });
  const newRefreshToken = jwt.sign({ userId: payload.userId }, REFRESH_SECRET, { expiresIn: '7d' });

  await db.refreshToken.create({
    userId: payload.userId,
    token: newRefreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });

  res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
});
```

---

## Constraints

### Required rules (MUST)

1. **HTTPS Only** — HTTPS required in production
2. **Separate secrets** — manage via environment variables; never hardcode in code
3. **Input Validation** — validate all user input
4. **Parameterized Queries** — prevent SQL Injection
5. **Rate Limiting** — DDoS prevention

### Prohibited items (MUST NOT)

1. **No `eval()`** — code injection risk
2. **No direct `innerHTML`** — XSS risk
3. **No committing secrets** — never commit `.env` files

---

## OWASP Top 10 Checklist

```
- [ ] A01: Broken Access Control — RBAC, authorization checks
- [ ] A02: Cryptographic Failures — HTTPS, encryption
- [ ] A03: Injection — Parameterized Queries, Input Validation
- [ ] A04: Insecure Design — Security by Design
- [ ] A05: Security Misconfiguration — Helmet, change default passwords
- [ ] A06: Vulnerable Components — npm audit, regular updates
- [ ] A07: Authentication Failures — strong auth, MFA
- [ ] A08: Data Integrity Failures — signature validation, CSRF prevention
- [ ] A09: Logging Failures — security event logging
- [ ] A10: SSRF — validate outbound requests
```

---

## Best practices

1. **Principle of Least Privilege** — grant minimal privileges
2. **Defense in Depth** — layered security
3. **Security Audits** — regular security reviews

---

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [helmet.js](https://helmetjs.github.io/)
- [Security Checklist](https://skills.sh/supercent-io/skills-template/security-best-practices)

---

## Tags

`#security` `#OWASP` `#HTTPS` `#CORS` `#XSS` `#SQL-injection` `#CSRF` `#infrastructure`

## Related skills

- `security` — KUS FM custom security skill
- `github-actions-templates` — For security scanning CI/CD workflows
