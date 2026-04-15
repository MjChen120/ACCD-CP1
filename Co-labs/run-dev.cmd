@echo off
setlocal

cd /d "%~dp0"

rem Avoid double-starting: if port 3000 is already in use, don't start another dev server.
powershell -NoProfile -Command "$c = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1; if ($c) { exit 2 } else { exit 0 }" >nul 2>nul
if errorlevel 2 (
  echo ERROR: Port 3000 is already in use.
  echo Close the other dev server window, then try again.
  pause
  exit /b 1
)

where node >nul 2>nul
if errorlevel 1 goto :noNode

where npm >nul 2>nul
if errorlevel 1 goto :noNpm

if not exist "node_modules\" goto :install
goto :dev

:install
echo node_modules not found. Installing dependencies...
npm install
if errorlevel 1 goto :installFailed
goto :dev

:dev
echo Starting Next.js dev server...
npm run dev
if errorlevel 1 goto :devFailed
goto :eof

:noNode
echo ERROR: Node.js not found on PATH.
echo Install Node.js, then re-open this shortcut.
pause
exit /b 1

:noNpm
echo ERROR: npm not found on PATH.
echo Reinstall Node.js (npm comes with it), then re-open this shortcut.
pause
exit /b 1

:installFailed
echo.
echo ERROR: npm install failed (often network/proxy).
pause
exit /b 1

:devFailed
echo.
echo ERROR: npm run dev failed.
pause
exit /b 1

