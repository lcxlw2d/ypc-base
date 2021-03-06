const path = require('path');
const utils = require('./utils');
const config = require('../config');

const webpack = require('webpack')

function resolve (dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: [
            resolve('src'),
            resolve('node_modules')
        ],
        alias: {
            'src': resolve('src'),
            'assets': resolve('src/assets'),
            'components': resolve('src/components'),
            'routes': resolve('src/routes'),
            'views': resolve('src/views'),
            '$redux': resolve('src/redux')
        }
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)?$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')],
                options: {
                    cacheDirectory: true
                }
            },
            {
                test: /\.less?$/,
                use: ['style-loader','css-loader','less-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            React:"react",
            ReactDOM:"react-dom",
            systemApi:path.resolve(__dirname,"../src/utils/systemApi.js"),
            PureComponent:[path.resolve(__dirname,"../src/components/base/PureComponent.jsx"),'default'],
            PageComponent:[path.resolve(__dirname,"../src/components/base/PageComponent.jsx"),'default']
        })
    ]
};
