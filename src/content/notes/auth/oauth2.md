---
title: 'OAuth 2.0'
slug: 'oauth2'
description: 'Introduction to OAuth 2.0 and OIDC concepts'
category: 'Auth'
tags: ['authorization', 'oauth', 'oidc', 'jwt', 'security']
publishedAt: '2026-08-10'
---

## The risks without OAuth

- Sharing your password directly means trusting every app you give it to.
- You might trust the app whose UI you're using, but not a third-party app that only needs limited access (e.g. giving your Google password to an app that just needs a few files).

## Goal of OAuth

- Let a user or app access another app/resource without ever sharing the password.
- OAuth = access. Issues access tokens. Doesn't say who the user is.
- OIDC = identity. Built on top of OAuth. Issues ID tokens (a statement about whom the user is).

## Notions

### Roles in OAuth

- Resource Owner: The User
- Device: Use Agent (e.g.: browser app SPA, mobile phone)
- OAuth Client: The application (the application that runs on the device)
- Authorization Server: The server that issues the access token
- Resource Server: The API that needs to be accessed, where the data lives

> These are roles, not necessarily separate components — real architectures can combine them. For example, an API can combine Authorization Server and Resource Server.

### Analogy

Think of a hotel with access card. The receptionist is the Authorization server (checking id card and authenticating the user), which gives you a card (access token) that allows you access to your room or the hotel benefits (pool, etc.) are the Resource Server.

### Client Types

- Confidential Client: has credentials, kept secret from users (e.g. a backend server)
  - Usually a client secret, a string shared between the Client and Authorization Server
  - More secure: a public/private key pair, with the private key kept on the Application
- Public Client: no credentials (e.g. SPA or mobile app, where users can access the source/device)

> Redirect-based flows provide a safer, more flexible alternative to Resource Owner Password Credentials Grant (where the client directly handles username and password). Redirects enable additional security features like 2FA and explicit user consent screens that show exactly what data access is being authorized.

### Communication Types

![OAuth Communication Channels](/assets/notes/auth/oauth-communication-channels.png)

- Front Channel: Browser-based communication using redirects and the address bar. Less secure due to visibility in browser history and potential interception.
- Back Channel: Direct server-to-server HTTPS communication with TLS encryption and certificate validation. More secure and trusted.

### PKCE

PKCE (pronounced “pixy”) is a security extension to OAuth 2.0 for public clients on mobile devices, designed to prevent interception of the authorisation code by a malicious application that has sneaked into the same device.

**TL;DR How it works:**

1. Client generates a random `code_verifier` (secret string)
2. Client creates a `code_challenge` by hashing the verifier
3. Client sends the `code_challenge` with the authorization request
4. Authorization Server stores the challenge and returns an authorization code
5. Client exchanges the code + original `code_verifier` for tokens
6. Authorization Server verifies the verifier matches the stored challenge

This proves the same client that started the flow is completing it, even if the authorization code is intercepted.

### JWT

JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.

It the most usual way of transmitting information in authentication flows (but not the only one).

#### Format

The format is as follows:

```text
HEADER.PAYLOAD.SIGNATURE
```

![JWT Structure](/assets/notes/auth/jwt-structure.png)

- Header: contains the type of the token, which is JWT, and the signing algorithm being used, such as HMAC SHA256 or RSA

```text
{
  "alg": "HS256",
  "typ": "JWT"
}
```

- Payload: contains the claims. Claims are statements about an entity (typically, the user) and additional data. It usually contains a list of [Registered Claim Names](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1)

```text
{
  "sub": "1234567890",
  "iss": "my-auth-server",
  "aud": "my-api",
  "exp": 12422353535,
  "name": "John Doe",
  "admin": true
}
```

- Signature: is the signed part, proving that payload has not being modified. To create it you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that

#### Types of JWT

- **Access Token**: is the string used when making authenticated requests to the API. The string itself has no meaning to the application using it, but represents that the user has authorized a third-party application to access their account. The token has a corresponding duration of access, scope, and potentially other information the server needs
- **Refresh Token**: is a string that is used to get a new access token when an access token expires
- **ID Token**: is a string used for providing additional information regarding the identity of a User, it is part of the OIDC flow.
- **Authorization Code**: is an intermediate token used in the server-side app flow. An authorization code is returned to the client after the authorization step, and then the client exchanges it for an access token

### Scopes

