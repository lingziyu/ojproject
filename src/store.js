import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      token: '',
      uid: ''
    }
  },
  mutations: {
    setToken(state, token){
      state.user.token = token;
    },
    setUID(state,uid){
      state.user.uid = uid;
    },
    reset(){
      state.token = '';
    }
  },
  actions: {

  }
})
