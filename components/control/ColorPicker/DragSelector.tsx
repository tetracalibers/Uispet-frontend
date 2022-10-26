import { MouseEventHandler } from 'react'
import styled from 'styled-components'
import { Color } from './Color'
import { HueDragArea } from './HueDragArea'
import { SaturationDragArea } from './SaturationDragArea'

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

export const DragSelector = ({
  parsedColor,
  satCoords,
  hueCoords,
  onSaturationChange,
  onHueChange,
}: DragSelectorProps) => {
  return (
    <Root>
      <SaturationDragArea
        color={parsedColor}
        coords={satCoords}
        onChange={onSaturationChange}
      />
      <HueDragArea
        color={parsedColor}
        coords={hueCoords}
        onChange={onHueChange}
      />
    </Root>
  )
}
