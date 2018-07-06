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
      <el-menu-item  index="/adminhome" v-if="isAdmin"><img style="width: 30px;margin-right: 20px" src="../assets/logo.png">题库</el-menu-item>
      <el-menu-item  index="/" v-else><img style="width: 30px;margin-right: 20px" src="../assets/logo.png">题库</el-menu-item>
      <el-menu-item index="/history">提交历史</el-menu-item>
    </el-menu>
    <el-row class="btn-set" v-if="isLogin">
      <el-button round v-on:click="logout()">退出</el-button>
    </el-row>
    <el-row class="btn-set" v-else>
      <el-button round v-on:click="register()">注册</el-button>
      <el-button type="primary" round v-on:click="login()">登录</el-button>
    </el-row>
  </div>
</template>

<script>
  import ElButton from "element-ui/packages/button/src/button";

  export default {
    components: {ElButton},
    name: 'MyHeader',
    props: ['activeIndex'],
    data() {
      return {
        isRounter: true,
      }
    },
    computed: {
      isLogin: function () {
        return this.$store.state.user.token
      },
      isAdmin: function () {
        return this.$store.state.user.role === 1
      }
    },
    methods: {
      register() {
        this.$router.push({name: 'Login', params: {isLogin: false}});
      },
      login() {
        this.$router.push({name: 'Login', params: {isLogin: true}});
      },
      logout() {
        this.$store.commit('setToken', '');
        sessionStorage.setItem('token', '');
        this.$router.push({name: 'Login', params: {isLogin: true}});
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .btn-set {
    float: right;
    margin-top: -50px;
    margin-right: 10px;
  }
</style>
