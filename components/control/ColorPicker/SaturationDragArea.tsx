import { useRef, useState } from 'react'
import styled from 'styled-components'
import { useDragPreventDefault } from '../../../hooks/useDragPreventDefault'
import { Color } from '../../../types/Color'
import { IndicatorDragEvent } from '../../../types/Event'

interface SaturationDragAreaProps {
  color: Color
  coords: Array<number>
  onChange: (e: IndicatorDragEvent) => void
}

const DragArea = styled.div`
  width: 100%;
  height: 150px;
  background-image: linear-gradient(transparent, black),
    linear-gradient(to right, white, transparent);
  border-radius: 4px;
  position: relative;
  cursor: crosshair;
`

const Indicator = styled.div`
  width: 15px;
  height: 15px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  transform: translate(-7.5px, -7.5px);
  position: absolute;
`

export const SaturationDragArea = ({
  color,
  coords,
  onChange,
}: SaturationDragAreaProps) => {
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
      style={{
        backgroundColor: `hsl(${color.hsva.h}, 100%, 50%)`,
      }}
      ref={dragAreaRef}
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
          left: (coords?.[0] ?? 0) + '%',
          top: (coords?.[1] ?? 0) + '%',
        }}
      />
    </DragArea>
  )
}
