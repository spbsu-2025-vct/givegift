//
// Kubernetes Cluster
//
data "yandex_iam_service_account" "givegift" {
  name = var.yc_service_account_name
}

resource "yandex_kubernetes_cluster" "k8s-cluster" {
  description = "Managed Service for Kubernetes GiveGift cluster"
  name        = var.k8s_cluster_name
  network_id  = yandex_vpc_network.givegift-net.id

  master {
    version = var.k8s_version
    master_location {
      zone      = yandex_vpc_subnet.givegift-subnet-a.zone
      subnet_id = yandex_vpc_subnet.givegift-subnet-a.id
    }

    public_ip = true

    security_group_ids = [
      yandex_vpc_security_group.k8s-cluster-traffic.id,
      yandex_vpc_security_group.k8s-cluster-nodegroup-traffic.id
    ]

  }
  service_account_id      = data.yandex_iam_service_account.givegift.id
  node_service_account_id = data.yandex_iam_service_account.givegift.id
}

resource "yandex_kubernetes_node_group" "k8s-node-group" {
  description = "Node group for Managed Service for Kubernetes GiveGift cluster"
  name        = var.node_group_name
  cluster_id  = yandex_kubernetes_cluster.k8s-cluster.id
  version     = var.k8s_version

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

  instance_template {
    platform_id = var.node_platform_id

    network_interface {
      nat        = true
      subnet_ids = [yandex_vpc_subnet.givegift-subnet-a.id]
      security_group_ids = [
        yandex_vpc_security_group.k8s-cluster-nodegroup-traffic.id,
        yandex_vpc_security_group.k8s-nodegroup-traffic.id,
        yandex_vpc_security_group.k8s-services-access.id,
        yandex_vpc_security_group.k8s-ssh-access.id
      ]
    }

    metadata = {
      ssh-keys = "ubuntu:${var.public_ssh_key}"
    }

    resources {
      memory = var.node_memory
      cores  = var.node_cores
    }

    boot_disk {
      type = "network-hdd"
      size = 32 # Disk size in GB
    }
  }
}
