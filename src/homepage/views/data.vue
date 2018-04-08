<template>
   <div>
       <el-input v-model="input" placeholder="请输入内容"></el-input>
       <el-button type="primary" @click="submit">主要按钮</el-button>
   </div>
</template>

<script>

export default {
    data() {
        return {
            input: ''
        };
    },
    created() {
    },
    methods: {
        submit() {
            console.log(this.input);
        }
    }
};
</script>
<style lang="stylus" scoped>
</style>
