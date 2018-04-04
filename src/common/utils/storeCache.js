import throttle from 'lodash/throttle';

export default function createStoreCache(storage, module = '') {
    return store => {
        // 当 store 初始化后调用
        const key = `${module}State`;
        const cache = storage.getItem(key);
        if (cache) {
            store.replaceState(JSON.parse(cache));
        }
        store.subscribe(throttle((mutation, state) => {
            storage.setItem(key, JSON.stringify(state));
        }, 500));
    };
}
