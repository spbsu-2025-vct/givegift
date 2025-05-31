output "instance_public_ipv4" {
  description = "The assigned public IPv4 address"
  value       = yandex_compute_instance.vm.network_interface[0].nat_ip_address
}
