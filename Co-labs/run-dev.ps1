$ErrorActionPreference = "Stop"

# Run from this script's folder (project root)
Set-Location -LiteralPath $PSScriptRoot

if (-not (Test-Path -LiteralPath "node_modules")) {
  Write-Host "node_modules not found. Installing dependencies..." -ForegroundColor Yellow
  npm install
}

Write-Host "Starting Next.js dev server..." -ForegroundColor Green
npm run dev

