output "instance_public_ipv4" {
  description = "The assigned public IPv4 address"
  value       = yandex_compute_instance.vm.network_interface[0].nat_ip_address
}

output "registry_id" {
  description = "The ID of the created Yandex Container Registry"
  value       = yandex_container_registry.registry.id
}

# output "cluster_connection_params" {
#   description = "Connection parameters of the managed PostgreSQL cluster"
#   value = {
#     "host" : "c-${yandex_mdb_postgresql_cluster.givegift_cluster.id}.rw.mdb.yandexcloud.net",
#     "port" : 6432,
#     "dbname" : yandex_mdb_postgresql_database.givegift_db.name,
#     "user_name" : yandex_mdb_postgresql_user.givegift_user.name
#   }
# }


output "kubernetes_name" {
  description = "Name of the managed Kubernetes cluster"
  value       = yandex_kubernetes_cluster.k8s_cluster.name
}
