
# Outputs
output "vpc_id" {
  description = "ID of the selected VPC"
  value       = data.aws_vpc.selected_vpc.id
}

output "private_subnet_ids" {
  description = "IDs of the selected private subnets"
  value       = [for subnet in data.aws_subnet.selected_private_subnets : subnet.id]
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

output "https_listener_arn" {
  description = "ARN of the HTTPS listener"
  value       = aws_lb_listener.https.arn
}

output "ec2_instance_id" {
  description = "ID of the EC2 instance"
  value       = aws_instance.c3finops.id
}

output "cloudwatch_alarm_arn" {
  description = "ARN of the CloudWatch alarm"
  value       = aws_cloudwatch_metric_alarm.c3finops_cloudwatch_recovery.arn
}