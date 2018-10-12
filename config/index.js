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
      default: userInfo
    }
  ];
}
/** webpackSimpleTemplate prompt list */
function webpackSimpleTemplate (userInfo, catalogs) {
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
      default: userInfo
    }
  ];
}

module.exports = {
  templateList,
  simplePrompt,
  webpackSimpleTemplate
};