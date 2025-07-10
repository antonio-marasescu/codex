# AWS Compute

## Summary

- Docker: container technology to run applications
- ECS: run Docker containers on EC2 instances
- Fargate:
  - Run Docker containers without provisioning the infrastructure
  - Serverless offering (no EC2 instances)
- ECR: Private Docker Images Repository
- Batch: run batch jobs on AWS across managed EC2 instances
- Lightsail: predictable & low pricing for simple application & DB stacks

## ECS (Elastic Container Service)

Allows to launch Docker containers on AWS (e.g.: as EC2 instances), but you must provision and maintain the infrastructure (the EC2 instances).
AWS takes care of starting / stopping containers. It has integration with Application Load Balancer (ALB).

## Fargate

Allows you to launch Docker containers **without the need to provision the infrastructure (no EC2 instances)**. It's a **serverless** offer.

## ECR (Elastic Container Registry)

It's a private docker registry on AWS so you can store you Docker images (to be later used in ECS or Fargate)

## API Gateway

Fully managed serverless service for developers to easily create, publish, maintain, monitor and secure APIs.
Supports RESTful APIs and WebScoket APIs and for security, user authentication, API throttling, API keys, monitoring...

## Lambda

Represent virtual functions (FaaS), limited by time (up to 15 minutes), which run on-demand and scale automatically. They are used for any kind of work and are integrated with various AWS services (can be easily monitored through AWS CloudWatch). Has support for various languages (node.js, python, java, c#, goland, etc.) and container images (must implement Lambda Runtime API).

In relation to pricing you **pay per call** and **pay per duration**.

## AWS Batch

Fully managed batch (a job with a start and an end, not continuos) processing at any scale (run 100,000s of copmuting batch jobs on AWS).
It will dynamically launch EC2 instances or Spot Instances, by defining Docker Images which run on ECS, and AWS Batch will provision the right amount of compute / memory.

### Batch vs Lamnda

| Lambda                       | Batch                                              |
| ---------------------------- | -------------------------------------------------- |
| Time Limit                   | No Time Limit                                      |
| Limited runtimes             | Any runtime so long its packaged as a Docker Image |
| Limited temporary disk space | Rely on EBS / instance store for disk space        |
| Serverless                   | Relies on EC2 (can be managed by AWS)              |

## Lightsail

Offers a way for people with little cloud experience to build application by offering virtual Servers, storage, database and networking (as alternative to EC2, RDS, ELB, EBS, Route 53, ...) via an interactive AWS dashboard with high availability but no auto-scalling and limited AWS integrations.
