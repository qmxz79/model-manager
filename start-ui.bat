@echo off
chcp 65001 >nul
echo ========================================
echo 🤖 模型管理器 - 图形界面启动器
echo ========================================
echo.
echo 正在启动模型管理器 UI 服务器...
echo.
echo 访问地址: http://localhost:8081
echo.
echo 按 Ctrl+C 停止服务器
echo ========================================
echo.

node ui-server.js