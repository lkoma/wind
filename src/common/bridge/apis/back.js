import bridge from '../core';
import { buildUrl } from '../util';

const apiName = 'back';

function back(params = {}) {
    return {
        url: buildUrl(apiName, params),
        fallback: () => window.history.go(-1)
    };
}

bridge.register(apiName, back);
