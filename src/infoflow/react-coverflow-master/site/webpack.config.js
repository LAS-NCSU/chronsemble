var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var jsloader = (process.env.NODE_ENV === 'react-hot') ? 'react-hot!babel':'babel';
var plugins = [
  new webpack.optimize.DedupePlugin(),
];

var entry = {};
var mainEntryPoints = glob.sync(
  // Ignore compile filename with `.bundle.js`
  path.join(__dirname, './js/!(*.bundle).js')
);
entry['main'] = mainEntryPoints;

var config = {
  context: __dirname,
  entry: entry,
  output: {
    path: __dirname + '/js',
    filename: 'main.bundle.js',
    publicPath: 'js/',
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.css']
  },
  eslint: {
    configFile: path.join(__dirname, '../.eslintrc')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: jsloader,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint'
      },
      {
        test: /\.(css|scss)$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
          'autoprefixer',
          'sass'
        ],
      }
    ]
  },
  plugins: plugins,
  postcss: function () {
    return [precss, autoprefixer];
  }
};

module.exports = config;
