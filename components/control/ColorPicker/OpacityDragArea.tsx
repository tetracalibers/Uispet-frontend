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
  --height: 25px;
  --circle-size: calc(var(--height) * 1.25);

  width: 100%;
  height: var(--height);
  background-image: linear-gradient(
    to left,
    var(--selected-color),
    var(--transparent)
  );
  border-radius: 4px;
  position: relative;
  cursor: crosshair;
`

const Indicator = styled.div`
  width: var(--circle-size);
  height: var(--circle-size);
  border: 2px solid #ffffff;
  border-radius: 50%;
  transform: translate(
    -50%,
    calc(var(--height) * 0.5 - var(--circle-size) * 0.5)
  );
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
      ref={dragAreaRef}
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
