import { Color } from '../../../../types/Color'
import { IndicatorDragEvent } from '../../../../types/Event'
import { TouchEvent, MouseEvent } from 'react'

export const getSaturationCoordinates = (color: Color): [number, number] => {
  const { s, v } = color.hsva
  const x = s
  const y = 100 - v
  return [x, y]
}

export const getHueCoordinates = (color: Color): number => {
  const { h } = color.hsva
  const x = (h / 360) * 100
  return x
}

export const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max)
}

export const getMouseTouchPos = (e: IndicatorDragEvent) => {
  const touchObject = (e as TouchEvent<HTMLDivElement>).changedTouches?.[0]
  if (touchObject === undefined) {
    const me = e as MouseEvent<HTMLDivElement>
    return { clientX: me.clientX, clientY: me.clientY }
  }
  return { clientX: touchObject.clientX, clientY: touchObject.clientY }
}
