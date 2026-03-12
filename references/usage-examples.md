# Model Manager 使用示例

## 基本用法

### 1. 设置默认模型
```
设置默认模型为 aiad/gpt-5.4-2026-03-05
```

### 2. 切换模型
```
切换模型到 o4-mini
使用模型 anthropic/claude-opus-4
```

### 3. 查看当前配置
```
查看当前模型
显示模型配置
模型状态
```

### 4. 管理供应商
```
添加供应商 aiad
查看供应商配置
删除供应商 xiaomi
```

## 高级用法

### 添加自定义供应商
```
添加供应商 myapi，配置为：
- baseUrl: https://api.example.com/v1
- apiKey: ${MY_API_KEY}
- api: openai-completions
- models: gpt-4, gpt-3.5-turbo
```

### 批量切换模型
```
切换到 GPT-5.4
切换到 O4 Mini
切换到 Claude 模型
```

## 注意事项
1. 修改配置后需要重启 OpenClaw 才能生效
2. 确保 API 密钥环境变量已设置
3. 备份原始配置文件以防万一