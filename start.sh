#!/bin/bash

# ============================================
# AI Platform 本地预览启动脚本
# 双击运行，自动启动服务并打开浏览器
# 支持 macOS / Linux，无需联网
# ============================================

PORT=3000
URL="http://127.0.0.1:$PORT"
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "================================================"
echo "  AI Platform 本地预览"
echo "================================================"
echo ""

# 进入项目目录
cd "$PROJECT_DIR"

# 检查 node 是否安装
if ! command -v node &> /dev/null; then
  echo "❌ 未检测到 Node.js，请先安装 Node.js (https://nodejs.org)"
  read -p "按任意键退出..."
  exit 1
fi

# 检查依赖是否已安装
if [ ! -d "node_modules" ]; then
  echo "📦 首次运行，正在安装依赖（需要网络，仅需一次）..."
  npm install
  echo ""
fi

# 检查端口是否已被占用（已有服务在跑）
if lsof -i:$PORT -sTCP:LISTEN -t &> /dev/null 2>&1; then
  echo "✅ 服务已在运行，直接打开浏览器..."
else
  echo "🚀 正在启动本地服务..."
  # 后台启动 next dev
  npm run dev > /tmp/ai-platform-dev.log 2>&1 &
  DEV_PID=$!
  echo "   服务 PID: $DEV_PID"

  # 等待服务就绪（最多30秒）
  echo -n "   等待服务启动"
  for i in $(seq 1 30); do
    sleep 1
    echo -n "."
    if curl -s --max-time 1 "$URL" > /dev/null 2>&1; then
      echo " ✅"
      break
    fi
    if [ $i -eq 30 ]; then
      echo " ❌"
      echo "启动超时，请查看日志：/tmp/ai-platform-dev.log"
      read -p "按任意键退出..."
      exit 1
    fi
  done
fi

echo ""
echo "🌐 正在打开浏览器：$URL"
echo ""

# 打开浏览器（macOS）
if [[ "$OSTYPE" == "darwin"* ]]; then
  open "$URL"
# Linux
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
  xdg-open "$URL" > /dev/null 2>&1 ||
  gnome-open "$URL" > /dev/null 2>&1 ||
  echo "请手动打开浏览器访问：$URL"
fi

echo "================================================"
echo "  服务运行中：$URL"
echo "  关闭此终端窗口即停止服务"
echo "================================================"
echo ""

# 保持终端窗口不关闭，并显示日志
if [ -f /tmp/ai-platform-dev.log ]; then
  tail -f /tmp/ai-platform-dev.log
else
  read -p "按任意键退出..."
fi
