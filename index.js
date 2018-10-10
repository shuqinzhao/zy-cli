#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const package = require(path.resolve(__dirname, './package.json'));
const colors = require('colors/safe');
const readline = require('readline');
const { BASE_PATH, copyCatalog, mkdir } = require('./libs/file');

function printHelp () {
  console.log(' ');
  console.log('   Examples');
  console.log(' ');
  console.log('     创建项目');
  console.log(' ');
  console.log('     bestinc-cli -C projectName');
  console.log(' ');
}

function initFunc () {
  process.stdout.write('初始化 bestinc-cli，生成项目？(y/n)   ');
  process.stdin.resume();
  process.stdin.setEncoding('utf-8');
  process.stdin.on('data', (chunk) => {
    chunk = chunk.replace(/[\s\n]/, '');

    if (chunk !== 'y' && chunk !== 'Y' && chunk !== 'n' && chunk !== 'N') {
      console.log(colors.red('您输入的命令是： ' + chunk));
      console.warn(colors.red('请输入正确指令：y/n'));
      process.exit();
    }

    process.stdin.pause();
  });
}

function init () {
  const rl = readline.createInterface({
    input: process.stdin,
    ouput: process.stdout,
    prompt: '请输入> '
  });

  rl.write('请输入项目名称：  ');
  // rl.prompt();
  // rl.pause();
  // rl.resume();
  // rl.setPrompt('请输入项目名称：  ');

  // rl.question('请输入项目名称： ', function (answer) {
  //   console.log(answer);
  //   rl.close();
  // });

  // rl.on('line', function (line) {
  //   console.log(line)
  // });
}

program.version(package.version)
  .usage('[options]')
  .option('<projectName>', '指定项目名称')
  .option('-C, --create <projectName>', '指定项目名称');

program.on('--help', printHelp);
program.parse(process.argv);

if (program.create) {
  console.log(' ');
  console.log('   创建项目目录：');
  console.log(' ');
  console.log('     creating %s', program.create);
  console.log(' ');
  
  init();
}