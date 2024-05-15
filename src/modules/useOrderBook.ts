import { ref, readonly } from 'vue'
import { useDepth } from '@/modules/useDepth'
import { usePairs } from '@/modules/usePairs'
const URL = 'https://api.binance.com/api/v3/depth'
const orderBook = ref<OrderBook>()
const loadingState = ref<LoadingState>('idle')

const { depth } = useDepth()
const { selectedPair } = usePairs()

export const useOrderBook = function () {
  async function fetchData() {
    loadingState.value = 'loading'
    const apiUrl = `${URL}?symbol=${selectedPair.value}&limit=${depth.value.toString()}`

    try {
      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()

      orderBook.value = data
      loadingState.value = 'idle'
    } catch (error) {
      loadingState.value = 'idle'
      console.error('There was a problem with the fetch operation:', error)
      throw new Error('Network response has error')
    }
  }

  const initOrderBook = async () => {
    if (loadingState.value !== 'loading') {
      orderBook.value = undefined
      await fetchData()
    }
  }

  const clearOrderBook = () => {
    orderBook.value = undefined
  }

  const updateOrderBook = (depthUpdates: DepthUpdate[]) => {
    if (!orderBook.value) return
    while (depthUpdates.length > 0) {
      const item = depthUpdates.shift()
      if (item) {
        if (!('u' in item)) return
        if (!('U' in item)) return
        const uFinal = item.u
        const UFrom = item.U
        const lastUpdateId = orderBook.value.lastUpdateId

        if (UFrom <= lastUpdateId + 1 && uFinal >= lastUpdateId + 1) {
          updateOrAddOrDel(orderBook.value.bids, item.b)
          updateOrAddOrDel(orderBook.value.asks, item.a)
          // Sort the array in descending order
          orderBook.value.bids.sort((a, b) => Number(b[0]) - Number(a[0]))
          // Sort the array in ascending order
          orderBook.value.asks.sort((a, b) => Number(a[0]) - Number(b[0]))

          removeItemsToMeetLimit(orderBook.value.bids, depth.value)
          removeItemsToMeetLimit(orderBook.value.asks, depth.value)
          orderBook.value.lastUpdateId = uFinal + 1
        }
      }
    }

    function updateOrAddOrDel(base: [string, string][], diff: [string, string][]): void {
      for (const [diffKey, diffValue] of diff) {
        const numericDiffValue = Number(diffValue)
        if (numericDiffValue === 0) {
          const indexToRemove = base.findIndex(([baseKey, _value]) => baseKey === diffKey)
          if (indexToRemove !== -1) {
            base.splice(indexToRemove, 1)
          }
        } else {
          const foundIndex = base.findIndex(([baseKey, _value]) => baseKey === diffKey)
          if (foundIndex !== -1) {
            base[foundIndex][1] = diffValue
          } else {
            base.push([diffKey, diffValue])
          }
        }
      }
    }

    function removeItemsToMeetLimit(arr: [string, string][], limit: number) {
      if (arr.length > limit) {
        arr.splice(0, arr.length - limit)
      }
    }
    return
  }

  return { orderBook: readonly(orderBook), updateOrderBook, initOrderBook, clearOrderBook }
}
