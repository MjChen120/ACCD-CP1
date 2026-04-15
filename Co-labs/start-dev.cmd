@echo off
setlocal

rem Always open a persistent window so output doesn't disappear
set "ROOT=%~dp0"
start "Co-labs Dev Server" cmd /k ""%ROOT%run-dev.cmd""

