import { MouseEvent, TouchEvent } from 'react'

export type IndicatorDragEvent =
  | MouseEvent<HTMLDivElement>
  | TouchEvent<HTMLDivElement>
