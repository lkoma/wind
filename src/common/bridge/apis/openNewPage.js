import bridge from '../core';
import { buildUrl } from '../util';

const apiName = 'openNewPage';

function fallback(params = {}) {
    if (params.router) {
        if (!/^router:\/\//.test(params.router)) {
            params.router = `router://${params.router}`;
        }
        const tokens = params.router.split('url=');
        const searchString = tokens[1];
        params.distance = searchString;
    }
    return params;
}

function buildResponse(url, params) {
    if (params.distance) {
        return {
            url,
            fallback() {
                window.location.href = params.distance;
            }
        };
    }
    return url;
}

function openNewPage(param) {
    if (param.$simpleValue) {
        param = {
            router: param.$simpleValue,
            callback: param.callback
        };
    }
    const parseParam = fallback(param);
    return buildResponse(buildUrl(apiName, parseParam), parseParam);
}

bridge.register(apiName, openNewPage);
