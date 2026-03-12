/**
 * Model Manager UI Server - 图形界面模型管理器服务器
 * 启动一个本地 Web 服务器来提供模型管理界面
 */

const http = require('http');
const ModelManagerUI = require('./ui-manager.js');

const PORT = 8081;
const managerUI = new ModelManagerUI();

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
    // 设置 CORS 头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // 处理 OPTIONS 请求
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // 处理请求
    managerUI.handleRequest(req, res);
});

// 启动服务器
server.listen(PORT, () => {
    console.log(`🤖 模型管理器 UI 服务器已启动`);
    console.log(`📍 访问地址: http://localhost:${PORT}`);
    console.log(`📋 查看当前模型: http://localhost:${PORT}?action=view`);
    console.log(`🔧 管理模型: http://localhost:${PORT}`);
});

// 错误处理
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`端口 ${PORT} 已被占用，请尝试其他端口`);
    } else {
        console.error('服务器错误:', error.message);
    }
});

// 优雅关闭
process.on('SIGINT', () => {
    console.log('\n正在关闭服务器...');
    server.close(() => {
        console.log('服务器已关闭');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('\n正在关闭服务器...');
    server.close(() => {
        console.log('服务器已关闭');
        process.exit(0);
    });
});