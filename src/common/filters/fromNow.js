import Vue from 'vue';
import Moment from 'moment';
import 'moment/locale/zh-cn';

Moment.locale('zh-cn');
Vue.filter('fromNow', timestamp => {
    const date = Moment(timestamp);
    return date.fromNow();
});
