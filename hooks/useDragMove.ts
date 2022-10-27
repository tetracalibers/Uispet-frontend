import { RefObject, useState } from 'react'
import { IndicatorDragEvent } from '../types/Event'
import { useDragPreventDefault } from './useDragPreventDefault'

interface DragMoveHookArgs<E extends HTMLElement> {
  ref: RefObject<E>
  onChange: (e: IndicatorDragEvent) => void
}

export const useDragMove = <E extends HTMLElement>({
  ref,
  onChange,
}: DragMoveHookArgs<E>) => {
  const [inDrag, setInDrag] = useState(false)

  useDragPreventDefault(ref)

  const onDragStart = (e: IndicatorDragEvent) => {
    setInDrag(true)
    onChange(e)
  }

  const onDrag = (e: IndicatorDragEvent) => {
    inDrag && onChange(e)
  }

  const onDragEnd = () => {
    setInDrag(false)
  }

  return {
    moveHandlers: {
      onClick: onChange,
      onMouseDown: onDragStart,
      onMouseMove: onDrag,
      onMouseUp: onDragEnd,
      onTouchStart: onDragStart,
      onTouchMove: onDrag,
      onTouchEnd: onDragEnd,
    },
  }
}
