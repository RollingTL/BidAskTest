<script setup lang="ts">
import { useOrderBook } from '@/modules/useOrderBook'
const { init, orderBook } = useOrderBook()
init()
</script>
<template>
  <div class="h-screen h-sm-auto d-flex flex-column justify-start">
    <div class="mt-16 pt-4">
      <v-card elevation="0" class="">
        <v-card-title>Order Book</v-card-title>
        <v-card-text>
          amountAsk: {{ orderBook?.asks.length }} amountBid: {{ orderBook?.bids.length }}
        </v-card-text>
      </v-card>
    </div>
    <div class="">
      <v-card elevation="0" class="mt-4">
        <v-card-title>Log</v-card-title>
        <v-divider></v-divider>
      </v-card>
    </div>
    <div class="flex-grow-1 overflow-y-scroll">
      <v-card elevation="0" class=""> <v-card-text class="">table</v-card-text> </v-card>
    </div>
  </div>
</template>
