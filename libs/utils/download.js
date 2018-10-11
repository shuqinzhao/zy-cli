#!/usr/bin/env node

const colors = require('colors');

function downloadFile (config) {

  console.log(colors.green(`
    项目运行命令如下：

      npm install
      npm run start
  `));
}

module.exports = {
  downloadFile
}