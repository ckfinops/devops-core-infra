#Requires -RunAsAdministrator
param(
[string]$UiBucket,
[string]$UiKey,
[string]$SvcBucket,
[string]$SvcKey,
[string]$ServiceName = 'C3FinOpsService',
[string]$JavaHeap = '256m'
)
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
function Log([string]$m){ Write-Host "[DEPLOY] $(Get-Date -AsUTC -Format o) $m" }


$uiRoot = 'C:\inetpub\wwwroot'
$appDir = 'C:\Ops\app'
$jarPath = Join-Path $appDir 'service.jar'


if (-not (Get-Command aws -ErrorAction SilentlyContinue)) {
throw 'AWS CLI is required on the instance.'
}


# Deploy UI
if ($UiBucket -and $UiKey) {
Log "Deploying UI s3://$UiBucket/$UiKey"
$tmp = "$env:TEMP\\ui.zip"
aws s3 cp "s3://$UiBucket/$UiKey" $tmp | Out-Null
Get-ChildItem $uiRoot -Recurse | Remove-Item -Force -Recurse -ErrorAction SilentlyContinue
Expand-Archive -Path $tmp -DestinationPath $uiRoot -Force
}


# Deploy Java service as Windows service via NSSM
if ($SvcBucket -and $SvcKey) {
Log "Deploying Service s3://$SvcBucket/$SvcKey"
New-Item -ItemType Directory -Force -Path $appDir | Out-Null
aws s3 cp "s3://$SvcBucket/$SvcKey" $jarPath | Out-Null


if (-not (Get-Command nssm -ErrorAction SilentlyContinue)) {
choco install -y nssm | Out-Null
}
nssm stop $ServiceName 2>$null | Out-Null
nssm remove $ServiceName confirm 2>$null | Out-Null
nssm install $ServiceName 'C:\Program Files\Eclipse Adoptium\jdk-17*\bin\java.exe' "-Xms$JavaHeap -Xmx$JavaHeap -jar $jarPath"
nssm set $ServiceName AppDirectory $appDir
nssm set $ServiceName Start SERVICE_AUTO_START
nssm set $ServiceName AppStdout C:\Ops\logs\$ServiceName.log
nssm set $ServiceName AppStderr C:\Ops\logs\$ServiceName.err
nssm start $ServiceName | Out-Null
}


Log "Deploy complete"