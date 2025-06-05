output "registry_id" {
  description = "The ID of the created Yandex Container Registry"
  value       = yandex_container_registry.registry.id
}

output "psql_cluster_connection_params" {
  description = "Connection parameters of the managed PostgreSQL cluster"
  value = {
    "host" : "c-${yandex_mdb_postgresql_cluster.givegift_psql_cluster.id}.rw.mdb.yandexcloud.net",
    "port" : 6432,
    "dbname" : yandex_mdb_postgresql_database.givegift_psql_db.name,
    "user_name" : yandex_mdb_postgresql_user.givegift_psql_user.name
  }
}

output "k8s_cluster_name" {
  description = "Name of the managed Kubernetes cluster"
  value       = yandex_kubernetes_cluster.k8s-cluster.name
}

output "loadtesting_agent_id" {
  description = "The ID of the created Yandex Load Testing agent"
  value       = yandex_loadtesting_agent.givegift-agent.id
}
