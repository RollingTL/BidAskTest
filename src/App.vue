<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Vue logo" class="" src="@/assets/logo.svg" width="125" height="125" />

    <div class="">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/settings">Settings</RouterLink>
        <RouterLink to="/order-book">Order Book</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
  <div class="test">
    sdfs
    <v-icon icon="mdi-home" />
  </div>
  <div>
    <v-card text="...aaa" variant="tonal"></v-card>
  </div>
</template>

<style scoped>
.test {
  color: red;
}
</style>
