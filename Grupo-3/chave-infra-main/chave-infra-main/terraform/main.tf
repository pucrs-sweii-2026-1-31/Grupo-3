terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region                      = var.region
  access_key                  = "test"
  secret_key                  = "test"
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true
  s3_use_path_style            = true

  endpoints {
    s3         = var.endpoint
    rds        = var.endpoint
    apigateway = var.endpoint
    sts        = var.endpoint
  }
}

# ─── S3 ───────────────────────────────────────────────────────────────────────
resource "aws_s3_bucket" "media" {
  bucket = "chave-media"
}

resource "aws_s3_bucket_versioning" "media" {
  bucket = aws_s3_bucket.media.id
  versioning_configuration {
    status = "Enabled"
  }
}

# ─── RDS ──────────────────────────────────────────────────────────────────────
resource "aws_db_instance" "auth" {
  identifier          = "chave-auth-db"
  engine              = "postgres"
  engine_version      = "15.3"
  instance_class      = "db.t3.micro"
  username            = var.db_user
  password            = var.db_password
  db_name             = var.db_name
  allocated_storage   = 20
  multi_az            = false
  publicly_accessible = false
  skip_final_snapshot = true
}

# ─── API Gateway (Configuração Proxy para o Backend) ──────────────────────────

resource "aws_api_gateway_rest_api" "chave" {
  name = "chave-api"
}

# Recurso Base: /api
resource "aws_api_gateway_resource" "api" {
  rest_api_id = aws_api_gateway_rest_api.chave.id
  parent_id   = aws_api_gateway_rest_api.chave.root_resource_id
  path_part   = "api"
}

# Recurso Proxy: /api/{proxy+}
# Isso captura qualquer coisa depois de /api/ (ex: /api/auth/login, /api/users)
resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = aws_api_gateway_rest_api.chave.id
  parent_id   = aws_api_gateway_resource.api.id
  path_part   = "{proxy+}"
}

# Método ANY: Aceita GET, POST, PUT, DELETE, etc.
resource "aws_api_gateway_method" "proxy_method" {
  rest_api_id   = aws_api_gateway_rest_api.chave.id
  resource_id   = aws_api_gateway_resource.proxy.id
  http_method   = "ANY"
  authorization = "NONE"
}

# Integração Proxy: Repassa tudo para o container chave-ms-auth
resource "aws_api_gateway_integration" "proxy_integration" {
  rest_api_id             = aws_api_gateway_rest_api.chave.id
  resource_id             = aws_api_gateway_resource.proxy.id
  http_method             = aws_api_gateway_method.proxy_method.http_method
  type                    = "HTTP_PROXY"
  integration_http_method = "ANY"
  
  # A URI utiliza o nome do serviço no Docker e a porta interna 8080
  uri = "http://${var.ms_auth_host}:${var.ms_auth_port}/api/{proxy}"

  request_parameters = {
    "integration.request.path.proxy" = "method.request.path.proxy"
  }
}

# ─── Deployment ───────────────────────────────────────────────────────────────

resource "aws_api_gateway_deployment" "chave" {
  rest_api_id = aws_api_gateway_rest_api.chave.id
  stage_name  = "v1"

  depends_on = [
    aws_api_gateway_integration.proxy_integration
  ]
}

output "gateway_url" {
  value = "${var.endpoint}/restapis/${aws_api_gateway_rest_api.chave.id}/v1/_user_request_"
}