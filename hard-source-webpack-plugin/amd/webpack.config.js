var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: './public/index.js',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  plugins: [
    new HardSourceWebpackPlugin({
      // Either an absolute path or relative to output.path.
      cacheDirectory: __dirname + '/.hardSourceCache/[confighash]/',
      // Either an absolute path or relative to output.path. Sets webpack's
      // recordsPath if not already set.
      recordsPath: __dirname + '/.hardSourceCache/[configHash]/records.json',
      // Optional field. Either a string value or function that returns a
      // string value.
      configHash: function(webpackConfig) {
        // Build a string value used by HardSource to determine which cache to
        // use if [confighash] is in cacheDirectory or if the cache should be
        // replaced if [confighash] does not appear in cacheDirectory.
        return process.env.NODE_ENV || 'development';
      },
      // Optional field. This field determines when to throw away the whole
      // cache if for example npm modules were updated.
      environmentPaths: {
        root: process.cwd(),
        directories: ['node_modules'],
        // Add your webpack configuration paths here so changes to loader
        // configuration and other details will cause a fresh build to occur.
        files: ['package.json', 'webpack.config.js'],
      },
    }),
  ],
};
