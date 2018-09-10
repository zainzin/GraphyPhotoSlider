import Vue from 'vue'
import Vuex from 'vuex'
import router from './router';
import {defaultClient as apolloClient} from './main';
import {GET_POSTS, SIGNIN_USER, GET_CURRENT_USER} from './queries';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false,
    user: null
  },
  mutations: {
    setPosts(state, payload) {
      state.posts = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setUser(state, payload) {
      state.user = payload;    }
  },
  actions: {
    getCurrentUser: ({commit}) => {
      commit('setLoading', true);
      apolloClient.query({
        query: GET_CURRENT_USER
      }).then(({data}) => {
        commit('setLoading', false);
        commit('setUser', data.getCurrentUser);
      }).catch(err => {
        commit('setLoading', false);
        console.error(err);
      });
    },
    async getPosts({commit}) {
      commit('setLoading', true);
      const posts = await apolloClient.query({
        query: GET_POSTS
      });
      commit('setLoading', false);
      if (posts.errors) throw posts.errors
      commit('setPosts', posts.data.getPosts);
    },
    async signinUser(_, payload) {
      const token = await apolloClient.mutate({
        mutation: SIGNIN_USER,
        variables: {
          username: payload.username,
          password: payload.password
        }
      });
      if (token.errors) throw token.errors
      localStorage.setItem('token', token.data.signinUser.token);
      router.go();
    }
  },
  getters: {
    posts: (state) => state.posts,
    loading: (state) => state.loading,
    user: (state) => state.user
  }
})
