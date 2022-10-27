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
  margin: 1rem;
  background: white;
  border-radius: 4px;
  position: relative;
  cursor: crosshair;
  box-shadow: rgb(0 0 0 / 5%) 0px 6px 24px 0px, rgb(0 0 0 / 8%) 0px 0px 0px 1px;

  /** 方眼紙 */
  background-image: linear-gradient(
      0deg,
      transparent calc(100% - 1px),
      #f0f0f0 calc(100% - 1px)
    ),
    linear-gradient(
      90deg,
      transparent calc(100% - 1px),
      #f0f0f0 calc(100% - 1px)
    );
  background-size: 10% 10%;
  background-repeat: repeat;
  background-position: center center;

  /** 原点 */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: black;
    border-radius: 50%;
  }
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
