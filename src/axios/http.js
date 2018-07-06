import axios from 'axios'
import store from '../store'
import router from '../router/index'
// http request 拦截器
axios.create({timeout: 1000});

axios.interceptors.request.use(
  config => {
    if (store.state.user.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `${store.state.user.token}`;
    }
    else if(sessionStorage.token){
      store.state.user.token = sessionStorage.token;
      store.state.user.uid = sessionStorage.uid;
      config.headers.Authorization = `${store.state.user.token}`;
    }
    return config;
  },
  err => {
    return err;
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          this.$store.commit('setToken', '');
          router.replace({
            path: '/login/true',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    return error;   // 返回接口返回的错误信息
  });

export default axios
