---
title: 'AWS CloudWatch'
slug: '031-cloudwatch'
description: 'Complete guide to AWS CloudWatch monitoring and logging'
category: 'AWS'
tags: ['aws', 'cloudwatch', 'monitoring', 'logging', 'metrics', 'alarms']
publishedAt: '2025-01-15'
---

# Cloudwatch

Amazon CloudWatch is a monitoring service to monitor your AWS resources, as well as the applications that you run on AWS.

CloudWatch monitors things like:

- Compute
  - Autoscaling Groups
  - ELBs
  - Route53 Health Checks
- Storage and Content Delivery
  - EBS Volumes
  - Storage Gateways
  - CloudFront
- Databases and Analytics
  - DynamoDB
  - Elasticache Nodes
  - RDS Instances
  - Elastic MapReduce Job Flows
  - Redshift
- Other
  - SNS Topics
  - SQS Queues
  - Opsworks
  - CloudWatch Logs
  - Estimated Charges on your AWS Bill

## Monitoring in AWS

- AWS CloudWatch:
  - Metrics: Collect and track key metrics
  - Logs: Collect, monitor, analyze and store log files
  - Events: Send notifications when certain events happen in your AWS • Alarms: React in real-time to metrics / events
- AWS X-Ray:
  - Troubleshooting application performance and errors
  - Distributed tracing of microservices
- AWS CloudTrail:
  - Internal monitoring of API calls being made
  - Audit changes to AWS Resources by your users

## CloudWatch Metrics

- CloudWatch provides metrics for every service in AWS
- **Metric** is a variable to monitor (CPUUtilization, NetworkIn...)
- Metrics belong to **namespaces**
- **Dimension** is an attribute of a metric (instance id, environment, etc...).
- Up to 10 dimensions per metric
- Metrics have **timestamps**
- Can create CloudWatch dashboards of metrics

### CloudWatch EC2 Detailed monitoring

- EC2 instance metrics have metrics “every 5 minutes”
- Host Level metrics consist of:
  - CPU
  - Network
  - Disk
  - Status Check
- With detailed monitoring (for a cost), you get data “every 1 minute”
- Use detailed monitoring if you want to more prompt scale your ASG!
- The AWS Free Tier allows us to have 10 detailed monitoring metrics
- **Note:** EC2 Memory usage is by default not pushed (must be pushed from inside the instance as a custom metric)
- **Note:** RAM Utilization is a custom metric! By default, EC2 monitoring is 5 minute intervals, unless you enable detailed monitoring, which will then make it 1 minute intervals

### AWS CloudWatch Custom Metrics

- Possibility to define and send your own custom metrics to CloudWatch
- Ability to use dimensions (attributes) to segment metrics
  - Instance.id
  - Environment.name
- Metric resolution:
  - Standard: 1 minute
  - High Resolution: up to 1 second (StorageResolution API parameter - Higher cost)
- Use API call **PutMetricData**
- Use exponential back off in case of throttle errors

### Alarms are used to trigger notifications for any metric

- Alarms can go to Auto Scaling, EC2 Actions, SNS notifications
- Various options (sampling, %, max, min, etc...)
- Alarm States:
  - OK
  - INSUFFICIENT_DATA
  - ALARM
- Period:
  - Length of time in seconds to evaluate the metric
  - High resolution custom metrics: can only choose 10 sec or 30 sec

## AWS CloudWatch Logs

- Applications can send logs to CloudWatch using the SDK
- CloudWatch can collect log from:
  - Elastic Beanstalk: collection of logs from application
  - ECS: collection from containers
  - AWS Lambda: collection from function logs
  - VPC Flow Logs:VPC specific logs
  - API Gateway
  - CloudTrail based on filter
  - CloudWatch log agents: for example on EC2 machines
  - Route53: Log DNS queries
- CloudWatch Logs can go to:
  - Batch exporter to S3 for archival
  - Stream to ElasticSearch cluster for further analytics
- CloudWatch Logs can use filter expressions
- Logs storage architecture:
  - Log groups: arbitrary name, usually representing an application. Log expiration policy should be defined at this level.
  - Log stream: instances within application / log files / containers
- Can define log expiration policies (never expire, 30 days, etc..)
- Using the AWS CLI we can tail CloudWatch logs
- To send logs to CloudWatch, make sure IAM permissions are correct!
- Security: encryption of logs using KMS at the Group Level

## AWS CloudWatch Events

- Schedule: Cron jobs
- Event Pattern: Event rules to react to a service doing something
  - Ex: CodePipeline state changes
- Triggers to Lambda functions, SQS/SNS/Kinesis Messages
- CloudWatch Event creates a small JSON document to give information about the change

## Exam Tips

- Amazon CloudWatch is a monitoring service to monitor your AWS resources, as well as the applications that you run on AWS.
- Host Level Metrics Consist of:
  - CPU
  - Network
  - Disk
  - Status Check
- RAM Utilization is a custom metric
- Custom Metrics: Minimum granularity is 1 minute
- Terminated Instances: You can retrieve data from any terminated EC2 or ELB instance after its termination. CloudWatch Logs by default are stored indefinitely.
- Metric Granularity
  - 1 minute for detailed monitoring
  - 5 minutes for standard monitoring
- CloudWatch can be used on premise: Not restricted to just AWS resources. Can be on premise too. Just need to download and install the SSM agent and CloudWatch agent.
- You can create _cross-account cross-Region dashboards_, which summarize your CloudWatch data from multiple AWS accounts and multiple Regions into one dashboard. From this high-level dashboard you can get a view of your entire application, and also drill down into more specific dashboards without having to log in and out of accounts or switch Regions. You can create cross-account cross-Region dashboards in the AWS Management Console and programmatically.
