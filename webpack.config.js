const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => ({
    devtool: options.mode === 'production' ? 'cheap-source-map' : 'eval-sourcemap',

    resolve: {
        extensions: ['.js', 'jsx']
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
                test: /\.(ttf|eot|woff)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].ext'
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: 'build/index.html',
            title: 'TestTask'
        }),
        // new CopyWebpackPlugin([{
        //     from: './src/favicon.ico',
        //     to: options.mode === './favicon.ico'
        // }]),
        new MiniCssExtractPlugin({
            filename: './[name].css'
        })
    ]
})

