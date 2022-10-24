import { MouseEventHandler } from 'react'
import styled from 'styled-components'
import { Color } from './Color'

interface DragSelectorProps {
  parsedColor: Color
  satCoords: Array<number>
  hueCoords: number
  onSaturationChange: MouseEventHandler
  onHueChange: MouseEventHandler
}

const Root = styled.div`
  display: grid;
  grid-gap: 8px;
  margin-bottom: 16px;
  max-width: 100%;
  width: 400px;
`

const Saturation = styled.div`
  width: 100%;
  height: 150px;
  background-image: linear-gradient(transparent, black),
    linear-gradient(to right, white, transparent);
  border-radius: 4px;
  position: relative;
  cursor: crosshair;
`

const SaturationIndicator = styled.div`
  width: 15px;
  height: 15px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  transform: translate(-7.5px, -7.5px);
  position: absolute;
`

const Hue = styled.div`
  width: 100%;
  height: 12px;
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
  border-radius: 999px;
  position: relative;
  cursor: crosshair;
`

const HueIndicator = styled.div`
  width: 15px;
  height: 15px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  transform: translate(-7.5px, -2px);
  position: absolute;
`

export const DragSelector = ({
  parsedColor,
  satCoords,
  hueCoords,
  onSaturationChange,
  onHueChange,
}: DragSelectorProps) => {
  return (
    <Root>
      <Saturation
        style={{
          backgroundColor: `hsl(${parsedColor.hsva.h}, 100%, 50%)`,
        }}
        onClick={onSaturationChange}
      >
        <SaturationIndicator
          style={{
            backgroundColor: parsedColor.hex,
            left: (satCoords?.[0] ?? 0) + '%',
            top: (satCoords?.[1] ?? 0) + '%',
          }}
        />
      </Saturation>
      <Hue onClick={onHueChange}>
        <HueIndicator
          style={{
            backgroundColor: parsedColor.hex,
            left: (hueCoords ?? 0) + '%',
          }}
        />
      </Hue>
    </Root>
  )
}
