<template>
    <div>
       <ul class="tab">
           <li v-for="item in routerArr">{{item.title}}</li>
       </ul>
   </div>
</template>

<script>

export default {
    data() {
        return {
            routerArr: []
        };
    },
    created() {
    },
    watch: {
        $route(val) {
            console.log(val);
            this.routerArr.push({
                title: val.meta.title,
                router: val.path
            });
        }
    },
    methods: {
    }
};
</script>
<style lang="stylus" scoped>
.tab
    height 40px
    background-color #f0f0f0
    padding 5px 10px
    li
        background-color #fff
        height 30px
        line-height 30px
        float left
        padding 0 25px
        border 1px solid #e9eaec
        border-radius 3px
        font-size 12px
        color #495060
        cursor pointer
</style>
