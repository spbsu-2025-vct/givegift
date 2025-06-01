//
// MDB PostgreSQL Cluster
//
resource "yandex_mdb_postgresql_cluster" "givegift_cluster" {
  name        = var.cluster_name
  environment = "PRODUCTION"
  network_id  = yandex_vpc_network.givegift-net.id

  config {
    version = var.cluster_version
    resources {
      resource_preset_id = var.cluster_resource_preset_id
      disk_type_id       = var.cluster_disk_type
      disk_size          = var.cluster_disk_size
    }
    postgresql_config = {
      max_connections                = 395
      enable_parallel_hash           = true
      autovacuum_vacuum_scale_factor = 0.34
      default_transaction_isolation  = "TRANSACTION_ISOLATION_READ_COMMITTED"
      shared_preload_libraries       = "SHARED_PRELOAD_LIBRARIES_AUTO_EXPLAIN,SHARED_PRELOAD_LIBRARIES_PG_HINT_PLAN"
    }
  }

  maintenance_window {
    type = "WEEKLY"
    day  = "WED"
    hour = 12
  }

  host {
    zone             = var.yc_zone
    subnet_id        = yandex_vpc_subnet.givegift-subnet-a.id
    assign_public_ip = true

  }

  security_group_ids = [
    yandex_vpc_security_group.ssh_sg.id
  ]
}

resource "yandex_mdb_postgresql_database" "givegift_db" {
  cluster_id = yandex_mdb_postgresql_cluster.givegift_cluster.id
  name       = var.db_name
  owner      = yandex_mdb_postgresql_user.givegift_user.name
}


resource "yandex_mdb_postgresql_user" "givegift_user" {
  cluster_id = yandex_mdb_postgresql_cluster.givegift_cluster.id
  name       = "givegift_user"
  password   = "password"
  conn_limit = 50
  settings = {
    default_transaction_isolation = "read committed"
    log_min_duration_statement    = 5000
  }
}