Scopes are a mechanism to limit an application's access to a user's data. Instead of granting complete access to a user's account, scopes allow applications to request only the specific permissions they need.

**Key concepts**:

- Scope controls what an application can do within the context of what a user is allowed to do
- Scope is not the same as internal API permissions — it's a user-facing permission model
- Users are more willing to authorize apps when they understand exactly what access is being granted

**Best practices for defining scopes**:

- **Read vs. Write**: Separate scopes for reading data vs. modifying it (e.g., `read:profile`, `write:profile`)
- **Keep it simple**: Don't overwhelm users with too many scopes — they need to understand what they're granting
- **Restrict sensitive information**: Separate scopes for accessing private/sensitive data (e.g., GitHub's `repo` vs. `repo:private`)
- **Group by functionality**: Organize scopes by service area (e.g., Google's approach: `gmail.readonly`, `drive.file`, `youtube.upload`)
- **Protect billable resources**: Use dedicated scopes for API operations that incur charges or have rate limits
- **Granular when necessary**: Allow apps to request minimal access (e.g., Dropbox's folder-only scope vs. full access)

**Common naming patterns**:

```
read:resource          # Read-only access
write:resource         # Write access (often includes read)
resource:action        # Specific action (e.g., repo:delete)
resource.subresource   # Hierarchical (e.g., user.email, user.profile)
```

## Authentication Flows

### Implicit Flow

> Notice: This flow is considered deprecated, instead the new security recommendation is to use the `Authorization Code Flow`

#### Diagram

```mermaid
sequenceDiagram
    participant User as User
    participant Client as Client App (SPA)
    participant AuthServer as Authorization Server
    participant API as Resource Server

    User->>Client: 1. Initiate login
    Client->>AuthServer: 2. Authorization request (response_type=token)
    AuthServer->>User: 3. Show login & consent
    User->>AuthServer: 4. Authenticate & approve
    AuthServer->>Client: 5. Redirect with access token (URL fragment)
    Client->>Client: 6. Extract token from URL
    Client->>API: 7. API request with access token
    API->>Client: 8. Protected resource
```

#### HTTP Requests

**1. Authorization Request (Browser redirect)**

```text
GET /authorize?
  response_type=token&
  client_id=CLIENT_ID&
  redirect_uri=https://app.example.com/callback&
  scope=read:profile&
  state=xyz123 HTTP/1.1
Host: auth-server.example.com
```

**2. Authorization Response (Redirect to client)**

```text
HTTP/1.1 302 Found
Location: https://app.example.com/callback?
  access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...&
  token_type=Bearer&
  expires_in=3600&
  state=xyz123
```

### Authorization Code Flow

This is the recommended flow for modern applications. Key advantages over Implicit Flow:

- **Tokens never exposed in URL**: Access tokens are exchanged via secure back-channel (server-to-server), not visible in browser history or logs
- **Client authentication**: Confidential clients can use client secrets to prove identity
- **PKCE support**: Adds protection for public clients (SPAs, mobile apps) against authorization code interception
- **Refresh tokens**: Enables long-lived sessions without re-authentication
- **Reduced attack surface**: Authorization code is single-use and short-lived, limiting interception risk

#### Diagram

```mermaid
sequenceDiagram
    participant User as User
    participant Client as Client App
    participant AuthServer as Authorization Server
    participant API as Resource Server

    User->>Client: 1. Initiate login
    Client->>AuthServer: 2. Authorization request (response_type=code)
    AuthServer->>User: 3. Show login & consent
    User->>AuthServer: 4. Authenticate & approve
    AuthServer->>Client: 5. Redirect with authorization code
    Client->>AuthServer: 6. Exchange code for tokens (Back Channel)
    AuthServer->>Client: 7. Access token + Refresh token
    Client->>API: 8. API request with access token
    API->>Client: 9. Protected resource
```

#### HTTP Requests

**1. Authorization Request (Browser redirect)**

```text
GET /authorize?
  response_type=code&
  client_id=CLIENT_ID&
  redirect_uri=https://app.example.com/callback&
  scope=read:profile&
  state=xyz123&
  code_challenge=CHALLENGE&
  code_challenge_method=S256 HTTP/1.1
Host: auth-server.example.com
```

**2. Authorization Response (Redirect to client)**

```text
HTTP/1.1 302 Found
Location: https://app.example.com/callback?
  code=AUTH_CODE_HERE&
  state=xyz123
```

**3. Token Exchange Request (Back channel)**

```text
POST /token HTTP/1.1
Host: auth-server.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
code=AUTH_CODE_HERE&
redirect_uri=https://app.example.com/callback&
client_id=CLIENT_ID&
client_secret=CLIENT_SECRET&
code_verifier=VERIFIER
```

**4. Token Response**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "dGVzdF9yZWZyZXNoX3Rva2Vu...",
  "scope": "read:profile"
}
```

#### Refresh Tokens

##### Diagram

```mermaid
sequenceDiagram
    participant Client as Client App
    participant AuthServer as Authorization Server
    participant API as Resource Server

    Client->>API: 1. API request with access token
    API->>Client: 2. 401 Unauthorized (token expired)
    Client->>AuthServer: 3. Request new token with refresh token
    AuthServer->>Client: 4. New access token (+ new refresh token)
    Client->>API: 5. Retry API request with new token
    API->>Client: 6. Protected resource
```

##### HTTP Requests

**1. Refresh Token Request**

```text
POST /token HTTP/1.1
Host: auth-server.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token&
refresh_token=dGVzdF9yZWZyZXNoX3Rva2Vu...&
client_id=CLIENT_ID&
client_secret=CLIENT_SECRET
```

**2. Refresh Token Response**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "bmV3X3JlZnJlc2hfdG9rZW4...",
  "scope": "read:profile"
}
```

### Client Credentials Flow

Used for machine-to-machine (M2M) authentication where no user is involved. The application authenticates using its own credentials (client ID and secret) to access its own resources or resources under its control.

**Use cases**: Backend services, APIs calling other APIs, cron jobs, daemons

#### Diagram

```mermaid
sequenceDiagram
    participant Client as Client App (Service)
    participant AuthServer as Authorization Server
    participant API as Resource Server

    Client->>AuthServer: 1. Token request with client credentials
    AuthServer->>AuthServer: 2. Validate client credentials
    AuthServer->>Client: 3. Access token
    Client->>API: 4. API request with access token
    API->>Client: 5. Protected resource
```

#### HTTP Requests

**1. Token Request**

```text
POST /token HTTP/1.1
Host: auth-server.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&
client_id=CLIENT_ID&
client_secret=CLIENT_SECRET&
scope=api:read api:write
```

**2. Token Response**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "api:read api:write"
}
```

**3. API Request**

```text
GET /api/resources HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Resource Owner Password Credentials (ROPC) Flow

> Notice: This flow is **not recommended** and should only be used when redirect-based flows are not possible (e.g., legacy systems). It requires the user to share their password directly with the client application.

The client collects username and password directly and exchanges them for an access token. No redirects involved.

**Use cases**: Trusted first-party applications only, migration scenarios from legacy auth

#### Diagram

```mermaid
sequenceDiagram
    participant User as User
    participant Client as Client App
    participant AuthServer as Authorization Server
    participant API as Resource Server

    User->>Client: 1. Enter username & password
    Client->>AuthServer: 2. Token request with credentials
    AuthServer->>AuthServer: 3. Validate username & password
    AuthServer->>Client: 4. Access token (+ Refresh token)
    Client->>API: 5. API request with access token
    API->>Client: 6. Protected resource
```

#### HTTP Requests

**1. Token Request**

```text
POST /token HTTP/1.1
Host: auth-server.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=password&
username=user@example.com&
password=userpassword&
client_id=CLIENT_ID&
client_secret=CLIENT_SECRET&
scope=read:profile
```

**2. Token Response**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "dGVzdF9yZWZyZXNoX3Rva2Vu...",
  "scope": "read:profile"
}
```

### Device Flow

Used for devices with limited input capabilities (smart TVs, IoT devices, CLI tools). The user authenticates on a secondary device (phone/computer) while the primary device polls for authorization.

**Use cases**: Smart TVs, streaming devices, printers, CLI applications, IoT devices

#### Diagram

```mermaid
sequenceDiagram
    participant Device as Device (TV/CLI)
    participant AuthServer as Authorization Server
    participant User as User (Phone/Computer)
    participant API as Resource Server

    Device->>AuthServer: 1. Request device code
    AuthServer->>Device: 2. Device code + User code + Verification URL
    Device->>User: 3. Display: "Go to URL and enter code"
    User->>AuthServer: 4. Visit URL, enter user code
    AuthServer->>User: 5. Show login & consent
    User->>AuthServer: 6. Authenticate & approve
    loop Poll for token
        Device->>AuthServer: 7. Poll with device code
        AuthServer->>Device: 8. "authorization_pending" or token
    end
    Device->>API: 9. API request with access token
    API->>Device: 10. Protected resource
