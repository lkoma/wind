import Vue from 'vue';
import Router from 'vue-router';
import Homepage from 'homepage/views/index';
import Role from 'homepage/views/role';
import Personalcenter from 'homepage/views/personalCenter';
import Setting from 'homepage/views/setting';
import Data from 'homepage/views/data';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Homepage',
            component: Homepage,
            meta: {
                title: '首页'
            },
            children: [
                {
                    path: '/role',
                    name: 'Role',
                    component: Role,
                    meta: {
                        title: '首页二'
                    }
                },
                {
                    path: '/personalcenter',
                    name: 'Personalcenter',
                    component: Personalcenter,
                    meta: {
                        title: '个人中心'
                    }
                },
                {
                    path: '/setting',
                    name: 'Setting',
                    component: Setting,
                    meta: {
                        title: '设置'
                    }
                },
                {
                    path: '/data',
                    name: 'Data',
                    component: Data,
                    meta: {
                        title: '数据'
                    }
                }
            ]
        }
    ]
});
