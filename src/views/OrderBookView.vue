<script setup lang="ts">
import { watch } from 'vue'
import { useOrderBook } from '@/modules/useOrderBook'
import { useEvents } from '@/modules/useEvents'
import { useDepth } from '@/modules/useDepth'
import { usePairs } from '@/modules/usePairs'
const { orderBook } = useOrderBook()
const { start, stop } = useEvents()
const { depth } = useDepth()
const { selectedPair } = usePairs()

// init()

const startProcess = () => {
  start()
}
const stopProcess = () => {
  stop()
}

watch(depth, (newValue, oldValue) => {
  console.log('depth changed from', oldValue, 'to', newValue)
})
</script>
<template>
  <div class="h-screen h-sm-auto d-flex flex-column justify-start">
    <div class="mt-16 pt-4">
      <v-card elevation="0" class="position-relative">
        <v-card-title
          >Order Book - {{ selectedPair }}
          <div class="depth-selector d-flex align-baseline">
            <div class="text-subtitle-2 pr-2">Depth:</div>
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
        </v-card-title>

        <!-- <v-card-text>
          amountAsk: {{ orderBook?.asks.length }} amountBid: {{ orderBook?.bids.length }}
        </v-card-text>
        <v-card-text> depth: {{ depth }} </v-card-text>
        <v-card-text> events: {{ eventData.length }} </v-card-text> -->
      </v-card>
      <v-card>
        <v-card-text>
          <v-btn @click="startProcess">Start</v-btn>
          <v-btn @click="stopProcess">Stop</v-btn>
        </v-card-text>
      </v-card>
    </div>

    <div class="d-flex pt-4">
      <div class="flex-grow-1">
        <table class="head-table">
          <tr>
            <td>Bid value</td>
            <td class="text-right">amount</td>
          </tr>
        </table>
      </div>
      <div class="flex-grow-1">
        <table class="head-table">
          <tr>
            <td>Ask value</td>
            <td class="text-right">amount</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="flex-grow-1 overflow-y-scroll">
      <div class="d-flex text-mono text-right">
        <div class="flex-grow-1">
          <table class="data-table" v-if="orderBook">
            <tr v-for="(item, index) in orderBook.bids" :key="index + item[0]">
              <td>{{ item[0] }}</td>
              <td>{{ item[1] }}</td>
            </tr>
          </table>
        </div>

        <div class="flex-grow-1">
          <table class="data-table" v-if="orderBook">
            <tr v-for="(item, index) in orderBook.asks" :key="index + item[0]">
              <!-- <td>{{ item[0].toString().slice(0, -6) }}</td>
              <td>{{ item[1].toString().slice(0, -3) }}</td> -->
              <td>{{ item[0] }}</td>
              <td>{{ item[1] }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.depth-selector {
  position: absolute;
  right: 0;
  top: 5px;
}

table {
  width: max-content;
  // padding: 0 4px 0 4px;
  border-collapse: collapse;
  // border: 1px solid black;
  tr {
  }
}
.head-table {
  td {
    width: 90px;
    padding: 3px 2px 1px 6px;
    // font-size: 10px;

    // border-bottom: 0;
  }
}
.data-table {
  td {
    width: 90px;
    padding: 3px 2px 1px 6px;
    font-size: 12px;
    border-bottom: 1px solid black;
  }
}
</style>
