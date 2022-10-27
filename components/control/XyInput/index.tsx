import { ChangeEvent, useCallback, useRef, useState } from 'react'
import styled from 'styled-components'
import { useDragMove } from '../../../hooks/useDragMove'
import { XyCoords } from '../../../types/Coords'
import { IndicatorDragEvent } from '../../../types/Event'
import { getAreaXyCoords } from '../../../utils/coords'
import { clamp } from '../../../utils/math'

interface XyInputProps {
  value: XyCoords
  onChange: (xy: XyCoords) => void
  max: XyCoords
  min: XyCoords
}

const VerticalStack = styled.div`
  margin: auto;
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const DragArea = styled.div`
  width: 150px;
  height: 150px;
  background: white;
  position: relative;
  cursor: crosshair;
  box-shadow: rgb(0 0 0 / 5%) 0px 6px 24px 0px, rgb(0 0 0 / 8%) 0px 0px 0px 1px;
  margin: 1rem auto;

  /* y軸 */
  &::after {
    content: '';
    width: calc(150px / 2);
    height: 150px;
    border-right: 1px solid black;
    display: block;
    transform: translateY(-50%);
  }

  /** x軸 */
  &::before {
    content: '';
    height: calc(150px / 2);
    width: 150px;
    border-bottom: 1px solid black;
    display: block;
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

const LabelLayout = styled.div`
  display: flex;
  justify-content: space-between;
  width: 150px;
  margin-left: auto;
  margin-right: auto;
`

const Input = styled.input`
  padding: 4px 6px;
  display: block;
  text-align: right;
  width: 80%;
`

const Label = styled.label`
  display: block;
`

export const XyInput = ({ onChange, max, min, value }: XyInputProps) => {
  const dragAreaRef = useRef<HTMLDivElement>(null)

  const [coords, setCoords] = useState({ x: 50, y: 50 })

  const onInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>, target: keyof XyCoords) => {
      const inputNum = Number(e.target.value)
      const coord = isNaN(inputNum) ? 0 : inputNum / 2
      const val = isNaN(inputNum) ? 0 : inputNum
      switch (target) {
        case 'x':
          setCoords(prev => ({
            ...prev,
            x: clamp(coord + 50, 0, 100),
          }))
          onChange({ ...value, x: clamp(val, min.x, max.x) })
          return
        case 'y':
          setCoords(prev => ({
            ...prev,
            y: clamp(-1 * coord + 50, 0, 100),
          }))
          onChange({ ...value, y: clamp(val, min.y, max.y) })
          return
        default:
          return
      }
    },
    [onChange, value, min, max]
  )

  const onMoveIndicator = useCallback(
    (e: IndicatorDragEvent) => {
      const { x, y, width, height } = getAreaXyCoords(e)
      const relative = {
        x: (x / width) * 100,
        y: (y / height) * 100,
      }
      const values = {
        x: Math.round((max.x - min.x) * (x / width)) - (max.x - min.x) / 2,
        y:
          -1 * Math.round((max.y - min.y) * (y / height)) + (max.y - min.y) / 2,
      }
      setCoords(relative)
      onChange(values)
    },
    [onChange, max, min]
  )

  const { moveHandlers } = useDragMove({
    ref: dragAreaRef,
    onChange: onMoveIndicator,
  })

  return (
    <VerticalStack>
      <DragArea ref={dragAreaRef} {...moveHandlers}>
        <Indicator
          style={{
            left: (coords?.x ?? 50) + '%',
            top: (coords?.y ?? 50) + '%',
          }}
        />
      </DragArea>
      <LabelLayout>
        <Label htmlFor='xy-coords-x'>x</Label>
        <Input
          inputMode='numeric'
          value={value.x}
          onChange={e => onInput(e, 'x')}
          id='xy-coords-x'
        />
      </LabelLayout>
      <LabelLayout>
        <Label htmlFor='xy-coords-y'>y</Label>
        <Input
          inputMode='numeric'
          value={value.y}
          onChange={e => onInput(e, 'y')}
          id='xy-coords-y'
        />
      </LabelLayout>
    </VerticalStack>
  )
}
