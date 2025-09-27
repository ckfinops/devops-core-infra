# MySQL Security Group for RDS
resource "aws_security_group" "main_db_access" {
  name        = "${var.c3finops_resource_name_prepend}-${var.c3finops_environment}-mysql-sg"
  description = "Allow MySQL access to RDS instance"
  vpc_id      = data.aws_vpc.selected_vpc.id

  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/8"] # Adjust as needed
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(
    var.c3finops_additional_tags,
    var.c3finops_module_tags,
    {
      Name = "${var.c3finops_resource_name_prepend}-${var.c3finops_environment}-mysql-sg"
    }
  )
}
resource "aws_db_subnet_group" "c3finops_db_subnet_group" {
  name       = "${var.c3finops_resource_name_prepend}-${var.c3finops_environment}-db-subnet-group"
  subnet_ids = [for subnet in data.aws_subnet.selected_private_datalayer_subnets : subnet.id]
  description = "DB subnet group for ${var.c3finops_resource_name_prepend} ${var.c3finops_environment}"
  tags = merge(
    var.c3finops_additional_tags,
    var.c3finops_module_tags,
    {
      Name = "${var.c3finops_resource_name_prepend}-${var.c3finops_environment}-db-subnet-group"
    }
  )
}
# Data Sources
data "aws_vpc" "selected_vpc" {
  id = var.c3finops_vpc_id
}

# Fetching private web layer subnets based on the provided IDs
data "aws_subnet" "selected_public_subnets" {
  for_each = toset(var.c3finops_public_subnets)
  id       = each.value
}

# Fetching private web layer subnets based on the provided IDs
data "aws_subnet" "selected_private_weblayer_subnets" {
  for_each = toset(var.c3finops_private_weblayer_subnets)
  id       = each.value
}

# Fetching private app subnets based on the provided IDs
data "aws_subnet" "selected_private_applayer_subnets" {
  for_each = toset(var.c3finops_private_applayer_subnets)
  id       = each.value
}

# Fetching private data subnets based on the provided IDs
data "aws_subnet" "selected_private_datalayer_subnets" {
  for_each = toset(var.c3finops_private_datalayer_subnets)
  id       = each.value
}

# IAM Role and Instance Profile
resource "aws_iam_role" "c3finops_role" {
  name = "${var.c3finops_resource_name_prepend}-${var.c3finops_environment}-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action    = "sts:AssumeRole"
        Effect    = "Allow"
        Principal = {
          Service = ["ec2.amazonaws.com", "ssm.amazonaws.com"]
        }
      }
    ]
  })

  tags = merge(
    var.c3finops_additional_tags,
    var.c3finops_module_tags,
    {
      Name = "${var.c3finops_resource_name_prepend}-${var.c3finops_environment}-role"
    }
  )
}

resource "aws_iam_instance_profile" "c3finops_profile" {
  name = "${var.c3finops_resource_name_prepend}-${var.c3finops_environment}-profile"
  role = aws_iam_role.c3finops_role.name
}

resource "aws_iam_role_policy_attachment" "c3finops_ec2_ssm" {
  role       = aws_iam_role.c3finops_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2RoleforSSM"
}

resource "aws_iam_role_policy_attachment" "c3finops_ec2_ssm_policy_attachment" {
  role       = aws_iam_role.c3finops_role.name
  policy_arn = var.ec2_policy_for_ssm
}

# Security Groups
resource "aws_security_group" "c3finops_alb_sg" {
  name_prefix = "${var.c3finops_name_prefix}-${var.c3finops_environment}-alb-sg"
  description = "Allow HTTP/S access"
  vpc_id      = data.aws_vpc.selected_vpc.id

  lifecycle {
    create_before_destroy = true
  }

  tags = merge(
    var.c3finops_additional_tags,
    var.c3finops_module_tags,
    {
      Name = "${var.c3finops_name_prefix}-${var.c3finops_environment}-alb-sg"
    }
  )
}

resource "aws_security_group_rule" "c3finops_alb_ingress" {
  for_each = {
    http  = { port = 80, protocol = "tcp" }
    https = { port = 443, protocol = "tcp" }
  }

  type              = "ingress"
  from_port         = each.value.port
  to_port           = each.value.port
  protocol          = each.value.protocol
  cidr_blocks       = var.c3finops_exposed_cidrs
  security_group_id = aws_security_group.c3finops_alb_sg.id
}

resource "aws_security_group_rule" "c3finops_alb_egress" {
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.c3finops_alb_sg.id
}

