@echo off
chcp 65001 >nul
title AI Platform 本地预览

echo ================================================
echo   AI Platform 本地预览
echo ================================================
echo.

:: 进入脚本所在目录
cd /d "%~dp0"

:: 检查 node 是否安装
where node >nul 2>nul
if %errorlevel% neq 0 (
  echo X 未检测到 Node.js，请先安装 Node.js
  echo   下载地址：https://nodejs.org
  pause
  exit /b 1
)

:: 检查依赖是否已安装
if not exist "node_modules" (
  echo 首次运行，正在安装依赖（需要网络，仅需一次）...
  npm install
  echo.
)

:: 检查端口是否已占用
netstat -ano | findstr ":3000 " | findstr "LISTENING" >nul 2>nul
if %errorlevel% equ 0 (
  echo 服务已在运行，直接打开浏览器...
  start http://127.0.0.1:3000
  goto :end
)

echo 正在启动本地服务...
:: 后台启动 dev 服务
start /b npm run dev > "%TEMP%\ai-platform-dev.log" 2>&1

:: 等待服务就绪（最多30秒）
echo 等待服务启动...
set /a count=0
:wait_loop
set /a count+=1
if %count% gtr 30 (
  echo 启动超时，请查看日志：%TEMP%\ai-platform-dev.log
  pause
  exit /b 1
)
timeout /t 1 /nobreak >nul
curl -s --max-time 1 http://127.0.0.1:3000 >nul 2>nul
if %errorlevel% neq 0 goto :wait_loop

echo 服务已就绪！
echo.

:: 打开浏览器
echo 正在打开浏览器：http://127.0.0.1:3000
start http://127.0.0.1:3000

:end
echo.
echo ================================================
echo   服务运行中：http://127.0.0.1:3000
echo   关闭此窗口即停止服务
echo ================================================
echo.
pause
