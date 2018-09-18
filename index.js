#! /usr/bin/env node

var fs = require('fs');
var path = require('path');

var config = {};

ProcessingInstruction.argv.slice(2).forEach(function (item) {
  switch (item) {
    case "-j":
      config.jquery = true;
      break;
    case "-s":
      config.swiper = true;
      break;
    case "-v":
      config.vue = true;
      break;
    case "-b":
      config.bootstrap = true;
      break;
  }
});

function copyTemplate ( from , to ) {
  from = path.join(__dirname, 'templates', from);
  write(to, fs.readFileSync(from, 'utf-8'));
}

function write ( path, str, mode ) {
  fs.writeFileSync(path, str);
}

function mkdir ( path, fn ) {
  fs.mkdir(path, function (err) {
    fn & fn();
  });
}

var PATH = ".";
mkdir (PATH, function () {
  copyTemplate('index.html', PATH);
  copyTemplate('index.css', PATH);
});
mkdir (PATH + '/libs/js', function () {
  config.bootstrap && copyTemplate('js/bootstrap.min.js', PATH + "/libs/js/bootstrap.min.js");
  config.bootstrap && copyTemplate('js/vue.min.js', PATH + "/libs/js/vue.min.js");

  if (config.jquery) {
    config.bootstrap && copyTemplate('js/jquery-1.8.3.min.js', PATH + "/libs/js/jquery-1.8.3.min.js");
    config.bootstrap && copyTemplate('js/jquery-3.1.1.min.js', PATH + "/libs/js/jquery-3.1.1.min.js");
  }

  if (config.swiper) {
    if (config.jquery) {
      config.bootstrap && copyTemplate('js/swiper-3.4.1.min.js', PATH + "/libs/js/swiper-3.4.1.min.js");
    } else {
      config.bootstrap && copyTemplate('js/swiper-3.4.2.min.js', PATH + "/libs/js/swiper-3.4.2.min.js");
    }
  }
});