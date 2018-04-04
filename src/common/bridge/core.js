import isObject from 'lodash/isObject';
import debounce from 'lodash/debounce';
import connect from './connect';
import { empty, makeKey, buildFailResponse } from './util';
import detect from './detect';

class Bridge {
    constructor() {
        Object.assign(this, detect());
    }
    register(name, api, postProcess) {
        this[name] = debounce((params = {}, success = empty, fail = empty) => {
            const callback = makeKey();
            let url;
            let fallback;
            if (isObject(params)) {
                url = api({ ...params, callback });
            }
            else {
                url = api({ $simpleValue: params, callback });
            }
            if (isObject(url)) {
                fallback = url.fallback;
                url = url.url;
            }
            if (this.container.type === 'h5') {
                let response = buildFailResponse();
                response = fallback() || response;
                setTimeout(() => {
                    window[callback](response);
                }, 0);
            }
            else {
                connect(url);
            }
            return new Promise((resolve, reject) => {
                window[callback] = data => {
                    if (postProcess) {
                        data = postProcess(data);
                    }
                    if (data && !data.code) {
                        success(data);
                        resolve(data);
                    }
                    else {
                        fail(data);
                        reject(data);
                    }
                };
            });
        }, 400, {
            leading: true,
            trailing: false
        });
    }
}

export default new Bridge();
