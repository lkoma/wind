<template>
   <div class="homepage">
       <header class="header">
           <h1>文博后台管理系统</h1>
       </header>
       <side-bar></side-bar>
       <main class="main">
            <tab></tab>
           <transition name="fade" mode="out-in">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
           </transition>
       </main>
   </div>
</template>

<script>
import SideBar from 'homepage/components/SideBar';
import Tab from 'homepage/components/Tab';

export default {
    components: {
        SideBar,
        Tab
    },
    data() {
        return {
        };
    },
    created() {
    },
    methods: {
    }
};
</script>
<style lang="stylus" scoped>
.fade-enter-active, .fade-leave-active
    transition opacity .3s
.fade-enter, .fade-leave-to
    opacity 0
.homepage
    height 100%
    .header
        height 50px
        line-height 48px
        border-bottom 2px solid #545c64
    .main
        padding-left 200px
</style>
