#Requires -RunAsAdministrator
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
function Log([string]$m){ Write-Host "[CWAGENT] $(Get-Date -AsUTC -Format o) $m" }


if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
Set-ExecutionPolicy Bypass -Scope Process -Force
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
}


choco install -y amazon-cloudwatch-agent | Out-Null


$cfgDir = 'C:\ProgramData\Amazon\AmazonCloudWatchAgent'
New-Item -ItemType Directory -Force -Path $cfgDir | Out-Null
$cfgPath = Join-Path $cfgDir 'amazon-cloudwatch-agent.json'


@'{
"agent": {"metrics_collection_interval": 60},
"metrics": {
"append_dimensions": {"InstanceId": "${aws:InstanceId}"},
"metrics_collected": {"LogicalDisk": {"measurement": ["% Free Space"], "resources": ["*"]}, "Memory": {"measurement": ["% Committed Bytes In Use"]}}
},
"logs": {"logs_collected": {"files": {"collect_list": [{"file_path": "C:/Ops/logs/*.log", "log_group_name": "/c3ops/app", "log_stream_name": "{instance_id}"}]}}}
}'@ | Set-Content -Path $cfgPath -Encoding UTF8


& 'C:\Program Files\Amazon\AmazonCloudWatchAgent\amazon-cloudwatch-agent-ctl.ps1' -a stop -m ec2 -c file:$cfgPath | Out-Null
& 'C:\Program Files\Amazon\AmazonCloudWatchAgent\amazon-cloudwatch-agent-ctl.ps1' -a start -m ec2 -c file:$cfgPath | Out-Null


Log "CloudWatch Agent configured"