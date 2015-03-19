var webpack = require('webpack');
var package = require('./package.json');

module.exports = {
  devtool: 'eval',
  entry: ['./scripts/index'],
  output: {
    path: __dirname + '/scripts/',
    filename: 'bundle.js',
    publicPath: '/scripts/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      { test: /\.less$/, loaders: ['style-loader', 'css-loader', 'less-loader'] }
    ]
  }
};
