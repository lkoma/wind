import Vue from 'vue';
import clamp from 'clamp-js';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';

export default Vue.directive('clamp', (el, { value }) => {
    /**
     * Usages:
     * Case 1: `<p v-clamp="2">{{text}}</p>`
     * Case 2: `<p v-clamp="100px">{{text}}</p>`
     */
    let params = {
        clamp: 2
    };
    if (value) {
        if (isString(value)) {
            if (/^\d+$/.test(value)) {
                params.clamp = +value;
            }
            else {
                params.clamp = value;
            }
        }
        else if (isNumber(value)) {
            params.clamp = value;
        }
        else {
            params = { ...params, ...value };
        }
    }
    setTimeout(() => clamp(el, params), 0);
});
