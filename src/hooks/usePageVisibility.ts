import { ref, type Ref } from 'vue'
import { inBrowser } from '@/utils/hook'

type VisibilityState = 'hidden' | 'visible'

let visibility: Ref<VisibilityState>

export function usePageVisibility() {
  if (!visibility) {
    visibility = ref<VisibilityState>('visible')
    if (inBrowser) {
      const update = () => {
        visibility.value = document.hidden ? 'hidden' : 'visible'
      }

      update()
      document.addEventListener('visibilitychange', update)
    }
  }

  return visibility
}
