---
title: 'AWS Virtual Private Cloud (VPC)'
slug: '012-aws-vpc'
description: 'Complete guide to AWS VPC networking and security'
category: 'AWS'
tags: ['aws', 'vpc', 'networking', 'security', 'subnets', 'route-tables']
publishedAt: '2025-01-15'
---

# Virtual Private Cloud (VPC)

## Summary

- **VPC**: Virtual Private Cloud
- **Subnets**: Tied to an AZ, network partition of the VPC
- **Internet Gateway**: at the VPC level, provide Internet Access
- **NAT Gateway / Instances**: give internet access to private subnets
- **NACL**: Stateless, subnet rules for inbound and outbound, operate as a firewall at subnet level
- **Security Groups**: Stateful, operates at the EC2 instance level or ENI
- **VPC Peering**: Connect two VPC with non overlapping IP ranges, nontransitive
- **VPC Endpoints**: Provide private access to AWS Services within VPC
- **PrivateLink**: Privately connect to a service in a 3rd party VPC
- **VPC Flow Logs**: network traffic logs
- **Site to Site VPN**: VPN over public internet between on-premises DCand AWS
- **Client VPN**: OpenVPN connection from your computer into your VPC
- **Direct Connect**: direct private connection to AWS
- **Transit Gateway**: Connect thousands of VPC and on-premises networks together

## VPC

**VPC** = Virtual Private Cloud: private network to deploy your regional resources, spans all Availability Zones in a Region
**Subnets** = allow you to partition your network inside your vpc, tied to one specific Availability Zone (availability zone resource)

- A public subnet is accesible from the internet
- A private subnet is not accesible from the internet
- To define access to the internet and between subnets we use **Route Tables**

**Internet Gateways** helps your VPC instance connect with the internet (public subnets have a route to the internet gateway)
**NAT Gateways** (Aws-managed) and **NAT Instance** (self-managed) allow your instances in your **private subnets** to access the internet while remaining private

**NACL** (Network Acess Control List) = a firewall which control traffic to/from subnet with ALLOW/DENY rules, they are attached at subnet level and rules only include IP addresses

**Security Groups** = a firewall that controls traffic to/from an **ENI (Elastic Network Interface)/EC2** instance and which can only have ALLOW rules (include ip addresses and other security groups)

### VPC Flow Logs

Used to capture information about IP traffic going into your interfaces and which can go into S3 / CloudWatch Logs:

- VPC Flow Logs
- Subnet Flow Logs
- Elastic Network Interface Flow Logs

### VPC Peering

Allows to connect 2 VPC privately using AWS network making them behave as if they were in the same network. It must not have overlapping CIDR (IP address range) and connection is not transitive (must be established for each VPC that need to communicate with another)

### VPC Endpoints

Endpoints allow you to connect to AWS services using a private network instead of the public www network thus giving you enhanced security and lower latency to access AWS services
The following are used:

- VPC Endpoint Gateway for S3 & DynamoDB
- VPC Endpoint Interface for other services

### PrivateLink

Most secure \* scalable way to expose a service to 1000s of VPCs without requiring VPC peering, internet gateway, NAT, route tables. It requires a network load balance (Service VPC) and ENI (Customer VPC)

### Site to Site VPN & Direct Connect

**Site to Site VPN** = Connects on-premises VPN to AWS with the connection being automatically encrypted going over the public internet

- On-premises must use a Customer Gateway (CGW)
- AWS must use a Virtual Private Gateway (VGW)

**Direct Connect** = Establish an actual physical connection between on-premises and AWS, private and secure going over a private network

### AWS Client VPN

Connect from your computer using OpenVPN to your private network in AWS and on-premises, allowing you to connect to your EC2 instances over a private IP with the traffic going over the public internet.

### Transit Gateway

Used for having transitive peering between thousands of VPC and on-premises, hub-and-spoke (star) connection by providing a single gateway.
