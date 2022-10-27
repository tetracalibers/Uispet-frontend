import { RangeInput } from '../../control/RangeInput'
import { Shadow } from '../../../types/Shadow'
import { ColorPicker } from '../../control/ColorPicker'
import { ChangeEvent, useCallback } from 'react'
import styled, { css } from 'styled-components'

interface BoxShadowProps {
  shadow: Shadow
  onChange: <T extends keyof Shadow>(target: T, value: Shadow[T]) => void
}

const Preview = styled.div<{ $shadow: Shadow }>`
  width: 200px;
  height: 200px;
  ${({ $shadow }) => css`
    box-shadow: ${$shadow.inset && 'inset '}${$shadow.color} ${$shadow.offsetX}px
      ${$shadow.offsetY}px ${$shadow.blur}px ${$shadow.spread}px;
  `}
`

export const BoxShadow = ({ shadow, onChange }: BoxShadowProps) => {
  const { offsetX, offsetY, blur, spread, color, inset } = shadow

  const onColorChange = useCallback(
    (color: string) => onChange('color', color),
    [onChange]
  )

  const onNumberChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, target: keyof Shadow) =>
      onChange(target, Number(e.target.value)),
    [onChange]
  )

  return (
    <>
      <Preview $shadow={shadow} />
      <ColorPicker color={color} onChange={onColorChange} />
      <RangeInput
        min={-100}
        max={100}
        label='offset-X'
        value={offsetX}
        onChange={e => onNumberChange(e, 'offsetX')}
      />
      <RangeInput
        min={-100}
        max={100}
        label='offset-Y'
        value={offsetY}
        onChange={e => onNumberChange(e, 'offsetY')}
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
