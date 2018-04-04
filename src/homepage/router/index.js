import Vue from 'vue';
import Router from 'vue-router';
import Homepage from 'homepage/views/index';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Homepage',
            component: Homepage
        }
    ]
});
