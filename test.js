/**
 * Model Manager 测试脚本
 */

const ModelManager = require('./model-manager.js');

async function runTests() {
    const manager = new ModelManager();
    
    console.log('🧪 开始测试 Model Manager 技能\n');
    
    // 测试1：查看当前配置
    console.log('1. 查看当前配置:');
    try {
        const config = manager.viewConfig();
        console.log('   当前默认模型:', config.defaultModel);
        console.log('   可用供应商:', Object.keys(config.providers).join(', '));
        console.log('   ✅ 测试通过\n');
    } catch (error) {
        console.log('   ❌ 测试失败:', error.message, '\n');
    }
    
    // 测试2：获取可用模型列表
    console.log('2. 获取可用模型列表:');
    try {
        const models = manager.getAvailableModels();
        console.log('   可用模型:');
        models.forEach(model => {
            console.log(`   - ${model.fullName} (${model.name})`);
        });
        console.log('   ✅ 测试通过\n');
    } catch (error) {
        console.log('   ❌ 测试失败:', error.message, '\n');
    }
    
    // 测试3：切换模型
    console.log('3. 切换模型测试:');
    try {
        const result = manager.switchModel('aiad/o4-mini');
        console.log('   切换结果:', result.message);
        console.log('   ✅ 测试通过\n');
    } catch (error) {
        console.log('   ❌ 测试失败:', error.message, '\n');
    }
    
    // 测试4：验证切换结果
    console.log('4. 验证切换结果:');
    try {
        const config = manager.viewConfig();
        console.log('   当前默认模型:', config.defaultModel);
        if (config.defaultModel === 'aiad/o4-mini') {
            console.log('   ✅ 模型切换成功\n');
        } else {
            console.log('   ❌ 模型切换失败\n');
        }
    } catch (error) {
        console.log('   ❌ 测试失败:', error.message, '\n');
    }
    
    // 测试5：切换回原模型
    console.log('5. 切换回原模型:');
    try {
        const result = manager.switchModel('aiad/gpt-5.4-2026-03-05');
        console.log('   切换结果:', result.message);
        console.log('   ✅ 测试通过\n');
    } catch (error) {
        console.log('   ❌ 测试失败:', error.message, '\n');
    }
    
    console.log('🧪 所有测试完成！');
}

runTests().catch(console.error);