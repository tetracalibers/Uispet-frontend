import { Color, ColorRGBA } from './Color'
import parse from 'parse-color'

// export const getRgba = (color: string): ColorRGBA => {
//   const matches = /rgb\((\d+),\s?(\d+),\s?(\d+),\s?(\d+)\)/i.exec(color)
//   const r = Number(matches?.[1] ?? 0)
//   const g = Number(matches?.[2] ?? 0)
//   const b = Number(matches?.[3] ?? 0)
//   const a = Number(matches?.[4] ?? 0)
//   return {
//     r,
//     g,
//     b,
//     a,
//   }
// }

export const parseColor = (color: string): Color => {
  const parsed = parse(color)

  const [r, g, b, a] = parsed.rgba
  const [h, s, v, hsv_a] = parsed.hsva

  return {
    hex: parsed.hex,
    rgba: {
      r,
      g,
      b,
      a,
    },
    hsva: { h, s, v, a: hsv_a },
  }
}

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

export const clamp = (number: number, min: number, max: number): number => {
  if (!max) {
    return Math.max(number, min) === min ? number : min
  } else if (Math.min(number, min) === number) {
    return min
  } else if (Math.max(number, max) === number) {
    return max
  }
  return number
}
