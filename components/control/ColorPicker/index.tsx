import { useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { rgbaToHex } from 'hex-and-rgba'
import {
  getSaturationCoordinates,
  getHueCoordinates,
  clamp,
  parseColor,
} from './util'

interface ColorPickerProps {
  color: string
  colors: Array<string>
  onChange(color: string): void
}

const Container = styled.div`
  padding: 12px;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  width: fit-content;

  &::-webkit-scrollbar {
    display: none;
  }
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 2px;
`

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 8px;
  align-items: center;
`

const ColorPreview = styled.div`
  /* Shadow so we can see white against white */
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  width: 25px;
  height: 25px;
  border-radius: 50%;
`

const Input = styled.input`
  padding: 4px 6px;
  display: block;
`

const Label = styled.label`
  display: block;
  font-size: 12px;
`

const HexInput = styled(Input)`
  width: 60px;
`

const RgbaInput = styled(Input)`
  width: 30px;
`

export const ColorPicker = ({ color, colors, onChange }: ColorPickerProps) => {
  const parsedColor = useMemo(() => parseColor(color), [color])

  const satCoords = useMemo(
    () => getSaturationCoordinates(parsedColor),
    [parsedColor]
  )

  const hueCoords = useMemo(() => getHueCoordinates(parsedColor), [parsedColor])

  const handleHexChange = useCallback(
    event => {
      var val = event.target.value
      if (val?.slice(0, 1) !== '#') {
        val = '#' + val
      }
      onChange(val)
    },
    [onChange]
  )
  const handleRgbaChange = useCallback(
    (component, value) => {
      const { r, g, b, a } = parsedColor.rgba
      switch (component) {
        case 'r':
          onChange(rgbaToHex(value ?? 0, g, b, a))
          return
        case 'g':
          onChange(rgbaToHex(r, value ?? 0, b, a))
          return
        case 'b':
          onChange(rgbaToHex(r, g, value ?? 0, a))
          return
        case 'a':
          onChange(rgbaToHex(r, g, b, value ?? 1))
        default:
          return
      }
    },
    [parsedColor, onChange]
  )

  const handleSaturationChange = useCallback(
    event => {
      const { width, height, left, top } = event.target.getBoundingClientRect()
      const x = clamp(event.clientX - left, 0, width)
      const y = clamp(event.clientY - top, 0, height)
      const s = (x / width) * 100
      const v = 100 - (y / height) * 100
      const rgb = hsvToRgb({ h: parsedColor?.hsv.h, s, v })
      onChange(rgbToHex(rgb))
    },
    [parsedColor, onChange]
  )

  const handleHueChange = useCallback(
    event => {
      const { width, left } = event.target.getBoundingClientRect()
      const x = clamp(event.clientX - left, 0, width)
      const h = Math.round((x / width) * 360)
      const hsv = { h, s: parsedColor?.hsv.s, v: parsedColor?.hsv.v }
      const rgb = hsvToRgb(hsv)
      onChange(rgbToHex(rgb))
    },
    [parsedColor, onChange]
  )

  return (
    <Container>
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
              value={parsedColor.rgb.r}
              onChange={event => handleRgbChange('r', event.target.value)}
              inputMode='numeric'
              pattern='[0-9]*'
            />
          </div>
          <div>
            <Label htmlFor='cp-input-g'>G</Label>
            <RgbaInput
              id='cp-input-g'
              placeholder='G'
              value={parsedColor.rgb.g}
              onChange={event => handleRgbChange('g', event.target.value)}
              inputMode='numeric'
              pattern='[0-9]*'
            />
          </div>
          <div>
            <Label htmlFor='cp-input-b'>B</Label>
            <RgbaInput
              id='cp-input-b'
              placeholder='B'
              value={parsedColor.rgb.b}
              onChange={event => handleRgbChange('b', event.target.value)}
              inputMode='numeric'
              pattern='[0-9]*'
            />
          </div>
          <div>
            <Label htmlFor='cp-input-a'>A</Label>
            <RgbaInput
              id='cp-input-a'
              placeholder='A'
              value={parsedColor.rgb.a}
              onChange={event => handleRgbChange('a', event.target.value)}
              inputMode='numeric'
              pattern='[0-9]*'
            />
          </div>
        </InputGroup>
      </InputContainer>
    </Container>
  )
}
