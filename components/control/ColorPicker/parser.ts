import { ColorRGBA, Color } from './Color'
import { hexToRgba, rgbaToHsva, rgbaToHex } from './converters'

export const getRgba = (color: string): ColorRGBA => {
  const matches = /rgb\((\d+),\s?(\d+),\s?(\d+),\s?(\d+)\)/i.exec(color)
  const r = Number(matches?.[1] ?? 0)
  const g = Number(matches?.[2] ?? 0)
  const b = Number(matches?.[3] ?? 0)
  const a = Number(matches?.[4] ?? 1)
  return {
    r,
    g,
    b,
    a,
  }
}

export const parseColor = (color: string): Color => {
  if (color.startsWith('#')) {
    const hex = color
    const rgba = hexToRgba(color)
    const hsva = rgbaToHsva(rgba)
    return { hex, rgba, hsva }
  }
  if (color.startsWith('rgb')) {
    const rgba = getRgba(color)
    const hex = rgbaToHex(rgba)
    const hsva = rgbaToHsva(rgba)
    return { hex, rgba, hsva }
  }
  return {
    hex: '#000000',
    rgba: { r: 0, g: 0, b: 0, a: 1 },
    hsva: { h: 0, s: 0, v: 0, a: 1 },
  }
}
