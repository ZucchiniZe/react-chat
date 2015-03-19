var webpack = require('webpack');
var package = require('./package.json');

module.exports = {
  devtool: 'source-map',
  entry: ['./scripts/index'],
  output: {
    path: __dirname + '/static/',
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({output: {comments: false}, compress: {warnings: false}}),
    new webpack.BannerPlugin('v' + package.version + '\nMIT License\nCopyright 2015\nMade by David Leavenworth and Alex Bierwagen'),
    new webpack.PrefetchPlugin('react'),
    new webpack.optimize.DedupePlugin(),
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
