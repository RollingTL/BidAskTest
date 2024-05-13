<script setup lang="ts">
import { usePairs } from '@/modules/usePairs'
import { computed } from 'vue'

const { selectedPair, pairChangeLog } = usePairs()

const log = computed(() => {
  return pairChangeLog.value
    .slice()
    .reverse()
    .map((logItem) => {
      const formattedDate = new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        // year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      }).format(logItem.time)

      return `${formattedDate} ${logItem.prevPair} ${logItem.newPair}`
    })
    .join('<br/>')
})
</script>
<template>
  <v-card elevation="0" max-width="680" class="w-auto-100 w-100">
    <v-card-title>Settings</v-card-title>
    <v-card class="bg-amber-accent-2">
      <v-card-text class="text-center text-center">
        <v-radio-group v-model="selectedPair" class="pt-8">
          <v-radio label="BTC USDT" value="BTCUSDT"></v-radio>
          <v-divider></v-divider>
          <v-radio label="BNB BTC" value="BNBBTC"></v-radio>
          <v-divider></v-divider>
          <v-radio label="ETH BTC" value="ETHBTC"></v-radio>
          <v-divider></v-divider>
        </v-radio-group>
      </v-card-text>
    </v-card>
    <!-- <v-divider></v-divider> -->
    <v-card class="w-100 mt-2">
      <v-card-title>Log</v-card-title>
      <v-card-text class="w-100">
        <v-sheet
          height="400"
          class="overflow-y-scroll pr-2 w-full w-100 bg-transparent text-body-2"
        >
          <div v-html="log" class="font-mono overflow-y-scroll w-100 bg-transparent"></div>
        </v-sheet>
      </v-card-text>
    </v-card>
  </v-card>
</template>
