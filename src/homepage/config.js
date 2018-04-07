import config from 'common/config';

const apis = {
    albumList: '/api/album/'
};
config.addApis(apis);

config.menu = [
    {
        menuItem: '首页',
        children: [
            {
                menuItem: '首页一',
                router: '/'
            },
            {
                menuItem: '首页二',
                router: '/role'
            }
        ],
        icon: 'el-icon-menu'
    },
    {
        menuItem: '数据展示',
        children: [
            {
                menuItem: '表格',
                router: '/table'
            },
            {
                menuItem: '数据',
                router: '/data'
            }
        ],
        icon: 'el-icon-tickets'
    },
    {
        menuItem: '个人中心',
        router: '/personalcenter',
        icon: 'el-icon-star-on'
    },
    {
        menuItem: '设置',
        router: '/setting',
        icon: 'el-icon-setting'
    }
];
// config.setRoot('http://192.168.10.214');

export default config;
