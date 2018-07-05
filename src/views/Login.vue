<template>
  <div class="login">
    <my-header activeIndex="/login"></my-header>
    <div class="box-card">
      <el-row>
        <el-col :span="12">
          <div class="grid-content left-page">
            <h1 v-if="isLogin">登录</h1>
            <h1 v-else>注册</h1>
            <el-form class="login-form" label-position="top" label-width="80px" :model="loginForm">
              <el-form-item>
                <el-input
                  placeholder="账号"
                  type="text"
                  v-model="loginForm.userId"
                  clearable>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  placeholder="密码"
                  v-model="loginForm.password"
                  type="password"
                  clearable>
                </el-input>
              </el-form-item>
              <el-form-item v-if="!isLogin">
                <el-input
                  placeholder="确认密码"
                  v-model="loginForm.password"
                  type="password"
                  clearable>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button v-if="isLogin" type="primary" class="main-btn" @click="onSubmit()">登录</el-button>
                <el-button v-else type="primary" class="main-btn" @click="onSubmit()">注册</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12" class="back-img">
          <div class="grid-content">

          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import MyHeader from "../components/MyHeader";

  export default {
    name: 'Login',
    components: {
      MyHeader,

    },
    computed: {
      isLogin: function () {
        return this.$route.params.isLogin.toString() === 'true';
      }
    },
    data() {
      return {
        loginForm: {
          userId: "",
          password: ""
        }
      }
    },
    mounted() {

    },
    method: {
      onSubmit() {

      }
    }
  }
</script>
<style scoped>
  h1 {
    padding-bottom: .3em;
    font-size: 2.25em;
    line-height: 1.2;
    border-bottom: 1px solid #eee;
  }

  .box-card {
    width: 50%;
    margin-top: 50px;
    display: inline-block;
    background-color: white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border: 1px solid #ebeef5;
  }

  .login {
    text-align: center;
  }

  .login-form {
    text-align: left;
    padding: 20px;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 444px;
  }

  .main-btn {
    width: 100%;
  }

  .back-img {
    background: #fff url('http://img.hb.aicdn.com/df29349a50d033ba23ac98aa0ae26092f3bcb49b241ca-vvtwNh_fw658') no-repeat top right;
    background-size: cover;
    height: 100%;
    margin: 0;
    /*filter:blur(1px);*/
  }

  .left-page {
    padding: 20px;
  }
</style>



