#!/usr/bin/env node

const { mkdir } = require('./file');
const { copyCatalog } = require('./file');

function createSimpleProject (config) {
  if (!config.isRoot && config.name) {
    mkdir(config.name, () => {
      copyCatalog(config.type, config.name);
    });
  } else {
    copyCatalog(config.type);
  }
}

module.exports = {
  createSimpleProject,
};