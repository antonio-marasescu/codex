---
title: 'AWS Database Services'
slug: '005-aws-databases'
description: 'Comprehensive guide to AWS database solutions and data services'
category: 'Cloud'
tags: ['aws', 'rds', 'dynamodb', 'database', 'nosql', 'sql']
publishedAt: '2025-01-15'
---

# AWS Databases

## Summary

- Relational Databases - OLTP: RDS & Aurora (SQL)
- Differences between Multi-AZ, Read Replicas, Multi-Region
- In-memory Database: ElastiCache
- Key/Value Database: DynamoDB (serverless) & DAX (cache for DynamoDB)
- Warehouse - OLAP: Redshift (SQL)
- Hadoop Cluster: EMR
- Athena: query data on Amazon S3 (serverless & SQL)
- QuickSight: dashboards on your data (serverless)
- DocumentDB: “Aurora for MongoDB” (JSON – NoSQL database)
- Amazon QLDB: Financial Transactions Ledger (immutable journal, cryptographically verifiable)
- Amazon Managed Blockchain: managed Hyperledger Fabric & Ethereum blockchains
- Glue: Managed ETL (Extract Transform Load) and Data Catalog service
- Database Migration: DMS
- Neptune: graph database

## RDS

A managed DB (OLTP) service for Relational Database Service with the folowing types allowed: Postgres, MySQL, MariaDB, Oracle, Microsoft SQL Server, Aurora.

Some advantages of RDS over "DB on EC2":

- Automated provisioning, OS patching
- Continous backups and restore to specific timestamp (Point in Time Restore)
- Monitoring dashboards
- Read replicas for improved read performance
- Multi-AZ setup for Distaster Recorvery (DR)
- Scaling capability (vertical and horizontal)

**Note: You can't SSH into you instance**

### Deployment Options

You can have:

- **Read Replicas**: a main RDS with at most 5 replication, data written only in the main DB, scales read
- **Multi-AZ**: failover DB in case of AZ outage (replication across AZ), data is only read/written in the main DB, can only have 1 other AZ as failover
- **Multi-Region**: disaster recovery in case of region issue, local performance for global read, replication cost

## Aurora DB

Proprietary technology from AWS in which PostgreSQL and MySQL are both supported with a theoretical "AWS cloud optimized" for 5x/3x perfomance improvement over MySql/Postgres on RDS.

Aurora costs more than RDS and its storage automatically grows in increments of 10GB, up to 64TB.

## ElastiCache

Managed service used for caching (Redis or Memcached). Basically, represent a in-memory databse with high performance, low latency which will reduce load off databases for read intensive workloads.

**Note:** AWS takes care of OS maintenance / patching, optimizations, setup, configuration, monitoring, failure recovery and backups

## DynamoDB

Managed and highly available (with replication across 3 AZ) service for NoSQL databases. It scales to massive workload due to its distributed "serverless" nature and has single-digit millisecond latency (low latency retrieval).
Has integration with IAM for security, authorization and administration and 2 classes of table: _Standard_ and _Infrequent Access_ (IA) Tables.

### Global Tables

Allows a DynamoDB table to be accessible in multiple-regions with low latency and also having **Active-Active** replication (read/write to any AWS region, basically 2-way replication).

### DynamoDB Accelerator - DAX

Fully managed in-memory cache **integrated only** for **DynamoDB** with 10x performance improvement

## Redshift

Based on PostgreSQL but represents an **OLAP** (online analytical processing) tool for analytics and data warehousing. Its used when you want to load data once every hour (not every second) and has the following features:

- 10x better performance than other data warehouses, scales to PBs of data
- Columnar storage of data (instead of row based)
- Massively Parallel Query Execution (MPP), highly available
- Pay as you go based on instances provisioned
- Has a SQL interface (for queries)
- BI tools such as AWS Quicksight or Tableu integrate with it

## AWS Glue

Managed serverless ETL (extract, transform, load) service used to prepare and transform data for analytics

## Amazon EMR (Elastic MapReduce)

Helps with creating Hadoop clusters (Big Data) to analyze and process vast amount of data. The clusters can be made of **hundreds** of EC2 instance.
Supports Apache Spark, HBase, Presto, Flink, etc.

**Use cases**: data processing, machine learning, web indexing, big data.

## Amazon Athena

Serverless query service to analyze data stored in Amazon S3 in which you use SQL langauge to query the files (objects). Supports csv, json, orc, avro and parquet (built on Presto).

**Use cases**: Business Inteligence, analytics, reporting, analyze \* query VPC Flow Logs, ELB Logs, CloudTrail trails, etc.

## Amazon QuickSight

Serverless machine-learning powered business intelligence service to create interactive dashboards. It is integrated with RDS, Aurora, Athena, Redshift, S3, etc.

**Use cases**: Business analytics, Building visualizatios, perform ad-hoc analysis, get business insights using data.

## DocumentDB

An AWS implementation (similar to Aurora) of MongoDB (NoSQL DB). It is used to store, query andf index JSON data and is fully-managed, highly available with replication across 3 AZ and scales to workloads with millions of requests per seconds.

## Amazon Neptune

Represents a fully-managed **graph** database with highly available across 3 AZ with up to 15 read replicas. Its built for highly-connected datasests and optimized for these complex and hard queries.

**Use cases**: for knowledge graphs, fraud detection, recommendation engines and social networking

## Amazon QLDB (Quantum Ledger Database)

A ledger database (is not decentralized) used to review history of all changes over a period of time with an immutable system (no entry can be removed or modified, cryptographially veriable)

## Amazon Managed Blockchain

A managed service for blockchain network (public or private) which is compatible with Hyperledger Fabric and Ethereum.

## Database Migration Service

Quickly and securely migrate databases to AWS with source databases remaining available during the migration. It suppot botrh homogeneous migrations (Oracle to Oracle) and Heteregeneous migartions (Microsoft SQL Server to Aurora)
