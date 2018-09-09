import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';

Vue.use(VueApollo);

Vue.config.productionTip = false

export const defaultClient = new ApolloClient({
  uri: 'http://localhost:4500/graphql',
  fetchOptions: {
    credentials: 'include'
  },
  request: (operation) => {
    if (!localStorage.getItem('token')) {
      localStorage.setItem('token', '');
    }
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
  },
  onError: ({graphQLErrors, networkError}) => {
    if (networkError) {
      console.error('Network error', networkError);
    }
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.dir(err);
      }
    }
  }
});

const apolloProvider = new VueApollo({
  defaultClient
});

new Vue({
  provide: apolloProvider.provide(),
  router,
  store,
  render: h => h(App),
  created() {
    this.$store.dispatch('getCurrentUser');
  }
}).$mount('#app')
