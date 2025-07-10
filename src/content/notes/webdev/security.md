---
title: 'Web Development Security'
slug: 'security'
description: 'Security concepts and best practices for web development'
category: 'Webdev'
tags: ['security', 'csrf', 'xss', 'web-security']
publishedAt: '2025-07-10'
---

## Content

## Definitions

- **Zero-Day Vulnerability** = vulnerability or exploit that is unkown today _(in other words "you have 0 days to get it fixed")_. If hacker uses this vulnerability it will be known as a **Zero-Day Exploit**.

## CSRF

It is used to produce state changes to the backend through the credentials of a legit authenticated user.
Basically, a user enters on a malicious website, which in turn will make an automatic request to our API
and sending the user login data (most usually the auth cookies) with a request which will cause a state change in our backend (e.g.: transfer money A -> B).
This will be seen as a legit request by the backend due to the valid credentials.

- Note this security vulnerability is mostly true for cookie-based authentication.

### How to secure

Server-side generate a random token in a cookie, frontend will read said cookie and send it with each subsequent http request in the headers.
The Server will verify this token and perform action if valid.

- [Angular Built-in Solution](https://angular.io/api/common/http/HttpClientXsrfModule)

Kore on: https://www.stackhawk.com/blog/angular-csrf-protection-guide-examples-and-how-to-enable-it/

## XSS

When the backend/frontend allows for the saving/viewing of data which may potentially execute a script on the client.

### How to secure

Sanitize strings sent to the Backend, escape/sanitize data on the UI before displaying it.

More on: https://www.stackhawk.com/blog/angular-xss-guide-examples-and-prevention/

## SQL Injection

When malicious SQL code is inserted into input fields to manipulate database queries.

### How to secure

- Use parameterized queries/prepared statements
- Input validation and sanitization
- Use ORM libraries that handle escaping automatically
- Implement least privilege database access

**Example (Node.js with parameterized queries):**

```javascript
// Vulnerable
const query = `SELECT * FROM users WHERE id = ${userId}`;

// Secure
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);
```

## Authentication & Authorization

### Authentication

Verifies user identity through credentials (username/password, tokens, biometrics).

**Best Practices:**

- Use strong password policies
- Implement multi-factor authentication (MFA)
- Use secure session management
- Store passwords with strong hashing (bcrypt, Argon2)
- Implement account lockout policies

### Authorization

Controls what authenticated users can access.

**Methods:**

- Role-based access control (RBAC)
- Attribute-based access control (ABAC)
- JWT tokens with claims
- OAuth 2.0 for third-party access

## HTTPS/TLS

Encrypts data in transit between client and server.

**Implementation:**

- Obtain SSL/TLS certificates (Let's Encrypt, commercial CAs)
- Configure web server (Apache, Nginx) for HTTPS
- Redirect HTTP to HTTPS
- Use HSTS headers
- Implement certificate pinning for critical applications

## Content Security Policy (CSP)

Prevents XSS attacks by controlling which resources can be loaded.

**Example:**

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self' 'unsafe-inline';"
/>
```

**Directives:**

- `default-src`: Default policy for all resource types
- `script-src`: Controls JavaScript sources
- `style-src`: Controls CSS sources
- `img-src`: Controls image sources
- `connect-src`: Controls AJAX/fetch requests

## Security Headers

Essential HTTP headers for web security:

```javascript
// Express.js example
app.use(helmet()); // Sets multiple security headers

// Manual headers
res.setHeader('X-Content-Type-Options', 'nosniff');
res.setHeader('X-Frame-Options', 'DENY');
res.setHeader('X-XSS-Protection', '1; mode=block');
res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
```

## Input Validation & Sanitization

### Client-side

- HTML5 validation attributes
- JavaScript validation
- Real-time feedback

### Server-side

- Always validate on server (client-side can be bypassed)
- Use validation libraries
- Whitelist allowed characters/patterns
- Sanitize before database storage

**Example (Node.js with Joi):**

```javascript
const schema = Joi.object({
  email: Joi.string().email().required(),
  age: Joi.number().min(18).max(100)
});
```

## Security Best Practices

### General

- Keep dependencies updated
- Use security scanning tools
- Implement logging and monitoring
- Regular security audits
- Follow OWASP Top 10 guidelines

### API Security

- Rate limiting
- Input validation
- Proper error handling (don't expose internals)
- API versioning
- Use HTTPS for all endpoints

### Session Management

- Secure session cookies (`HttpOnly`, `Secure`, `SameSite`)
- Session timeout
- Session regeneration after login
- Secure session storage

### Error Handling

- Don't expose sensitive information in error messages
- Log errors securely
- Use generic error messages for users
- Implement proper logging levels

## Security Testing

### Tools

- OWASP ZAP for vulnerability scanning
- Burp Suite for web application testing
- SonarQube for code analysis
- Snyk for dependency scanning

### Manual Testing

- Penetration testing
- Code reviews
- Security architecture reviews
- Threat modeling

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [Security Headers](https://securityheaders.com/)
- [Mozilla Security Guidelines](https://infosec.mozilla.org/guidelines/)
