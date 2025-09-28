#!/usr/bin/env bash
: "${S3_SVC_BUCKET:=}"
: "${S3_SVC_KEY:=}"
: "${JAVA_SVC_NAME:=c3finops}"
: "${JAVA_HEAP:=256m}"


UI_ROOT="/var/www/html"
SVC_DIR="/opt/app/service"
SVC_JAR="$SVC_DIR/service.jar"
SYSTEMD_UNIT="/etc/systemd/system/${JAVA_SVC_NAME}.service"


log "Ensuring AWS CLI present"
if ! command -v aws >/dev/null 2>&1; then
curl -sS "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o /tmp/awscliv2.zip
unzip -q /tmp/awscliv2.zip -d /tmp && sudo /tmp/aws/install || true
fi


# --- Deploy UI (if specified) ---
if [[ -n "$S3_UI_BUCKET" && -n "$S3_UI_KEY" ]]; then
log "Deploying UI from s3://$S3_UI_BUCKET/$S3_UI_KEY to $UI_ROOT"
tmp_zip="/tmp/ui.zip"
aws s3 cp "s3://$S3_UI_BUCKET/$S3_UI_KEY" "$tmp_zip"
sudo rm -rf "$UI_ROOT"/*
sudo unzip -q -o "$tmp_zip" -d "$UI_ROOT"
sudo chown -R apache:apache "$UI_ROOT" || sudo chown -R root:root "$UI_ROOT"
sudo restorecon -RF "$UI_ROOT" 2>/dev/null || true
sudo systemctl restart httpd
fi


# --- Deploy Java service (if specified) ---
if [[ -n "$S3_SVC_BUCKET" && -n "$S3_SVC_KEY" ]]; then
log "Deploying service JAR from s3://$S3_SVC_BUCKET/$S3_SVC_KEY"
sudo mkdir -p "$SVC_DIR"
aws s3 cp "s3://$S3_SVC_BUCKET/$S3_SVC_KEY" "$SVC_JAR"
sudo chown root:root "$SVC_JAR" && sudo chmod 0644 "$SVC_JAR"


if [[ ! -f "$SYSTEMD_UNIT" ]]; then
log "Creating systemd unit $SYSTEMD_UNIT"
sudo tee "$SYSTEMD_UNIT" >/dev/null <<EOF
[Unit]
Description=${JAVA_SVC_NAME} Java Service
After=network-online.target
Wants=network-online.target


[Service]
Type=simple
User=root
Environment=JAVA_OPTS=-Xms${JAVA_HEAP} -Xmx${JAVA_HEAP}
ExecStart=/usr/bin/java $JAVA_OPTS -jar $SVC_JAR
WorkingDirectory=$SVC_DIR
Restart=always
RestartSec=5
StandardOutput=append:/opt/app/logs/${JAVA_SVC_NAME}.log
StandardError=append:/opt/app/logs/${JAVA_SVC_NAME}.err


[Install]
WantedBy=multi-user.target
EOF
fi
sudo systemctl daemon-reload
sudo systemctl enable "$JAVA_SVC_NAME"
sudo systemctl restart "$JAVA_SVC_NAME"
fi


log "App bootstrap complete"