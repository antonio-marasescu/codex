---
title: 'Docker Overview'
slug: 'docker-overview'
description: 'Introduction to Docker containers and containerization concepts'
category: 'Iac'
tags: ['docker', 'containers', 'containerization', 'devops']
publishedAt: '2025-07-10'
---

## OS Kernel

The **OS Kernel** is responsible for interacting with the underlying hardware

## Container

### Definition

A **Container** is a lightweight, standalone and executable package that includes everything needed to run an application.

### Segregation

It uses the operating system kernel, ensuring consistency across environments.
They are isolated through a virtual network, being segregated from the host machine unless explicitly configured both in network and in the filesystem.

### Virtual Machines vs Containers

| **Aspect**         | **Containers**                                      | **Virtual Machines**                                  |
| ------------------ | --------------------------------------------------- | ----------------------------------------------------- |
| **Architecture**   | Share the host OS kernel; lightweight.              | Include a full OS with a hypervisor; heavier.         |
| **Startup Time**   | Fast (seconds).                                     | Slower (minutes).                                     |
| **Resource Usage** | Efficient; only includes app and dependencies.      | Resource-intensive; requires full OS and libraries.   |
| **Isolation**      | Process-level isolation via namespaces and cgroups. | Full isolation through hypervisor and OS.             |
| **Portability**    | Highly portable across different OS environments.   | Less portable due to dependency on hypervisor.        |
| **Performance**    | Near-native performance; minimal overhead.          | Overhead from running a full OS and hypervisor.       |
| **Use Case**       | Microservices, lightweight apps, CI/CD pipelines.   | Monolithic apps, legacy systems, or OS-level testing. |

### Images

An **Image** is a lightweight, standalone and immutable blueprint for creating the container, containing the application code, dependencies and configuration for the executable package.
They have a layered structure, with each layer representing a change (e.g.: adding files or installing software).

### Volumes

A **Volume** is a mechanism of persisting data generated and used by the containers. They exist outside the container's file system and are managed by Docker.

### Network

A **Network** in Docker is feature that allows container to communicate with each other and external systems, providing isolated, configurable and secure connectivity for container in Docker.

The following types exist:

- Bridge (Default): containers on the same bridge network can communicate via their container name
- Host: Shares the host's network namespace, removing network isolation
- None: disables all networking, the container has no external communication
- Overlay: enables communication across multiple hosts in a Docker Swarm
- Macvlan: assigns a MAC address to containers (making them appear as physical devices on the network)
- Third-party Plugins (e.g.: Weave, Flannel)

## Common Commands

### Image Commands

- Build an image

```shell
docker build -t <image:name>:<tag> .
```

- List images

```shell
docker images
```

- Remove an image

```shell
docker rmi <image-id>
```

### Container Commands

- Run a container

```shell
docker run -d --name <container-name> <image-name>
```

- List running containers

```shell
docker ps
```

- List all containers (including stopped)

```shell
docker ps -a
```

- Stop a container

```shell
docker stop <container-id>
```

- Start a container

```shell
docker start <container-id>
```

- Remove a container

```shell
docker rm <container-id>
```

- Access a running container

```shell
docker exec -it <container-id> /bin/bash
```

### Volume Commands

- List volumes

```shell
docker volume ls
```

- Create a volume

```shell
docker volume create <volume-name>
```

- Remove a volume

```shell
docker volume rm <volume-name>
```

### Network Commands

- List networks

```shell
docker network ls
```

- Create a network

```shell
docker network create <network-name>
```

- Remove a network

```shell
docker network rm <network-name>
```

### Volume Commands

- List volumes

```shell
docker volume ls
```

- Create a volume

```shell
docker volume create <volume-name>
```

- Remove a volume

```shell
docker volume rm <volume-name>
```

### Clean Up Commands

- Remove unused resources

```shell
docker system prune
```

- Remove all stopped containers

```shell
docker container prune
```

- Remove all unused images

```shell
docker image prune
```
