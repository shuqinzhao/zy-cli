#!/usr/bin/env node

const inquirer = require('inquirer');
const program = require('commander');
const user = require('./utils/user');
const fs = require('fs');
const chooseTemplate = require('./utils/chooseTemplate');
const { downloadFile } = require('./utils/download');
const { simplePrompt, webpackSimpleTemplate } = require('../config');
let config = {};

function getCatalogs () {
  const rootPath = process.cwd();
  let catalogs = [];
  const files = fs.readdirSync(process.cwd());

  files.forEach(item => {
    fs.stat(`${rootPath}/${item}`, function (err, stat) {
      if (err) {
        console.error(err);
        throw err;
      }
  
      if (!stat.isFile()) {
        catalogs.push(item);
      }
    })
  });

  return catalogs;
}
const catalogs = getCatalogs();


program.parse(process.argv);
const userInfo = user();

/**
 * 获取用户自定义配置信息
 * 询问式命令行
 */
async function prompt (promptList) {
  let configList;

  await inquirer.prompt(promptList).then(answers => {
    configList = Object.assign({}, answers);
  });

  return configList;
}

/**
 * 根据模板名选择 promptList
 */
async function init () {
  switch (program.args[0]) {
    case 'simple':
      config = await prompt(simplePrompt(userInfo, catalogs));
      break;
    case 'webpack-simple':
      config = await prompt(webpackSimpleTemplate(userInfo, catalogs));
      break;
  }
  config.type = program.args[0];

  chooseTemplate(config);
}

init();
