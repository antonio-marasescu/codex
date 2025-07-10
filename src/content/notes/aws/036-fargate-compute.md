---
title: 'AWS Fargate Compute'
slug: '036-fargate-compute'
description: 'Guide to AWS Fargate serverless container compute'
category: 'AWS'
tags: ['aws', 'fargate', 'containers', 'serverless', 'ecs', 'eks']
publishedAt: '2025-01-15'
---

# Fargate

AWS Fargate is a serverless compute engine for containers that works with both Amazon ECS and Amazon EKS.

**Note:** Fargate eliminates the need to provision and manage servers, letting you focus on designing and building your applications instead of managing the infrastructure that runs them.

- **Serverless**: No servers to manage, no clusters to maintain
- **Pay-per-use**: You only pay for the resources your containers use
- **Security**: Each task runs in its own isolated compute environment
- **Compatibility**: Works with ECS and EKS container orchestration

## Fargate vs EC2

| Fargate                                      | EC2                                       |
| -------------------------------------------- | ----------------------------------------- |
| Serverless - no server management            | You manage the underlying EC2 instances   |
| Pay for CPU and memory used by containers    | Pay for EC2 instances regardless of usage |
| Automatic scaling based on task requirements | Manual scaling of EC2 instances           |
| No need to choose instance types             | Must select appropriate instance types    |
| **Simpler management**                       | **More control and customization**        |

## Fargate with ECS

- **Task Definition**: Defines how your container should run
  - CPU and memory requirements
  - Port mappings
  - Environment variables
  - Logging configuration
- **Service**: Maintains the desired number of tasks
  - Application Load Balancer integration
  - Auto-scaling based on CPU/memory usage
  - Rolling deployments
- **Task Placement**: Fargate handles placement automatically
  - No need to manage cluster capacity
  - Tasks are placed across Availability Zones

## Fargate with EKS

- **Fargate Profile**: Maps Kubernetes pods to Fargate
  - Selector rules determine which pods run on Fargate
  - Namespace and label-based selection
- **Pod Execution Role**: IAM role for Fargate tasks
  - Permissions for EKS cluster access
  - CloudWatch Logs permissions
- **Kubernetes Native**: Use standard Kubernetes APIs
  - Deployments, Services, ConfigMaps
  - No changes to existing manifests

## Pricing

- **CPU**: Pay for vCPU allocated to your containers
  - 0.25 vCPU to 4 vCPU per task
  - Pricing varies by region
- **Memory**: Pay for memory allocated to your containers
  - 0.5GB to 30GB per task
  - Memory must be specified in 0.25GB increments
- **Storage**: 20GB ephemeral storage included
  - Additional storage charged separately
- **No idle charges**: Only pay when containers are running

## Use Cases

- **Microservices**: Perfect for containerized applications
- **Batch Processing**: Short-lived tasks with variable workloads
- **Web Applications**: Stateless applications with auto-scaling
- **Development/Testing**: Consistent environments without infrastructure management
- **Event-driven workloads**: Sporadic traffic patterns

## Limitations

- **Cold Start**: Initial container startup time
- **Maximum Resources**: 4 vCPU and 30GB memory per task
- **No GPU Support**: Limited to CPU-based workloads
- **No Custom Kernels**: Standard Amazon Linux 2 base
- **Network Performance**: Limited compared to EC2 instances

## Best Practices

- **Right-size Resources**: Start with minimal CPU/memory and scale up
- **Use Spot**: Fargate Spot for cost optimization (up to 70% savings)
- **Monitor Costs**: Use CloudWatch to track resource utilization
- **Security**: Use task execution roles with minimal permissions
- **Logging**: Configure CloudWatch Logs for container logs

## Exam Tips

- Fargate is serverless - you don't manage the underlying infrastructure
- Fargate works with both ECS and EKS
- You pay for CPU and memory allocated, not actual usage
- Fargate Spot provides cost savings for fault-tolerant workloads
- Task definitions specify CPU and memory requirements
- Fargate automatically handles container placement and scaling
