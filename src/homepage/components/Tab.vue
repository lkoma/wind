<template>
    <div class="wrap">
       <ul class="tab">
           <li v-for="item in routerArr" @click="currentTab(item)">
               {{item.meta.title}}
               <i :class="{'point': true, 'active': currentRouter === item.path}"></i>
               <span class="close el-icon-close" @click.stop="close(item)" v-if="routerArr.length !== 1"></span>
            </li>
       </ul>
   </div>
</template>

<script>

export default {
    data() {
        return {
            routerArr: [],
            currentRouter: ''
        };
    },
    created() {
        this.routerArr.push(this.$route);
        this.currentRouter = this.$route.path;
    },
    watch: {
        $route(val) {
            let isAdd = true;
            this.routerArr.forEach(item => {
                if (item.path === val.path) {
                    isAdd = false;
                }
            });
            if (isAdd) {
                this.routerArr.push(this.$route);
            }
            this.$router.push(val.path);
            this.currentRouter = val.path;
        }
    },
    methods: {
        currentTab(item) {
            this.$router.push(item.path);
            this.currentRouter = item.path;
        },
        close(item) {
            const closeIndex = this.routerArr.findIndex(val => val.path === item.path);
            this.routerArr.splice(closeIndex, 1);
            if (item.path === this.currentRouter) {
                closeIndex === 0 ? this.currentTab(this.routerArr[closeIndex]) : this.currentTab(this.routerArr[closeIndex - 1]);
            }
        }
    }
};
</script>
<style lang="stylus" scoped>
.wrap
    size 100% 40px
    overflow hidden
    .tab
        min-width 100%
        height 60px
        background-color #f0f0f0
        padding 5px 10px
        overflow auto
        overflow-x scroll
        white-space nowrap
        padding-bottom 20px
        li
            background-color #fff
            display inline-block
            height 30px
            line-height 30px
            padding 0 25px
            border 1px solid #e9eaec
            border-radius 3px
            font-size 12px
            color #495060
            cursor pointer
            position relative
            margin-right 5px
            &:hover
                transition all .5s
                background-color #f5f5f5
            .close
                size 20px 30px
                position absolute
                top 0
                right 0
                &:before
                    position absolute
                    top 50%
                    right 8px
                    transform translateY(-50%)
            .point
                size 12px
                border-radius 50%
                background-color #f0f0f0
                position absolute
                top 50%
                left 8px
                transform translateY(-50%)
                transition all .3s
                &.active
                    background-color #ffd04b
</style>
