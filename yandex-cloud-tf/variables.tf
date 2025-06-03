variable "yc_folder_id" {
  description = "The ID of the Yandex Cloud folder in which to create resources."
  type        = string
}

variable "yc_cloud_id" {
  description = "The ID of the Yandex Cloud to use."
  type        = string
}

variable "yc_zone" {
  description = "The availability zone to launch the VM in (default: ru-central1-a)."
  type        = string
  default     = "ru-central1-a"
}

variable "yc_service_account_name" {
  description = "The name of the Yandex Cloud service account to use."
  type        = string
  default     = "tf-sa"
}

variable "yc_token" {
  description = "OAuth token or service-account key file content for the Yandex provider."
  type        = string
  sensitive   = true
}

// ------------------------------------------------------------------------------

variable "vm_name" {
  description = "The name of the Compute instance to create."
  type        = string
  default     = "terraform-vm"
}

variable "vm_platform_id" {
  description = "The platform ID or image family for the VM (default: ubuntu-2204-lts)."
  type        = string
  default     = "ubuntu-2204-lts"
}

variable "vm_memory" {
  description = "Memory size in GB for the VM (default: 4)."
  type        = number
  default     = 4
}

variable "vm_cores" {
  description = "Number of CPU cores for the VM (default: 2)."
  type        = number
  default     = 2
}

// ------------------------------------------------------------------------------

variable "public_ssh_key" {
  description = "Your SSH public key to provision into ~/.ssh/authorized_keys."
  type        = string
}

variable "network_cidr" {
  description = "CIDR block for the VPC subnet (default: 10.0.0.0/24)."
  type        = string
  default     = "10.0.0.0/24"
}

// ------------------------------------------------------------------------------

variable "registry_name" {
  description = "Name to use for your Yandex Container Registry."
  type        = string
  default     = "givegift-registry"
}

// ------------------------------------------------------------------------------

variable "cluster_name" {
  description = "Name for the GiveGift PostgreSQL cluster."
  type        = string
  default     = "givegift-cluster"
}

variable "cluster_version" {
  description = "PostgreSQL version for the GiveGift cluster."
  type        = number
  default     = 15
}

variable "cluster_resource_preset_id" {
  description = "Resource preset ID for the GiveGift cluster."
  type        = string
  default     = "s3-c2-m8"
}

variable "cluster_disk_type" {
  description = "Disk type for the GiveGift cluster."
  type        = string
  default     = "network-hdd"
}

variable "cluster_disk_size" {
  description = "Disk size (in GB) for the GiveGift cluster."
  type        = number
  default     = 10
}

variable "db_name" {
  description = "Name for the GiveGift PostgreSQL database."
  type        = string
  default     = "givegift-db"
}

// ------------------------------------------------------------------------------

variable "k8s_cluster_name" {
  description = "Name of the managed Kubernetes cluster"
  type        = string
  default     = "givegift-k8s-cluster"
}

variable "k8s_version" {
  description = "Kubernetes control plane version"
  type        = string
  default     = "1.30"
}

variable "node_group_name" {
  description = "Name of the node group"
  type        = string
  default     = "givegift-k8s-node-group"
}

variable "node_count" {
  description = "Fixed number of nodes in the node group"
  type        = number
  default     = 2
}

variable "node_platform_id" {
  description = "Compute instance type for each node"
  type        = string
  default     = "standard-v2"
}

variable "node_cores" {
  description = "Number of CPU cores per node"
  type        = number
  default     = 2
}

variable "node_memory" {
  description = "Amount of RAM (in GB) per node"
  type        = number
  default     = 2
}

// ------------------------------------------------------------------------------
