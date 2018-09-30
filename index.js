#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');
const package = require(path.resolve(__dirname, './package.json'));
const BASE_PATH = './templates';

function copyTemplate ( from , to ) {
  from = path.join(__dirname, from);
  write(to, fs.readFileSync(from, 'utf-8'));
}

function copyCatalog (mkdirPath, projectName) {
  from = path.join(__dirname, mkdirPath);

  fs.readdir(from, (err, files) => {
    if (err) {
      console.log(`   readdirSync ${from} file failed ~`);
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
            console.log(`   copy ${mkdirPath}/${item} to ./${projectName}/${item}`);
            copyTemplate(`${mkdirPath}/${item}`, `./${projectName}/${item}`);
          } else if (stat.isDirectory()) {
            copyCatalog(`${mkdirPath}/${item}`, projectName);
          }
        });
      });
    } else {
      const path = mkdirPath.split(BASE_PATH)[1];

      mkdir(`./${projectName}${path}`, () => {
        files.forEach(item => {
          fs.stat(`${from}/${item}`, function(err,stat) {
            if (err) {
              console.error(err);
              throw err;
            }
    
            if (stat.isFile()) {
              copyTemplate(`${mkdirPath}/${item}`, `./${projectName}${path}/${item}`);
              console.log(`   copy ${mkdirPath}/${item} to ./${projectName}${path}/${item}`);
            } else if (stat.isDirectory()) {
              copyCatalog(`${mkdirPath}/${item}`, projectName);
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