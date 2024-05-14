import { ref } from 'vue'
import { useDepth } from '@/modules/useDepth'
const URL = 'https://api.binance.com/api/v3/depth'

export const useOrderBook = function () {
  const { depth } = useDepth()
  const orderBook = ref<OrderBook>()

  async function init() {
    // Replace 'https://api.example.com/data' with the URL of your API
    const apiUrl = `${URL}?symbol=BTCUSDT&limit=${depth.value.toString()}`

    try {
      // Make a GET request to the API endpoint
      const response = await fetch(apiUrl)

      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      // Parse the JSON response
      const data = await response.json()

      // Process the JSON data
      console.log(data)

      orderBook.value = data
      // You can do something with the data here
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem with the fetch operation:', error)
    }
  }

  return { init, orderBook }
}
