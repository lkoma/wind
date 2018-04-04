/* eslint-disable no-console */
require('./check-versions')();
const portfinder = require('portfinder');
const config = require('../config');

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

const path = require('path');
const express = require('express');
const upath = require('upath');
const webpack = require('webpack');
const chalk = require('chalk');
const fs = require('fs');
const opn = require('opn');
const webpackConfig = process.env.NODE_ENV === 'testing'
    ? require('./webpack.prod.conf')
    : require('./webpack.dev.conf');
// const openBrowser = require('./openBrowser');

process.on('unhandledRejection', err => {
    throw err;
});

const autoOpenBrowser = !!config.dev.autoOpenBrowser;

const app = express();
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    logLevel: 'silent',
    noInfo: true,
    stats: {
        chunks: false,
        color: true
    },
    lazy: false,
    watchOptions: {
        poll: true,
        aggregateTimeout: 400
    }
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: false,
    quite: true,
    noInfo: true
});

let apiList = [];
const mockupPath = path.resolve(__dirname, '../mockup');
function calcPath(dir) {
    return fs.readdirSync(dir).reduce((list, file) => {
        const name = path.join(dir, file);
        const isDir = fs.statSync(name).isDirectory();
        return list.concat(isDir ? calcPath(name) : [name.replace('.js', '')]);
    }, []);
}
function readSource(file) {
    const relativePath = `../mockup${file}.js`;
    delete require.cache[require.resolve(relativePath)];
    /* eslint-disable import/no-dynamic-require */
    return require(relativePath);
    /* eslint-enable */
}

/* eslint-disable no-console */
function syncMockData() {
    apiList = calcPath(mockupPath).map(file => upath.normalizeSafe(file.split(mockupPath).pop()));
    console.log(chalk.green('Mock data updated.'));
}
fs.watch(mockupPath, syncMockData);
syncMockData();

app.use((request, response, next) => {
    if (apiList.indexOf(request.path.replace(/\/$/, '')) >= 0) {
        const data = JSON.stringify(readSource(request.path.replace(/\/$/, ''))(request, response));
        console.info(chalk.yellow(`\n 😲  ==> ${request.url}`), chalk.green(' 🤗  <== 200'));
        response.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
        response.end(data);
    }
    else {
        next();
    }
});
app.use((request, response, next) => {
    if (/deps\.[a-f0-9]+\.js/.test(request.path)) {
        response.end(fs.readFileSync(require('../cache/deps.json').name).toString());
    }
    else {
        next();
    }
});
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve webpack bundle output
app.use(devMiddleware);

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

let innerResolve;
let innerReject;
let server;
const readyPromise = new Promise((resolve, reject) => {
    innerResolve = resolve;
    innerReject = reject;
}).catch(err => {
    if (err && err.message) {
        console.error(err.message);
    }
    process.exit(1);
});
devMiddleware.waitUntilValid(() => {
    console.log('> Starting dev server...');
    portfinder.basePort = process.env.PORT || '8080';
    portfinder.getPort((err, port) => {
        if (err) {
            innerReject(err);
        }
        process.env.PORT = port;
        const uri = `http://localhost:${port}`;
        console.log(`> Listening at ${uri}\n`);
        if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
            opn(`${uri}/magic/homepage.html#/`);
        }
        server = app.listen(port);
        ['SIGINT', 'SIGTERM'].forEach(sig => {
            process.on(sig, () => {
                server.close();
                process.exit();
            });
        });
        innerResolve();
    });
});

module.exports = {
    ready: readyPromise,
    close() {
        server.close();
    }
};
