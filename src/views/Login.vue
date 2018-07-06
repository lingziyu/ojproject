<template>
  <div class="login">
    <my-header activeIndex="/login"></my-header>
    <div class="box-card">
      <el-row>
        <el-col :span="12">
          <div class="grid-content left-page">
            <h1 v-if="isLogin">登录</h1>
            <h1 v-else>注册</h1>
            <el-form class="login-form" label-position="top" label-width="80px" :model="loginForm" status-icon
                     :rules="rules2">
              <el-form-item>
                <el-input
                  placeholder="账号"
                  type="text"
                  v-model="loginForm.uid"
                  clearable>
                </el-input>
              </el-form-item>
              <el-form-item v-if="isLogin">
                <el-input
                  placeholder="密码"
                  v-model="loginForm.password"
                  type="password">
                </el-input>
              </el-form-item>
              <el-form-item v-if="!isLogin" prop="password">
                <el-input
                  placeholder="密码"
                  v-model="loginForm.password"
                  type="password">
                </el-input>
              </el-form-item>
              <el-form-item v-if="!isLogin" prop="checkPass">
                <el-input
                  placeholder="确认密码"
                  v-model="loginForm.checkPass"
                  type="password">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button v-if="isLogin" type="primary" class="main-btn" @click="onLogin">登录</el-button>
                <el-button v-else type="primary" class="main-btn" @click="onRegister">注册</el-button>
              </el-form-item>
              <el-form-item class="arrow">
                <a type="primary" href="#/login/false" icon="el-icon-arrow-left" v-if="isLogin"><i class="el-icon-back"></i>&nbsp;没有账号，注册</a>
                <a type="primary" href="#/login/true" icon="el-icon-arrow-left" v-else><i class="el-icon-back"></i>&nbsp;已有账号，登录</a>
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
  import axios from '../axios/http';
  import server from '../../config/index';


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
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.loginForm.checkPass !== '') {
            this.$refs.loginForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.loginForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        url: server.url + '/api/user',
        loginForm: {
          uid: "",
          password: "",
          checkPass: ""
        },
        rules2: {
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {

    },
    methods: {
      onRegister: function () {
        axios.post(this.url + '/register', {
          "uid": this.loginForm.uid,
          "password": this.loginForm.password,
          "isManager": false
        }).then(response => {
            if (response.status !== 200) {
              throw response;
            }
            else {
              this.$message({
                message: '注册成功',
                type: 'success'
              });
              this.$store.commit('setToken', response.data.token);
              this.$store.commit('setUID', this.loginForm.uid);
              sessionStorage.setItem('token', response.data.token);
              sessionStorage.setItem('uid', this.loginForm.uid);
              this.$router.push('/history');
            }
          }
        ).catch((error) => {
          if(error.response) {
            switch (error.response.status) {
              case 404:
                this.$message.error('用户名已存在');
                break;
              default:
                this.$message.error('未知错误');
            }
          }
          else{
            console.log(error);
          }
        });
      },
      onLogin: function () {
        axios.post(this.url + '/login', this.loginForm).then(response => {
            if (response.status !== 200) {
              throw response;
            }
            else {
              this.$message({
                message: '登陆成功',
                type: 'success'
              });
              this.$store.commit('setToken', response.data.token);
              this.$store.commit('setRole',response.data.role);
              this.$store.commit('setUID', this.loginForm.uid);
              sessionStorage.setItem('token', response.data.token);
              this.$store.commit('setRole',response.data.role);
              sessionStorage.setItem('uid', this.loginForm.uid);
              this.$router.push('/history');
            }
          }
        ).catch((error) => {
          if (error.response) {
            switch (error.response.status) {
              case 401:
                this.$message.error('密码错误');
                break;
              case 404:
                this.$message.error('用户不存在');
                break;
              default:
                this.$message.error('未知错误');
            }
          }
          else{
            console.log(error);
          }
        });
      },

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

  .arrow >>> a{
    text-decoration: none;
    color: #409EFF;;
  }
</style>



