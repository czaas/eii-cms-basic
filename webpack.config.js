var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: [
    './app/mount.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
     'process.env': {
       'NODE_ENV': JSON.stringify('production')
     }
    }),
    // new webpack.optimize.UglifyJsPlugin({ sourceMap: false, mangle: false })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      include: __dirname,
      query: {
        presets: ['es2015', 'react']
      }
    }]
  }
}
