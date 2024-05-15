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

watch(depth, async (newValue, oldValue) => {
  console.log('depth changed from', oldValue, 'to', newValue)
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
        <v-card-subtitle>{{ selectedPair }}</v-card-subtitle>
      </v-card>
    </div>

    <div class="d-flex justify-space-between pt-4">
      <div class="flex-grow-1 pr-0 pr-sm-4">
        <table class="head-table">
          <tr>
            <td class="first text-center text-sm-left">Bid price</td>
            <td class="second text-center text-sm-right">Amount</td>
            <td class="third text-center text-sm-right hidden-xs hidden-sm">Value</td>
          </tr>
        </table>
      </div>
      <div class="flex-grow-1 pl-0 pl-sm-4">
        <table class="head-table">
          <tr>
            <td class="first text-center text-sm-left">Ask price</td>
            <td class="second text-center text-sm-right">Amount</td>
            <td class="third text-center text-sm-right hidden-xs hidden-sm">Value</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="flex-grow-1 overflow-y-scroll">
      <div v-if="orderBook" class="d-flex text-mono text-right pt-4 pb-8">
        <div class="flex-grow-1 pr-1 pr-sm-4">
          <table class="data-table" v-if="orderBook">
            <tr v-for="(item, index) in orderBook.bids" :key="index + item[0]">
              <td class="first">{{ item[0].slice(0, -2) }}</td>
              <td class="second">{{ item[1].slice(0, -2) }}</td>
              <td class="third hidden-xs hidden-sm">
                {{ (Number(item[0]) * Number(item[1])).toFixed(2) }}
              </td>
            </tr>
          </table>
        </div>

        <div class="flex-grow-1 pl-0 pl-sm-4 pr-2 pr-sm-0">
          <table class="data-table" v-if="orderBook">
            <tr v-for="(item, index) in orderBook.asks" :key="index + item[0]">
              <td class="first">{{ item[0].slice(0, -2) }}</td>
              <td class="second">{{ item[1].slice(0, -2) }}</td>
              <td class="third hidden-xs hidden-sm">
                {{ (Number(item[0]) * Number(item[1])).toFixed(2) }}
              </td>
            </tr>
          </table>
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

table {
  width: 100%;
  border-collapse: collapse;
  box-sizing: border-box;
}
.head-table {
  td {
    padding: 0 4px 4px 4px;
    border-bottom: 2px solid black;
    font-weight: bold;
    font-size: 11px;
    @media (min-width: 960px) {
      font-size: 12px;
    }
  }
  td.first {
    width: 100px;
    // background-color: aqua;
  }
  td.second {
    // background-color: mediumseagreen;
    @media (min-width: 960px) {
      /* Increase font size for td on larger screens */
      width: 100px;
    }
  }
  td.third {
    background-color: rgb(234, 234, 234);
  }
}
.data-table {
  td {
    padding: 0 4px 0 4px;
    font-size: 11px;
    border-bottom: 1px solid black;
    @media (min-width: 960px) {
      font-size: 12px;
    }
  }

  td.first {
    width: 100px;
    // background-color: aqua;
  }

  td.second {
    @media (min-width: 960px) {
      /* Increase font size for td on larger screens */
      width: 100px;
    }
    // background-color: mediumseagreen;
  }
  td.third {
    background-color: rgb(234, 234, 234);
  }
}
</style>
