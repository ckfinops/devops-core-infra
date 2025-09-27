
# Outputs
output "vpc_id" {
  description = "ID of the selected VPC"
  value       = data.aws_vpc.selected_vpc.id
}


output "iam_role_arn" {
  description = "ARN of the IAM role"
  value       = aws_iam_role.c3finops_role.arn
}

output "iam_instance_profile_name" {
  description = "Name of the IAM instance profile"
  value       = aws_iam_instance_profile.c3finops_profile.name
}

output "alb_security_group_id" {
  description = "ID of the ALB security group"
  value       = aws_security_group.c3finops_alb_sg.id
}

output "ec2_security_group_id" {
  description = "ID of the EC2 security group"
  value       = aws_security_group.c3finops_sg.id
}

output "alb_arn" {
  description = "ARN of the Application Load Balancer"
  value       = aws_lb.c3finops_alb.arn
}

output "alb_dns_name" {
  description = "DNS name of the Application Load Balancer"
  value       = aws_lb.c3finops_alb.dns_name
}
output "target_group_arn" {
  description = "ARN of the target group"
  value       = aws_lb_target_group.c3finops_tg.arn
}

output "http_listener_arn" {
  description = "ARN of the HTTP listener"
  value       = aws_lb_listener.http.arn
}

# output "https_listener_arn" {
#   description = "ARN of the HTTPS listener"
#   value       = aws_lb_listener.https.arn
# }

# Additional outputs for key resources
output "main_db_access_sg_id" {
  description = "ID of the MySQL Security Group for RDS"
  value       = aws_security_group.main_db_access.id
}

output "db_subnet_group_name" {
  description = "Name of the DB subnet group"
  value       = aws_db_subnet_group.c3finops_db_subnet_group.name
}

output "web_instance_id" {
  description = "ID of the web EC2 instance"
  value       = aws_instance.c3finops_web.id
}

output "web_instance_private_ip" {
  description = "Private IP of the web EC2 instance"
  value       = aws_instance.c3finops_web.private_ip
}

output "app_instance_id" {
  description = "ID of the app EC2 instance"
  value       = aws_instance.c3finops_app.id
}

output "app_instance_private_ip" {
  description = "Private IP of the app EC2 instance"
  value       = aws_instance.c3finops_app.private_ip
}

output "web_cloudwatch_alarm_arn" {
  description = "ARN of the CloudWatch alarm for web EC2"
  value       = aws_cloudwatch_metric_alarm.c3finops_web_cloudwatch_recovery.arn
}

output "app_cloudwatch_alarm_arn" {
  description = "ARN of the CloudWatch alarm for app EC2"
  value       = aws_cloudwatch_metric_alarm.c3finops_app_cloudwatch_recovery.arn
}

output "main_rds_instance_id" {
  description = "ID of the main RDS instance"
  value       = aws_db_instance.main_rds_instance.id
}

output "main_rds_instance_endpoint" {
  description = "Endpoint of the main RDS instance"
  value       = aws_db_instance.main_rds_instance.endpoint
}

output "main_rds_instance_arn" {
  description = "ARN of the main RDS instance"
  value       = aws_db_instance.main_rds_instance.arn
}

