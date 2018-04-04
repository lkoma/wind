const utils = require('./utils');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    loaders: utils.cssLoaders({
        sourceMap: false,
        extract: isProduction
    }),
    preserveWhitespace: false,
    modules: true,
    localIdentName: '[name]--[local]--[hash:base64:5]',
    importLoaders: true
};
