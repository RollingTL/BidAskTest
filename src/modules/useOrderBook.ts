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

  return { init, orderBook, loadingState }
}
