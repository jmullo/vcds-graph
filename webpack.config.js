const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        clientLogLevel: 'info',
        contentBase: './dist',
        port: 3000,
        compress: true,
        hot: true,
        overlay: {
            warnings: true,
            errors: true
        },
        stats: {
            assets: false,
            builtAt: false,
            hash: false,
            modules: false,
            entrypoints: false,
            version: false
        }
    },
    stats: {
        assets: false,
        builtAt: false,
        hash: false,
        modules: false,
        entrypoints: false,
        version: false
    },
    performance: {
        hints: false
    },
    entry: './index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'vcds-graph.js'
    },
    resolve: {
        modules: [
            './src/js',
            './src/css',
            './src/img',
            'node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.woff(2)?$/,
                loader: 'url-loader' 
            },
            {
                test: /\.ico?/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            verbose: false
        }),
        new HtmlWebpackPlugin({
            template: './src/html/index.html'
        })
    ]
};