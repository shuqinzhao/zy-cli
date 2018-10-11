#!/usr/bin/env node

// 同步运行命令
const exec = require('child_process').execSync

/**
 * 查询 本地 git 用户信息
 */
module.exports = () => {
  let name;
  let email;

  try {
    name = exec('git config --get user.name');
    email = exec('git config --get user.email');
  } catch (e) {}

  name = name && JSON.stringify(name.toString().trim()).slice(1, -1);
  email = email && (' <' + email.toString().trim() + '>');

  return (name || '') + (email || '');
}