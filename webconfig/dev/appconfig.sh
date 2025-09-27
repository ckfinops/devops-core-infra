#!/bin/bash
aws configure set default.region ap-south-2
aws configure set default.output text
sed -i 's/10.173.154.68/'$(aws ec2 describe-instances --filters "Name=tag:Name,Values='c3ops-app-dev'" --query 'Reservations[].Instances[].PrivateIpAddress')'/' /etc/httpd/conf.d/vhost.conf