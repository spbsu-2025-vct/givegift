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
    ssh-keys = "ubuntu:${var.public_ssh_key}"
    user-data = templatefile("startup.sh.tpl", {
      db_name     = yandex_mdb_postgresql_cluster.givegift_cluster.name
      db_host     = "c-${yandex_mdb_postgresql_cluster.givegift_cluster.id}.rw.mdb.yandexcloud.net"
      db_port     = 6432
      db_user     = yandex_mdb_postgresql_user.givegift_user.name
      db_password = "password"
    })
  }
}

resource "yandex_compute_disk" "boot-disk" {
  type     = "network-ssd"
  size     = 20
  zone     = var.yc_zone
  image_id = var.vm_platform_id
}
