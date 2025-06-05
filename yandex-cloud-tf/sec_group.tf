//
// Security Groups for Kubernetes
//
resource "yandex_vpc_security_group" "k8s-cluster-nodegroup-traffic" {
  name        = "k8s-cluster-nodegroup-traffic"
  description = "Security group rules allow service traffic for the cluster and node groups"
  network_id  = yandex_vpc_network.givegift-net.id
  ingress {
    description       = "Rule for Network Load Balancer health checks"
    protocol          = "TCP"
    from_port         = 0
    to_port           = 65535
    predefined_target = "loadbalancer_healthchecks"
  }
  ingress {
    description       = "Rule for incoming service traffic between master and nodes"
    protocol          = "ANY"
    from_port         = 0
    to_port           = 65535
    predefined_target = "self_security_group"
  }
  ingress {
    description    = "Rule for checking node availability using ICMP requests from subnets within Yandex Cloud"
    protocol       = "ICMP"
    v4_cidr_blocks = [var.zone_a_v4_cidr_block]
  }
  egress {
    description       = "Rule for outgoing service traffic between master and nodes"
    from_port         = 0
    to_port           = 65535
    protocol          = "ANY"
    predefined_target = "self_security_group"
  }
}

resource "yandex_vpc_security_group" "k8s-ssh-access" {
  name        = "k8s-ssh-access"
  description = "Security group rules allow incoming SSH traffic to nodes"
  network_id  = yandex_vpc_network.givegift-net.id
  ingress {
    description    = "Rule for incoming traffic allowing SSH access to nodes"
    port           = 22
    protocol       = "TCP"
    v4_cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "yandex_vpc_security_group" "k8s-nodegroup-traffic" {
  name        = "k8s-nodegroup-traffic"
  description = "Rules of the group allow service traffic for node groups"
  network_id  = yandex_vpc_network.givegift-net.id
  ingress {
    description    = "Rule for incoming traffic, allowing transmission of traffic between pods and services"
    from_port      = 0
    to_port        = 65535
    protocol       = "ANY"
    v4_cidr_blocks = [var.zone_a_v4_cidr_block]
  }
  egress {
    description    = "Rule for outgoing traffic, allowing nodes in the node group to access external resources"
    from_port      = 0
    to_port        = 65535
    protocol       = "ANY"
    v4_cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "yandex_vpc_security_group" "k8s-services-access" {
  name        = "k8s-services-access"
  description = "Rules of the group allow connection to services from the internet"
  network_id  = yandex_vpc_network.givegift-net.id
  ingress {
    description    = "Rule for incoming traffic, allowing connection to services"
    from_port      = 30000
    to_port        = 32767
    protocol       = "TCP"
    v4_cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "yandex_vpc_security_group" "k8s-cluster-traffic" {
  name        = "k8s-cluster-traffic"
  description = "Rules of the group allow traffic for the cluster"
  network_id  = yandex_vpc_network.givegift-net.id
  ingress {
    description    = "Rule for incoming traffic allowing access to Kubernetes API (port 443)"
    port           = 443
    protocol       = "TCP"
    v4_cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    description    = "Rule for incoming traffic allowing access to Kubernetes API (port 6443)"
    port           = 6443
    protocol       = "TCP"
    v4_cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    description    = "Rule for outgoing traffic allowing transmission of traffic between master and pods metric-server"
    port           = 4443
    protocol       = "TCP"
    v4_cidr_blocks = ["0.0.0.0/0"]
  }
}

//
//  Sec group for Load Testing agent
//
resource "yandex_vpc_security_group" "agent-sg" {
  name        = "agent-sg"
  description = "Security group for Load Testing agent"
  network_id  = yandex_vpc_network.givegift-net.id
  egress {
    description    = "Rule for outgoing HTTPS traffic to public API Load Testing"
    port           = 443
    protocol       = "TCP"
    v4_cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description    = "Rule for incoming SSH traffic"
    port           = 22
    protocol       = "TCP"
    v4_cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description    = "Rule for outgoing traffic for load testing to target"
    from_port      = 0
    to_port        = 65535
    protocol       = "ANY"
    v4_cidr_blocks = ["0.0.0.0/0"]
  }
}
