terraform {
  backend "s3" {
    encrypt = true    
    bucket = "github-terraform-tfstates1"
    key    = "infra.tfstate"
    region = "eu-central-1"
  }
}