import { ref } from 'vue'
import { useDepth } from '@/modules/useDepth'
import { usePairs } from '@/modules/usePairs'
const URL = 'https://api.binance.com/api/v3/depth'
const orderBook = ref<OrderBook>()
const loadingState = ref<LoadingState>('idle')

export const useOrderBook = function () {
  const { depth } = useDepth()
  const { selectedPair } = usePairs()
  loadingState.value = 'idle'

  async function init() {
    loadingState.value = 'loading'
    const apiUrl = `${URL}?symbol=${selectedPair.value}&limit=${depth.value.toString()}`

    try {
      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      console.log('+++++++++++')
      console.log(data)

      orderBook.value = data
      loadingState.value = 'complete'
    } catch (error) {
      loadingState.value = 'error'
      console.error('There was a problem with the fetch operation:', error)
    }
  }

  const updateOrderBook = (depthUpdates: DepthUpdate[]) => {
    if (loadingState.value === 'idle') {
      init()
      return
    }
    if (loadingState.value !== 'complete') return

    if (!orderBook.value) {
      return
    }

    while (depthUpdates.length > 0) {
      const item = depthUpdates.shift()
      if (item) {
        if (!('u' in item)) return
        if (!('U' in item)) return
        const uFinal = item.u
        const UFrom = item.U
        const lastUpdateId = orderBook.value.lastUpdateId

        if (UFrom <= lastUpdateId + 1 && uFinal >= lastUpdateId + 1) {
          updateOrAdd(orderBook.value.bids, item.b)
          updateOrAdd(orderBook.value.asks, item.a)
          // Sort the array in descending order
          orderBook.value.bids.sort((a, b) => Number(b[0]) - Number(a[0]))
          // Sort the array in ascending order
          orderBook.value.asks.sort((a, b) => Number(a[0]) - Number(b[0]))
          orderBook.value.lastUpdateId = uFinal + 1
        }
      }
    }

    function updateOrAdd(base: [string, string][], diff: [string, string][]): void {
      for (const [diffKey, diffValue] of diff) {
        const numericDiffValue = Number(diffValue)
        if (numericDiffValue === 0) {
          // Remove base element with equal key
          const indexToRemove = base.findIndex(([baseKey, _]) => baseKey === diffKey)
          if (indexToRemove !== -1) {
            base.splice(indexToRemove, 1)
          }
        } else {
          const foundIndex = base.findIndex(([baseKey, _]) => baseKey === diffKey)
          if (foundIndex !== -1) {
            // Update existing element in base
            base[foundIndex][1] = diffValue
          } else {
            // Add new element from diff to base
            base.push([diffKey, diffValue])
          }
        }
      }
    }

    return
  }

  return { init, orderBook, loadingState, updateOrderBook }
}
