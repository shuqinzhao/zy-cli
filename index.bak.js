#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const package = require(path.resolve(__dirname, './package.json'));

const { BASE_PATH, copyCatalog, mkdir } = require('./libs/utils/file');

function printHelp () {
  console.log(' Examples');
  console.log(' ');
  console.log('   交互创建项目');
  console.log('   bestinc-cli');
  console.log(' ');
}

program.version(package.version)
  .usage('[options]')
  .option('-C, --create <project-name>', '指定项目名称');

program.on('--help', printHelp);
program.parse(process.argv);

if (program.create) {
  console.log(' ');
  console.log('   创建项目目录：');
  console.log(' ');
  console.log('     creating %s', program.create);
  console.log(' ');
  mkdir(`./${program.create}`, () => {
    copyCatalog(BASE_PATH, program.create);
  });
}