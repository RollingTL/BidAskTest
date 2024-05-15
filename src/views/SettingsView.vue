<script setup lang="ts">
import { usePairs } from '@/modules/usePairs'
import { computed } from 'vue'

const { selectedPair, pairChangeLog } = usePairs()

const log = computed(() => {
  if (pairChangeLog.value === undefined || pairChangeLog.value.length === 0) return ':'
  else
    return pairChangeLog.value
      .slice()
      .reverse()
      .map((logItem) => {
        const formattedDate = new Intl.DateTimeFormat('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
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
  <div class="h-screen h-sm-auto d-flex flex-column justify-start">
    <div class="mt-16 pt-4">
      <v-card elevation="0" class="">
        <v-card-title>Settings</v-card-title>
        <v-card class="bg-deep-orange-lighten-4">
          <v-card-text class="text-center">
            <v-radio-group v-model="selectedPair" class="pt-2">
              <v-radio label="BTC USDT" value="BTCUSDT"></v-radio>
              <v-divider></v-divider>
              <v-radio label="BNB BTC" value="BNBBTC"></v-radio>
              <v-divider></v-divider>
              <v-radio label="ETH BTC" value="ETHBTC"></v-radio>
              <v-divider></v-divider>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-card>
    </div>
    <div class="">
      <v-card elevation="0" class="mt-4">
        <v-card-text>Log</v-card-text>
        <v-divider></v-divider>
      </v-card>
    </div>
    <div class="flex-grow-1 overflow-y-scroll">
      <v-card elevation="0" class="">
        <v-card-text class="">
          <div v-html="log" class="font-mono"></div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
