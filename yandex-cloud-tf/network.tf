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