```

#### HTTP Requests

**1. Device Authorization Request**

```text
POST /device/code HTTP/1.1
Host: auth-server.example.com
Content-Type: application/x-www-form-urlencoded

client_id=CLIENT_ID&
scope=read:profile
```

**2. Device Authorization Response**

```json
{
  "device_code": "GmRhmhcxhwAzkoEqiMEg_DnyEysNkuNhszIySk9eS",
  "user_code": "WDJB-MJHT",
  "verification_uri": "https://auth-server.example.com/device",
  "verification_uri_complete": "https://auth-server.example.com/device?user_code=WDJB-MJHT",
  "expires_in": 1800,
  "interval": 5
}
```

**3. Token Polling Request (repeated every `interval` seconds)**

```text
POST /token HTTP/1.1
Host: auth-server.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:device_code&
device_code=GmRhmhcxhwAzkoEqiMEg_DnyEysNkuNhszIySk9eS&
client_id=CLIENT_ID
```

**4. Token Response (when authorized)**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "dGVzdF9yZWZyZXNoX3Rva2Vu...",
  "scope": "read:profile"
}
```

**4. Pending Response (while waiting for user)**

```json
{
  "error": "authorization_pending"
}
```

## Token Validation & Discovery

### Token Introspection

Token introspection (RFC 7662) allows resource servers to query the authorization server to validate tokens and retrieve metadata about them. Useful for opaque (non-JWT) tokens or when you need real-time revocation status.

