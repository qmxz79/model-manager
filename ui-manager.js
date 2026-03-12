/**
 * Model Manager UI - 图形界面模型管理器
 * 提供对话框界面来管理模型和供应商
 */

const fs = require('fs');
const path = require('path');

// 配置文件路径
const CONFIG_PATH = path.join(process.env.USERPROFILE || process.env.HOME, '.openclaw', 'openclaw.json');

class ModelManagerUI {
    constructor() {
        this.configPath = CONFIG_PATH;
    }

    /**
     * 读取配置文件
     */
    readConfig() {
        try {
            if (!fs.existsSync(this.configPath)) {
                throw new Error(`配置文件不存在: ${this.configPath}`);
            }
            const content = fs.readFileSync(this.configPath, 'utf8');
            return JSON.parse(content);
        } catch (error) {
            throw new Error(`读取配置文件失败: ${error.message}`);
        }
    }

    /**
     * 写入配置文件
     */
    writeConfig(config) {
        try {
            const content = JSON.stringify(config, null, 2);
            fs.writeFileSync(this.configPath, content, 'utf8');
            return true;
        } catch (error) {
            throw new Error(`写入配置文件失败: ${error.message}`);
        }
    }

    /**
     * 获取对话框界面 HTML
     */
    getDialogHTML() {
        const config = this.readConfig();
        const currentModel = config.agents?.defaults?.model?.primary || '未设置';
        const providers = config.models?.providers || {};
        
        let html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>模型管理器 - Model Manager</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            text-align: center;
        }
        
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        
        .header p {
            margin: 5px 0 0 0;
            opacity: 0.9;
            font-size: 14px;
        }
        
        .content {
            padding: 20px;
        }
        
        .section {
            margin-bottom: 25px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 10px;
            border-left: 4px solid #667eea;
        }
        
        .section h3 {
            margin: 0 0 15px 0;
            color: #333;
            font-size: 16px;
        }
        
        .current-model {
            background: #e8f4fd;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
            border: 1px solid #b3d7ff;
        }
        
        .current-model strong {
            color: #667eea;
        }
        
        .model-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .model-item {
            background: white;
            padding: 12px;
            border-radius: 8px;
            border: 2px solid #e0e0e0;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .model-item:hover {
            border-color: #667eea;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
        }
        
        .model-item.selected {
            border-color: #667eea;
            background: #f0f4ff;
        }
        
        .model-item .name {
            font-weight: 500;
            color: #333;
        }
        
        .model-item .provider {
            font-size: 12px;
            color: #666;
        }
        
        .delete-btn {
            background: #ff4757;
            color: white;
            border: none;
            padding: 4px 8px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            transition: background 0.3s;
        }
        
        .delete-btn:hover {
            background: #ff3344;
        }
        
        .add-section {
            background: white;
            padding: 15px;
            border-radius: 8px;
            border: 2px dashed #ccc;
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
            color: #333;
        }
        
