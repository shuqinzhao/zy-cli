const fs = require('fs');
const path = require('path');
const colors = require('colors');
const { templateList } = require('../../config');
const BASE_PATH = '../../templates';

function write ( path, str, mode ) {
  fs.writeFileSync(path, str);
}
function mkdir ( path, fn ) {
  fs.mkdir(path, function (err) {
    fn & fn();
  });
}
function copyTemplate ( from , to ) {
  from = path.join(__dirname, from);
  write(to, fs.readFileSync(from, 'utf-8'));
}

function copyCatalog (mkdirPath, projectName) {
  const from = path.join(__dirname, `${BASE_PATH}/${mkdirPath}`);

  fs.readdir(from, (err, files) => {
    if (err) {
      console.error(colors.red(`   readdirSync ${from} file failed ~`));
      return false;
    }

    const isRoot = !!templateList.find(item => item.name === mkdirPath);
    if (isRoot) {
      files.forEach(item => {
        fs.stat(`${from}/${item}`, function (err, stat) {
          if (err) {
            console.error(err);
            throw err;
          }

          if (stat.isFile()) {
            copyTemplate(`${BASE_PATH}/${mkdirPath}/${item}`, `${projectName ? projectName + '/' : ''}${item}`);
          } else if (stat.isDirectory()) {
            copyCatalog(`${mkdirPath}/${item}`, projectName);
          }
        });
      });
    } else {
      const splitPath = mkdirPath.split('/');
      splitPath.shift();
      const basePath = `${projectName ? projectName + '/' : ''}${splitPath.join('/')}`;

      mkdir(basePath, () => {
        files.forEach(item => {
          fs.stat(`${from}/${item}`, function (err, stat) {
            if (err) {
              console.error(err);
              throw err;
            }
  
            if (stat.isFile()) {
              copyTemplate(`${BASE_PATH}/${mkdirPath}/${item}`, `./${basePath}/${item}`);
            } else if (stat.isDirectory()) {
              copyCatalog(`${mkdirPath}/${item}`, projectName);
            }
          });
        });
      });
    }
  });
}

module.exports = {
  BASE_PATH,
  copyCatalog,
  mkdir
}