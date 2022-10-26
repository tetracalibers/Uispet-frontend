import { ColorHSVA, ColorRGBA } from './Color'

export const rgbaToHex = (color: ColorRGBA) => {
  const { r, g, b, a } = color
  const hexR = r.toString(16).padStart(2, '0')
  const hexG = g.toString(16).padStart(2, '0')
  const hexB = b.toString(16).padStart(2, '0')
  const hexA = a.toString(16).padStart(2, '0')
  return '#' + hexR + hexG + hexB + hexA
}

export const hexToRgba = (color: string): ColorRGBA => {
  // 3 digits
  if (color.length === 4) {
    // 16進数（0x付きの数字）に変換
    // #fffなどは、#ffffffとして扱うため、color[1]を2つ並べる
    const r = Number('0x' + color[1] + color[1])
    const g = Number('0x' + color[2] + color[2])
    const b = Number('0x' + color[3] + color[3])
    const a = 1
    return { r, g, b, a }
  }
  // 6 digits or 8 digits
  if (color.length > 6) {
    const r = Number('0x' + color[1] + color[2])
    const g = Number('0x' + color[3] + color[4])
    const b = Number('0x' + color[5] + color[6])
    const a = color.length === 9 ? Number('0x' + color[7] + color[8]) : 1
    return { r, g, b, a }
  }
  // default
  return { r: 0, g: 0, b: 0, a: 1 }
}

const calcHue = (
  max: number,
  range: number,
  r: number,
  g: number,
  b: number
) => {
  if (range === 0) return 0
  if (max === g) return 120 + ((b - r) / range) * 60
  if (max === b) return 240 + ((r - g) / range) * 60
  if (max === r) return ((g - b) / range) * 60 + (g < b ? 360 : 0)
  return 0
}

export const rgbaToHsva = (color: ColorRGBA): ColorHSVA => {
  let { r, g, b, a } = color
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const range = max - min
  const v = (max / 255) * 100
  const s = max === 0 ? 0 : (range / max) * 100
  const h = calcHue(max, range, r, g, b)
  return { h, s, v, a }
}

export const hsvaToRgba = (color: ColorHSVA): ColorRGBA => {
  let { h, s, v, a } = color
  // パーセントから小数へ変換
  s /= 100
  v /= 100
  // 整数部分と小数部分
  const Hi = Math.floor(h / 60)
  const F = h / 60 - Hi
  // よく現れる式を変数化
  const M = v * (1 - s)
  const N = v * (1 - s * F)
  const K = v * (1 - s * (1 - F))
  // rgb値算出
  const r = Math.round([v, N, M, M, K, v][Hi] * 255)
  const g = Math.round([K, v, v, N, M, M][Hi] * 255)
  const b = Math.round([M, M, K, v, v, N][Hi] * 255)
  return { r, g, b, a }
}
