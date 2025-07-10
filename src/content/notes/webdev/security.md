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
