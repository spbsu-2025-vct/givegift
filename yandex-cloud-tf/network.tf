//
// VPC Network & Subnet
//
resource "yandex_vpc_network" "givegift-net" {
  name = "givegift-network"
}

resource "yandex_vpc_subnet" "givegift-subnet-a" {
  name           = "subnet-a"
  description    = "Subnet in ru-central1-a availability zone"
  v4_cidr_blocks = [var.zone_a_v4_cidr_block]
  zone           = var.yc_zone
  network_id     = yandex_vpc_network.givegift-net.id
}
