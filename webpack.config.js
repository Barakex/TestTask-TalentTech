const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, options) => ({
  devtool: options.mode === 'production' ? 'cheap-source-map' : 'eval-sourcemap',

  resolve: {
    extensions: ['.js', '.jsx']
  },

  entry: {
    main: './src/index.js'
  },

  output: {
    filename: './bundle.js',
    path: path.join(__dirname, './build'),
    publicPath: '/'
  },

  devServer: {
    contentBase: path.join(__dirname, './build'),
    publicPath: '/',
    hot: true,
    host: 'localhost',
    port: '3005',
    open: true,
    overlay: true,
    historyApiFallback: true
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      },
      {
        test: /\.(ttf|eot|woff|ico)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].ext'
          }
        }
      },
      {
        test: /favicon\.ico$/,
        use: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'build/index.html',
      title: 'TestTask',
      favicon: 'src/favicon.ico'
    }),
    new MiniCssExtractPlugin({
      filename: './[name].css'
    })
  ]
});
