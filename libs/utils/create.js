#!/usr/bin/env node

const { mkdir } = require('./file');
const fs = require('fs');
const colors = require('colors');
const path = require('path');
const { copyCatalog, modifyContent } = require('./file');

function createSimpleProject (config) {
  if (!config.isRoot && config.name) {
    if (typeof config.isCover === 'undefined' || config.isCover) {
      mkdir(config.name, () => {
        const p = new Promise(function (resolve, reject) {
          copyCatalog(config.type, config.name);
          setTimeout(resolve, 500);
        });
        p.then(function (resolve, reject) {
          var p1 = new Promise(function (resolve, reject) {
            modifyContent(`${config.name}/config.json`, config);
    
            setTimeout(resolve, 500);
          });
    
          return p1;
        }).then(function () {
          fs.unlink(`${config.name}/config.json`, (err) => {
            if (err) {
              console.error(err);
            }
    
            console.log(colors.green('------------- 成功移除 config.json -------------'));
          });
        });
      });
    }
  } else {
    const p = new Promise(function (resolve, reject) {
      copyCatalog(config.type);
      setTimeout(resolve, 500);
    });
    p.then(function (resolve, reject) {
      var p1 = new Promise(function (resolve, reject) {
        modifyContent('config.json', config);

        setTimeout(resolve, 500);
      });

      return p1;
    }).then(function () {
      fs.unlink('config.json', (err) => {
        if (err) {
          console.error(err);
        }

        console.log(colors.green('------------- 成功移除 config.json -------------'));
      });
    });
  }
}

function createWebpackSimpleProject (config) {
  if (!config.isRoot && config.name) {
    if (typeof config.isCover === 'undefined' || config.isCover) {
      mkdir(config.name, () => {
        console.log('');
        copyCatalog(config.type, config.name);
      });
    }
  } else {
    console.log('');
    copyCatalog(config.type);
  }
}

module.exports = {
  createSimpleProject,
  createWebpackSimpleProject
};