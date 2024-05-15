<script setup lang="ts">
import { watch, onUnmounted } from 'vue'
import { useOrderBook } from '@/modules/useOrderBook'
import { useEvents } from '@/modules/useEvents'
import { useDepth } from '@/modules/useDepth'
import { usePairs } from '@/modules/usePairs'
const { orderBook } = useOrderBook()
const { start, stop } = useEvents()
const { depth } = useDepth()
const { selectedPair } = usePairs()

start()

watch(depth, async () => {
  stop()
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
  start()
})

onUnmounted(() => {
  stop()
})
</script>
<template>
  <div class="h-screen h-sm-auto d-flex flex-column justify-start">
    <div class="mt-16 pt-4">
      <v-card elevation="0" class="position-relative">
        <v-card-title
          >Order Book
          <div class="depth-selector d-flex align-baseline">
            <div class="text-subtitle-2 pr-1">
              <span class="pr-2">{{ selectedPair }}</span> Depth:
            </div>
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
      </v-card>
    </div>

    <div class="">
      <div class="d-flex pt-4">
        <div class="flex-grow-1 pl-2 pr-2">
          <div class="head-table">
            <div class="grid-item first text-center text-sm-left">Bid price</div>
            <div class="grid-item second text-center text-sm-right">Amount</div>
            <div class="grid-item third text-center text-sm-right hidden-xs hidden-sm">Value</div>
          </div>
        </div>
        <div class="flex-grow-1 pl-2 pr-2">
          <div class="head-table">
            <div class="grid-item first text-center text-sm-left">Ask price</div>
            <div class="grid-item second text-center text-sm-right">Amount</div>
            <div class="grid-item third text-center text-sm-right hidden-xs hidden-sm">Value</div>
          </div>
        </div>
      </div>
    </div>

    <div class="overflow-y-scroll">
      <div v-if="orderBook" class="d-flex text-mono text-right pt-4 pb-8">
        <div class="flex-grow-1 pl-2 pr-2">
          <div v-if="orderBook">
            <div v-for="(item, index) in orderBook.bids" :key="index + item[0]" class="data-table">
              <div class="grid-item first">{{ item[0].slice(0, -2) }}</div>
              <div class="grid-item second">{{ item[1].slice(0, -2) }}</div>
              <div class="grid-item third hidden-xs hidden-sm">
                {{ (Number(item[0]) * Number(item[1])).toFixed(2) }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex-grow-1 pl-2 pr-2">
          <div v-if="orderBook">
            <div v-for="(item, index) in orderBook.asks" :key="index + item[0]" class="data-table">
              <div class="grid-item first">{{ item[0].slice(0, -2) }}</div>
              <div class="grid-item second">{{ item[1].slice(0, -2) }}</div>
              <div class="grid-item third hidden-xs hidden-sm">
                {{ (Number(item[0]) * Number(item[1])).toFixed(2) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="ma-12 d-flex justify-center">
        <v-progress-circular :size="60" indeterminate></v-progress-circular>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.depth-selector {
  position: absolute;
  right: 1rem;
  top: 5px;
}

.head-table,
.data-table {
  display: grid;
  grid-template-columns: 104px 1fr;
  grid-gap: 0;
  border-collapse: collapse;
  .grid-item {
    background-color: white;
    border-bottom: 1px solid #ccc;
    padding: 4px;
    box-sizing: border-box;
  }
  .grid-item.second {
    background-color: #f2f2f2;
  }
  font-size: 10px;
  @media (min-width: 960px) {
    font-size: 12px;
    grid-template-columns: 112px 112px 1fr;
  }
}
.head-table {
  font-weight: bold;
  .grid-item {
    border-top: 1px solid #aaa;
    border-bottom: 1px solid #aaa;
    padding: 10px;
  }
}
</style>
