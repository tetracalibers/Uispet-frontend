import { MouseEventHandler, useState } from 'react'
import styled from 'styled-components'
import { Color } from './Color'

interface SaturationDragAreaProps {
  color: Color
  coords: Array<number>
  onChange: MouseEventHandler
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
      style={{
        backgroundColor: `hsl(${color.hsva.h}, 100%, 50%)`,
      }}
      onClick={onChange}
      onMouseDown={onDragStart}
      onMouseMove={onDrag}
      onMouseUp={onDragEnd}
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