resource "aws_security_group" "c3finops_sg" {
  name_prefix = "${var.c3finops_name_prefix}-${var.c3finops_environment}-ec2"
  description = "Allow HTTP/S and SSH from bastions"
  vpc_id      = data.aws_vpc.selected_vpc.id

  lifecycle {
    create_before_destroy = true
  }

  tags = merge(
    var.c3finops_additional_tags,
    var.c3finops_module_tags,
    {
      Name = "${var.c3finops_name_prefix}-${var.c3finops_environment}-ec2"
    }
  )
}

resource "aws_security_group_rule" "c3finops_sg_ingress" {
  for_each = {
    ssh   = { port = 22, protocol = "tcp", source = var.c3finops_exposed_cidrs }
    http  = { port = 80, protocol = "tcp", source = aws_security_group.c3finops_alb_sg.id }
    https = { port = 443, protocol = "tcp", source = aws_security_group.c3finops_alb_sg.id }
  }

  type                     = "ingress"
  from_port                = each.value.port
  to_port                  = each.value.port
  protocol                 = each.value.protocol

  #cidr_blocks              = var.c3finops_exposed_cidrs
  source_security_group_id = aws_security_group.c3finops_alb_sg.id 
  security_group_id        = aws_security_group.c3finops_sg.id

}

resource "aws_security_group_rule" "c3finops_sg_ssh_ingress" {
  for_each = {
    ssh   = { port = 22, protocol = "tcp", source = var.c3finops_exposed_cidrs }
    http  = { port = 80, protocol = "tcp", source = aws_security_group.c3finops_alb_sg.id }
    https = { port = 443, protocol = "tcp", source = aws_security_group.c3finops_alb_sg.id }
  }

  type                     = "ingress"
  from_port                = each.value.port
  to_port                  = each.value.port
  protocol                 = each.value.protocol

  cidr_blocks              = var.c3finops_exposed_cidrs
  security_group_id        = aws_security_group.c3finops_sg.id

}

resource "aws_security_group_rule" "c3finops_sg_egress" {
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.c3finops_sg.id
}

# ALB
resource "aws_lb" "c3finops_alb" {
  name               = "${var.c3finops_name_prefix}-${var.c3finops_environment}"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.c3finops_alb_sg.id]
  subnets             = [for s in values(data.aws_subnet.selected_public_subnets) : s.id]
  #subnets            = [for subnet in data.aws_subnet.selected_private_weblayer_subnets : subnet.id]

  idle_timeout               = 400
  enable_deletion_protection = false

  tags = merge(
    var.c3finops_additional_tags,
    var.c3finops_module_tags,
    {
      Name = "${var.c3finops_name_prefix}-${var.c3finops_environment}"
    }
  )
}

# Target Group
resource "aws_lb_target_group" "c3finops_tg" {
  name_prefix = "${var.c3finops_80tg_prefix}-tg"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = data.aws_vpc.selected_vpc.id
  target_type = "instance"

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 3
    interval            = 30
    path                = "/"
    matcher             = "200"
  }

  tags = merge(
    var.c3finops_additional_tags,
    var.c3finops_module_tags,
    {
      Name = "${var.c3finops_80tg_prefix}-tg"
    }
  )
}

# Listeners
resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.c3finops_alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.c3finops_tg.arn
  }
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.c3finops_alb.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = var.c3finops_ssl_certificate

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.c3finops_tg.arn
  }
}

# EC2 Instance - Web Server 
resource "aws_instance" "c3finops_web" {
  ami           = var.c3finops_web_ami
  instance_type = var.c3finops_web_instance_size
  key_name      = var.c3finops_key_name
  subnet_id     = element([for subnet in data.aws_subnet.selected_private_weblayer_subnets : subnet.id], 0)

  vpc_security_group_ids = [
    aws_security_group.c3finops_sg.id,
    var.c3finops_admin_linux_sg_id
  ]

  iam_instance_profile       = aws_iam_instance_profile.c3finops_profile.name
  associate_public_ip_address = false
  disable_api_termination    = true

  root_block_device {
    volume_size           = var.c3finops_root_volume_size
    volume_type           = "gp3"
    delete_on_termination = true
  }

  #user_data = file("${path.module}/user_dev.txt") 
  #user_data     = "${data.template_file.c3finops_web_user_data.rendered}"
  

  user_data = templatefile("${path.module}/templates/app-userdata.sh.tmpl", {
    region         = var.region
    api_bucket     = var.api_bucket
    api_key        = var.api_key
    tomcat_version = var.tomcat_version
  })


  lifecycle {
    ignore_changes = [user_data]
  }

  tags = merge(
    var.c3finops_additional_tags,
    var.c3finops_module_tags,
    {
      Name   = "${var.c3finops_resource_name_prepend}-web-${var.c3finops_environment}"
      Backup = "true"
    }
  )
}

