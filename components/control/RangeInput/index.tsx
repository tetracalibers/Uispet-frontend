import { ComponentPropsWithRef, useMemo } from 'react'
import styled, { css } from 'styled-components'
import { nanoid } from 'nanoid'

interface Props extends ComponentPropsWithRef<'input'> {
  type?: never
  value: number
  min: number
  max: number
  label: string
  unit?: string
}

const Layout = styled.div`
  --color: #6e85b7;
  --sub-color: #a6a9b6;
  --thumb-width: 20px;
  --thumb-height: 42px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem 3rem;
`

const Slider = styled.div`
  width: 100%;
`

const SliderThumb = styled.div<{ $now: number; $max: number; $min: number }>`
  width: calc(100% - var(--thumb-width));
  padding: 0 calc(var(--thumb-width) * 0.5);
  height: 1em;
  position: relative;
  color: var(--color);

  & span {
    font-size: 1.5rem;
    width: ${({ $max }) => $max.toString().length}ch;
    transform: translateX(calc(var(--thumb-width) * -0.5));
    position: absolute;
    left: ${({ $now, $max, $min }) =>
      css`calc((${$now} - ${$min}) / (${$max} - ${$min}) * 100%)`};
    text-align: center;
    transform: translateX(calc(var(--thumb-width) * 0.5 - 50%));
  }

  & span::after {
    content: attr(data-unit);
    font-size: 1rem;
  }
`

const css_Track = css`
  width: calc(100% - var(--thumb-width));
  height: 5px;
  cursor: pointer;
  box-shadow: none;
  background: var(--sub-color);
  border-radius: 5px;
`

const css_Thumb = css`
  height: var(--thumb-height);
  width: 1px;
  border-radius: var(--thumb-width);
  background: var(--color);
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: calc(var(--thumb-height) * -0.5);
  padding-left: calc(var(--thumb-width) * 0.5);
  padding-right: calc(var(--thumb-width) * 0.5);
`

const SliderTrack = styled.input`
  -webkit-appearance: none;
  margin: 0;
  margin-top: var(--thumb-height);
  width: 100%;
  padding: 0;
  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    ${css_Track}
  }
  &::-moz-range-track {
    ${css_Track}
  }
  &::-webkit-slider-thumb {
    ${css_Thumb}
  }
  &::-moz-range-thumb {
    ${css_Thumb}
  }
  &::-moz-focus-outer {
    border: 0;
  }
`

const BetweenLabel = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: var(--color);
  margin-top: calc(var(--thumb-height) * 0.25);
`

const MinValue = styled.span``

const MaxValue = styled.span``

const Title = styled.label`
  font-size: 1.25rem;
`

export const RangeInput = ({
  value,
  min,
  max,
  onChange,
  label,
  unit,
  ...props
}: Props) => {
  const id = useMemo(() => nanoid(), [])

  return (
    <Layout>
      <Slider>
        <SliderThumb aria-hidden={true} $now={value} $max={max} $min={min}>
          <span data-unit={unit ?? ''}>{value}</span>
        </SliderThumb>
        <SliderTrack
          {...props}
          type='range'
          value={value}
          onChange={e => onChange && onChange(e)}
          min={min}
          max={max}
          id={id}
        />
      </Slider>
      <BetweenLabel aria-hidden={true}>
        <MinValue>{min}</MinValue>
        <Title htmlFor={id}>{label}</Title>
        <MaxValue>{max}</MaxValue>
      </BetweenLabel>
    </Layout>
  )
}
