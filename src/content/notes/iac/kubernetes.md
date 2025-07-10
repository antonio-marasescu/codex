---
title: 'Kubernetes Overview'
slug: 'kubernetes-overview'
description: 'Introduction to Kubernetes container orchestration platform'
category: 'Iac'
tags: ['kubernetes', 'container-orchestration', 'devops', 'k8s']
publishedAt: '2024-01-12'
---

## Definition

Kubernetes is a container orchestration technology (comparable to Docker Swarm and Mesos from Apache). It helps ensure that apps run reliably across different environments by managing resources like computing, storage, and networking.

## Kubernetes Concepts

As previously stated, it goal of kubernetes is container orchestration, allowing a deployed package to be highly available as hardware failures do not bring your application down.
The traffic is load balanced across the various containers and when demand increases more instances can be deployed seamlessly.

### Container Runtimes

Kubernetes supports multiple container environments which supports the **Container Runtime Interface** (CRI) or through **dockershim** in case of Docker (a separate compatibility layer not CRI compliant).

### Components of Kubernetes

- API Server, etcd, kubelet, container runtime, controller, scheduler

#### Node

A **Node** (Minion) is a worker machine (either physical or virtual) in Kubernetes.

There are 2 types of nodes:

- A Master Node (Control Plane Node)
- A Worker Node

##### Master Node

A **Master Node** is a node which has the role of managing a kubernetes cluster and scheduling workloads on worker nodes.

Components:

- kube-apiserver: acts a restful api server that serves as the main entry point to the Kubernetes cluster and handling all administrative operations.
- etcd: a distributed key-value store used by kubernetes to store all cluster data (configuration, desired and actual state of the cluster, metadata).
- controller: a control loop that ensure the actual state of the cluster matches the desired state (noticing when containers / nodes goes down and correcting the state).
- scheduler: responsible for placing pods onto suitable nodes in the cluster.

How they work together:

```text
etcd:
  Stores all cluster state information.
  Acts as the central database for Kubernetes.

Controllers:
    Monitor the cluster state through the kube-apiserver and ensure the cluster operates as desired by taking corrective actions.

Scheduler:
    Ensures that Pods are placed on the right Nodes based on resource availability and constraints.
```

##### Worker Node

A **Worker Node** is responsible for running containers withing Pods and providing the resources (CPU, memory, storage and networking) that those workloads need.
Furthermore, it is managed by the Master Node.

Components:

- kubelet: an agent running on each worker node, that communicates with kube-apiserver on the master node and ensures that containers described in the Pod specs are running as expected on the node (continuanly monitoring the health of the pods and reporting the status to the master node).
- Container Runtime: the software responsible for running the container (e.g.: Docker)
- kube-proxy: a network proxy that manages network rules on each worker node, ensuring that pods can communicate with each other and with external clients

#### Cluster

A **Cluster** is a set of nodes grouped together.

#### Pods

A **Pod** in Kubernetes is the smallest and most basic deployable unit, representing a single instance of a running process in a Kubernetes cluster.
It can hold one or more containers (usually Docker containers) that will share the following:

- Network namespace
- Storage volumes
- Lifecycle

**Pods** are scaled / down-scaled by creating new ones or removing them in their entirety (this includes all the container running inside of them).

#### Replicas

##### Replication Controller

##### ReplicaSets

## Manifest File

A Kubernetes **Manifest File** is a YAML (or JSON) configuration file used to define the desired state of Kubernetes objects such as Pods, Deployments, Services, ConfigMaps, and more.

```yaml
apiVersion: v1 # Specifies the API version of the Kubernetes object
kind: <Pod / Deployment / Service / ConfigMap / Ingress> # Specifies the type of Kubernetes object to create (e.g: Pod, Deployment, Service)
metadata: # Provides metadata about the object such as its name, namespace, labels and annotations
  name: nginx # Unique name for the object within its namespace.
  namespace: production # (Optional) Namespace where the object resides (default is default).
  labels: # Key-value pairs to categorize and identify objects.
    app: nginx
    tier: frontend
  annotations: # Key-value pairs for additional metadata.
    description: 'This deployment runs the frontend application.'
spec: # Defines the desired state or configuration of the object.
  containers: # For Pods
    - name: nginx
      image: nginx
```

For the spec part, contents vary depending on the object type:

- Deployment: Includes replicas, selector, and template.
- Pod: Includes containers, volumes, and restartPolicy.
- Service: Includes type, selector, and ports.

More examples can be found here:

- [Pod Example](assets/pod-example.yaml)
- [Config Map Example](assets/configmap-example.yaml)
- [Service Example](assets/service-example.yaml)
- [Ingress Example](assets/ingress-example.yaml)

### Best Practices:

#### YAML

- Use space instead of tabs, since the tab character is illegal withing yaml files.
- Quote string where necessary
- Use pipe (|) for multiline string
  ```yaml
  data:
    long-config: |
      This is a multiline string.
      Each line is preserved as-is.
  ```
- Avoid trailing whitespaces

## Command Line Utilities

There are several command line utilities available for use in kubernetes:

- kubectl: the primary command-line tool for interacting with the Kubernetes cluster, allowing you to communicate with the Kubernetes API server to manage resources and workloads
- ctr: a CLI provided by Containerd for interacting directly with the Containerd daemon. Primarly used as a debugging tool to manage container images, containers and namespaces directly at Containerd layer
- nerdctl: the docker compatible CLI for Containerd, providing commands similar to docker's cli but interacts directly with Containerd under the hood.
- crictl: a CLI for interacting with container runtimes that implement Kubernetes CRI (such as Containerd or CRI-O). Used to inspect and debug container runtimes (not ideal to create containers ideally), works across different runtimes.

### Useful Commands

#### Kubectl

- Create a NGINX Pod
  ```shell
  kubectl run nginx --image=nginx
  ```
- Create a deployment using imperative command
  ```shell
  kubectl create deployment nginx --image=nginx
  ```
- List all pods in the namespace
  ```shell
  kubectl get pods
  ```
- List all pods in a specific namespace
  ```shell
  kubectl get pods -n <namespace>
  ```
- Describe a specific pod
  ```shell
  kubectl describe pod <pod-name> -n <namespace>
  ```
- Apply a configuration file
  ```shell
  kubectl apply -f <file.yaml>
  ```
- Delete a resource
  ```shell
  kubectl delete <resource> <name> -n <namespace>
  ```
- Execute a command inside a pod
  ```shell
  kubectl exec -it <pod-name> -n <namespace> -- <command>
  ```

#### CTR

- List running containers
  ```shell
  ctr containers list
  ```
- List available images
  ```shell
  ctr images list
  ```
- Pull an image
  ```shell
  ctr images pull <image>
  ```
- Run a container

  ```shell
  ctr run <image> <container-name
  ```

  ```

  ```

#### NERDCTL

- List containers
  ```shell
  nerdctl ps
  ```
- Run a container:
  ```shell
  nerdctl run -d --name <container-name> <image>
  ```
- Pull an image
  ```shell
  ctr images pull <image>
  ```
- Run a container
  ```shell
  ctr run <image> <container-name
  ```
