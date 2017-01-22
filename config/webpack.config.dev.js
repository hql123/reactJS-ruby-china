var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
var WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
var paths = require('./paths');
var path = require('path');

var publicPath = '/';
var publicUrl = '';

module.exports = {
  entry: [
    require.resolve('react-dev-utils/webpackHotDevClient'),
    paths.appIndexJs
  ],
  output: {
    path: path.join(__dirname, 'build'),
    pathinfo: true,
    filename: 'static/js/bundle.js',
    publicPath: publicPath
  },
  watch: true,
  devtool: 'cheap-module-source-map',
  plugins: [
    new InterpolateHtmlPlugin({
      PUBLIC_URL: publicUrl,
    }),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      )
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules)
  ],
  resolveLoader: {
    root: paths.ownNodeModules,
    moduleTemplates: ['*-loader']
  },
  eslint: {
    configFile: path.join(__dirname, '../.eslintrc'),
    useEslintrc: false
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint',
        include: paths.appSrc,
      }
    ],
    loaders: [{
      test: /\.(js|jsx)$/,
      include: paths.appSrc,
      loader: 'babel',
      query: {
        babelrc: false,
        presets: [require.resolve('babel-preset-react-app')],
        cacheDirectory: true
      }
    }, {
      test: /\.css$/,
      loader: 'style!css?importLoaders=1',
    }, {
      exclude: [
        /\.html$/,
        /\.(js|jsx)$/,
        /\.css$/,
        /\.json$/,
        /\.svg$/
      ],
      loader: 'url',
      query: {
        limit: 10000,
        name: 'static/media/[name].[hash:8].[ext]'
      }
    }, {
      test: /\.(jpg|png|svg)$/,
      loader: 'file',
      query: {
        name: 'static/media/[name].[hash:8].[ext]'
      }
    }]
  }
}
