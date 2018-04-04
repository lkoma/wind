const path = require('path');
const config = require('../config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const packageConfig = require('../package.json');
const glob = require('glob');
const fs = require('fs');

exports.assetsPath = _path => {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory;
    return path.posix.join(assetsSubDirectory, _path);
};

exports.cssLoaders = (options = {}) => {
    const cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: process.env.NODE_ENV === 'production',
            sourceMap: false
        }
    };

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        // const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];
        const loaders = [cssLoader, 'postcss-loader'];
        if (loader) {
            loaders.push({
                loader: `${loader}-loader`,
                options: Object.assign({}, loaderOptions, {
                    sourceMap: false
                })
            });
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            });
        }

        return ['vue-style-loader'].concat(loaders);
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = options => {
    const output = [];
    const loaders = exports.cssLoaders(options);
    /* eslint-disable guard-for-in */
    for (const extension in loaders) {
        const loader = loaders[extension];
        output.push({
            test: new RegExp(`\\.${extension}$`),
            use: loader
        });
    }
    /* eslint-enable */
    return output;
};
// mac的系统个提示
exports.createNotifierCallback = () => {
    const notifier = require('node-notifier');
    return (severity, errors) => {
        if (severity !== 'error') {
            return;
        }
        const error = errors[0];
        const filename = error.file && error.file.split('!').pop();
        notifier.notify({
            title: packageConfig.name,
            message: `${severity}: ${error.name}`,
            subtitle: filename || '',
            icon: path.join(__dirname, 'logo.png')
        });
    };
};

exports.getEntries = () => {
    const entries = {};
    let moduleConfig;
    try {
        moduleConfig = require('../module.config.json');
    }
    catch (e) {
        moduleConfig = {};
    }
    glob.sync('src/*/module.json').forEach(file => {
        const module = JSON.parse(fs.readFileSync(path.join(__dirname, '..', file)).toString());
        const { name, entry } = module;
        if (moduleConfig.includes && moduleConfig.includes.length) {
            if (moduleConfig.includes.indexOf(name) < 0) {
                return;
            }
        }
        if (moduleConfig.excludes && moduleConfig.excludes.length) {
            if (moduleConfig.excludes.indexOf(name) >= 0) {
                return;
            }
        }
        entries[name] = {
            path: file.replace('module.json', entry),
            data: module
        };
    });
    return entries;
};

exports.entries = exports.getEntries();