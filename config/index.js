#!/usr/bin/env node

/** 项目模板信息列表 */
const templateList = [
  {
    name: 'simple',
    description: 'simple template'
  },
  {
    name: 'webpack-simple',
    description: 'webpack-simple template'
  },
];

/** simpleTemplate prompt list */
function simplePrompt (userInfo, catalogs) {
  return [
    {
      type: 'confirm',
      message: '请问 是否在当前目录创建项目 ？',
      name: 'isRoot'
    },
    {
      type: 'input',
      message: '请输入项目名：',
      name: 'name',
      when: function (answers) {
        return !answers.isRoot
      },
      validate: function (input) {
        const done = this.async();

        if (!input) {
          done('请输入项目名');
          return;
        }

        done(null, true);
      }
    },
    {
      type: 'confirm',
      message: '该项目已存在。是否覆盖 ？',
      name: 'isCover',
      when: function (answers) {
        return catalogs.includes(answers.name)
      }
    },
    {
      type: 'input',
      message: '作者：',
      name: 'auth',
      default: userInfo,
      when: function (answers) {
        return (typeof answers.isCover === 'undefined' || answers.isCover)
      }
    }
  ];
}
/** webpackSimplePrompt prompt list */
function webpackSimplePrompt (userInfo, catalogs) {
  return [
    {
      type: 'confirm',
      message: '请问 是否在当前目录创建项目 webpack-simple ？',
      name: 'isRoot'
    },
    {
      type: 'input',
      message: '请输入项目名：',
      name: 'name',
      when: function (answers) {
        return !answers.isRoot
      },
      validate: function (input) {
        const done = this.async();

        if (!input) {
          done('请输入项目名');
          return;
        }

        done(null, true);
      }
    },
    {
      type: 'confirm',
      message: '该项目已存在。是否覆盖 ？',
      name: 'isCover',
      when: function (answers) {
        return catalogs.includes(answers.name)
      }
    },
    {
      type: 'input',
      message: '作者：',
      name: 'auth',
      default: userInfo,
      when: function (answers) {
        return (typeof answers.isCover === 'undefined' || answers.isCover)
      }
    },
    {
      type: 'confirm',
      message: '是否使用 状态管理 ？',
      name: 'isState',
    },
    {
      type: 'list',
      message: '请选择：',
      name: 'stateType',
      choices: ['Redux', 'Reflux', 'Mobx'],
      when: function (answers) {
        return answers.isState
      },
      filter: function (val) {
        return val.toLowerCase();
      }
    },
    {
      type: 'confirm',
      message: '是否使用 React-router ？',
      name: 'isUseRouter'
    },
    {
      type: 'list',
      message: '请选择项目类型：',
      name: 'isSingleRouter',
      choices: ['单页面应用', '多页面应用'],
      when: function (answers) {
        return answers.isUseRouter
      },
      filter: function (val) {
        return val === '单页面应用'
      }
    },
    {
      type: 'confirm',
      message: '是否使用 CSS 预编译工具 ？',
      name: 'isPrecompiled'
    },
    {
      type: 'list',
      message: '请选择 CSS 预编译工具：',
      name: 'precompiledTool',
      choices: ['Sass', 'Less'],
      when: function (answers) {
        return answers.isPrecompiled;
      },
      filter: function (val) {
        return val.toLowerCase();
      }
    },
    {
      type: 'confirm',
      message: '是否使用 API mock 服务 ？',
      name: 'isMock'
    },
    {
      type: 'list',
      message: '请选择：',
      name: 'mockType',
      choices: ['Koa + MockJS 模拟 API mock 服务', 'Express 模拟 API mock 服务'],
      when: function (answers) {
        return answers.isMock
      },
      filter: function (val) {
        const isKoa = val.includes('Koa');
        const isExpress = val.includes('Express');

        return isKoa ? 'koa' : isExpress ? 'express' : '';
      }
    },
    {
      type: 'confirm',
      message: '是否使用 ESlint 语法规范化验证 ？',
      name: 'isESlint'
    },
    {
      type: 'confirm',
      message: '是否使用 前端测试 ？',
      name: 'isTest'
    }
  ];
}

module.exports = {
  templateList,
  simplePrompt,
  webpackSimplePrompt
};