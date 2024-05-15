import { ref, watch } from 'vue'

const selectedPair = ref<Pair>('BTCUSDT')

const pairChangeLog = ref<PairLogItem[]>([])

const handlePairChange = (newValue: Pair, oldValue: Pair) => {
  pairChangeLog.value.push({ prevPair: oldValue, newPair: newValue, time: new Date() })
}

watch(selectedPair, handlePairChange)
export const usePairs = function () {
  return {
    selectedPair,
    pairChangeLog
  }
}
