import { RangeInput } from '../../control/RangeInput'
import { Shadow } from '../../../types/Shadow'
import { ColorPicker } from '../../control/ColorPicker'
import { ChangeEvent, useCallback } from 'react'
import styled from 'styled-components'
import { XyInput } from '../../control/XyInput'
import { XyCoords } from '../../../types/Coords'
import { OnOffToggle } from '../../control/OnOffToggle'

interface BoxShadowProps {
  shadow: Shadow
  onChange: <T extends keyof Shadow>(target: T, value: Shadow[T]) => void
}

const Preview = styled.div`
  width: 200px;
  height: 200px;
`

export const BoxShadow = ({ shadow, onChange }: BoxShadowProps) => {
  const { offset, blur, spread, color, inset } = shadow

  const onColorChange = useCallback(
    (color: string) => onChange('color', color),
    [onChange]
  )

  const onCoordsChange = useCallback(
    (coords: XyCoords) => onChange('offset', coords),
    [onChange]
  )

  const onNumberChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, target: keyof Shadow) =>
      onChange(target, Number(e.target.value)),
    [onChange]
  )

  const onToggle = useCallback(
    (status: boolean) => onChange('inset', status),
    [onChange]
  )

  return (
    <>
      <Preview
        style={{
          boxShadow: `${inset ? 'inset ' : ''}${color} ${offset.x}px ${
            offset.y
          }px ${blur}px ${spread}px`,
        }}
      />
      <ColorPicker color={color} onChange={onColorChange} />
      <OnOffToggle value={inset} onChange={onToggle} label='inset' />
      <XyInput
        value={offset}
        onChange={onCoordsChange}
        max={{ x: 100, y: 100 }}
        min={{ x: -100, y: -100 }}
      />
      <RangeInput
        min={0}
        max={100}
        label='blur'
        value={blur}
        onChange={e => onNumberChange(e, 'blur')}
      />
      <RangeInput
        min={-100}
        max={100}
        label='spread'
        value={spread}
        onChange={e => onNumberChange(e, 'spread')}
      />
    </>
  )
}
