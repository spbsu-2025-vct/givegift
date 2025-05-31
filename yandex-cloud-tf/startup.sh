#!/usr/bin/env bash
set -e

# Update package index
sudo apt-get update -y

# Install Docker & Docker Compose
sudo apt-get install -y docker.io docker-compose

# Enable and start Docker service immediately
systemctl enable docker
systemctl start docker