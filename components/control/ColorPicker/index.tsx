import { useMemo, useCallback, ChangeEventHandler, ChangeEvent } from 'react'
import styled from 'styled-components'
import { hsvaToRgba, rgbaToHex } from './logic/converters'
import { parseColor } from './logic/parser'
import {
  getSaturationCoordinates,
  getHueCoordinates,
} from './logic/coordinates'
import { DragSelector } from './DragSelector'
import { IndicatorDragEvent } from '../../../types/Event'
import { getAreaXyCoords } from '../../../utils/coords'
import { ResetStyleInput as Input } from '../../reset-style/Input'

interface ColorPickerProps {
  color: string
  onChange(color: string): void
}

const Container = styled.div`
  overflow: visible;
  scrollbar-width: none;
  margin-right: auto;
  width: min(100%, 350px);
  box-shadow: rgb(0 0 0 / 5%) 0px 0px 0px 1px,
    rgb(209 213 219) 0px 0px 0px 1px inset;
  padding: 1rem;
  border-radius: 4px;

  &::-webkit-scrollbar {
    display: none;
  }
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`

const InputGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: end;

  &:last-child {
    margin-left: auto;
  }
`

const ColorPreview = styled.div`
  /* Shadow so we can see white against white */
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  width: 25px;
  height: 25px;
  border-radius: 50%;
`

const Label = styled.label`
  display: block;
  font-size: 12px;
`

const HexInput = styled(Input)`
  width: 6.5em;
`

const RgbaInput = styled(Input)`
  width: 3em;
`

export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const parsedColor = useMemo(() => parseColor(color), [color])

  const satCoords = useMemo(
    () => getSaturationCoordinates(parsedColor),
    [parsedColor]
  )

  const hueCoords = useMemo(() => getHueCoordinates(parsedColor), [parsedColor])

  const handleHexChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    event => {
      let val = event.target.value
      if (!val.startsWith('#')) {
        val = '#' + val
      }
      onChange(val)
    },
    [onChange]
  )

  const handleRgbaChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, component: 'r' | 'g' | 'b' | 'a') => {
      const value = Number(e.target.value)
      const { r, g, b, a } = parsedColor.rgba
      switch (component) {
        case 'r':
          onChange(rgbaToHex({ r: value ?? 0, g, b, a }))
          return
        case 'g':
          onChange(rgbaToHex({ r, g: value ?? 0, b, a }))
          return
        case 'b':
          onChange(rgbaToHex({ r, g, b: value ?? 0, a }))
          return
        case 'a':
          onChange(rgbaToHex({ r, g, b, a: value ?? 100 }))
        default:
          return
      }
    },
    [parsedColor, onChange]
  )

  const handleSaturationChange = useCallback(
    (event: IndicatorDragEvent) => {
      const { x, y, width, height } = getAreaXyCoords(event)
      const s = (x / width) * 100
      const v = 100 - (y / height) * 100
      const rgba = hsvaToRgba({ ...parsedColor.hsva, s, v })
      onChange(rgbaToHex(rgba))
    },
    [parsedColor, onChange]
  )

  const handleHueChange = useCallback(
    (event: IndicatorDragEvent) => {
      const { x, width } = getAreaXyCoords(event)
      const h = Math.round((x / width) * 360)
      const hsva = { ...parsedColor.hsva, h }
      const rgba = hsvaToRgba(hsva)
      onChange(rgbaToHex(rgba))
    },
    [parsedColor, onChange]
  )

  const handleOpacityChange = useCallback(
    (event: IndicatorDragEvent) => {
      const { x, width } = getAreaXyCoords(event)
      const a = Math.round((x / width) * 100)
      const rgba = { ...parsedColor.rgba, a }
      onChange(rgbaToHex(rgba))
    },
    [parsedColor, onChange]
  )

  return (
    <Container>
      <DragSelector
        parsedColor={parsedColor}
        satCoords={satCoords}
        hueCoords={hueCoords}
        onSaturationChange={handleSaturationChange}
        onHueChange={handleHueChange}
        onOpacityChange={handleOpacityChange}
      />
      <InputContainer>
        <InputGroup>
          <ColorPreview
            style={{
              background: color,
            }}
          />
          <div>
            <Label htmlFor='cp-input-hex'>Hex</Label>
            <HexInput
              id='cp-input-hex'
              placeholder='Hex'
              value={parsedColor?.hex}
              onChange={handleHexChange}
            />
          </div>
        </InputGroup>
        <InputGroup>
          <div>
            <Label htmlFor='cp-input-r'>R</Label>
            <RgbaInput
              id='cp-input-r'
              placeholder='R'
              value={parsedColor.rgba.r}
              onChange={e => handleRgbaChange(e, 'r')}
              inputMode='numeric'
              pattern='[0-9]*'
            />
          </div>
          <div>
            <Label htmlFor='cp-input-g'>G</Label>
            <RgbaInput
              id='cp-input-g'
              placeholder='G'
              value={parsedColor.rgba.g}
              onChange={e => handleRgbaChange(e, 'g')}
              inputMode='numeric'
              pattern='[0-9]*'
            />
          </div>
          <div>
            <Label htmlFor='cp-input-b'>B</Label>
            <RgbaInput
              id='cp-input-b'
              placeholder='B'
              value={parsedColor.rgba.b}
              onChange={e => handleRgbaChange(e, 'b')}
              inputMode='numeric'
              pattern='[0-9]*'
            />
          </div>
          <div>
            <Label htmlFor='cp-input-a'>A(%)</Label>
            <RgbaInput
              id='cp-input-a'
              placeholder='A'
              value={parsedColor.rgba.a}
              onChange={e => handleRgbaChange(e, 'a')}
              inputMode='numeric'
              pattern='[0-9]*'
            />
          </div>
        </InputGroup>
      </InputContainer>
    </Container>
  )
}
