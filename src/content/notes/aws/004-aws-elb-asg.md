---
title: 'AWS Elastic Load Balancer (ELB) & Auto Scaling Groups (ASG)'
slug: '004-aws-elb-asg'
description: 'Complete guide to AWS load balancing and auto-scaling capabilities'
category: 'AWS'
tags: ['aws', 'elb', 'alb', 'nlb', 'asg', 'load-balancing', 'auto-scaling']
publishedAt: '2025-01-15'
---

# Elastic Load Balancer (ELB) & Auto-Scaling Groups (ASG)

**Scalability** = application can handle greater loads by adapting

There are 2 types of scalability:

- Vertical (increasing the size of the instance)
- Horizontal (increasing the number of instances)

**High Availability** = running your application in at least 2 Availability Zones
**Elasticity** = scale per use (if low-use down-scale, if highly-used up-scale)

**Load Balancers** = servers that forward internet traffic to multiple servers downstream.
They are used for:

- Spreading load across multiple instances
- Exposes a single-point of access (DNS) to your application
- Seamlessly handle failure of downstream instancs
- Do regular healthchecks
- Provide SSL
- High Availability

## Elastic Load Balancer (ELB)

Represents a managed load balancer (aws guarantees: it will be working, upgrades, maintenance, high availability, configuration knobs).
It has 3 types:

- Application Load Balancer (ALB) (HTTP(s)) - works on layer 7 (OSI model)
- Network Load Balancer (NLB) (ultra-high performance, allows for TCP) - works on layer 4
- Classic Load Balancer (slowly retiring) - works on layer 7 and 4

## Auto-Scaling Group (ASG)

It represents a functionality which allows you:

- Scale out (add EC2 instances) to match an increased load
- Scale in (remove EC2 instance) to match a decreased load
- Ensure minimun and maximum number of instances
- Automatically register new instances to a load balancer
- Replace unhealthy instances
- Cost savings (only run at optimal capacity)

ASGs have the following attributes:

- A launch configuration
  - AMI + Instance Type
  - EC2 User Data
  - EBS Volumes
  - Security Groups
  - SSH Key Pair
- Min / Max Size + Initial Capacity
- Network + Subnets Information
- Load Balancer Information
- Scaling Policies

**Scaling Strategies**

1. Manual Scaling: Update the size (minimum, maximum, desired) of an ASG manually
2. Dynamic Scaling: Respond to changing demand

- Simple / Step Scalling: based on threashold (CloudWatch CPU > 70% or < 30% => scale out / scale in)
- Target Tracking Scaling: E.g.: I want the average ASG CPU to stay around 40%
- Scheduled Scaling: E.g.: increase minimum capacity to 10 at 5 pm
- Predictive Scaling: use ML to predict future trafic

## Scaling Options

Auto Scaling Alarms

- It is possible to scale an ASG Based on CloudWatch Alarms
- An alarms monitors a metric (such as Average CPU)
- Metrics are computed for the overall ASG instances
- Based on that alarm - We can create scale-out / scale-in policies

New Auto Scaling Rules

- It is now possible to define "better" auto-scaling rules that are directly managed by EC2
- Target Average CPU Usage
- Number of Request on the ELB per instance
- Average Network In
- Average Network Out
- These rules are easier to set up and can make more sense

Auto Scaling Custom Metric

- We can auto-scale based on a custom metric (ex: number of connected users)
  - Send custom metrics from an application on EC2 to CloudWatch (PutMetric API)
  - Create CloudWatch Alarm to react to low/high values
  - Use the CloudWatch alarm as the scaling policy for ASG

## ASG Summary

- Scaling policies can be on CPU, Network… and can even be on custom metrics or based on a schedule (if you know your visitors patterns)
- ASGs use Launch configurations, and you update an ASG by providing a new launch configuration
- IAM roles attached to an ASG will get assigned to EC2 instances
- ASG are free. You pay for the underlying resources being launched
- Having instances under an ASG means that if they get terminated for whatever reason, the ASG will restart them. Extra safety
- ASG can terminate instances marked as unhealthy by an LB (and hence replace them)
