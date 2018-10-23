#!/usr/bin/env node

const colors = require('colors');
const { templateList } = require('../config');

/**
 * 获取 模板列表信息
 */
function list () {
  console.log(`Available official templates:
  `);
  templateList.forEach(item => {
    console.log(`${colors.yellow('☆')}   ${colors.blue(item.name)} - ${item.description}`)
  });
  console.log('');
}

list();
