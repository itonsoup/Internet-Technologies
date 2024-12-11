const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'scripts', 'index.js'),
  watch: false,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }]
            ]
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
    host: 'localhost',
    port: 8080,
    open: true,
    hot: true,
    liveReload: true
  }
};
