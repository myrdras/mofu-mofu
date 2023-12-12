const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, ''),
  },
  devServer: {
    static: './',
    compress: true,
    port:9000,
  },
};