# Target Group Attachment
resource "aws_lb_target_group_attachment" "c3finops_tg_attachment" {
  target_group_arn = aws_lb_target_group.c3finops_tg.arn
  target_id        = aws_instance.c3finops_web.id
  port             = 80
}

# CloudWatch Alarm
resource "aws_cloudwatch_metric_alarm" "c3finops_web_cloudwatch_recovery" {
  alarm_name          = "c3finops-web-${var.c3finops_environment}-status-check-failed"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 2
  metric_name         = "StatusCheckFailed_System"
  namespace           = "AWS/EC2"
  period              = 300
  statistic           = "Maximum"
  threshold           = 1
  alarm_description   = "This metric monitors EC2 status checks"
  alarm_actions       = ["arn:aws:automate:${var.c3finops_region}:ec2:recover"]

  dimensions = {
    InstanceId = aws_instance.c3finops_web.id
  }
}

# App EC2 

# EC2 Instance - Web Server 
resource "aws_instance" "c3finops_app" {
  ami           = var.c3finops_app_ami
  instance_type = var.c3finops_app_instance_size
  key_name      = var.c3finops_key_name
  subnet_id     = element([for subnet in data.aws_subnet.selected_private_applayer_subnets : subnet.id], 0)

  vpc_security_group_ids = [
    aws_security_group.c3finops_sg.id,
    var.c3finops_admin_linux_sg_id
  ]

  iam_instance_profile       = aws_iam_instance_profile.c3finops_profile.name
  associate_public_ip_address = false
  disable_api_termination    = true

  root_block_device {
    volume_size           = var.c3finops_root_volume_size
    volume_type           = "gp3"
    delete_on_termination = true
  }

  #user_data = file("${path.module}/user_app.txt") 
  #user_data     = "${data.template_file.c3finops_app_user_data.rendered}"

  user_data = templatefile("${path.module}/templates/web-userdata.sh.tmpl", {
    region         = var.region
    api_bucket     = var.api_bucket
    api_key        = var.api_key
    tomcat_version = var.tomcat_version
  })


  lifecycle {
    ignore_changes = [user_data]
  }

  tags = merge(
    var.c3finops_additional_tags,
    var.c3finops_module_tags,
    {
      Name   = "${var.c3finops_resource_name_prepend}-app-${var.c3finops_environment}"
      Backup = "true"
    }
  )
}


# CloudWatch Alarm
resource "aws_cloudwatch_metric_alarm" "c3finops_app_cloudwatch_recovery" {
  alarm_name          = "c3finops-app-${var.c3finops_environment}-status-check-failed"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 2
  metric_name         = "StatusCheckFailed_System"
  namespace           = "AWS/EC2"
  period              = 300
  statistic           = "Maximum"
  threshold           = 1
  alarm_description   = "This metric monitors EC2 status checks"
  alarm_actions       = ["arn:aws:automate:${var.c3finops_region}:ec2:recover"]

  dimensions = {
    InstanceId = aws_instance.c3finops_app.id
  }
}

# MySQL RDS Instance
/*
resource "aws_db_instance" "c3finops_db" {
  identifier              = "${var.c3finops_resource_name_prepend}-${var.c3finops_environment}-db"
  allocated_storage       = var.c3finops_db_allocated_storage
  storage_type            = "gp3"
  engine                  = "mysql"
  engine_version          = var.c3finops_db_engine_version
  instance_class          = var.c3finops_db_instance_class
  name                    = var.c3finops_db_name
  username                = var.c3finops_db_username
  password                = var.c3finops_db_password
  parameter_group_name    = "default.mysql8.0"
  skip_final_snapshot     = true
  publicly_accessible     = false
  vpc_security_group_ids  = [aws_security_group.c3finops_sg.id]
  db_subnet_group_name    = aws_db_subnet_group.c3finops_db_subnet_group.name
  multi_az                = false
  backup_retention_period = var.c3finops_db_backup_retention_period
  backup_window           = var.c3finops_db_backup_window
  maintenance_window      = var.c3finops_db_maintenance_window
  deletion_protection     = false

  tags = merge(
    var.c3finops_additional_tags,
    var.c3finops_module_tags,
    {
      Name = "${var.c3finops_resource_name_prepend}-${var.c3finops_environment}-db"
    }
  )
} 


# CloudWatch Alarm - Database 
resource "aws_cloudwatch_metric_alarm" "c3finops_db_cloudwatch_recovery" {
  alarm_name          = "c3finops-db-${var.c3finops_environment}-status-check-failed"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 2
  metric_name         = "StatusCheckFailed_System"
  namespace           = "AWS/EC2"
  period              = 300
  statistic           = "Maximum"
  threshold           = 1
  alarm_description   = "This metric monitors EC2 status checks"
  alarm_actions       = ["arn:aws:automate:${var.c3finops_region}:ec2:recover"]

  dimensions = {
    InstanceId = aws_instance.c3finops_db.id
  }
}
*/

