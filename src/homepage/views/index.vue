<template>
   <div class="homepage">
       <header class="header">
           <h1>文博后台管理系统</h1>
       </header>
       <side-bar></side-bar>
       <main class="main">
           hahaha
       </main>
   </div>
</template>

<script>
import SideBar from 'homepage/components/SideBar';

export default {
    components: {
        SideBar
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
.homepage
    height 100%
    .header
        height 50px
        line-height 48px
        border-bottom 2px solid #545c64
    .main
        padding-left 200px
</style>
