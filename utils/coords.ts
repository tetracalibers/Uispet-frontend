import { TouchEvent, MouseEvent } from 'react'
import { IndicatorDragEvent } from '../types/Event'
import { clamp } from './math'

export const getMouseTouchPos = (e: IndicatorDragEvent) => {
  const touchObject = (e as TouchEvent<HTMLDivElement>).changedTouches?.[0]
  if (touchObject === undefined) {
    const me = e as MouseEvent<HTMLDivElement>
    return { clientX: me.clientX, clientY: me.clientY }
  }
  return { clientX: touchObject.clientX, clientY: touchObject.clientY }
}

export const getAreaXyCoords = (e: IndicatorDragEvent) => {
  const { width, height, left, top } = e.currentTarget.getBoundingClientRect()
  const { clientX, clientY } = getMouseTouchPos(e)
  const x = clamp(clientX - left, 0, width)
  const y = clamp(clientY - top, 0, height)
  return { x, y, width, height }
}