# RDS Security Group


//RDS INSTANCE

resource "aws_db_instance" "main_rds_instance" {
  lifecycle {
    ignore_changes = [tags, vpc_security_group_ids]
  }

  identifier        = "${var.c3finops_resource_name_prepend}-${var.c3finops_environment}-${var.rds_instance_identifier}"
  allocated_storage = tonumber(var.rds_allocated_storage)
  engine            = var.rds_engine_type
  engine_version    = var.rds_engine_version
  instance_class    = var.rds_instance_class

  #name              = var.database_name
  username          = var.database_user
  password          = var.database_password

  port                = var.database_mysql_port
  snapshot_identifier = var.rds_snapshot_identifier
  vpc_security_group_ids = [aws_security_group.main_db_access.id]
  db_subnet_group_name = aws_db_subnet_group.c3finops_db_subnet_group.name

  # Only set iops if using io1 storage type
  storage_type        = var.rds_storage_type
  publicly_accessible = var.publicly_accessible
  multi_az            = var.rds_is_multi_az
  allow_major_version_upgrade = var.allow_major_version_upgrade
  auto_minor_version_upgrade  = var.auto_minor_version_upgrade
  apply_immediately           = var.apply_immediately
  maintenance_window          = var.maintenance_window
  skip_final_snapshot         = var.skip_final_snapshot
  copy_tags_to_snapshot       = var.copy_tags_to_snapshot
  backup_retention_period     = var.backup_retention_period
  backup_window               = var.backup_window
  tags = merge(var.c3finops_additional_tags, var.c3finops_module_tags, tomap({Name = "${var.c3finops_resource_name_prepend}-${var.c3finops_environment}-${var.rds_instance_identifier}"}))
}

# Data source for the hosted zone (if not already present)
data "aws_route53_zone" "c3ops_in" {
  name         = "c3ops.in."
  private_zone = false
}

# A record for ALB
# resource "aws_route53_record" "c3ops_in_a" {
#   zone_id = data.aws_route53_zone.c3ops_in.zone_id
#   name    = "c3ops.in"
#   type    = "A"
#   alias {
#     name                   = aws_lb.c3finops_alb.name
#     zone_id                = data.aws_route53_zone.primary.zone_id
#     evaluate_target_health = true
#   }
# }

# AAAA record for ALB
# resource "aws_route53_record" "c3ops_in_aaaa" {
#   zone_id = data.aws_route53_zone.c3ops_in.zone_id
#   name    = "c3ops.in"
#   type    = "AAAA"
#   alias {
#     name                   = aws_lb.c3finops_alb.name
#     zone_id                = data.aws_route53_zone.primary.zone_id
#     evaluate_target_health = true
#   }
# }

# data lookup for the console-created public zone
data "aws_route53_zone" "primary" {
  name         = var.hosted_zone_name   # include trailing dot: "c3ops.in."
  private_zone = false
}

# A record alias → ALB
resource "aws_route53_record" "app_a" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = var.record_name             # "app" (becomes app.c3ops.in) or "app.c3ops.in"
  type    = "A"
  alias {
    name                   = aws_lb.c3finops_alb.dns_name
    zone_id                = aws_lb.c3finops_alb.zone_id
    evaluate_target_health = true
  }
}

# (optional) AAAA record for IPv6
resource "aws_route53_record" "app_aaaa" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = var.record_name
  type    = "AAAA"
  alias {
    name                   = aws_lb.c3finops_alb.dns_name
    zone_id                = aws_lb.c3finops_alb.zone_id
    evaluate_target_health = true
  }
}

//Executing User Data based on environment

data "template_file" "c3finops_web_user_data" {

  template = "${file("${path.module}/templates/web_userdata.tpl")}"

  vars = {
    env = "${var.c3finops_environment}"
  }
}

data "template_file" "c3finops_app_user_data" {

  template = "${file("${path.module}/templates/app_userdata.tpl")}"

  vars = {
    env = "${var.c3finops_environment}"
  }
}

