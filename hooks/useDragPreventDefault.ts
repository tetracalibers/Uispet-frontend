import { RefObject, useEffect } from 'react'

export const useDragPreventDefault = (ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    const current = ref.current
    if (!current) return
    const preventDefault = (e: Event) => {
      if (e.cancelable) {
        e.preventDefault()
      }
    }
    current.addEventListener('touchstart', preventDefault)
    current.addEventListener('touchmove', preventDefault)
    current.addEventListener('touchend', preventDefault)
    current.addEventListener('mousedown', preventDefault)
    current.addEventListener('mousemove', preventDefault)
    current.addEventListener('mouseup', preventDefault)
    return () => {
      current.removeEventListener('touchstart', preventDefault)
      current.removeEventListener('touchmove', preventDefault)
      current.removeEventListener('touchend', preventDefault)
      current.removeEventListener('mousedown', preventDefault)
      current.removeEventListener('mousemove', preventDefault)
      current.removeEventListener('mouseup', preventDefault)
    }
  }, [ref])
}
