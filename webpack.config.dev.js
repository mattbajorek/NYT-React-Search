var webpack = require('webpack');

module.exports = {

  // Source map to see where errors occurs
  devtool: 'inline-source-map',
  
  // This code will be compiled 
  entry: [
    'webpack-hot-middleware/client',
    "./app/App.js"
  ],

  // Then output into this file
  output: {
    path: require('path').resolve('./public'),
    filename: "bundle.js",
    publicPath: '/'
  },

  // Plugins for HMRE
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),    
    new webpack.NoErrorsPlugin()
  ],

  // This will be what we do
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          // These are the specific transformations we'll be using. 
          presets: ['react', 'es2015', 'react-hmre']
        }
      }
    ]
  }

}