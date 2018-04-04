<template>
   <aside class="sidebar" :style="{'min-height': height + 'px'}">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            unique-opened="true"
            active-text-color="#ffd04b">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>导航二</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="2-1">路由1</el-menu-item>
                    <el-menu-item index="2-2">路由2</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">设置</span>
            </el-menu-item>
        </el-menu>
   </aside>
</template>

<script>

export default {
    data() {
        return {
            height: 0
        };
    },
    created() {
        this.resize();
        window.addEventListener('resize', this.resize);
    },
    methods: {
        resize() {
            this.height = document.documentElement.offsetHeight - 50;
        }
    }
};
</script>
<style lang="stylus" scoped>
.sidebar
    width 200px
    background-color #545c64
    float left
</style>
