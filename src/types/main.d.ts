type Pair = 'BTCUSDT' | 'BNBBTC' | 'ETHBTC'
type PairLogItem = {
  prevPair: Pair
  newPair: Pair
  time: Date
}

type Depth = 100 | 500 | 1000
type OrderBook = {
  lastUpdateId: number
  bids: [string, string][] // Array of [price, quantity] tuples for bids
  asks: [string, string][] // Array of [price, quantity] tuples for asks
}

type DepthUpdate = {
  e: string
  E: number
  s: string
  U: number
  u: number
  b: [string, string][]
  a: [string, string][]
}

type LoadingState = 'idle' | 'loading' | 'error' | 'complete'
