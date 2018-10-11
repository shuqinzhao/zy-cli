#!/usr/bin/env node

const semver = require('semver');
const colors = require('colors');

/**
 * 检测运行环境是否符合要求，node 版本...
 * @param {String} wantedVersion - package 中 engines 配置的 node 版本
 */
function checkNodeVersion (wantedVersion, cliName) {
  if (!semver.satisfies(process.version, wantedVersion)) {
    console.log(colors.red(`
      You are using Node ${process.version}, but this version ${cliName} requires Node wantedVersion.
      Please upgrade your Node version.
    `));
  } else {
    console.log(colors.green(`
Node 环境符合要求
    `))
  }
}

module.exports = {
  checkNodeVersion
};