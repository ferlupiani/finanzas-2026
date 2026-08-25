@echo off
title Subir Cambios de Finanzas 2026 a GitHub
cd /d "%~dp0"
echo =======================================================
echo   Subiendo codigo de Finanzas 2026 a tu GitHub...
echo =======================================================
echo.
python build.py
git add .
git commit -m "update: cambios y sincronizacion"
git push origin main
echo.
echo =======================================================
echo   Listo! Codigo actualizado en GitHub y Vercel.
echo =======================================================
pause
