const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const chalk = require('chalk');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMonitor = require('webpack-monitor');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const hash = require('../cache/deps.json').name.match(/deps\.([0-9a-f]+)\.js/)[1];

const env = require('../config/prod.env');

/* eslint-disable no-console */
const webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: false,
            extract: false
        })
    },
    devtool: false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash:16].js'),
        chunkFilename: utils.assetsPath('js/[id].js')
    },
    plugins: [
        new webpack.DllReferencePlugin({
            manifest: require('../cache/manifest.json')
        }),
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new WebpackParallelUglifyPlugin({
            uglifyJS: {
                compress: {
                    warnings: false
                },
                sourceMap: false
            },
            cacheDir: path.resolve(__dirname, '../.cache/')
        }),
        // extract css into its own file
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css')
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['common'],
            minChunks: 2
        }),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.build.assetsSubDirectory,
                ignore: ['.*']
            }
        ]),
        // keep module.id stable when vender modules does not change
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(zh-cn)$/),
        // enable scope hoisting
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
});
Object.keys(utils.entries).forEach(name => {
    webpackConfig.plugins.push(new HtmlWebpackPlugin({
        filename: process.env.NODE_ENV === 'testing' ? 'index.html' : config.build.html(name),
        template: 'index.html',
        jsPath: './static/js/',
        inject: true,
        depsHash: hash,
        chunks: ['common', name],
        title: utils.entries[name].data.title || 'magic',
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
        }
    }));
});

if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin');
    webpackConfig.plugins.push(new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(`\\.(${
            config.build.productionGzipExtensions.join('|')
        })$`),
        threshold: 10240,
        minRatio: 0.8
    }));
}
if (config.build.bundleAnalyzerReport) {
    console.log(chalk.red('analyzering......'));
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
    webpackConfig.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'static'
    }));
}
if (config.build.monitor) {
    webpackConfig.plugins.push(new WebpackMonitor({
        capture: true,
        target: '../monitor/state.json',
        launch: true,
        port: 3030
    }));
}
if (config.build.optimizeJs) {
    const OptimizeJsPlugin = require('optimize-js-plugin');
    webpackConfig.plugins.push(new OptimizeJsPlugin({
        sourceMap: false
    }));
}

module.exports = webpackConfig;
