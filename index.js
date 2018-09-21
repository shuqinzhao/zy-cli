#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const mkdirPath = './templates';

function copyTemplate ( from , to ) {
  from = path.join(__dirname, 'templates', from);
  write(to, fs.readFileSync(from, 'utf-8'));
}

function copyCatalog (mkdirPath) {
  fs.readdir(mkdirPath, (err, files) => {
    if (err) {
      console.log(`readdir ${mkdirPath} file failed ~`);
      return false;
    }


    mkdir(`${mkdirPath}`, () => {
      files.forEach(item => {
        fs.stat(`${mkdirPath}/${item}`, function(err,stat){
          if (err) {
            console.error(err);
            throw err;
          }
  
          if (stat.isFile()) {
            copyTemplate(`${mkdirPath}/${item}`, `${mkdirPath}/${item}`);
          } else if (stat.isDirectory()) {
            copyCatalog(`${mkdirPath}/${item}`, `${mkdirPath}/${item}`);
          }
        });
      });
    });

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

copyCatalog(mkdirPath);
