
require('shelljs/global');
const chalk = require('chalk');
const argv = require('yargs')
    .demandCommand(1, chalk.red('需要输入模块名!'))
    .strict()
    .argv;

const name = argv._[0].toLowerCase();
const templates = {
    'main.js': `import init from 'common/main';
import router from './router/index';
import store from './store/index';

export default init({ router, store });
`,
    'store': `import Vue from 'vue';
import Vuex from 'vuex';
import storeCache from 'common/utils/storeCache';
import { name } from '../module.json';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
    },
    strict: debug,
    plugins: [storeCache(sessionStorage, name)],
    mutations: {
    }
});
`,
    'router': `import Vue from 'vue';
import Router from 'vue-router';
import Hello from 'common/components/Hello';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: Hello
        }
    ]
});
`,
    'config.js': `import config from 'common/config';

const apis = {
};
config.addApis(apis);

export default config;
`
};

/* eslint-disable no-console */
console.log(chalk.yellow(`Creating new module: ${name}`));
const modulePath = `src/${name}`;
const dirmap = ['assets', 'components', 'router', 'store', 'views'].reduce((map, folder) => {
    map[folder] = `${modulePath}/${folder}`;
    return map;
}, {});
const info = {
    name,
    entry: 'main.js'
};
/* eslint-disable no-undef */
mkdir('-p', Object.keys(dirmap).map(key => dirmap[key]));
echo(templates.router).to(`${dirmap.router}/index.js`);
echo(templates.store).to(`${dirmap.store}/index.js`);
echo(templates['main.js']).to(`${modulePath}/main.js`);
echo(templates['config.js']).to(`${modulePath}/config.js`);
echo(JSON.stringify(info)).to(`${modulePath}/module.json`);

console.log(chalk.green('Finished.'));
