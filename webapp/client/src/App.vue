<template>
  <v-app style="background: #E3E3EE">
    <v-navigation-drawer app temporary fixed v-model="sideNav">
      <v-toolbar color="accent" dark flat>
        <v-toolbar-side-icon @click="toggleSideNav"></v-toolbar-side-icon>
        <router-link to="/" tag="span" style="cursor: pointer">
          <h1 class="title pl-3">Graphy Photo Sharing</h1>
        </router-link>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list>
        <v-list-tile :key="item.title" v-for="item in horizontalNavItems" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="user" @click="handleSignout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Signout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed color="primary" dark>
      <v-toolbar-side-icon @click="toggleSideNav"></v-toolbar-side-icon>
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span" style="cursor: pointer"></router-link>
        Graphy Photo Sharing
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field flex prepend-icon="search" placeholder="Search Posts" color="accent" single-line-hide-details></v-text-field>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat :key="item.title" v-for="item in sideNavItems" :to="item.link">
          <v-icon class="hidden-sm-only" left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>

      <v-btn flat to="/profile" v-if="user">
        <v-icon class="hidden-sm-only" left>account_box</v-icon>
        <v-badge right color="blue darken-2">
          <span slot="badge">1</span>
          Profile
        </v-badge>
      </v-btn>

      <v-btn flat @click="handleSignout" v-if="user">
        <v-icon class="hidden-sm-only" left>exit_to_app</v-icon>
          Signout
      </v-btn>

      </v-toolbar-items>
    </v-toolbar>
    <main>
      <v-container class="mt-4">
        <transition name="fade">
          <router-view/>
        </transition>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "App",
  data() {
    return {
      sideNav: false
    }
  },
  methods: {
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    },
    handleSignout() {
      
    }
  },
  computed: {
    ...mapGetters(['user']),
    horizontalNavItems() {
      if (this.user) {
        return [
          {icon: 'chat', title: 'Posts', link: "/posts"},
        ];
      } else {
        return [
          {icon: 'chat', title: 'Posts', link: "/posts"},
          {icon: 'lock_open', title: 'Sign In', link: "/signin"},
          {icon: 'create', title: 'Sign Up', link: "/signup"}
        ];
      }
    },
    sideNavItems() {
      if (this.user) {
        return [
          {icon: 'chat', title: 'Posts', link: "/posts"},
          {icon: 'stars', title: 'Create Post', link: "/post/add"},
          {icon: 'account_box', title: 'Profile', link: "/profile"},
        ];
      } else {
        return [
          {icon: 'chat', title: 'Posts', link: "/posts"},
          {icon: 'lock_open', title: 'Sign In', link: "/signin"},
          {icon: 'create', title: 'Sign Up', link: "/signup"}
        ];
      }
    }
  }
}
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition-property: all;
    transition-duration: 0.25s;
  }

  .fade-enter-active {
    transition-delay: 0.25s;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
    transform: translateY(-25px);
  }
</style>
