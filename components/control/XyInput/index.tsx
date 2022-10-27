import { useRef } from 'react'
import styled from 'styled-components'
import { useDragMove } from '../../../hooks/useDragMove'
import { IndicatorDragEvent } from '../../../types/Event'

interface XyInputProps {
  coords: { x: number; y: number }
  onChange: (e: IndicatorDragEvent) => void
}

const DragArea = styled.div`
  width: 150px;
  height: 150px;
  background: white;
  border-radius: 4px;
  position: relative;
  cursor: crosshair;
`

const Indicator = styled.div`
  width: 15px;
  height: 15px;
  border: 2px solid black;
  border-radius: 50%;
  transform: translate(-7.5px, -7.5px);
  position: absolute;
`

export const XyInput = ({ coords, onChange }: XyInputProps) => {
  const dragAreaRef = useRef<HTMLDivElement>(null)
  const { moveHandlers } = useDragMove({ ref: dragAreaRef, onChange })

  return (
    <DragArea ref={dragAreaRef} {...moveHandlers}>
      <Indicator
        style={{
          left: (coords?.x ?? 0) + '%',
          top: (coords?.y ?? 0) + '%',
        }}
      />
    </DragArea>
  )
}
