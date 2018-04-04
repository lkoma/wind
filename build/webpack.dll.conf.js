const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const config = require('../config');

const baseConfig = Object.assign({}, require('./webpack.base.conf'));

baseConfig.entry = {
    deps: [
        'vue', 'vue-router', 'element-ui', 'axios',
        'normalize.css', 'animate.css', 'detector',
        'vuex', 'element-ui/lib/theme-chalk/index.css',
        'moment', 'enum'
    ]
};
baseConfig.output = {};

const webpackConfig = merge(baseConfig, {
    // use inline sourcemap for karma-sourcemap-loader
    module: {
        rules: utils.styleLoaders({
            sourceMap: false,
            extract: false
        })
    },
    output: {
        path: path.join(__dirname, '..', 'cache/'),
        filename: 'deps.[chunkhash:16].js',
        library: '[name]'
    },
    devtool: false,
    plugins: [
        new webpack.DllPlugin({
            name: 'deps',
            path: path.join(__dirname, '..', 'cache', 'manifest.json')
        }),
        new webpack.DefinePlugin({
            'process.env': require('../config/prod.env')
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
        new ExtractTextPlugin({
            filename: path.join(__dirname, '..', 'cache', 'css/[name].css')
        }),
        new OptimizeCSSPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(zh-cn)$/),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
});
if (config.build.optimizeJs) {
    const OptimizeJsPlugin = require('optimize-js-plugin');
    webpackConfig.plugins.push(new OptimizeJsPlugin({
        sourceMap: false
    }));
}
module.exports = webpackConfig;
