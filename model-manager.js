/**
 * Model Manager - 模型管理器
 * 无需在终端运行 openclaw onboard 命令即可设置和更换供应商及大模型
 */

const fs = require('fs');
const path = require('path');

// 配置文件路径
const CONFIG_PATH = path.join(process.env.USERPROFILE || process.env.HOME, '.openclaw', 'openclaw.json');

class ModelManager {
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
     * 设置默认模型
     */
    setDefaultModel(modelName) {
        const config = this.readConfig();
        
        // 确保 agents.defaults.model 存在
        if (!config.agents) config.agents = {};
        if (!config.agents.defaults) config.agents.defaults = {};
        if (!config.agents.defaults.model) config.agents.defaults.model = {};
        
        // 设置默认模型
        config.agents.defaults.model.primary = modelName;
        
        this.writeConfig(config);
        return { success: true, message: `默认模型已设置为: ${modelName}` };
    }

    /**
     * 添加供应商
     */
    addProvider(providerName, providerConfig) {
        const config = this.readConfig();
        
        // 确保 models.providers 存在
        if (!config.models) config.models = { mode: 'merge', providers: {} };
        if (!config.models.providers) config.models.providers = {};
        
        // 添加供应商
        config.models.providers[providerName] = providerConfig;
        
        this.writeConfig(config);
        return { success: true, message: `供应商 ${providerName} 已添加` };
    }

    /**
     * 删除供应商
     */
    removeProvider(providerName) {
        const config = this.readConfig();
        
        if (!config.models || !config.models.providers || !config.models.providers[providerName]) {
            throw new Error(`供应商 ${providerName} 不存在`);
        }
        
        delete config.models.providers[providerName];
        
        this.writeConfig(config);
        return { success: true, message: `供应商 ${providerName} 已删除` };
    }

    /**
     * 查看当前配置
     */
    viewConfig() {
        const config = this.readConfig();
        
        return {
            providers: config.models?.providers || {},
            defaultModel: config.agents?.defaults?.model?.primary || '未设置'
        };
    }

    /**
     * 切换模型
     */
    switchModel(modelName) {
        return this.setDefaultModel(modelName);
    }

    /**
     * 获取可用模型列表
     */
    getAvailableModels() {
        const config = this.readConfig();
        const models = [];
        
        if (config.models && config.models.providers) {
            for (const [providerName, provider] of Object.entries(config.models.providers)) {
                if (provider.models) {
                    provider.models.forEach(model => {
                        models.push({
                            provider: providerName,
                            id: model.id,
                            name: model.name,
                            fullName: `${providerName}/${model.id}`
                        });
                    });
                }
            }
        }
        
        return models;
    }
}

// 导出类
module.exports = ModelManager;