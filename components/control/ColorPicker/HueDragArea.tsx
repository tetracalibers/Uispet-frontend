import { useRef } from 'react'
import styled from 'styled-components'
import { useDragMove } from '../../../hooks/useDragMove'
import { Color } from '../../../types/Color'
import { IndicatorDragEvent } from '../../../types/Event'

interface HueDragAreaProps {
  color: Color
  coords: number
  onChange: (e: IndicatorDragEvent) => void
}

const DragArea = styled.div`
  --height: 25px;
  --circle-size: calc(var(--height) * 1.25);

  width: 100%;
  height: var(--height);
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

export const HueDragArea = ({ color, coords, onChange }: HueDragAreaProps) => {
  const dragAreaRef = useRef<HTMLDivElement>(null)
  const { moveHandlers } = useDragMove({ ref: dragAreaRef, onChange })

  return (
    <DragArea ref={dragAreaRef} {...moveHandlers}>
      <Indicator
        style={{
          backgroundColor: color.hex,
          left: (coords ?? 0) + '%',
        }}
      />
    </DragArea>
  )
}
