import styled from 'styled-components'
import { useSwitchOpen } from '../../../hooks/useSwitchOpen'
import { ResetStyleButton } from '../../reset-style/Button'
import { ColorPicker } from '../ColorPicker'

interface ColorPickerCompactProps {
  color: string
  onChange(color: string): void
}

const Container = styled.div``

const PreviewButton = styled(ResetStyleButton)`
  --colour-white: #ffffff;

  font-size: 16px;
  transition: all 0.3s ease-in-out;
  border-style: solid;
  border-width: 1px;
  width: 10em;
  height: 3em;
  box-shadow: inset 0 0 0 2px var(--colour-white);

  &:hover {
    box-shadow: inset 0 0 0 4px var(--colour-white);
  }
`

const ButtonLabel = styled.span`
  background: inherit;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: invert(1) contrast(9);
  mix-blend-mode: difference;
  text-shadow: 0 0 black;
`

export const ColorPickerCompact = ({
  color,
  onChange,
}: ColorPickerCompactProps) => {
  const { isOpen, toggleOpen } = useSwitchOpen()

  return (
    <Container>
      <PreviewButton
        type='button'
        onClick={toggleOpen}
        style={{ color, backgroundColor: color, borderColor: color }}
      >
        <ButtonLabel>{isOpen ? 'Close' : 'Edit Color'}</ButtonLabel>
      </PreviewButton>
      {isOpen && <ColorPicker color={color} onChange={onChange} />}
    </Container>
  )
}
