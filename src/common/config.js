/**
 * Created by zhouhua on 2017/1/2.
 */
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
// import Enum from 'enum';

function wrap(value, root) {
    if (isString(value)) {
        return `${root}${value}`;
    }
    else if (isObject(value)) {
        return value.fullPath || `${value.root}${value.path}`;
    }
    return value;
}
const config = {
    apis: {
    },
    apiRoot: ''
};
const innerApis = {};

config.addApis = map => {
    Object.keys(map).forEach(key => {
        innerApis[key] = map[key];
        config.apis[key] = wrap(innerApis[key], config.apiRoot);
    });
};
config.wrapApis = () => {
    Object.keys(innerApis).forEach(key => {
        config.apis[key] = wrap(innerApis[key], config.apiRoot);
    });
};

config.addApis(config.apis);
config.setRoot = root => {
    if (process.env.NODE_ENV !== 'production') {
        config.apiRoot = root;
        config.wrapApis();
    }
};

// config.setRoot('http://p3.thedoc.cn');

export default config;
