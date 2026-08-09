---
title: 'OAuth 2.0'
slug: 'oauth2'
description: 'Introduction to OAuth 2.0 and OIDC concepts'
category: 'auth'
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

## Security Concepts

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

## Resources

- [What the heck is OAuth](https://developer.okta.com/blog/2017/06/21/what-the-heck-is-oauth)
- [The Nuts and Bolts of OAuth 2.0](https://www.udemy.com/course/oauth-2-simplified/)
