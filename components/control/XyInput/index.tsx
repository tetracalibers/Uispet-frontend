import { ChangeEvent, useCallback, useRef, useState } from 'react'
import styled from 'styled-components'
import { useDragMove } from '../../../hooks/useDragMove'
import { XyCoords } from '../../../types/Coords'
import { IndicatorDragEvent } from '../../../types/Event'
import { getAreaXyCoords } from '../../../utils/coords'
import { clamp } from '../../../utils/math'
import { ResetStyleInput } from '../../reset-style/Input'

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
  --size: 200px;

  width: var(--size);
  height: var(--size);
  background: #faf9f7;
  position: relative;
  cursor: crosshair;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  margin: 1rem auto 0;

  /* y軸 */
  &::after {
    content: '';
    width: calc(var(--size) / 2);
    height: var(--size);
    border-right: 2px solid #cdf0ea;
    display: block;
    transform: translateY(-50%);
  }

  /** x軸 */
  &::before {
    content: '';
    height: calc(var(--size) / 2);
    width: var(--size);
    border-bottom: 2px solid #f6c6ea;
    display: block;
  }
`

const Indicator = styled.div`
  --circle-size: 12px;

  width: var(--circle-size);
  height: var(--circle-size);
  background: rgb(120, 130, 164, 0.5);
  box-shadow: rgb(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgb(0 0 0 / 30%) 0px 30px 60px -30px,
    rgb(10 37 64 / 35%) 0px -2px 6px 0px inset;
  border-radius: 50%;
  transform: translate(
    calc(var(--circle-size) * -0.5),
    calc(var(--circle-size) * -0.5)
  );
  position: absolute;
  z-index: 2;
`

const InputGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: end;
`

const Input = styled(ResetStyleInput)`
  width: 95px;
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
      <InputGroup>
        <div>
          <Label htmlFor='xy-coords-x'>x</Label>
          <Input
            inputMode='numeric'
            value={value.x}
            onChange={e => onInput(e, 'x')}
            id='xy-coords-x'
          />
        </div>
        <div>
          <Label htmlFor='xy-coords-y'>y</Label>
          <Input
            inputMode='numeric'
            value={value.y}
            onChange={e => onInput(e, 'y')}
            id='xy-coords-y'
          />
        </div>
      </InputGroup>
    </VerticalStack>
  )
}
