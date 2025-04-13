import { ref, nextTick } from 'vue'
import { useState } from '#imports'

type cueType = 'info' | 'done' | 'warn' | 'error'

export interface Cue extends Omit<any, 'defaultOpen'> {
  id: string | number
  click?: (cue: Cue) => void
  type?: cueType,
  icon?: string,
}

export function useCue() {
  const cues = useState<Cue[]>('cues', () => [])
  const maxCues = 5
  const running = ref(false)
  const queue: Cue[] = []
  const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

  async function processQueue(id: string | number) {
    if (running.value || queue.length === 0) return;
    running.value = true
    while (queue.length > 0) {
      const cue = queue.shift()!
      await nextTick()
      cues.value = [...cues.value, cue].slice(-maxCues)
    }

    setTimeout(() => {
      remove(id)
    }, 2000);
    running.value = false
  }

  async function add(cue: Partial<Cue>): Promise<Cue> {
    const body = {
      id: generateId(),
      type: cue.type ?? 'info',
      icon: cue.icon ?? '/favicon.png',
      ...cue
    }
    queue.push(body)
    await processQueue(body.id)
    return body
  }

  function done(cue: Partial<Cue>) {
    add({ type: 'done', icon: '/img/success.svg', ...cue })
  }

  function warn(cue: Partial<Cue>) {
    add({ type: 'warn', icon: '/img/warn.svg', ...cue })
  }

  function error(cue: Partial<Cue>) {
    add({ type: 'error', icon: '/img/error.svg', ...cue })
  }

  async function remove(id: string | number) {
    const index = cues.value.findIndex((cue) => cue.id === id)
    if (index !== -1) {
      cues.value[index] = {
        ...cues.value[index] as Cue
      }
    }

    cues.value = cues.value.filter((t: Cue) => t.id !== id)
  }

  function clear() {
    cues.value = []
  }
  return {
    cues,
    add,
    done,
    warn,
    error,
    remove,
    clear,
  }

}