<script setup lang="ts">
// import { mdiAccount } from '@mdi/js'
</script>

<template>
  <!-- <v-card max-width="480" elevation="0" class="">
    <v-card-title class="text-center">
      <v-icon size="66" class="text-amber">mdi-wallet</v-icon>
    </v-card-title>
    <v-card>

    </v-card>
  </v-card> -->
  <v-card max-width="480" elevation="0" class="">
    <v-card-text class="text-center">
      <v-icon size="144" class="text-grey-lighten-1">mdi-wallet</v-icon>

      <div class="mt-8 mb-2 px-12">View and change current Currency Pair</div>
      <v-btn prepend-icon="mdi-cog-outline" size="x-large" block to="/settings"> Settings </v-btn>
      <div class="mt-14 mb-2 px-12">Bid Ask tables</div>
      <v-btn prepend-icon="mdi-format-columns" size="x-large" block to="/order-book">
        Order Book
      </v-btn>
    </v-card-text>
    <!-- <v-container class="">
      <v-row justify="center">
        <v-col cols="auto">
          <v-icon size="128" class="text-gray-700">mdi-wallet</v-icon>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto">
          <div>sdfsdf</div>
          <v-btn variant="outlined" prepend-icon="mdi-cog-outline"> Settings </v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto ">
          <div>sdfsdf</div>
          <v-btn variant="outlined" prepend-icon="mdi-format-columns"> Order Book </v-btn>
        </v-col>
      </v-row>
    </v-container> -->
  </v-card>
</template>
