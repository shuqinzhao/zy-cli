#!/usr/bin/env node

const { mkdir } = require('./file');
const { copyCatalog } = require('./file');

function createSimpleProject (config) {
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
};