@echo off
title Conectar Finanzas 2026 con GitHub
cd /d "%~dp0"
echo =======================================================
echo     CONECTAR FINANZAS 2026 CON TU GITHUB
echo =======================================================
echo.
echo 1. Crea un nuevo repositorio vacio en https://github.com/new
echo    (Nombre sugerido: finanzas-2026)
echo 2. Pega aqui la URL de tu repositorio (HTTPS):
echo.
set /p REPO_URL="URL del repositorio: "

if "%REPO_URL%"=="" (
    echo No has introducido ninguna URL. Operacion cancelada.
    pause
    exit /b
)

echo.
echo Vinculando con %REPO_URL% ...
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git branch -M main
echo Subiendo codigo a GitHub...
git push -u origin main

echo.
echo =======================================================
echo   Listo! Repositorio conectado y subido con exito.
echo =======================================================
pause
