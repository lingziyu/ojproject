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
      <el-menu-item index="/"><img style="width: 30px" src="../assets/logo.png">题库</el-menu-item>
      <el-menu-item index="/history">提交历史</el-menu-item>
      <el-menu-item index="/login">登录</el-menu-item>

    </el-menu>
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
