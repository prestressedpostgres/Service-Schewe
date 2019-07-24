var path = require('path');

var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
    // 1
    entry: './client/src/index.jsx',
    output: {
      path: DIST_DIR,
      filename: 'bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          }
        ]
      },
      resolve: {
        extensions: ['*', '.js', '.jsx']
      }
    };