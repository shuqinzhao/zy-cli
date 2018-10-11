#!/usr/bin/env node

/**
 * 根据配置信息获取对应模板
 * @param {Object} config - 配置信息
 */
function chooseTemplate (config) {
  const configKeys = Object.keys(config);

  configKeys.forEach(item => {
    console.log(item, config[item])
  })

  return configKeys;
}

module.exports = chooseTemplate;