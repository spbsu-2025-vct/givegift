#!/bin/bash

# Update package index
sudo apt-get update -y

# Install Docker & Docker Compose
sudo apt-get install -y docker.io docker-compose

# Enable and start Docker service immediately
systemctl enable docker
systemctl start docker

# Get Yandex Cloud SSL certificate
mkdir -p ~/.postgresql
wget "https://storage.yandexcloud.net/cloud-certs/CA.pem" --output-document ~/.postgresql/root.crt
chmod 0655 ~/.postgresql/root.crt

# Create .env file with environment variables
cat << EOF > .env
PORT=5000
DB_NAME=${db_name}
DB_HOST=${db_host}
DB_PORT=${db_port}
DB_USER=${db_user}
DB_PASSWORD=${db_password}

ADMIN_EMAIL=user@example.com
ADMIN_PASSWORD=supersecret
SESSION_SECRET=qwertyuiop
FIREWORKS_API_KEY=fw_3ZULv8cieuDM3zcTX9uEpoW7

NODE_ENV=production
CERT_PATH=~/.postgresql/root.crt
EOF
