var path = require('path');
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

module.exports = () => ({

    entry: path.join(__dirname, '/src/index.js'),

    output: {

      filename: 'index.js',
      path: path.join(__dirname, 'lib'),
      // IMPORTANT!
      // You must compile to UMD or CommonJS
      // so it can be required in a Node context:
      libraryTarget: 'umd'
    },

    devServer: { inline: false },

    module: {
      rules: [
        {
          test:/\.js$/,
          use: [
            {
              loader: 'babel-loader'
            }
          ]
        }
      ]
    },

    plugins: [
      new StaticSiteGeneratorPlugin({
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
