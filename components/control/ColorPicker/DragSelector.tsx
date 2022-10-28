import styled from 'styled-components'
import { Color } from '../../../types/Color'
import { HueDragArea } from './HueDragArea'
import { SaturationDragArea } from './SaturationDragArea'
import { IndicatorDragEvent } from '../../../types/Event'
import { OpacityDragArea } from './OpacityDragArea'

interface DragSelectorProps {
  parsedColor: Color
  satCoords: Array<number>
  hueCoords: number
  onSaturationChange: (e: IndicatorDragEvent) => void
  onHueChange: (e: IndicatorDragEvent) => void
  onOpacityChange: (e: IndicatorDragEvent) => void
}

const Root = styled.div`
  display: grid;
  grid-gap: 8px;
  margin-bottom: 16px;
  max-width: 100%;
`

export const DragSelector = ({
  parsedColor,
  satCoords,
  hueCoords,
  onSaturationChange,
  onHueChange,
  onOpacityChange,
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
      <OpacityDragArea color={parsedColor} onChange={onOpacityChange} />
    </Root>
  )
}
