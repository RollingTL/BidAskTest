import { ref } from 'vue'

const depthUpdates = ref<DepthUpdate[]>([])

export const useDepthUpdates = function () {
  return {
    depthUpdates
  }
}
