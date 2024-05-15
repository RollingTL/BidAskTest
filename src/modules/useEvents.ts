import { onUnmounted } from 'vue'
import { useOrderBook } from '@/modules/useOrderBook'
import { useDepthUpdates } from '@/modules/useDepthUpdates'
import { usePairs } from '@/modules/usePairs'

// BTCUSDT, BNBBTC, ETHBTC

const endpoint: string = 'wss://stream.binance.com:9443/ws/'
let pingInterval: number | null = null

let ws: WebSocket

export const useEvents = function () {
  const { orderBook, initOrderBook, updateOrderBook, clearOrderBook } = useOrderBook()
  const { depthUpdates } = useDepthUpdates()
  const { selectedPair } = usePairs()

  const start = async () => {
    if (ws) {
      if (ws.readyState !== ws.CLOSED) return
    }

    ws = new WebSocket(endpoint + selectedPair.value.toLowerCase() + '@depth')

    ws.onopen = () => {
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
    clearOrderBook()
    if (ws) ws.close()
  }

  function handlePing(ws: WebSocket, payload: any) {
    ws.send(JSON.stringify({ pong: payload }))
  }

  async function handleMessage(this: WebSocket, event: MessageEvent) {
    if (!orderBook.value) {
      await initOrderBook()
    }

    const data = JSON.parse(event.data)

    if (data.ping) {
      handlePing(this, data.ping)
    } else {
      if ('e' in data) {
        if (data.e === 'depthUpdate') {
          depthUpdates.value.push(data)
        }
      }
      updateOrderBook(depthUpdates.value)
    }
  }

  onUnmounted(() => {
    stop()
  })

  return { start, stop }
}
// Function to handle WebSocket ping frames
