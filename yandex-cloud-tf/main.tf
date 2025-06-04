//
// Compute instance (VM)
//
# resource "yandex_compute_instance" "vm" {
#   name        = var.vm_name
#   description = "GiveGift project Ubuntu VM"

#   resources {
#     cores  = var.vm_cores
#     memory = var.vm_memory
#   }

#   boot_disk {
#     disk_id = yandex_compute_disk.boot-disk.id
#   }

#   network_interface {
#     subnet_id = yandex_vpc_subnet.givegift-subnet-a.id

#     // Attach a public internet-facing NAT IP
#     nat = true

#     security_group_ids = [
#       yandex_vpc_security_group.ssh_sg.id
#     ]
#   }

#   metadata = {
#     ssh-keys  = "ubuntu:${var.public_ssh_key}"
#     user-data = file("startup.sh")
#   }

#   // Waiting for SSH and Docker to be ready
#   provisioner "remote-exec" {
#     connection {
#       type        = "ssh"
#       host        = self.network_interface[0].nat_ip_address
#       user        = "ubuntu"
#       private_key = file("C:/Users/AmEl/.ssh/id_rsa")
#     }

#     inline = [
#       "echo 'Waiting for startup script to complete...'",
#       "timeout 600 bash -c 'until [ -f /var/log/startup-script.log ] && grep -q \"Startup script finished\" /var/log/startup-script.log; do sleep 10; done'",
#       "echo 'Docker installation completed!'",
#       "docker --version"
#     ]
#   }
# }

# resource "yandex_compute_disk" "boot-disk" {
#   type     = "network-ssd"
#   size     = 20
#   zone     = var.yc_zone
#   image_id = var.vm_platform_id
# }

data "yandex_iam_service_account" "givegift" {
  name = var.yc_service_account_name
}
