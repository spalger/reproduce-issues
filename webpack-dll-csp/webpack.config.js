const webpack = require('webpack');
const { resolve } = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'test.bundle.js'
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: resolve(__dirname, './dist/manifest.json'),
    })
  ],
  devServer: {
    contentBase: './dist',
    headers: {
      'Content-Security-Policy': "script-src 'unsafe-eval' 'nonce-c29tZSBjb29sIHN0cmluZyB3aWxsIHBvcCB1cCAxMjM';"
    }
  }
}