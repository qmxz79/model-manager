# 模型管理器 (Model Manager)

一个基于 Web 的图形界面工具，用于管理 OpenClaw 的 AI 模型和供应商配置。

## ✨ 功能特性

- **图形界面**：无需终端命令，通过浏览器即可管理模型
- **模型切换**：一键切换不同的 AI 模型
- **供应商管理**：添加、查看、删除模型供应商
- **实时预览**：即时查看当前配置状态

## 🚀 快速开始

### 安装依赖

```bash
# 进入目录
cd model-manager

# 安装依赖（如果需要）
npm install
```

### 启动服务

```bash
# 启动 Web 服务器
node ui-server.js
```

### 访问界面

打开浏览器访问：`http://localhost:8081`

## 📖 使用指南

### 1. 查看当前模型
- 访问 `http://localhost:8081`
- 顶部显示当前默认模型

### 2. 切换模型
- 在模型列表中点击想要的模型
- 模型会高亮显示
- 点击"应用更改"按钮

### 3. 添加新模型
- 在"添加新模型"区域填写表单
- 填写供应商名称、模型ID、模型名称
- 选择API类型
- 点击"添加模型"按钮

### 4. 删除模型/供应商
- 找到要删除的模型或供应商
- 点击旁边的"删除"按钮
- 确认删除

## 📁 文件结构

```
model-manager/
├── README.md                  # 本说明文件
├── SKILL.md                   # 技能说明文件
├── ui-manager.js              # 图形界面管理器
├── ui-server.js               # Web 服务器
├── start-ui.bat               # Windows 启动脚本
├── model-manager.js           # 核心功能（可选）
└── references/                # 参考文档
    ├── ui-usage.md            # UI 使用指南
    ├── usage-examples.md      # 使用示例
    └── provider-examples.md   # 供应商配置示例
```

## 🔧 配置要求

### 系统要求
- Node.js v14+
- OpenClaw
- 配置文件: `~/.openclaw/openclaw.json`

### 环境变量
根据使用的供应商设置相应的 API 密钥：

```bash
# AIAD API Key
export AIAD_API_KEY=your_api_key_here

# GitCode API Key
export GITCODE_API_KEY=your_api_key_here
```

## 🎯 支持的模型

### Xiaomi
- `xiaomi/mimo-v2-flash` - Xiaomi MiMo V2 Flash

### AIAD
- `aiad/gpt-5.4-2026-03-05` - GPT-5.4
- `aiad/o4-mini` - O4 Mini

### GitCode
- `gitcode/Qwen/Qwen3.5-397B-A17B` - Qwen3.5-397B-A17B
- `gitcode/zai-org/GLM-5` - GLM-5

## 📝 使用示例

### 通过命令行使用
```bash
# 查看当前模型
查看当前模型

# 切换模型
切换模型到 o4-mini

# 打开图形界面
打开模型管理器
```

### 通过图形界面使用
1. 访问 `http://localhost:8081`
2. 点击模型列表中的模型
3. 点击"应用更改"按钮

## ⚠️ 注意事项

1. **重启生效**：修改配置后需要重启 OpenClaw 才能生效
2. **端口占用**：默认使用 8081 端口，如被占用可修改 `ui-server.js`
3. **备份配置**：建议备份原始 `openclaw.json` 文件
4. **环境变量**：确保 API 密钥环境变量已设置

## 🔧 故障排除

### 端口被占用
修改 `ui-server.js` 中的 `PORT` 变量：
```javascript
const PORT = 8082; // 改为其他端口
```

### 无法访问界面
- 检查服务器是否启动成功
- 检查防火墙设置
- 尝试使用 `127.0.0.1` 代替 `localhost`

### 配置文件错误
- 检查 `openclaw.json` 文件是否存在
- 确保文件格式正确（JSON 格式）
- 备份原始文件后尝试修复

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 支持

如有问题，请提交 Issue 到 GitHub 仓库。