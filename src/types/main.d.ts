type Pair = 'BTCUSDT' | 'BNBBTC' | 'ETHBTC'
type PairLogItem = {
  prevPair: Pair
  newPair: Pair
  time: Date
}
