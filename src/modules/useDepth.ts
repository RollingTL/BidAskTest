import { ref } from 'vue'

const depth = ref<Depth>(100)

export const useDepth = function () {
  return {
    depth
  }
}
