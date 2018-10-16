#!/usr/bin/env node

const program = require('commander');

const { checkNodeVersion } = require('./libs/utils/base');
const package = require('./package.json');

/** 检测运行环境是否符合要求 */
checkNodeVersion(package.engines.node, 'bestinc-cli');

/** 使用说明 */
program.version(package.version)
  .usage('[options]')
  .command('init', 'generate a new project from a template')
  .command('list', 'list available official templates')
  .parse(process.argv)
