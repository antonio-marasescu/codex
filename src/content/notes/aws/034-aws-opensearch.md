---
title: 'AWS OpenSearch'
slug: '034-aws-opensearch'
description: 'Guide to AWS OpenSearch for search and analytics'
category: 'AWS'
tags: ['aws', 'opensearch', 'elasticsearch', 'search', 'analytics', 'logging']
publishedAt: '2025-01-15'
---

# OpenSearch Service

AWS OpenSearch (formerly Amazon Elasticsearch Service) is a managed service that makes it easy to deploy, operate, and scale OpenSearch clusters in the AWS Cloud. It is used for a variety of use cases, including log and event data analysis, full-text search, and real-time application monitoring.

## Key Features

- **Fully Managed**: AWS handles the setup, configuration, patching, and maintenance of OpenSearch clusters.
- **Scalability**: Easily scale resources up or down based on demand.
- **Security**: Integration with AWS Identity and Access Management (IAM), Amazon Virtual Private Cloud (VPC), encryption at rest and in transit, and fine-grained access control.
- **High Availability**: Multi-AZ deployments provide high availability and durability.
- **Monitoring and Logging**: Integrated with Amazon CloudWatch and AWS CloudTrail for logging and monitoring.

## Indexes

Indexes in OpenSearch are similar to tables in a relational database or collections in MongoDB. They organize documents and make it easy to perform searches.

### Key Concepts:

- **Document**: A basic unit of information that can be indexed. It is expressed in JSON format.
- **Index**: A collection of documents with similar characteristics. Each index has a unique name.
- **Shards**: Indices are split into shards to distribute data across multiple nodes for scalability and parallel processing.
- **Replicas**: Copies of shards that provide redundancy and increase availability.
