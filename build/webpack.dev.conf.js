const utils = require('./utils');
const path = require('path');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const FaviconsPlugin = require('favicons-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const Jarvis = require('webpack-jarvis');
const hash = require('../cache/deps.json').name.match(/deps\.([0-9a-f]+)\.js/)[1];

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(name => {
    baseWebpackConfig.entry[name] = ['./build/dev-client', 'webpack/hot/only-dev-server'].concat(baseWebpackConfig.entry[name]);
});

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

const webpackConfig = merge(
    baseWebpackConfig, {
        module: {
            rules: utils.styleLoaders({ sourceMap: false })
        }
    },
    {
        devtool: 'inline-eval-cheap-source-map',
        plugins: [
            new webpack.DllReferencePlugin({
                context: path.join(__dirname, '..', 'cache'),
			    manifest: require("../cache/manifest.json") // eslint-disable-line
            }),
            new webpack.DefinePlugin({
                'process.env': config.dev.env
            }),
            new webpack.NamedModulesPlugin(),
            new CaseSensitivePathsPlugin(),
            new WatchMissingNodeModulesPlugin(resolve('node_modules')),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new FriendlyErrorsPlugin(),
            new DashboardPlugin(),
            new FaviconsPlugin('./src/common/assets/img/favicon.jpg')
        ].concat(Object.keys(utils.entries).map(name =>
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
            (new HtmlWebpackPlugin({
                filename: `${name}.html`,
                template: 'index.html',
                jsPath: '/magic/',
                inject: true,
                chunks: [name],
                depsHash: hash,
                hash: false,
                title: utils.entries[name].data.title || 'magic'
            }))))
    }
);
if (process.argv[2] === 'jarvis') {
    webpackConfig.plugins.push(
        new Jarvis({
            port: 1337 // optional: set a port
        })
    );
}
module.exports = webpackConfig;