**HTTP Request**:

```text
POST /introspect HTTP/1.1
Host: auth-server.example.com
Content-Type: application/x-www-form-urlencoded
Authorization: Basic Y2xpZW50X2lkOmNsaWVudF9zZWNyZXQ=

token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...&
token_type_hint=access_token
```

**Response**:

```json
{
  "active": true,
  "scope": "read:profile write:profile",
  "client_id": "client_123",
  "username": "janedoe",
  "token_type": "Bearer",
  "exp": 1735689600,
  "iat": 1735686000,
  "sub": "248289761001",
  "aud": "https://api.example.com"
}
```

**Inactive token response**:

```json
{
  "active": false
}
```

### Token Verification

Token verification is the process of validating a JWT locally without calling the authorization server. This is more efficient but doesn't check real-time revocation.

**Steps to verify a JWT**:

1. **Decode the header** to get the signing algorithm (`alg`) and key ID (`kid`)
2. **Fetch the public key** from the JWKS endpoint using the `kid`
3. **Verify the signature** using the public key
4. **Validate claims**:
   - `exp`: Token is not expired
   - `iss`: Issuer matches your authorization server
   - `aud`: Audience matches your API/client ID
   - `nbf`: Token is not used before its "not before" time

**Example (conceptual)**:

```javascript
// Pseudocode for JWT verification
const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEifQ...';

// 1. Decode header
const header = decodeHeader(token); // { alg: "RS256", kid: "1" }

// 2. Fetch public key from JWKS
const publicKey = await fetchPublicKey(header.kid);

// 3. Verify signature
const isValid = verifySignature(token, publicKey, header.alg);

// 4. Validate claims
const payload = decodePayload(token);
if (payload.exp < Date.now() / 1000) throw new Error('Token expired');
if (payload.iss !== 'https://auth-server.example.com') throw new Error('Invalid issuer');
if (!payload.aud.includes('my-api')) throw new Error('Invalid audience');
```

**Introspection vs. Local Verification**

| Aspect          | Introspection                | Local Verification        |
| --------------- | ---------------------------- | ------------------------- |
| **Speed**       | Slower (network call)        | Fast (local check)        |
| **Revocation**  | Real-time                    | None (valid until expiry) |
| **Scalability** | Auth server load             | No server load            |
| **Use Case**    | High-security, opaque tokens | High-throughput APIs      |

**When to use**: Introspection for critical operations needing revocation checks; local verification for high-performance scenarios where stale tokens within expiry are acceptable.

### JWKS Uri and Well-Known

The **Well-Known endpoint** (`/.well-known/openid-configuration`) provides discovery information about the authorization server, including available endpoints and capabilities.

