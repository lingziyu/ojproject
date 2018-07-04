import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import History from '@/views/History'
import Login from '@/views/Login'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/history',
      name: 'History',
      component: History
    },{
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
