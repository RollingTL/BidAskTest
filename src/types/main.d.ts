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
