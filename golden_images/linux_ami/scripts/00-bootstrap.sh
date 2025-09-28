#!/usr/bin/env bash
set -euo pipefail


log() { echo "[BOOTSTRAP] $(date -Is) $*"; }


# ---- Vars (override via env or packer) ----
APP_USER="appadmin"
CLOUDWATCH_CFG_PATH="/opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json"


log "Updating system packages"
sudo dnf -y update


log "Installing base utilities"
sudo dnf -y install unzip jq curl tar wget bind-utils git


log "Installing httpd (web tier)"
sudo dnf -y install httpd
sudo systemctl enable httpd || true


log "Installing Amazon Corretto (Java 21)"
sudo dnf -y install java-21-amazon-corretto


log "Ensuring SSM Agent is enabled"
sudo systemctl enable --now amazon-ssm-agent || true


log "Installing CloudWatch Agent"
sudo dnf -y install amazon-cloudwatch-agent || true
sudo mkdir -p /opt/aws/amazon-cloudwatch-agent/etc


log "Creating standard dirs"
sudo mkdir -p /opt/app/{scripts,bin,config,logs} /opt/app/ui /opt/app/service
sudo chown -R root:root /opt/app
sudo chmod -R 0755 /opt/app


log "Creating ${APP_USER} with passwordless sudo"
if ! id -u ${APP_USER} >/dev/null 2>&1; then
sudo useradd ${APP_USER}
fi
echo "${APP_USER} ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/${APP_USER} >/dev/null


# CloudWatch agent config if provided at bake time
if [[ -f "/tmp/cloudwatch-agent.json" ]]; then
log "Applying CloudWatch agent config"
sudo install -o root -g root -m 0644 /tmp/cloudwatch-agent.json "$CLOUDWATCH_CFG_PATH"
sudo systemctl enable amazon-cloudwatch-agent || true
sudo systemctl restart amazon-cloudwatch-agent || true
fi


log "Bootstrap complete"