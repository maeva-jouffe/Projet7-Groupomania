import { createStore } from 'vuex';
// import axios from 'axios';

export default createStore({
  state: {
    token: '',
    isAuthenticated: false,
  },
  mutations: {
    //si le localStorage contient un token, on est considéré comme authentifié
    initializeStore(state) {
      if (localStorage.getItem('User')) {
        const user = localStorage.getItem('User');
        const token = user.token;
        state.token = token
        state.isAuthenticated = true
      } else {
        state.token = ''
        state.isAuthenticated = false
      }
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    //Log out
    removeToken(state) {
      state.token = ''
      state.isAuthenticated = false
    }

  }
})