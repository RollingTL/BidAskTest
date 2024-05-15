import { ref, onUnmounted } from 'vue'
import { useOrderBook } from '@/modules/useOrderBook'
import { usePairs } from '@/modules/usePairs'

const { init: initOrderBook, orderBook, loadingState: orderBookLoadingState } = useOrderBook()
// BTCUSDT, BNBBTC, ETHBTC

const endpoint: string = 'wss://stream.binance.com:9443/ws/'
let pingInterval: number | null = null
const eventData = ref<DepthUpdate[]>([])
let ws: WebSocket

export const useEvents = function () {
  const { selectedPair } = usePairs()

  const start = async () => {
    if (ws) {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve()
        }, 10000) // 10 seconds
      })
      if (ws.readyState !== ws.CLOSED) return
    }

    ws = new WebSocket(endpoint + selectedPair.value.toLowerCase() + '@depth')

    orderBook.value = undefined
    orderBookLoadingState.value = 'idle'
    ws.onopen = () => {
      console.log('Connected to Binance WebSocket API')
      setInterval(() => {
        if (ws.readyState === ws.OPEN) {
          ws.send(JSON.stringify({ ping: Date.now() }))
        }
      }, 180000) // Send ping every 3 minutes

      ws.send(
        JSON.stringify({
          method: 'SUBSCRIBE',
          params: [`${selectedPair.value.toLowerCase()}@depth`],
          id: 1
        })
      )
    }

    ws.onmessage = handleMessage
    ws.onclose = () => {
      console.log('Connection closed')
      if (pingInterval) {
        clearInterval(pingInterval)
        pingInterval = null
      }
    }
    ws.onerror = (error: Event) => {
      console.error('WebSocket error:', error)
    }
  }

  const stop = () => {
    if (pingInterval) {
      clearInterval(pingInterval)
      pingInterval = null
    }
    if (ws) ws.close()
  }

  function handlePing(ws: WebSocket, payload: any) {
    ws.send(JSON.stringify({ pong: payload }))
  }

  function handleMessage(this: WebSocket, event: MessageEvent) {
    const data = JSON.parse(event.data)
    console.log('handleMessage')

    if (data.ping) {
      handlePing(this, data.ping)
    } else {
      if ('e' in data) {
        if (data.e === 'depthUpdate') {
          eventData.value.push(data)
        }
      }
      updateOrderBook()
    }
  }

  const updateOrderBook = () => {
    if (orderBookLoadingState.value === 'idle') {
      initOrderBook()
      return
    }
    if (orderBookLoadingState.value !== 'complete') return

    if (!orderBook.value) {
      return
    }
    console.log('========', typeof orderBook.value.asks[0][0])

    while (eventData.value.length > 0) {
      const item = eventData.value.shift()
      if (item) {
        console.log('Processing first item:', item)

        if (!('u' in item)) return
        if (!('U' in item)) return
        const uFinal = item.u
        const UFrom = item.U
        const lastUpdateId = orderBook.value.lastUpdateId
        console.log(lastUpdateId)
        console.log('uFinal', uFinal)
        console.log('UFrom', UFrom)

        if (uFinal <= lastUpdateId) {
          console.log('Drop as old')
        }
        if (UFrom <= lastUpdateId + 1 && uFinal >= lastUpdateId + 1) {
          console.log('good')
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

    return
  }
  function updateOrAdd(base: [string, string][], diff: [string, string][]): void {
    for (const [diffKey, diffValue] of diff) {
      console.log('diffValue', typeof diffValue)
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

  onUnmounted(() => {
    console.log('UNMOUNTED')

    if (pingInterval) {
      clearInterval(pingInterval)
      pingInterval = null
    }
    if (ws) ws.close()
  })

  return { start, stop, eventData }
}
// Function to handle WebSocket ping frames
