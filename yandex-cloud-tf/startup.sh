#!/bin/bash

# Логирование всех операций
exec > >(tee -a /var/log/startup-script.log) 2>&1
echo "Starting startup script at $(date)"

# Обновление с retry логикой
echo "Updating package index..."
for i in {1..3}; do
    if sudo apt-get update -y; then
        echo "Package index updated successfully"
        break
    else
        echo "Attempt $i failed, retrying in 30 seconds..."
        sleep 30
    fi
done

# Установка Docker с проверкой
echo "Installing Docker and Docker Compose..."
if sudo apt-get install -y docker.io docker-compose; then
    echo "Docker installation completed successfully"
else
    echo "Docker installation failed, exiting"
    exit 1
fi

# Включение и запуск Docker с проверкой
echo "Enabling Docker service..."
sudo systemctl enable docker

echo "Starting Docker service..."
sudo systemctl start docker

# Ожидание готовности Docker
echo "Waiting for Docker to be ready..."
for i in {1..30}; do
    if sudo docker info >/dev/null 2>&1; then
        echo "Docker is ready!"
        break
    else
        echo "Docker not ready yet, waiting... (attempt $i/30)"
        sleep 10
    fi
done

# Проверка финального статуса
if sudo docker info >/dev/null 2>&1; then
    echo "Docker setup completed successfully at $(date)"
    
    # Добавление пользователя ubuntu в группу docker для удобства
    sudo usermod -aG docker ubuntu
    echo "User ubuntu added to docker group"
else
    echo "Docker setup failed at $(date)"
    exit 1
fi

echo "Startup script finished at $(date)"