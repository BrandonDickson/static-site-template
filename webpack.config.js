
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')

module.exports = {

  entry: './src/index.js',

  output: {
    filename: 'index.js',
    path: 'lib',
    // IMPORTANT!
    // You must compile to UMD or CommonJS
    // so it can be required in a Node context:
    libraryTarget: 'umd'
  },

  plugins: [
    new StaticSiteGeneratorPlugin({
      paths: [
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

};
