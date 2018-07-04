<template>
  <div class="my-header">
    <el-menu
      :router="isRounter"
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/"><img style="width: 30px;margin-right: 20px" src="../assets/logo.png">题库</el-menu-item>
      <el-menu-item index="/history">提交历史</el-menu-item>
    </el-menu>
    <el-row class="btn-set">
      <el-button round v-on:click="register()">注册</el-button>
      <el-button type="primary" round v-on:click="login()">登录</el-button>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'MyHeader',
    props: ['activeIndex'],
    data() {
      return {
        isRounter: true,
      }
    },
    methods:{
      register () {

      },
      login () {
        this.$router.push({path: '/login'});
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-set{
  float: right;
  margin-top: -50px;
  margin-right: 10px;
}
</style>
