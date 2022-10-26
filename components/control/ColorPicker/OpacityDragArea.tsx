import { useRef, useState } from 'react'
import styled from 'styled-components'
import { useDragPreventDefault } from './hooks/useDragPreventDefault'
import { Color } from './types/Color'
import { IndicatorDragEvent } from './types/Event'

interface OpacityDragAreaProps {
  color: Color
  onChange: (e: IndicatorDragEvent) => void
}

const DragArea = styled.div<{ $rgb: string }>`
  --selected-color: ${({ $rgb }) => `rgba(${$rgb}, 1)`};
  --transparent: ${({ $rgb }) => `rgba(${$rgb}, 0)`};
  width: 100%;
  height: 12px;
  background-image: linear-gradient(
    to left,
    var(--selected-color),
    var(--transparent)
  );
  border-radius: 999px;
  position: relative;
  cursor: crosshair;
`

const Indicator = styled.div`
  width: 15px;
  height: 15px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  transform: translate(-7.5px, -2px);
  position: absolute;
`

export const OpacityDragArea = ({ color, onChange }: OpacityDragAreaProps) => {
  const [inDrag, setInDrag] = useState(false)
  const dragAreaRef = useRef<HTMLDivElement>(null)

  useDragPreventDefault(dragAreaRef)

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

  return (
    <DragArea
      $rgb={`${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b}`}
      onClick={onChange}
      onMouseDown={onDragStart}
      onMouseMove={onDrag}
      onMouseUp={onDragEnd}
      onTouchStart={onDragStart}
      onTouchMove={onDrag}
      onTouchEnd={onDragEnd}
    >
      <Indicator
        style={{
          backgroundColor: color.hex,
          left: (color.hsva.a ?? 100) + '%',
        }}
      />
    </DragArea>
  )
}
