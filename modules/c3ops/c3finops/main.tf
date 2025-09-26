# Data Sources
data "aws_vpc" "selected_vpc" {
  id = var.c3finops_vpc_id
}

# Fetching private subnets based on the provided IDs
data "aws_subnet" "selected_private_subnets" {
  for_each = toset(var.c3finops_private_subnets)
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
  internal           = true
  load_balancer_type = "application"
  security_groups    = [aws_security_group.c3finops_alb_sg.id]
  subnets            = [for subnet in data.aws_subnet.selected_private_subnets : subnet.id]

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

# EC2 Instance
resource "aws_instance" "c3finops" {
  ami           = var.c3finops_web_ami
  instance_type = var.c3finops_app_instance_size
  key_name      = var.c3finops_key_name
  subnet_id     = element([for subnet in data.aws_subnet.selected_private_subnets : subnet.id], 0)

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

  user_data = file("${path.module}/user_dev.txt") 

  lifecycle {
    ignore_changes = [user_data]
  }

  tags = merge(
    var.c3finops_additional_tags,
    var.c3finops_module_tags,
    {
      Name   = "${var.c3finops_resource_name_prepend}-${var.c3finops_environment}"
      Backup = "true"
    }
  )
}

# Target Group Attachment
resource "aws_lb_target_group_attachment" "c3finops_tg_attachment" {
  target_group_arn = aws_lb_target_group.c3finops_tg.arn
  target_id        = aws_instance.c3finops.id
  port             = 80
}

# CloudWatch Alarm
resource "aws_cloudwatch_metric_alarm" "c3finops_cloudwatch_recovery" {
  alarm_name          = "c3finops-${var.c3finops_environment}-status-check-failed"
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
    InstanceId = aws_instance.c3finops.id
  }
}
