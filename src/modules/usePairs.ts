import { ref, watch } from 'vue'

const selectedPair = ref<Pair>('BTCUSDT')

const pairChangeLog = ref<PairLogItem[]>([])
export const usePairs = function () {
  watch(selectedPair, (newValue, oldValue) => {
    console.log('selectedPair changed from', oldValue, 'to', newValue)
    pairChangeLog.value.push({ prevPair: oldValue, newPair: newValue, time: new Date() })
  })
  return {
    selectedPair,
    pairChangeLog
  }
}
