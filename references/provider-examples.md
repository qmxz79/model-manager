# 供应商配置示例

## AIAD 供应商（已配置）
```json
{
  "aiad": {
    "baseUrl": "https://api.aiad.de5.net/v1",
    "apiKey": "${AIAD_API_KEY}",
    "api": "openai-completions",
    "models": [
      { "id": "gpt-5.4-2026-03-05", "name": "GPT-5.4 (2026-03-05)" },
      { "id": "o4-mini", "name": "O4 Mini" }
    ]
  }
}
```

## Xiaomi 供应商（默认）
```json
{
  "xiaomi": {
    "baseUrl": "https://api.xiaomimimo.com/anthropic",
    "api": "anthropic-messages",
    "models": [
      { "id": "mimo-v2-flash", "name": "Xiaomi MiMo V2 Flash" }
    ]
  }
}
```

## OpenAI 供应商（示例）
```json
{
  "openai": {
    "baseUrl": "https://api.openai.com/v1",
    "apiKey": "${OPENAI_API_KEY}",
    "api": "openai-completions",
    "models": [
      { "id": "gpt-4o", "name": "GPT-4o" },
      { "id": "gpt-4-turbo", "name": "GPT-4 Turbo" }
    ]
  }
}
```

## Anthropic 供应商（示例）
```json
{
  "anthropic": {
    "baseUrl": "https://api.anthropic.com/v1",
    "apiKey": "${ANTHROPIC_API_KEY}",
    "api": "anthropic-messages",
    "models": [
      { "id": "claude-opus-4-6", "name": "Claude Opus 4-6" }
    ]
  }
}
```

## 自定义 API 供应商（示例）
```json
{
  "custom": {
    "baseUrl": "https://api.example.com/v1",
    "apiKey": "${CUSTOM_API_KEY}",
    "api": "openai-completions",
    "models": [
      { "id": "model-1", "name": "Custom Model 1" },
      { "id": "model-2", "name": "Custom Model 2" }
    ]
  }
}
```