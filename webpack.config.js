var path = require('path');
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var webpack = require('webpack')

module.exports = () => ({

    entry: {
      // activate HMR for React
      hmr: [
        // activate HMR for React
        'react-hot-loader/patch',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        'webpack-dev-server/client?http://localhost:8080',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        'webpack/hot/only-dev-server',
      ],
      // the entry point for our app
      main: path.join(__dirname, '/src/index.js')
    },

    output: {

      filename: '[name].js',
      path: path.join(__dirname, 'lib'),
      // IMPORTANT!
      // You must compile to UMD or CommonJS
      // so it can be required in a Node context.
      // This is required for StaticSiteGeneratorPlugin
      libraryTarget: 'umd'
    },

    devServer: {
      // inlining the dev server stuff doesn't work for
      // StaticSiteGeneratorPlugin
      inline: false
    },

    module: {
      rules: [
        {
          // pass JS files through babel...
          test:/\.js$/,
          exclude: '/node_modules/',
          use: ['babel-loader']
        },
        {
          // create CSS modules from .css files
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader?modules',
            'postcss-loader'
          ]
        }
      ]
    },

    plugins: [
      // enable HMR globally
      new webpack.HotModuleReplacementPlugin(),
      // prints more readable module names in the
      // browser console on HMR updates
      new webpack.NamedModulesPlugin(),
      // builds the static pages
      new StaticSiteGeneratorPlugin({
        entry: 'main.js',
        paths: [
          '/',
          '/hello/',
          '/world/'
        ],
        locals: {
          // Properties here are merged into `locals`
          // pased to the exported render function
          greet: 'Hello'
        }
      })
    ]
})
