---
title: 'Terraform Overview'
slug: 'terraform'
description: 'Introduction to Terraform infrastructure as code tool'
category: 'Iac'
tags: ['terraform', 'infrastructure-as-code', 'iac', 'devops']
publishedAt: '2025-07-10'
---

## 1. Commands

Basic pipeline:

```
terraform init -> terraform plan -> terraform apply
```

```
  init          Prepare your working directory for other commands
  validate      Check whether the configuration is valid
  plan          Show changes required by the current configuration
  apply         Create or update infrastructure
  destroy       Destroy previously-created infrastructure
  console       Try Terraform expressions at an interactive command prompt
  fmt           Reformat your configuration in the standard style
  output        Show output values from your root module
  taint         Mark a resource instance as not fully functional
  untaint       Remove the 'tainted' state from a resource instance
  import        Associate existing infrastructure with a Terraform resourceion
  workspace     Workspace management
```

## 2. Files Basics

All the files that have a `.tf` extension and where `terraform init` is run will create a Root Module (Note: there exist a json-based variant of the language for terraform).

Once `terraform plan` or `terraform apply` it will create a `terraform.tfstate` file which will hold the state of all your deployed resources. (See more Remote State)

## 3. Language Basics

### 3.1 Blocks

```
resource "aws_instance" "example" {
  ami = "abc123"

  network_interface {
    # ...
  }
}


```

Where:

- `aws_instance` is the Resource Type = <provider>\_<provider_resource>
- `example` is Resource Name
- `ami` is an argument for the resource

You can make a reference to a resource by using an Identifier `<provider>_<provider_resource>.<resource_name>.<output_variable>` (E.g.: `aws_instance.example.id`)

### 3.2 Meta-arguments

- `depends_on` for handling resource inter-dependencies

```
resource "aws_iam_role_policy" "example" {
  name   = "example"
  role   = aws_iam_role.example.name
  # Insert other code here
}

resource "aws_instance" "example" {
  ami           = "ami-a1b2c3d4"
  # Insert other code here
  depends_on = [
    aws_iam_role_policy.example,
  ]
}
```

- `count` used to create multiple instances of an object (it uses a list under the hood)

```
resource "aws_instance" "server" {
  count = 4 # create four similar EC2 instances

  ami           = "ami-a1b2c3d4"
  instance_type = "t2.micro"

  tags = {
    Name = "Server ${count.index}"
  }
}
```

- `for_each` used also for creating multiple instances but it uses a map/set for managing the resources created

```
resource "azurerm_resource_group" "rg" {
  for_each = {
    a_group = "eastus"
    another_group = "westus2"
  }
  name     = each.key
  location = each.value
}
resource "aws_iam_user" "the-accounts" {
  for_each = toset( ["Todd", "James", "Alice", "Dottie"] )
  name     = each.key
}
```

- `lifecycle` used for managing the lifecycle of resources

```
resource "azurerm_resource_group" "example" {
  # ...

  lifecycle {
    create_before_destroy = true
  }
}
```

- Types
  - `create_before_destroy`: bool
  - `prevent_destroy`: bool
  - `ignore_changes`: (list of attribute names)

- `provider` allows for configuration of a specific provider

```
# default configuration
provider "google" {
  region = "us-central1"
}

# alternate configuration, whose alias is "europe"
provider "google" {
  alias  = "europe"
  region = "europe-west1"
}

resource "google_compute_instance" "example" {
  # This "provider" meta-argument selects the google provider
  # configuration whose alias is "europe", rather than the
  # default configuration.
  provider = google.europe

  # ...
}
```

## 4. Variables

### 4.1 Input

```
variable "availability_zone_names" {
  type    = list(string)
  default = ["us-west-1a"]
}

variable "image_id" {
  type = string
}

```

You can assign values either by passing the `default` parameter or through a file called `terraform.tfvars` or ending in `*.auto.tfvars` or by using environment variables (E.g.: `export TF_VAR_image_id=ami-abc123`)

- `Example for a .tfvars file`

```
image_id = "ami-abc123"
availability_zone_names = [
  "us-east-1a",
  "us-west-1c",
]

```

### 4.2 Output

Allows for expose information for other terraform configuration and offer data in the command line

