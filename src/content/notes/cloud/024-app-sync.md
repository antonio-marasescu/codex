---
title: 'AWS AppSync'
slug: '024-app-sync'
description: 'Guide to AWS AppSync for GraphQL API management'
category: 'Cloud'
tags: ['aws', 'appsync', 'graphql', 'api', 'real-time']
publishedAt: '2025-01-15'
---

# App Sync

- AppSync is a managed service which uses *GraphQL*
- It is used for building APIs on AWS which use *GraphQL*
- *GraphQL* makes it easy for applications to get the exact data they need. This includes combining data from multiple resources
- Datasets behind *GraphQL* can include:
  - NoSQL data stores
  - RDS databases
  - HTTP APIs
  - etc.
- AppSync integrates with (resolvers) DynamoDB, Aurora, ElasticSearch, etc.
- Supports customer resources using Lambda
- Provides support for real time data retrieval using WebSocket or MQTT on WebSocket protocols
- Mobile applications: replacement for Cognito Sync
- Requires a GraphQL schema for getting started
- Example for GraphQL schema:

# Security

- Four ways we can authorize applications to interact with AppSync:
  - API_KEY
  - AWS_IAM
  - OPENID_CONNECT (OpenID Connect provider/ JWT)
  - AMAZON_COGNITO_USER_POOLS
- For custom domain & HTTPS, use CloudFront in front of AppSync

## Caching

AWS AppSync’s API Cache settings provides three options:

- None
- Full request caching
- and Per-resolver caching.
