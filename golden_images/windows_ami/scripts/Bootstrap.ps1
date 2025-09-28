#Requires -RunAsAdministrator
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'


function Log([string]$m){ Write-Host "[BOOTSTRAP] $(Get-Date -AsUTC -Format o) $m" }


Log "Ensure TLS12"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12


Log "Install Chocolatey if missing"
if (!(Test-Path C:\ProgramData\chocolatey)) {
Set-ExecutionPolicy Bypass -Scope Process -Force
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
}


Log "Install core tools"
choco install -y awscli 7zip git


Log "Install Temurin JDK 17"
choco install -y temurin17


Log "Enable IIS"
Enable-WindowsOptionalFeature -Online -FeatureName IIS-WebServerRole -All -NoRestart | Out-Null
Enable-WindowsOptionalFeature -Online -FeatureName IIS-ManagementConsole -All -NoRestart | Out-Null


# Optional for ASP.NET Core hosting
# choco install -y dotnet-hosting


Log "Ensure SSM Agent running"
Start-Service AmazonSSMAgent; Set-Service AmazonSSMAgent -StartupType Automatic


# Standard dirs
New-Item -ItemType Directory -Force -Path C:\Ops\{scripts,app,logs} | Out-Null


# Basic health page
"<html><body><h3>OK</h3></body></html>" | Set-Content -Path 'C:\inetpub\wwwroot\health.html'


Log "Bootstrap complete"