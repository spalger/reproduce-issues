const webpack = require('webpack')
const { resolve } = require('path')

module.exports = {
  mode: 'development',
  entry: ['./src/dll/index.js'],
  output: {
    filename: 'test.dll.js',
    library: 'test'
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      name: 'test',
      path: resolve(__dirname, 'dist/manifest.json')
    })
  ]
}