**HTTP Request**:

```text
GET /.well-known/openid-configuration HTTP/1.1
Host: auth-server.example.com
```

**Response**:

```json
{
  "issuer": "https://auth-server.example.com",
  "authorization_endpoint": "https://auth-server.example.com/authorize",
  "token_endpoint": "https://auth-server.example.com/token",
  "userinfo_endpoint": "https://auth-server.example.com/userinfo",
  "jwks_uri": "https://auth-server.example.com/.well-known/jwks.json",
  "introspection_endpoint": "https://auth-server.example.com/introspect",
  "revocation_endpoint": "https://auth-server.example.com/revoke",
  "response_types_supported": ["code", "token", "id_token"],
  "grant_types_supported": ["authorization_code", "refresh_token", "client_credentials"],
  "token_endpoint_auth_methods_supported": ["client_secret_basic", "client_secret_post"],
  "scopes_supported": ["openid", "profile", "email"],
  "claims_supported": ["sub", "name", "email", "email_verified"]
}
```

**JWKS (JSON Web Key Set)** endpoint provides the public keys used to verify JWT signatures.

**HTTP Request**:

```text
GET /.well-known/jwks.json HTTP/1.1
Host: auth-server.example.com
```

**Response**:

```json
{
  "keys": [
    {
      "kty": "RSA",
      "use": "sig",
      "kid": "1",
      "alg": "RS256",
      "n": "0vx7agoebGcQSuuPiLJXZptN9nndrQmbXEps2aiAFbWhM78LhWx4cbbfAAtV...",
      "e": "AQAB"
    },
    {
      "kty": "RSA",
      "use": "sig",
      "kid": "2",
      "alg": "RS256",
      "n": "xjlCRBqkQRPO6htrz5X8z-rELbWlYnRilqVSLkVGbZu9V-FLFZPnXx6PZqc...",
      "e": "AQAB"
    }
  ]
}
```

**Key fields**:

- `kid`: Key ID — used to match the JWT header's `kid` claim
- `kty`: Key type (RSA, EC, etc.)
- `use`: Usage — `sig` for signature verification
- `alg`: Algorithm (RS256, ES256, etc.)
- `n`, `e`: RSA public key components (modulus and exponent)

## OAuth per Application

### Web Server Application

**Recommended Flow**: Authorization Code Flow with client secret

**Considerations**:

- Can securely store client secrets (confidential client)
- Use back-channel communication for token exchange
- Session management should be server-side
- CSRF protection required for the callback endpoint
- Store tokens securely (encrypted, not in cookies accessible to JavaScript)

### Native Application

**Recommended Flow**: Authorization Code Flow with PKCE

**Considerations**:

- Cannot securely store client secrets (public client) — use PKCE instead
- Use system browser or secure web view for authorization (not embedded web views)
- Avoid storing refresh tokens in insecure locations (use OS keychain/keystore)
- Handle deep links/custom URL schemes for callback
- Support biometric authentication for token access when possible

### Single Page Application (SPA)

**Recommended Flow**: Authorization Code Flow with PKCE (no client secret)

**Considerations**:

- Cannot keep secrets (all code is visible to users) — public client
- PKCE is mandatory for security
- Store tokens in memory only (not localStorage due to XSS risks)
- Use short-lived access tokens
- Consider using a Backend-for-Frontend (BFF) pattern for sensitive operations
- Implement silent token refresh using hidden iframes or refresh tokens with rotation

### IoT Applications

**Recommended Flow**: Device Flow or Client Credentials Flow

**Considerations**:

- Limited or no user interface for input
- Device Flow for user-owned devices (smart TVs, printers)
- Client Credentials Flow for service-to-service (sensors, automated systems)
- Secure storage of credentials in hardware security modules when possible
- Handle network interruptions and token expiration gracefully
- Consider certificate-based authentication for highly secure environments

## OpenID Connect

OpenID Connect (OIDC) is an identity layer built on top of OAuth 2.0. While OAuth 2.0 provides **authorization** (access to resources), OIDC adds **authentication** (verifying who the user is).

**Key differences**:

- **OAuth 2.0**: "This app can access your photos" (authorization)
- **OIDC**: "You are John Doe" (authentication/identity)

OIDC introduces the **ID Token** — a JWT that contains identity information about the authenticated user. This allows applications to verify the user's identity without needing to make additional API calls.

### Claims

