<script setup lang="ts">
// import { mdiAccount } from '@mdi/js'
</script>

<template>
  <v-card max-width="680" elevation="0" class="bg-amber-accent-2 w-100">
    <v-card-title>Test task</v-card-title>
    <v-card-text class="text-center">
      <v-icon size="144" class="text-grey-lighten-1">mdi-wallet</v-icon>
      <v-container class="">
        <v-row no-gutters class="">
          <v-col class="align-self-stretch">
            <v-sheet class="pa-6 ma-2 bg-grey-lighten-4">
              <v-sheet
                class="px-12 d-flex align-center justify-center bg-transparent font-weight-bold"
                height="70"
                >View and change current Pair</v-sheet
              >
              <v-btn prepend-icon="mdi-cog-outline" size="large" block to="/settings">
                Settings
              </v-btn>
            </v-sheet>
          </v-col>
          <v-col class="align-self-stretch">
            <v-sheet class="pa-6 ma-2 bg-grey-lighten-4">
              <v-sheet
                class="px-12 d-flex align-center justify-center bg-transparent font-weight-bold"
                height="70"
                >Bid Ask table</v-sheet
              >
              <v-btn prepend-icon="mdi-format-columns" size="large" block to="/order-book">
                Order Book
              </v-btn>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
