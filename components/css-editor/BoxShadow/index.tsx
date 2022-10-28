import { RangeInput } from '../../control/RangeInput'
import { Shadow } from '../../../types/Shadow'
import { ChangeEvent, useCallback } from 'react'
import styled from 'styled-components'
import { XyInput } from '../../control/XyInput'
import { XyCoords } from '../../../types/Coords'
import { OnOffToggle } from '../../control/OnOffToggle'
import { ColorPickerCompact } from '../../control/ColorPickerCompact'

interface BoxShadowProps {
  shadow: Shadow
  onChange: <T extends keyof Shadow>(target: T, value: Shadow[T]) => void
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  padding: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  gap: 1rem;
`

const PreviewArea = styled.div`
  --border-color: #7895b2;

  width: 100%;
  height: 100%;
  background: #ffffff;
  position: relative;
  padding: 2rem;
  border-color: var(--border-color);
  border-style: double;
  border-width: 3px 4px 3px 5px;
  /* ShadowPreviewをレスポンシブ化 */
  display: flex;
`

const ShadowPreview = styled.div`
  max-width: 200px;
  width: 200px;
  margin-left: auto;
  margin-right: auto;

  /* 高さを幅に揃える */
  &::before {
    content: '';
    display: block;
    padding-top: 100%;
  }
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
    <Container>
      <PreviewArea>
        <ShadowPreview
          style={{
            boxShadow: `${inset ? 'inset ' : ''}${color} ${offset.x}px ${
              offset.y
            }px ${blur}px ${spread}px`,
          }}
        />
      </PreviewArea>
      <ColorPickerCompact color={color} onChange={onColorChange} />
      <XyInput
        value={offset}
        onChange={onCoordsChange}
        max={{ x: 100, y: 100 }}
        min={{ x: -100, y: -100 }}
        label={{ x: 'x (px)', y: 'y (px)' }}
      />
      <OnOffToggle value={inset} onChange={onToggle} label='inset' />
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
    </Container>
  )
}
