const fs = require('fs');
const path = require('path');
const BASE_PATH = '../templates';

function write ( path, str, mode ) {
  fs.writeFileSync(path, str);
}
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
function mkdir ( path, fn ) {
  fs.mkdir(path, function (err) {
    fn & fn();
  });
}

module.exports = {
  BASE_PATH,
  copyCatalog,
  mkdir
}