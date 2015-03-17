var webpack = require('webpack');

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
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  }
};
