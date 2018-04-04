export function buildUrl(apiName, params) {
    return `hybrid://${apiName}?param=${encodeURIComponent(JSON.stringify(params))}`;
}

export function makeKey() {
    return `matrix${+new Date()}${Math.random().toString(16).substr(2, 8)}`;
}

export function empty() { }

export function generateApi(apiName) {
    return params => buildUrl(apiName, params);
}

export function makeGlobalFunction(callback) {
    const key = makeKey();
    window[key] = data => {
        callback(data);
    };
    return key;
}

export function buildSuccessResponse(data = {}) {
    return {
        code: 0,
        data
    };
}
export function buildFailResponse(data = {}) {
    return {
        code: -1,
        data
    };
}
