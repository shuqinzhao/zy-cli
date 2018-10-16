#!/usr/bin/env node

const { createSimpleProject, createWebpackSimpleProject } = require('./create');

/**
 * 根据配置信息获取对应模板
 * @param {Object} config - 配置信息
 */
function chooseTemplate (config) {
  switch (config.type) {
    case 'simple':
      createSimpleProject(config);
      break;
    case 'webpack-simple':
      console.log(config)
      // createWebpackSimpleProject(config);
      break;
  }
}

module.exports = chooseTemplate;