- Uses Examples:

```
Output values have several uses:

- A child module can use outputs to expose a subset of its resource attributes to a parent module.
- A root module can use outputs to print certain values in the CLI output after running terraform apply.
- When using remote state, root module outputs can be accessed by other configurations via a terraform_remote_state data source.

```

- Declaration Example:

```
output "instance_ip_addr" {
  value = aws_instance.server.private_ip
  description = "The private IP address of the main server instance."
}
output "db_password" {
  value       = aws_db_instance.db.password
  description = "The password for logging in to the database."
  sensitive   = true
}
```

## 5. Data Sources

- Allows terraform to use information defined outside of terraform.
- It allows only to read infrastructure, not change it.

```
data "aws_ami" "example" {
  most_recent = true

  owners = ["self"]
  tags = {
    Name   = "app-server"
    Tested = "true"
  }
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.web.id
  instance_type = "t1.micro"
}
```

## 6. Terraform Settings

Terraform settings are gathered together into terraform blocks, that allows for either specifing a specific version of a provider or even keeping the state in a remote `backend`.

```
terraform {
    required_providers {
    aws = {
      version = ">= 2.7.0"
      source = "hashicorp/aws"
    }
  }
}
```

### 6.1 Remote State with AWS S3

You will need a:

- An S3 bucket (you will need its name)
- The path where you will store the `terraform.tfstate` inside the bucket
- An DynamoDB table (used for state locking: "making sure just one person modifies the state at a certain point in time")
  - The Primary Key/Hash Key with the name `LockID` with the type of `String`
- The region of your AWS resources

For more info see: https://www.terraform.io/language/settings/backends/s3

Example:

```
terraform {
    backend "s3" {
        bucket = "kodecloud-terraform-state-bucket01"
        key = "finance/terraform.tfstate"
        region = "us-west-1"
        dynamodb_table = "state-locking"
    }
}

```

Steps:

- add terraform backend inside a file called "terraform.tf" (good practice for holding configuration of terraform).
- do `terraform init` and `terraform apply` locally to initialize the state

## 7. Functions and Conditional Expressions

### 7.1 Built-in Functions

Terraform provides many built-in functions for data manipulation:

```
# String functions
length("hello")           # 5
upper("hello")           # "HELLO"
lower("WORLD")           # "world"
replace("hello world", "world", "terraform")  # "hello terraform"

# Numeric functions
max(1, 2, 3)            # 3
min(1, 2, 3)            # 1
abs(-5)                  # 5

# Collection functions
length(["a", "b", "c"]) # 3
contains(["a", "b"], "a") # true
keys({a = 1, b = 2})    # ["a", "b"]
values({a = 1, b = 2})  # [1, 2]

# Type conversion
tostring(123)            # "123"
tonumber("123")          # 123
tobool("true")           # true
```

### 7.2 Conditional Expressions

Use conditional expressions to create dynamic values:

```
variable "environment" {
  type = string
}

resource "aws_instance" "example" {
  ami           = "ami-abc123"
  instance_type = var.environment == "production" ? "t3.large" : "t3.micro"

  tags = {
    Name = var.environment == "production" ? "prod-server" : "dev-server"
  }
}
```

## 8. Modules

Modules are reusable Terraform configurations that can be called by other configurations.

### 8.1 Module Structure

```
module-name/
├── main.tf          # Main configuration
├── variables.tf     # Input variables
├── outputs.tf       # Output values
└── README.md        # Documentation
```

### 8.2 Using Modules

```
module "vpc" {
  source = "./modules/vpc"

  vpc_cidr = "10.0.0.0/16"
  environment = "production"
}

module "ec2" {
  source = "./modules/ec2"

  instance_type = "t3.micro"
  vpc_id = module.vpc.vpc_id
}
```

### 8.3 Module Sources

- Local: `source = "./modules/vpc"`
- Git: `source = "git::https://example.com/vpc.git"`
- Registry: `source = "hashicorp/vpc/aws"`
- HTTP: `source = "https://example.com/vpc.zip"`

### 8.4 Module Best Practices

- Use semantic versioning for modules
- Document all variables and outputs
- Keep modules focused on a single responsibility
- Use consistent naming conventions
- Test modules independently before publishing

```

```
