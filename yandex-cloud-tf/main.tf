// Terraform configuration
terraform {
  required_providers {
    yandex = {
      source  = "yandex-cloud/yandex"
      version = ">= 0.88.0"
    }
  }
  required_version = ">= 1.3.0"
}

//
// Provider configuration
//
provider "yandex" {
  service_account_key_file = var.yc_token
  cloud_id                 = var.yc_cloud_id
  folder_id                = var.yc_folder_id
  zone                     = var.yc_zone
}

//
// VPC Network & Subnet
//
resource "yandex_vpc_network" "givegift-net" {
  name = "network-1"
}

resource "yandex_vpc_subnet" "givegift-subnet-a" {
  name           = "subnet-1"
  v4_cidr_blocks = [var.network_cidr]
  zone           = var.yc_zone
  network_id     = yandex_vpc_network.givegift-net.id
}

//
// Security Group
//
resource "yandex_vpc_security_group" "ssh_sg" {
  name        = "allow-ssh-icmp"
  description = "Security group to allow SSH and ICMP from anywhere"
  network_id  = yandex_vpc_network.givegift-net.id

  // Ingress: allow SSH (TCP 22) from 0.0.0.0/0
  ingress {
    description    = "Allow SSH"
    protocol       = "TCP"
    port           = 22
    v4_cidr_blocks = ["0.0.0.0/0"]
  }

  // Ingress: allow ping requests from 0.0.0.0/0
  ingress {
    description    = "Allow ICMP"
    protocol       = "ICMP"
    v4_cidr_blocks = ["0.0.0.0/0"]
  }

  // Egress: allow all outbound
  egress {
    description    = "Allow all outbound"
    protocol       = "ANY"
    v4_cidr_blocks = ["0.0.0.0/0"]
  }
}

//
// Compute instance (VM)
//
resource "yandex_compute_instance" "vm" {
  name        = var.vm_name
  description = "GiveGift project Ubuntu VM"

  resources {
    cores  = var.vm_cores
    memory = var.vm_memory
  }

  boot_disk {
    disk_id = yandex_compute_disk.boot-disk.id
  }

  network_interface {
    subnet_id = yandex_vpc_subnet.givegift-subnet-a.id

    // Attach a public internet-facing NAT IP
    nat = true

    security_group_ids = [
      yandex_vpc_security_group.ssh_sg.id
    ]
  }

  metadata = {
    ssh-keys  = "ubuntu:${var.public_ssh_key}"
    user-data = file("${path.module}/startup.sh")
  }
}

resource "yandex_compute_disk" "boot-disk" {
  type     = "network-ssd"
  size     = 20
  zone     = var.yc_zone
  image_id = var.vm_platform_id
}
