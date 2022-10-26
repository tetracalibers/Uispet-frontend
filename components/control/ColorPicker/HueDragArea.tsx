import { useRef, useState } from 'react'
import styled from 'styled-components'
import { useDragPreventDefault } from './hooks/useDragPreventDefault'
import { Color } from './types/Color'
import { IndicatorDragEvent } from './types/Event'

interface HueDragAreaProps {
  color: Color
  coords: number
  onChange: (e: IndicatorDragEvent) => void
}

const DragArea = styled.div`
  width: 100%;
  height: 12px;
  background-image: linear-gradient(
    to right,
    #ff0000,
    #ffff00,
    #00ff00,
    #00ffff,
    #0000ff,
    #ff00ff,
    #ff0000
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

export const HueDragArea = ({ color, coords, onChange }: HueDragAreaProps) => {
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
          left: (coords ?? 0) + '%',
        }}
      />
    </DragArea>
  )
}
