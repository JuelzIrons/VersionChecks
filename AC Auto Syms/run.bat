@echo off
title AC Update Watcher
cd /d "%~dp0"

:loop
echo [%date% %time%] Starting watcher...
python "%~dp0watcher.py"
echo [%date% %time%] Watcher exited (code %errorlevel%). Restarting in 10s...
timeout /t 10 /nobreak >nul
goto loop
