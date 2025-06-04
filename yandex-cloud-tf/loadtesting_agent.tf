resource "yandex_loadtesting_agent" "givegift-agent" {
  name        = "givegift-agent"
  description = "Load testing agent for GiveGift project"
  folder_id   = var.yc_folder_id
  depends_on  = [yandex_vpc_security_group.agent-sg]

  compute_instance {
    zone_id            = var.yc_zone
    service_account_id = data.yandex_iam_service_account.givegift.id
    resources {
      memory = 4
      cores  = 2
    }
    boot_disk {
      initialize_params {
        size = 15
      }
      auto_delete = true
    }
    network_interface {
      subnet_id = yandex_vpc_subnet.givegift-subnet-a.id
      nat       = true # We need this to make the agent can successfully establish a connection with Public API Load Testing

      security_group_ids = [yandex_vpc_security_group.agent-sg.id]
    }
  }
}
