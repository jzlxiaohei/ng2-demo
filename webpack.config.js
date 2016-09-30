var webpack = require("webpack");
var path = require('path')

const deps = require('./package.json').dependencies;

module.exports = {
  entry: {
    app: ['./src/main.ts'],
    vendor: Object.keys(deps)
  },
  cache: true,
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[name].js',
  },
  resolve: {
    extensions: [
      '.ts',
      '.js'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.scss$/,
        loaders: [
          "style",
          "css",
          "sass"
        ]
      },
      {
        test: /\.html$/,
        loader: 'raw'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({names: ['vendors', 'manifest']}),
    new webpack.ContextReplacementPlugin(// The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/, root('./src') // location of your src
    ),
    // for dev
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // for prod: uglify ...
  ]
};

function root(__path) {
  return path.join(__dirname, __path);
}