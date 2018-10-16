#!/usr/bin/env node

const inquirer = require('inquirer');
const program = require('commander');
const colors = require('colors');
const user = require('./utils/user');
const fs = require('fs');
const chooseTemplate = require('./utils/chooseTemplate');
const { simplePrompt, webpackSimplePrompt } = require('../config');
let config = {};

function getCatalogs () {
  const rootPath = process.cwd();
  let catalogs = [];
  const files = fs.readdirSync(rootPath);

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
      config = await prompt(webpackSimplePrompt(userInfo, catalogs));
      break;
    default:
      console.log(colors.red(`不存在该模板！
      `));
      console.log(colors.green(`请重新选择
      `));
  }
  config.type = program.args[0];

  chooseTemplate(config);
}

init();
