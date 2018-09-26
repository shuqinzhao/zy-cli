#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const BASE_PATH = './templates';

function copyTemplate ( from , to ) {
  from = path.join(__dirname, from);
  write(to, fs.readFileSync(from, 'utf-8'));
}

function copyCatalog (mkdirPath) {
  from = path.join(__dirname, mkdirPath);

  fs.readdir(from, (err, files) => {
    if (err) {
      console.log(`readdirSync ${from} file failed ~`);
      return false;
    }

    if (BASE_PATH === mkdirPath) {
      files.forEach(item => {
        fs.stat(`${from}/${item}`, function(err,stat) {
          if (err) {
            console.error(err);
            throw err;
          }
  
          if (stat.isFile()) {
            copyTemplate(`${mkdirPath}/${item}`, item);
          } else if (stat.isDirectory()) {
            copyCatalog(`${mkdirPath}/${item}`, item);
          }
        });
      });
    } else {
      const path = mkdirPath.split(BASE_PATH)[1];
      
      mkdir(`.${path}`, () => {
        files.forEach(item => {
          fs.stat(`${from}/${item}`, function(err,stat) {
            if (err) {
              console.error(err);
              throw err;
            }
    
            if (stat.isFile()) {
              copyTemplate(`${mkdirPath}/${item}`, `.${path}/${item}`);
            } else if (stat.isDirectory()) {
              copyCatalog(`${mkdirPath}/${item}`, `.${path}/${item}`);
            }
          });
        });
      });
    }
  });
}

function write ( path, str, mode ) {
  fs.writeFileSync(path, str);
}

function mkdir ( path, fn ) {
  fs.mkdir(path, function (err) {
    fn & fn();
  });
}

copyCatalog(BASE_PATH);
