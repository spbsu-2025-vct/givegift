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
