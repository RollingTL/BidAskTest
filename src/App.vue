<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'

const drawer = ref(false)
// import NavBar from './components/NavBar.vue'
const menuItems = [
  { title: 'Home', path: '/', icon: 'home' },
  { title: 'Settings', path: '/settings', icon: 'home' },
  { title: 'Order Book', path: '/order-book', icon: 'home' }
]
</script>

<template>
  <v-app id="inspire" class="h-auto w-auto">
    <v-app-bar>
      <v-btn icon="mdi-wallet" link to="/"> </v-btn>
      <v-spacer></v-spacer>
      <v-tabs class="d-none d-sm-flex">
        <v-list-item link to="/settings" title="Settings"></v-list-item>
        <v-list-item link to="/order-book" title="Order Book"></v-list-item>
      </v-tabs>
      <v-menu class="">
        <template v-slot:activator="{ props }">
          <v-btn class="d-xs-flex d-sm-none" icon="mdi-dots-vertical" v-bind="props"></v-btn>
        </template>
        <v-list>
          <v-list-item link to="/" title="Home"></v-list-item>
          <v-list-item link to="/settings" title="Settings"></v-list-item>
          <v-list-item link to="/order-book" title="Order Book"></v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- <router-view></router-view> -->
    <v-main class="d-flex align-center justify-center">
      <router-view></router-view>
    </v-main>
  </v-app>
  <!-- <v-app>
    <v-navigation-drawer v-model="drawer" location="right">
      <v-list>
        <v-list-item link to="/" title="Home"></v-list-item>
        <v-list-item link to="/settings" title="Settings"></v-list-item>
        <v-list-item link to="/order-book" title="Order Book"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" style="cursor: pointer"> App Title </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app> -->
</template>

<style lang="scss" scoped></style>
