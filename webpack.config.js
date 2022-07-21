const path = require('path')

module.exports = [{
  name: 'production-cjs',
  mode: 'production',
  entry: './src/cjs/index.js',
  optimization: {
    minimize: false,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'walnut.js',
    library: {
      type: 'umd',
      name: 'walnut',
    },
  },
},
{
  name: 'production-cjs-min',
  mode: 'production',
  entry: './src/cjs/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'walnut.min.js',
    library: {
      type: 'umd',
      name: 'walnut',
    },
  },
},
{
  name: 'production-esm',
  mode: 'production',
  entry: './src/esm/index.mjs',
  optimization: {
    minimize: false,
  },
  experiments: {
    outputModule: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'walnut.mjs',
    library: {
      type: 'module',
    },
  },
},
{
  name: 'production-esm-min',
  mode: 'production',
  entry: './src/esm/index.mjs',
  devtool: 'source-map',
  experiments: {
    outputModule: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'walnut.min.mjs',
    library: {
      type: 'module',
    },
  },
}]
