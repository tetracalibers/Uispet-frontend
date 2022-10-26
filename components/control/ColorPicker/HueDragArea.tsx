import { MouseEventHandler, useState } from 'react'
import styled from 'styled-components'
import { Color } from './Color'

interface HueDragAreaProps {
  color: Color
  coords: number
  onChange: MouseEventHandler
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

  const onDragStart: MouseEventHandler = e => {
    e.preventDefault()
    setInDrag(true)
    onChange(e)
  }

  const onDrag: MouseEventHandler = e => {
    e.preventDefault()
    inDrag && onChange(e)
  }

  const onDragEnd: MouseEventHandler = e => {
    e.preventDefault()
    setInDrag(false)
  }

  return (
    <DragArea
      onClick={onChange}
      onMouseDown={onDragStart}
      onMouseMove={onDrag}
      onMouseUp={onDragEnd}
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
