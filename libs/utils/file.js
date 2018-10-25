const fs = require('fs');
const path = require('path');
const colors = require('colors');
const { templateList } = require('../../config');
const BASE_PATH = '../../templates';

function write ( path, str, mode ) {
  fs.writeFile(path, str, function (err) {
    if (err) {
      throw err;
      return;
    }

    const files = path.split('/');
    console.log(colors.green(`${files[files.length - 1]} 下载成功 ！`));
  });
}
function mkdir ( path, fn ) {
  fs.mkdir(path, function (err) {
    fn & fn();
  });
}
async function copyTemplate ( from , to ) {
  from = path.join(__dirname, from);
  await write(to, fs.readFileSync(from, 'utf-8'));
}
function modifyContent (configPath, config) {
  const basePath = config.name ? `${config.name}/` : '';
  fs.stat(`${basePath}config.json`, (err, stat) => {
    if (err) {
      console.error(err)
    }
    if (stat.isFile()) {
      fs.readFile(configPath, (error, data) => {
        if (error) {
          console.error(error)
        }
        const configJson = JSON.parse(data.toString());
    
        Object.keys(configJson).forEach(item => {
          fs.readFile(`${basePath}${item}`, (err, data) => {
            if (err) {
              console.error(err)
            }
            let htmlData = data.toString();
    
            Object.keys(configJson[item]).forEach(keyItem => {
              const isFilter = htmlData.includes(`~~${keyItem}~~`);
    
              if (isFilter) {
                htmlData = htmlData.replace(`~~${keyItem}~~`, config[keyItem] ? config[keyItem] : 'demo');
              }
            });
    
            fs.writeFile(`${basePath}${item}`, htmlData, function (err) {
              if (err) {
                console.error(err);
              }
    
              console.log(colors.green('------------- 项目新建成功！ -------------'));
            });
          });
        });
      });
    }
  });
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
  modifyContent,
  copyCatalog,
  mkdir
}