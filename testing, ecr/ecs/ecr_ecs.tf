provider "aws" {
  region = "eu-central-1"
}

################################## VPC #############################################

#VPC
resource "aws_vpc" "my_vpc" {
  cidr_block = "10.0.0.0/16"
}

#IGW
resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.my_vpc.id

  tags = {
    Name = "internet_gateway"
  }
}

#Route for Table
resource "aws_route" "public_route" {
  route_table_id         = aws_route_table.public_route_table.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.gw.id
}


# Routen-Tabelle-Zuordnung für Subnetz 1A
resource "aws_route_table_association" "public_route_table_association_1a" {
  subnet_id      = aws_subnet.public_subnet1a.id
  route_table_id = aws_route_table.public_route_table.id
}

# Routen-Tabelle-Zuordnung für Subnetz 1B
resource "aws_route_table_association" "public_route_table_association_1b" {
  subnet_id      = aws_subnet.public_subnet1b.id
  route_table_id = aws_route_table.public_route_table.id
}


#Route Table
resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.my_vpc.id

  tags = {
    Name = "public_route_table"
  }
}

#Subnetz
resource "aws_subnet" "public_subnet1a" {
  vpc_id     = aws_vpc.my_vpc.id
  cidr_block = "10.0.1.0/24"
  availability_zone = "eu-central-1a" 
  map_public_ip_on_launch = true  # Enable public IP assignment
  tags = {
    Name = "public_subnet1a"
  }
}

resource "aws_subnet" "private_subnet1a" {
  vpc_id     = aws_vpc.my_vpc.id
  cidr_block = "10.0.2.0/24"
  availability_zone = "eu-central-1a"  
  tags = {
    Name = "private_subnet1a"
  }
}


resource "aws_subnet" "public_subnet1b" {
  vpc_id     = aws_vpc.my_vpc.id
  cidr_block = "10.0.3.0/24"
  availability_zone = "eu-central-1b" 
  map_public_ip_on_launch = true  # Enable public IP assignment
  tags = {
    Name = "public_subnet1b"
  }
}

resource "aws_subnet" "private_subnet1b" {
  vpc_id     = aws_vpc.my_vpc.id
  cidr_block = "10.0.4.0/24"
  availability_zone = "eu-central-1b" 
  tags = {
    Name = "private_subnet1b"
  }
}

#Route Table für Private Subnetze
resource "aws_route_table" "private_route_table1a" {
  vpc_id = aws_vpc.my_vpc.id
  tags = {
    Name = "private_route_table1a"
  }
}

resource "aws_route_table_association" "private_subnet1a" {
  subnet_id      = aws_subnet.private_subnet1a.id
  route_table_id = aws_route_table.private_route_table1a.id
}

resource "aws_route_table" "private_route_table1b" {
  vpc_id = aws_vpc.my_vpc.id
  tags = {
    Name = "private_route_table1b"
  }
}

resource "aws_route_table_association" "private_subnet1b" {
  subnet_id      = aws_subnet.private_subnet1b.id
  route_table_id = aws_route_table.private_route_table1b.id
}


########################## ECR ###################################

#upload fuer die Frontend Docker

# ECR Repository
resource "aws_ecr_repository" "frontend_ecr_repo" {
  name = "frontend-ecr-repo"
}

# ECS Task Definition
resource "aws_ecs_task_definition" "frontend_task_definition" {
  family                   = "frontend-ecs-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]

  execution_role_arn = aws_iam_role.ecs_execution_role.arn

  cpu = "256"  # Legen Sie hier die CPU-Ressourcen fest (in Einheiten)
  memory = "512"  # Legen Sie hier den Arbeitsspeicher fest (in MiB)

  container_definitions = jsonencode([
    {
      name  = "frontend-container",
      image = aws_ecr_repository.frontend_ecr_repo.repository_url,
      portMappings = [
        {
          containerPort = 80,
          hostPort      = 80,
        },
      ],
    },
    # Fügen Sie hier weitere Container-Definitionen hinzu, falls erforderlich
  ])
}



# ECS Execution Role (EC2 und Fargate verwenden unterschiedliche Rollen)
resource "aws_iam_role" "ecs_execution_role" {
  name = "ecs_execution_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "ecs-tasks.amazonaws.com",
        },
      },
    ],
  })
}

# Attach Policy to ECS Execution Role (Beispiel: AmazonECSTaskExecutionRolePolicy)
resource "aws_iam_policy_attachment" "ecs_execution_role_policy" {
  name       = "ecs-execution-role-policy-attachment"  # Hier wird das Argument "name" hinzugefügt
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
  roles      = [aws_iam_role.ecs_execution_role.name]
}


# ECS Cluster
resource "aws_ecs_cluster" "frontend_cluster" {
  name = "frontend-ecs-cluster"
}

# ECS Service (Fargate oder EC2, je nach Ihren Anforderungen)
resource "aws_ecs_service" "frontend_service" {
  name            = "frontend-ecs-service"
  cluster         = aws_ecs_cluster.frontend_cluster.id
  task_definition = aws_ecs_task_definition.frontend_task_definition.arn
  launch_type     = "FARGATE"  # Oder "EC2" je nach Bedarf
  network_configuration {
    subnets = [aws_subnet.public_subnet1a.id, aws_subnet.public_subnet1b.id]
    security_groups = [aws_security_group.frontend_security_group.id]
  }

  # Weitere Konfigurationsoptionen je nach Ihren Anforderungen
}

# Security Group (ECS-Service-Zugriff steuern)
resource "aws_security_group" "frontend_security_group" {
  name_prefix = "frontend-security-group"
  vpc_id = aws_vpc.my_vpc.id

  # Konfigurieren Sie hier die Regeln, um den Zugriff auf Ihre Container zu steuern
  # Beispiel: Erlauben von Port 80
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Weitere Regeln je nach Ihren Anforderungen
}

data "aws_caller_identity" "current" {}

output "aws_account_id" {
  value = data.aws_caller_identity.current.account_id
}



resource "null_resource" "docker_packaging" {
  provisioner "local-exec" {
    command = <<EOF
      aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin ${data.aws_caller_identity.current.account_id}.dkr.ecr.eu-central-1.amazonaws.com
      docker build -t frontend-ecr-repo .
      docker tag frontend-ecr-repo:latest ${aws_ecr_repository.frontend_ecr_repo.repository_url}:latest
      docker push ${aws_ecr_repository.frontend_ecr_repo.repository_url}:latest
    EOF
  }

  triggers = {
    "run_at" = timestamp()
  }

  depends_on = [
    aws_ecr_repository.frontend_ecr_repo,
  ]
}
