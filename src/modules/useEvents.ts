import { onUnmounted } from 'vue'
import { useOrderBook } from '@/modules/useOrderBook'
import { useDepthUpdates } from '@/modules/useDepthUpdates'
import { usePairs } from '@/modules/usePairs'

const { orderBook, updateOrderBook, loadingState: orderBookLoadingState } = useOrderBook()
const { depthUpdates } = useDepthUpdates()
// BTCUSDT, BNBBTC, ETHBTC

const endpoint: string = 'wss://stream.binance.com:9443/ws/'
let pingInterval: number | null = null

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
          depthUpdates.value.push(data)
        }
      }
      updateOrderBook(depthUpdates.value)
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

  return { start, stop }
}
// Function to handle WebSocket ping frames