Claims are statements about an entity (typically the user) contained in tokens. In OIDC, claims provide identity information about the authenticated user.

**Standard OIDC Claims** (defined in the spec):

- `sub` (subject): Unique identifier for the user
- `name`: Full name
- `given_name`: First name
- `family_name`: Last name
- `email`: Email address
- `email_verified`: Boolean indicating if email is verified
- `picture`: Profile picture URL
- `iss` (issuer): Who issued the token
- `aud` (audience): Who the token is intended for
- `exp` (expiration): When the token expires
- `iat` (issued at): When the token was issued

**Scope-to-Claims Mapping**:

- `openid` (required): Returns `sub`
- `profile`: Returns `name`, `family_name`, `given_name`, `picture`, etc.
- `email`: Returns `email`, `email_verified`
- `address`: Returns address information
- `phone`: Returns phone number

### ID Token Example

```json
{
  "iss": "https://auth-server.example.com",
  "sub": "248289761001",
  "aud": "client_id_123",
  "exp": 1735689600,
  "iat": 1735686000,
  "auth_time": 1735685950,
  "nonce": "n-0S6_WzA2Mj",
  "name": "Jane Doe",
  "given_name": "Jane",
  "family_name": "Doe",
  "email": "jane.doe@example.com",
  "email_verified": true,
  "picture": "https://example.com/jane.jpg"
}
```

### OIDC Authorization Code Flow

#### Diagram

```mermaid
sequenceDiagram
    participant User as User
    participant Client as Client App
    participant AuthServer as Authorization Server (OIDC)
    participant API as Resource Server

    User->>Client: 1. Initiate login
    Client->>AuthServer: 2. Authorization request (scope=openid profile email)
    AuthServer->>User: 3. Show login & consent
    User->>AuthServer: 4. Authenticate & approve
    AuthServer->>Client: 5. Redirect with authorization code
    Client->>AuthServer: 6. Exchange code for tokens
    AuthServer->>Client: 7. Access token + ID token + Refresh token
    Client->>Client: 8. Validate & decode ID token (get user identity)
    Client->>API: 9. API request with access token
    API->>Client: 10. Protected resource
```

#### HTTP Requests

**1. Authorization Request (with OIDC scopes)**

```text
GET /authorize?
  response_type=code&
  client_id=CLIENT_ID&
  redirect_uri=https://app.example.com/callback&
  scope=openid profile email&
  state=xyz123&
  nonce=n-0S6_WzA2Mj&
  code_challenge=CHALLENGE&
  code_challenge_method=S256 HTTP/1.1
Host: auth-server.example.com
```

**Key differences from standard OAuth**:

- `scope=openid` is **required** to trigger OIDC
- `nonce` parameter prevents replay attacks on ID token

**2. Token Response (with ID Token)**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEifQ.eyJpc3MiOiJodHRwczovL2F1dGgtc2VydmVyLmV4YW1wbGUuY29tIiwic3ViIjoiMjQ4Mjg5NzYxMDAxIiwiYXVkIjoiY2xpZW50X2lkXzEyMyIsImV4cCI6MTczNTY4OTYwMCwiaWF0IjoxNzM1Njg2MDAwLCJub25jZSI6Im4tMFM2X1d6QTJNaiIsIm5hbWUiOiJKYW5lIERvZSIsImVtYWlsIjoiamFuZS5kb2VAZXhhbXBsZS5jb20ifQ.signature",
  "refresh_token": "dGVzdF9yZWZyZXNoX3Rva2Vu...",
  "scope": "openid profile email"
}
```

**What the ID Token provides**:

- **Immediate identity verification**: No need to call a separate `/userinfo` endpoint
- **Tamper-proof**: Signed by the authorization server (validate signature using public keys from `/.well-known/jwks.json`)
- **Claims about the user**: Name, email, profile info — whatever was requested via scopes
- **Single sign-on (SSO)**: Can be used to establish a session in the client application

## Resources

- [The Nuts and Bolts of OAuth 2.0](https://www.udemy.com/course/oauth-2-simplified/)
- [OAuth 2.0 Simplified](https://www.oauth.com/)
- [What the heck is OAuth](https://developer.okta.com/blog/2017/06/21/what-the-heck-is-oauth)
- [OpenID Connect Debugger](https://oidcdebugger.com/)
- [Aaron Parecki: OAuth2 Simplified](https://aaronparecki.com/oauth-2-simplified/)
