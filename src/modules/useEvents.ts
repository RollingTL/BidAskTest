/*
import { onUnmounted } from 'vue'
// BTCUSDT, BNBBTC, ETHBTC


const endpoint: string = 'wss://stream.binance.com:9443/ws/btcusdt@depth'

// Function to handle WebSocket ping frames
function handlePing(ws: WebSocket, payload: any) {
  // Send a pong frame with a copy of the ping's payload
  ws.send(JSON.stringify({ pong: payload }))
}

// Function to handle WebSocket message events
function handleMessage(this: WebSocket, event: MessageEvent) {
  // Parse the message
  const data = JSON.parse(event.data)

  // Check if it's a ping frame
  if (data.ping) {
    handlePing(this, data.ping)
  } else {
    // Process other types of messages here
    console.log(data)
  }
}

const ws: WebSocket = new WebSocket(endpoint)

ws.onopen = () => {
  console.log('Connected to Binance WebSocket API')

  // Set up ping/pong functionality
  setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify({ ping: Date.now() }))
    }
  }, 180000) // Send ping every 3 minutes

  // Subscribe to streams
  // const streams = ['btcusdt@trade', 'ethusdt@trade'] // Example streams
  const streams = ['bnbbtc@trade'] // Example streams
  ws.send(JSON.stringify({ method: 'SUBSCRIBE', params: streams, id: 1 }))
}

ws.onmessage = handleMessage
ws.onclose = () => {
  console.log('Connection closed')
}
ws.onerror = (error: Event) => {
  console.error('WebSocket error:', error)
}
onUnmounted(() => {
  // Close WebSocket connection when component unmounts
  ws.close()
})
*/
