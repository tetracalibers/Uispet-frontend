import { Color } from '../../../../types/Color'

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
