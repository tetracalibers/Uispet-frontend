import styled from 'styled-components'

interface OnOffToggleProps {
  value: boolean
  onChange: (value: boolean) => void
  label: string
}

const Container = styled.div`
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
`

const ToggleState = styled.div`
  cursor: pointer;
  font-size: calc(var(--side) * 0.4);
  width: calc(var(--side) * 2);
  height: var(--side);
  display: inline-block;
  position: relative;
  background: white;
  text-align: left;
  line-height: var(--side);
  box-sizing: border-box;
  perspective: 300px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-bottom-color: #e6e6e6;
  box-shadow: inset 0 0.1em 0.03em rgb(0 0 0 / 20%),
    inset 0 0.1em 0.3em rgb(0 0 0 / 30%), 0 0 2em rgb(255 255 255 / 60%);
  border-radius: var(--radius);

  &:before {
    width: var(--side);
    height: var(--side);
    position: absolute;
    right: 0;
    top: 0;
    background-color: #f5f5f5;
    display: inline-block;
    text-align: center;
    color: #ffffff;
    transition: all var(--duration) ease-in-out;
    transform-origin: 0% 50%;
    border-radius: var(--radius);
  }
`

const Label = styled.label`
  --side: 3rem;
  --duration: 1s;
  --radius: 10px;

  display: flex;
  justify-content: center;
  align-content: center;
  gap: 1rem;
`

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  /** VisuallyHidden */
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;

  /** OFF */
  & + label > ${ToggleState} {
    &::before {
      content: 'OFF';
      background-color: #5eb9cc;
      transform: rotateY(0deg);
      border-bottom: 0.03em solid #71c1d2;
      text-shadow: 0 0.05em 0 #4bb1c6;
      margin-right: -1px;
      margin-top: -0.14em;
      box-shadow: 0 0.12em 0.01em #3ba5bc, 0 0.12em 0.3em rgb(59 165 188 / 60%),
        0 0.12em 2em rgb(0 0 0 / 30%), -0.12em 0.15em 0.2em rgb(0 0 0 / 20%);
      transition-duration: calc(var(--duration) / 1.5);
      transition-timing-function: cubic-bezier(0.52, -0.41, 0.55, 1.46);
    }
  }

  /** ON */
  &:checked + label > ${ToggleState} {
    &::before {
      content: 'ON';
      transform: rotateY(-180deg);
      background-color: #cc0966;
      margin-right: var(--side);
      border-bottom: 0.03em solid #f5137f;
      text-shadow: 0 0.05em 0 #9b074e;
      transform: rotateY(0deg);
      box-shadow: 0 0.12em 0.01em #9b074e, 0 0.12em 0.3em rgb(155 7 78 / 60%),
        0 0.12em 2em rgb(0 0 0 / 30%), 0.12em 0.15em 0.2em rgb(0 0 0 / 20%);
    }
  }
`

const ToggleTitle = styled.div`
  line-height: var(--side);
`

export const OnOffToggle = ({ value, onChange, label }: OnOffToggleProps) => {
  return (
    <Container>
      <Checkbox
        id='on-off-toggle'
        checked={value}
        onChange={e => onChange(e.target.checked)}
      />
      <Label htmlFor='on-off-toggle'>
        <ToggleTitle>{label}</ToggleTitle>
        <ToggleState />
      </Label>
    </Container>
  )
}
