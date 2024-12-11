const path = require('path');
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'scripts', 'index.js'),
  watch: true,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: "main.js",
    chunkFilename: '[name].js'
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules')
      ],
      loader: 'babel-loader',
      options: {
        presets: [
          ["@babel/preset-env", {
            "targets": "> 0.25%, not dead"
          }]
        ]        
      }
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx']
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