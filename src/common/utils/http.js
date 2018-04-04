import axios from 'axios';

window.axios = axios;
axios.defaults.timeout = 30000;

axios.interceptors.request.use((config = {}) => config, error => Promise.reject(error));

axios.interceptors.response.use(res => {
    if (res.config.silence) {
        return res.data;
    }
    const { data } = res;
    return data.data;
}, error => Promise.reject(error));

export default axios;
