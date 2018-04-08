<template>
   <aside class="sidebar" :style="{'min-height': height + 'px'}">
        <el-menu
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            unique-opened="true"
            active-text-color="#ffd04b">
            <template v-for="submenu in menu">
                <el-submenu :index="submenu.menuItem" v-if="submenu.children">
                    <template slot="title">
                        <i :class="submenu.icon"></i>
                        <span>{{submenu.menuItem}}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item
                            :index="menuItem.router"
                            v-for="menuItem in submenu.children"
                            :key="submenu.menuItem"
                            @click="open(menuItem.router)">
                            {{menuItem.menuItem}}
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item :index="submenu.router" v-else @click="open(submenu.router)">
                    <i :class="submenu.icon"></i>
                    <span slot="title">{{submenu.menuItem}}</span>
                </el-menu-item>
            </template>
        </el-menu>
   </aside>
</template>

<script>
import config from 'src/homepage/config';

export default {
    data() {
        return {
            height: 0,
            menu: config.menu,
            defaultActive: '/'
        };
    },
    created() {
        this.resize();
        window.addEventListener('resize', this.resize);
        this.defaultActive = this.$route.path;
    },
    methods: {
        resize() {
            this.height = document.documentElement.offsetHeight - 50;
        },
        open(item) {
            this.$router.push(item);
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
