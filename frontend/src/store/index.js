import { createStore } from 'vuex'

//Configuration d'axios
const axios = require('axios');
const instance = axios.create({ baseURL: 'http://localhost:3000/api' });

let user = localStorage.getItem('user');
if (!user) {
  user = {
    userId: -1,
    token: '',
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = user.token;
  } catch{
  user = {
    userId: -1,
    token: '',
  };
  }
}
export default createStore({
  state: {
    status: '',
    user: user,
    userInfos: {
      email: '',
      first_name: '',
      last_name: '',
    }
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      instance.defaults.headers.common['Authorization'] = user.token;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
  },
  actions: {
    //Création de la méthode createAccount qui crée le compte
    createAccount: ({ commit }, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/auth/signup', userInfos)
          .then(function (response) {
            commit('setStatus', 'created');
            resolve(response);
          })
          .catch(function (error) {
            commit('setStatus', 'error_create');
            reject(error);
          });
      });
    },
    //Création de la méthode login qui crée la connexion au compte
    login: ({ commit }, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/auth/login', userInfos)
          .then(function (response) {
            commit('setStatus', '');
            commit('logUser', response.data);
            resolve(response);
          })
          .catch(function (error) {
            commit('setStatus', 'error_login');
            reject(error);
          });
      });
    },
    //Création de la méthode getOneUser qui récupère les infos de l'utilisateur
    getOneUser: ({ commit }) => {
      instance.get('/auth/:id')
        .then(function (response) {
          commit('userInfos', response.data);
        })
        .catch(function () {
        });  
    }
  },
  modules: {
  }
})
