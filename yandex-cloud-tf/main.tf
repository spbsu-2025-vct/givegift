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


// 
// Yandex container registry
//

// Create a single Container Registry namespace with repository in it
resource "yandex_container_registry" "registry" {
  name      = var.registry_name
  folder_id = var.yc_folder_id
}

resource "yandex_container_repository" "givegift_repo" {
  name = "${yandex_container_registry.registry.id}/givegift"
}
