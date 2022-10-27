import { XyCoords } from './Coords'

export interface Shadow {
  offset: XyCoords
  blur: number
  spread: number
  color: string
  inset: boolean
}
