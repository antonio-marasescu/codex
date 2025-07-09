---
title: 'AWS Lambda Basics'
slug: 'aws-lambda-basics'
description: 'Getting started with AWS Lambda serverless functions this is some long ass discussion oof course'
category: 'Cloud'
tags: ['aws', 'lambda', 'serverless']
publishedAt: '2024-01-10'
---

AWS Lambda is a serverless compute service that runs your code in response to events.

## Key Concepts

- **Functions**: Your code packaged as a Lambda function
- **Triggers**: Events that invoke your function
- **Runtime**: The execution environment for your code

## Common Use Cases

- API endpoints
- Data processing
- Scheduled tasks
- Event-driven architectures

## Pricing

You only pay for the compute time you use, measured in 100ms increments.

```mermaid
---
config:
  theme: 'neutral'
---
erDiagram
  SESSION ||--o{ SESSION_STAGE_CONTEXT : has
  SESSION_STAGE_CONTEXT ||--o{ SESSION_STAGE_CONTEXT_MESSAGE : has
  SESSION }|--|| GUEST : "belongs to"
  SESSION }|--|| ADMIN : "handled by"
  SESSION_STAGE_CONTEXT }|--|| WORKSPACE : "in"
  SESSION_STAGE_CONTEXT }|--|| SESSION_STAGE : "at"
  SESSION }|--|| SESSION_STATUS : "has"
  SESSION }|--|| SESSION_STAGE : "in"

%% Define entities (optional, just for diagram clarity)
  SESSION {
  }
  SESSION_STAGE_CONTEXT {
  }
  SESSION_STAGE_CONTEXT_MESSAGE {
  }
  SESSION_STATUS {
  }
  SESSION_STAGE {
  }
  GUEST {
  }
  ADMIN {
  }
  WORKSPACE {
  }

```
