#!/usr/bin/env node

const inquirer = require('inquirer');
const program = require('commander');
const user = require('./utils/user');
const chooseTemplate = require('./utils/chooseTemplate');
const { downloadFile } = require('./utils/download');
let config = {};

program.parse(process.argv);
const userInfo = user();

/**
 * cli init
 */
async function init () {
  /**
   * 获取用户自定义配置信息
   * 询问式命令行
   */
  await inquirer.prompt([
    {
      type:'input',
      message: '请输入作者：',
      name: 'name',
      validate: function (input) {
        const done = this.async();

        if (!input) {
          done('请输入作者');
          return;
        }

        done(null, true);
      },
      default: userInfo
    },
    {
      type:'input',
      message: '请输入项目名称：',
      name: 'name',
      validate: function (input) {
        const done = this.async();

        if (!input) {
          done('请输入项目名称');
          return;
        }

        done(null, true);
      },
      default: program.args[0]
    },
    {
      type:'confirm',
      message: '请问是否使用 React-router ?',
      name: 'isRouter'
    },
    {
      type:'confirm',
      message: '请问是否使用 Redux ?',
      name: 'isRedux'
    },
    {
      type:'list',
      message: '请问是 单页面应用 ？还是 多页面应用 ？',
      choices: ['单页面应用', '多页面应用'],
      name: 'isSinglePage'
    },
    {
      type:'confirm',
      message: '请问是否使用 CSS 预编译 ？',
      name: 'isPrecompiled'
    },
    {
      type:'confirm',
      message: '请问是否使用 ESlint 标准化语法 ？',
      name: 'isESlint'
    },
    {
      type:'confirm',
      message: '请问是否使用 前端自动化测试 (Karma) ？',
      name: 'isTest'
    },
  ]).then(answers => {
    config = Object.assign({}, answers);
  });

  const projectType = chooseTemplate(config);
  // downloadFile(projectType);
}

init();
