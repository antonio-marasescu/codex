---
title: 'AWS Cloud Monitoring'
slug: '010-aws-cloud-monitoring'
description: 'Guide to AWS monitoring and observability services'
category: 'Cloud'
tags: ['aws', 'monitoring', 'cloudwatch', 'observability', 'logging']
publishedAt: '2025-01-15'
---

# Cloud Monitoring

## Summary

- CloudWatch:
  - Metrics: monitor the performance of AWS services and billing metrics
  - Alarms: automate notification, perform EC2 action, notify to SNS based on metric
  - Logs: collect log files from EC2 instances, servers, Lambda functions…
  - Events (or EventBridge): react to events in AWS, or trigger a rule on a schedule
- CloudTrail: audit API calls made within your AWS account
- CloudTrail Insights: automated analysis of your CloudTrail Events
- X-Ray: trace requests made through your distributed applications
- Service Health Dashboard: status of all AWS services across all regions
- Personal Health Dashboard: AWS events that impact your infrastructure
- Amazon CodeGuru: automated code reviews and application performance recommendations

## CloudWatch

A service to provide a variety of timestamped metrics (CPUUtilization, NetworkIn, Disk Read/Writes, BucketSizeByes, ServiceLimits) for every services in AWS allowing for the creation of dashboards (even allowing custom metrics to be created).

### CloudWatch Alarms

It also allows alarms to be created to trigger notifications for any metric and perform an action (e.g.: Auto Scalling to increase EC2 instance count, EC2 actions to stop/terminate, SNS Notification)

### CloudWatch Logs

A centralized service where logs from various AWS services (Elastic Beanstalk, ECS, Lambda, Cloudwatch log agents, CloudTrail, Route53, etc.) are collected thus enable a real-time monitoring of said logs (adjustable retention).
**Note**: By default, no logs from your EC2 instance will go to CloudWatch, you need a CloudWatch agent installed for them (can be setup on-premise too).

## EventBridge

It used to:

- Schedule Cron Jobs
- Event Patterns (event rules to react to a service doing something)
- Trigger Lambda Functions (e.g.: send SQS/SNS messages)
- Has a **Schema Registry** (model event schema)
- You can archive events sent to an event bus
- Ability to replay archived events

## CloudTrail

- Provides governance, compliance and audit for you AWS account
- Is enabled by default
- Get an history of event / api call made within your aws account (by console, sdk, cli, aws services)
- Can put logs from CloudTrail into CloudWatch Logs or S3
- A trail can be applied to all regions (default) or a single region

## Xray

Used for debugging and troubleshouting issues in your services:

- performance (SLA, throttle issues)
- dependencies in a microservice architecture
- find errors and exceptions

## CodeGuru

A ML-powered service for automated code reviews and applications performance recommendations by providing 2 functionalities:

- Code-Guru Reviewer: automated code reviews for static code analysis
- Code-Guru Profiler: visibility/recommendations about application performance during runtime

## Health Dashboard

### Service History

Shows the health of all regions and services in AWS with historical information for each day (with an RSS feed to subscribe to)

### Your account (previously called Personal Health Dashboard)

Provides alerts and remediation guidance when AWS is experiencing events that may impact you by providing a personalized view into the performance and availability of the AWS services underlying you AWS resources. Moreover, it can aggregate data from an entire AWS Organization and display relevant and timely information with proactive notification and scheduled activities.
