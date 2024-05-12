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
    <v-app-bar class="px-4" :elevation="1">
      <v-btn icon="mdi-wallet" to="/"> </v-btn>
      <v-spacer></v-spacer>
      <v-tabs class="d-none d-sm-flex">
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path"
          :title="item.title"
        >
        </v-list-item>
      </v-tabs>
      <v-menu class="">
        <template v-slot:activator="{ props }">
          <v-btn class="d-xs-flex d-sm-none" icon="mdi-dots-vertical" v-bind="props"></v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            :to="item.path"
            :title="item.title"
          >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- <router-view></router-view> -->
    <v-main class="ma-4 d-flex justify-center">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped></style>
