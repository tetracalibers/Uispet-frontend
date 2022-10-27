import { TouchEvent, MouseEvent } from 'react'
import { IndicatorDragEvent } from '../types/Event'

export const getMouseTouchPos = (e: IndicatorDragEvent) => {
  const touchObject = (e as TouchEvent<HTMLDivElement>).changedTouches?.[0]
  if (touchObject === undefined) {
    const me = e as MouseEvent<HTMLDivElement>
    return { clientX: me.clientX, clientY: me.clientY }
  }
  return { clientX: touchObject.clientX, clientY: touchObject.clientY }
}
