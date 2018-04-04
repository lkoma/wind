const sh = require('shelljs');
const glob = require('glob');
const md5 = require('md5');
const webpack = require('webpack');
const ora = require('ora');
const chalk = require('chalk');
const webpackConfig = require('./webpack.dll.conf');

/* eslint-disable no-console */
let oldMd5;
const newMd5 = md5(sh.cat('./package.json', './build/webpack.dll.conf.js', './.babelrc'));

if (sh.test('-f', './cache/md5.info')
    && sh.test('-f', './cache/manifest.json')
    && sh.test('-f', './cache/deps.json')) {
    oldMd5 = sh.cat('./cache/md5.info').toString().replace(/[\r\n]/g, '');
}

if (newMd5 !== oldMd5) {
    const spinner = ora('Prebuilding dll package...');
    glob.sync('./cache/dep*.js').forEach(file => sh.rm(file));
    spinner.start();
    webpack(webpackConfig, error => {
        spinner.stop();
        if (error) {
            throw error;
        }
        else {
            glob.sync('./cache/deps.*.js').forEach(file => sh.echo(`{"name": "${file}"}`).to('./cache/deps.json'));
            console.log(chalk.green('Dll package build complete.\n'));
        }
    });
    sh.echo(newMd5).to('./cache/md5.info');
}
else {
    console.log(chalk.green('Read Dll package from cache'));
}
