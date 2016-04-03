var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build/js');

module.exports = {
  entry: APP_PATH,
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
};
