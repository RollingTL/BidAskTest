<script setup lang="ts">
import { watch } from 'vue'
import { useOrderBook } from '@/modules/useOrderBook'
import { useDepth } from '@/modules/useDepth'
const { init, orderBook } = useOrderBook()
const { depth } = useDepth()
init()

watch(depth, (newValue, oldValue) => {
  console.log('depth changed from', oldValue, 'to', newValue)
})
</script>
<template>
  <div class="h-screen h-sm-auto d-flex flex-column justify-start">
    <div class="mt-16 pt-4">
      <div>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn variant="tonal" v-bind="props"> {{ depth }} </v-btn>
          </template>
          <v-list>
            <v-list-item :value="100" @click="depth = 100">
              <v-list-item-title>{{ '100' }}</v-list-item-title>
            </v-list-item>
            <v-list-item :value="500" @click="depth = 500">
              <v-list-item-title>{{ '500' }}</v-list-item-title>
            </v-list-item>
            <v-list-item :value="1000" @click="depth = 1000">
              <v-list-item-title>{{ '1000' }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-card elevation="0" class="">
        <v-card-title>Order Book</v-card-title>
        <v-card-text>
          amountAsk: {{ orderBook?.asks.length }} amountBid: {{ orderBook?.bids.length }}
        </v-card-text>
        <v-card-text> depth: {{ depth }} </v-card-text>
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
