type Pair = 'BTCUSDT' | 'BNBBTC' | 'ETHBTC'
type PairLogItem = {
  prevPair: Pair
  newPair: Pair
  time: Date
}

type OrderBook = {
  lastUpdateId: number
  bids: [string, string][] // Array of [price, quantity] tuples for bids
  asks: [string, string][] // Array of [price, quantity] tuples for asks
}
