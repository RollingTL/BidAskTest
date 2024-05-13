import { ref, watch } from 'vue'

const selectedPair = ref<Pair>('BTCUSDT')

const pairChangeLog = ref<PairLogItem[]>([])
export const usePairs = function () {
  watch(selectedPair, (newValue, oldValue) => {
    // Do something when selectedPair changes
    console.log('selectedPair changed from', oldValue, 'to', newValue)
    // You can update pairChangeLog or perform any other action here
    pairChangeLog.value.push({ prevPair: oldValue, newPair: newValue, time: new Date() })
  })
  return {
    selectedPair,
    pairChangeLog
  }
}