        .form-group input, .form-group select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 14px;
            box-sizing: border-box;
        }
        
        .form-group input:focus, .form-group select:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s;
            margin-right: 10px;
        }
        
        .btn-primary {
            background: #667eea;
            color: white;
        }
        
        .btn-primary:hover {
            background: #5a6fd6;
        }
        
        .btn-success {
            background: #28a745;
            color: white;
        }
        
        .btn-success:hover {
            background: #218838;
        }
        
        .btn-danger {
            background: #dc3545;
            color: white;
        }
        
        .btn-danger:hover {
            background: #c82333;
        }
        
        .btn-secondary {
            background: #6c757d;
            color: white;
        }
        
        .btn-secondary:hover {
            background: #5a6268;
        }
        
        .actions {
            text-align: center;
            padding: 20px;
            border-top: 1px solid #eee;
        }
        
        .message {
            padding: 10px;
            margin: 10px 0;
            border-radius: 6px;
            display: none;
        }
        
        .message.success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .message.error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        .provider-item {
            background: white;
            padding: 10px;
            border-radius: 6px;
            margin-bottom: 10px;
            border: 1px solid #e0e0e0;
        }
        
        .provider-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }
        
        .provider-name {
            font-weight: 600;
            color: #333;
        }
        
        .provider-models {
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🤖 模型管理器</h1>
            <p>Model Manager - 轻松管理 OpenClaw 模型配置</p>
        </div>
        
        <div class="content">
            <!-- 当前模型 -->
            <div class="section">
                <h3>📊 当前默认模型</h3>
                <div class="current-model">
                    <strong>当前模型：</strong> <span id="currentModel">${currentModel}</span>
                </div>
            </div>
            
            <!-- 可用模型列表 -->
            <div class="section">
                <h3>📋 可用模型列表</h3>
                <div class="model-list" id="modelList">
                    ${this.generateModelListHTML(providers)}
                </div>
            </div>
            
            <!-- 供应商管理 -->
            <div class="section">
                <h3>🏢 供应商管理</h3>
                <div id="providerList">
                    ${this.generateProviderListHTML(providers)}
                </div>
            </div>
            
            <!-- 添加新模型 -->
            <div class="section">
                <h3>➕ 添加新模型</h3>
                <div class="add-section">
                    <div class="form-group">
                        <label>供应商名称：</label>
                        <input type="text" id="providerName" placeholder="例如：openai, anthropic, custom">
                    </div>
                    <div class="form-group">
                        <label>Base URL：</label>
                        <input type="text" id="baseUrl" placeholder="例如：https://api.openai.com/v1">
                    </div>
                    <div class="form-group">
                        <label>模型ID：</label>
                        <input type="text" id="modelId" placeholder="例如：gpt-4o, claude-opus-4">
                    </div>
                    <div class="form-group">
                        <label>模型名称：</label>
                        <input type="text" id="modelName" placeholder="例如：GPT-4o, Claude Opus 4">
                    </div>
                    <div class="form-group">
                        <label>API 类型：</label>
                        <select id="apiType">
                            <option value="openai-completions">OpenAI 格式</option>
                            <option value="anthropic-messages">Anthropic 格式</option>
                        </select>
                    </div>
                    <button class="btn btn-success" onclick="addModel()">添加模型</button>
                </div>
            </div>
        </div>
        
        <div class="actions">
            <button class="btn btn-primary" onclick="applyChanges()">应用更改</button>
            <button class="btn btn-secondary" onclick="refreshPage()">刷新</button>
            <button class="btn btn-danger" onclick="closeDialog()">关闭</button>
        </div>
        
        <div id="message" class="message"></div>
    </div>
    
    <script>
        let selectedModel = '${currentModel}';
        
        // 选择模型
        function selectModel(modelName) {
            selectedModel = modelName;
            
            // 更新UI
            document.querySelectorAll('.model-item').forEach(item => {
                item.classList.remove('selected');
            });
            
            const selectedItem = document.querySelector(\`.model-item[data-model="\${modelName}"]\`);
            if (selectedItem) {
                selectedItem.classList.add('selected');
            }
            
            // 更新当前模型显示
            document.getElementById('currentModel').textContent = modelName;
            
            showMessage('已选择模型: ' + modelName, 'success');
        }
        
        // 删除模型
        function deleteModel(modelName, event) {
            event.stopPropagation();
            
            if (confirm('确定要删除模型 ' + modelName + ' 吗？')) {
                // 发送删除请求
                fetch('/model-manager?action=deleteModel&model=' + encodeURIComponent(modelName))
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            showMessage('模型已删除: ' + modelName, 'success');
                            setTimeout(() => refreshPage(), 1000);
                        } else {
                            showMessage('删除失败: ' + data.error, 'error');
                        }
                    })
                    .catch(error => {
                        showMessage('删除失败: ' + error.message, 'error');
                    });
            }
        }
        
        // 删除供应商
        function deleteProvider(providerName) {
            if (confirm('确定要删除供应商 ' + providerName + ' 吗？这将删除该供应商下的所有模型！')) {
                fetch('/model-manager?action=deleteProvider&provider=' + encodeURIComponent(providerName))
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            showMessage('供应商已删除: ' + providerName, 'success');
                            setTimeout(() => refreshPage(), 1000);
                        } else {
                            showMessage('删除失败: ' + data.error, 'error');
                        }
                    })
                    .catch(error => {
                        showMessage('删除失败: ' + error.message, 'error');
                    });
            }
        }
        
        // 添加模型
        function addModel() {
            const providerName = document.getElementById('providerName').value.trim();
            const baseUrl = document.getElementById('baseUrl').value.trim();
            const modelId = document.getElementById('modelId').value.trim();
            const modelName = document.getElementById('modelName').value.trim();
            const apiType = document.getElementById('apiType').value;
            
            if (!providerName || !modelId || !modelName) {
                showMessage('请填写所有必填字段', 'error');
                return;
            }
            
            const modelData = {
                provider: providerName,
                baseUrl: baseUrl,
                model: {
                    id: modelId,
                    name: modelName,
                    api: apiType
                }
            };
            
            fetch('/model-manager?action=addModel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(modelData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showMessage('模型添加成功: ' + modelName, 'success');
                    setTimeout(() => refreshPage(), 1000);
                } else {
                    showMessage('添加失败: ' + data.error, 'error');
                }
            })
            .catch(error => {
                showMessage('添加失败: ' + error.message, 'error');
            });
        }
        
        // 应用更改
        function applyChanges() {
            if (!selectedModel || selectedModel === '未设置') {
                showMessage('请先选择一个模型', 'error');
                return;
            }
            
            fetch('/model-manager?action=setDefaultModel&model=' + encodeURIComponent(selectedModel))
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        showMessage('默认模型已设置为: ' + selectedModel, 'success');
                    } else {
                        showMessage('设置失败: ' + data.error, 'error');
                    }
                })
                .catch(error => {
                    showMessage('设置失败: ' + error.message, 'error');
                });
        }
        
        // 刷新页面
        function refreshPage() {
            location.reload();
        }
        
        // 关闭对话框
        function closeDialog() {
            window.close();
        }
        
        // 显示消息
        function showMessage(text, type) {
            const messageEl = document.getElementById('message');
            messageEl.textContent = text;
            messageEl.className = 'message ' + type;
            messageEl.style.display = 'block';
            
            setTimeout(() => {
                messageEl.style.display = 'none';
            }, 3000);
        }
        
        // 初始化
        document.addEventListener('DOMContentLoaded', function() {
            // 高亮当前选中的模型
            selectModel(selectedModel);
        });
    </script>
</body>
</html>
        `;
        
        return html;
    }

    /**
     * 生成模型列表 HTML
     */
    generateModelListHTML(providers) {
        let html = '';
        
        for (const [providerName, provider] of Object.entries(providers)) {
            if (provider.models) {
                provider.models.forEach(model => {
                    const fullName = `${providerName}/${model.id}`;
                    html += `
                        <div class="model-item" data-model="${fullName}" onclick="selectModel('${fullName}')">
                            <div>
                                <div class="name">${model.name}</div>
                                <div class="provider">${providerName}</div>
                            </div>
                            <button class="delete-btn" onclick="deleteModel('${fullName}', event)">删除</button>
                        </div>
                    `;
                });
            }
        }
        
        return html || '<p style="color: #666;">暂无可用模型</p>';
    }

    /**
     * 生成供应商列表 HTML
     */
    generateProviderListHTML(providers) {
        let html = '';
        
        for (const [providerName, provider] of Object.entries(providers)) {
            const modelCount = provider.models ? provider.models.length : 0;
            html += `
                <div class="provider-item">
                    <div class="provider-header">
                        <span class="provider-name">${providerName}</span>
                        <button class="delete-btn" onclick="deleteProvider('${providerName}')">删除供应商</button>
                    </div>
                    <div class="provider-models">
                        模型数量: ${modelCount} | 
                        API: ${provider.api || '未设置'} | 
                        BaseURL: ${provider.baseUrl || '未设置'}
                    </div>
                </div>
            `;
        }
        
        return html || '<p style="color: #666;">暂无供应商</p>';
    }

    /**
     * 处理 HTTP 请求
     */
    handleRequest(req, res) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const action = url.searchParams.get('action');
        
        try {
            switch (action) {
                case 'setDefaultModel':
                    const model = url.searchParams.get('model');
                    const result = this.setDefaultModel(model);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result));
                    break;
                    
                case 'deleteModel':
                    const modelName = url.searchParams.get('model');
                    const deleteResult = this.deleteModel(modelName);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(deleteResult));
                    break;
                    
                case 'deleteProvider':
                    const providerName = url.searchParams.get('provider');
                    const deleteProviderResult = this.deleteProvider(providerName);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(deleteProviderResult));
                    break;
                    
                case 'addModel':
                    let body = '';
                    req.on('data', chunk => {
                        body += chunk.toString();
                    });
                    req.on('end', () => {
                        try {
                            const data = JSON.parse(body);
                            const addResult = this.addModel(data.provider, data.model);
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify(addResult));
                        } catch (error) {
                            res.writeHead(400, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ success: false, error: error.message }));
                        }
                    });
                    return;
                    
                default:
                    // 返回对话框 HTML
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end(this.getDialogHTML());
            }
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: error.message }));
        }
    }

    /**
     * 设置默认模型
     */
    setDefaultModel(modelName) {
        const config = this.readConfig();
        
        if (!config.agents) config.agents = {};
        if (!config.agents.defaults) config.agents.defaults = {};
        if (!config.agents.defaults.model) config.agents.defaults.model = {};
        
        config.agents.defaults.model.primary = modelName;
        
        this.writeConfig(config);
        return { success: true, message: `默认模型已设置为: ${modelName}` };
    }

    /**
     * 删除模型
     */
    deleteModel(modelName) {
        const config = this.readConfig();
        
        if (!config.models || !config.models.providers) {
            throw new Error('没有找到供应商配置');
        }
        
        const [providerName, modelId] = modelName.split('/');
        
        if (!config.models.providers[providerName]) {
            throw new Error(`供应商 ${providerName} 不存在`);
        }
        
        const provider = config.models.providers[providerName];
        if (!provider.models) {
            throw new Error(`供应商 ${providerName} 没有模型`);
        }
        
        // 删除模型
        provider.models = provider.models.filter(m => m.id !== modelId);
        
        // 如果供应商没有模型了，询问是否删除供应商
        if (provider.models.length === 0) {
            // 这里可以添加询问逻辑，但为了简化，我们保留空供应商
        }
        
        this.writeConfig(config);
        return { success: true, message: `模型 ${modelName} 已删除` };
    }

    /**
     * 删除供应商
     */
    deleteProvider(providerName) {
        const config = this.readConfig();
        
        if (!config.models || !config.models.providers || !config.models.providers[providerName]) {
            throw new Error(`供应商 ${providerName} 不存在`);
        }
        
        delete config.models.providers[providerName];
        
        this.writeConfig(config);
        return { success: true, message: `供应商 ${providerName} 已删除` };
    }

    /**
     * 添加模型
     */
    addModel(providerName, modelData) {
        const config = this.readConfig();
        
        // 确保 models.providers 存在
        if (!config.models) config.models = { mode: 'merge', providers: {} };
        if (!config.models.providers) config.models.providers = {};
        
        // 获取或创建供应商
        if (!config.models.providers[providerName]) {
            config.models.providers[providerName] = {
                baseUrl: modelData.baseUrl || 'https://api.example.com/v1',
                apiKey: '${' + providerName.toUpperCase() + '_API_KEY}',
                api: modelData.api || 'openai-completions',
                models: []
            };
        } else {
            // 如果供应商已存在，更新 baseUrl（如果提供了）
            if (modelData.baseUrl) {
                config.models.providers[providerName].baseUrl = modelData.baseUrl;
            }
        }
        
        // 添加模型
        const provider = config.models.providers[providerName];
        if (!provider.models) provider.models = [];
        
        // 检查模型是否已存在
        const exists = provider.models.some(m => m.id === modelData.id);
        if (exists) {
            throw new Error(`模型 ${modelData.id} 已存在`);
        }
        
        provider.models.push({
            id: modelData.id,
            name: modelData.name,
            reasoning: false,
            input: ['text'],
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 200000,
            maxTokens: 8192
        });
        
        this.writeConfig(config);
        return { success: true, message: `模型 ${modelData.name} 已添加到 ${providerName}` };
    }
}

// 导出类
module.exports = ModelManagerUI;