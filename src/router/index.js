import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import History from '@/views/History'
import Login from '@/views/Login'
import Problem from '@/views/Problem'
import store from '../store'
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        requireAuth: true
      },
      component: Home
    },{
      path: '/history',
      name: 'History',
      meta: {
        requireAuth: true
      },
      component: History
    },{
      path: '/login/:isLogin',
      name: 'Login',
      component: Login
    },{
      path: '/problem/:pid',
      name: 'Problem',
      meta: {
        requireAuth: true
      },
      component: Problem
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
    if(store.state.user.token){// 判断是否登录
      next()
    }
    else if(sessionStorage.token){
      store.state.user.token = sessionStorage.token;
      store.state.user.uid = sessionStorage.uid;
      next()
    }
    else {// 没登录则跳转到登录界面
      next({
        path: '/login/true',
        query: {redirect: to.fullPath}
      })
    }
  }
  else {
    next()
  }
});

export default router
