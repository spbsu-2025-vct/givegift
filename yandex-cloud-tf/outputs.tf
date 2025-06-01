output "instance_public_ipv4" {
  description = "The assigned public IPv4 address"
  value       = yandex_compute_instance.vm.network_interface[0].nat_ip_address
}

output "registry_id" {
  description = "The ID of the created Yandex Container Registry"
  value       = yandex_container_registry.registry.id
}
