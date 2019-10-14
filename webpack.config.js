const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
    process.env.NODE_ENV = argv.mode;

    const development = argv.mode === 'development';

    return {
        devtool: development ? 'cheap-module-eval-source-map' : '',
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
        optimization: {
            minimize: development ? false: true,
            minimizer: [
                new TerserPlugin({
                    cache: false,
                    parallel: true,
                    sourceMap: false,
                    terserOptions: {
                        warnings: false,
                        parse: {
                            ecma: 8
                        },
                        compress: {
                            ecma: 5
                        },
                        mangle: {
                            safari10: true,
                        },
                        module: false,
                        output: {
                            ecma: 5,
                            safari10: true
                        },
                        toplevel: true,
                        nameCache: null,
                        ie8: false,
                        keep_classnames: false,
                        keep_fnames: false
                    },
                }),
            ],
            splitChunks: {
                cacheGroups: {
                    deps: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'deps',
                        chunks: 'all'
                    }
                }
            }
        },
        performance: {
            hints: false
        },
        entry: './index.js',
        output: {
            path: __dirname + '/dist',
            filename: '[name].vcds-graph.js'
        },
        resolve: {
            extensions: ['.js'],
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
                    test: /\.(png|woff|woff2)$/,
                    loader: 'url-loader'
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin({
                verbose: false
            }),
            new HtmlPlugin({
                template: './src/html/index.html'
            })
        ]
    };
};
