//
// Kubernetes Cluster
//

data "yandex_iam_service_account" "givegift" {
  name = var.yc_service_account_name
}

resource "yandex_kubernetes_cluster" "k8s_cluster" {
  name        = var.k8s_cluster_name
  description = "Managed Kubernetes cluster for GiveGift"

  network_id = yandex_vpc_network.givegift-net.id

  master {
    version = var.k8s_version

    zonal {
      zone      = var.yc_zone
      subnet_id = yandex_vpc_subnet.givegift-subnet-a.id
    }

    # Expose control‐plane API via a public IP
    public_ip = true

    # Reuse your SSH security group so you can ssh‐forward to the API if needed
    security_group_ids = [
      yandex_vpc_security_group.ssh_sg.id,
    ]

    maintenance_policy {
      auto_upgrade = true

      maintenance_window {
        start_time = "02:00"
        duration   = "2h"
      }
    }

    master_logging {
      enabled                    = true
      kube_apiserver_enabled     = true
      cluster_autoscaler_enabled = true
      events_enabled             = true
      audit_enabled              = true
    }
  }

  service_account_id      = data.yandex_iam_service_account.givegift.id
  node_service_account_id = data.yandex_iam_service_account.givegift.id

  labels = {
    environment = "production"
    project     = "givegift"
  }

  release_channel         = "STABLE"
  network_policy_provider = "CALICO"
}

//
// Node group for GiveGift K8s
// 
resource "yandex_kubernetes_node_group" "k8s_nodes" {
  name        = var.node_group_name
  description = "Default node group for GiveGift K8s"
  cluster_id  = yandex_kubernetes_cluster.k8s_cluster.id
  version     = var.k8s_version

  labels = {
    role = "worker"
  }

  instance_template {
    platform_id = var.node_platform_id

    network_interface {
      nat        = true
      subnet_ids = [yandex_vpc_subnet.givegift-subnet-a.id]
    }

    resources {
      cores  = var.node_cores
      memory = var.node_memory
    }

    boot_disk {
      type = "network-hdd"
      size = 32
    }

    scheduling_policy {
      preemptible = false
    }

    container_runtime {
      type = "containerd"
    }
  }

  scale_policy {
    fixed_scale {
      size = var.node_count
    }
  }

  allocation_policy {
    location {
      zone = var.yc_zone
    }
  }

  maintenance_policy {
    auto_upgrade = true
    auto_repair  = true

    maintenance_window {
      day        = "monday"
      start_time = "03:00"
      duration   = "2h"
    }

    maintenance_window {
      day        = "friday"
      start_time = "01:00"
      duration   = "3h"
    }
  }
}
