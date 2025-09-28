#!/usr/bin/env bash
set -euo pipefail
sudo dnf clean all || true
sudo rm -rf /var/cache/dnf/* /tmp/* /root/.cache/* 2>/dev/null || true