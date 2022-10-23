import { ComponentPropsWithRef } from 'react'
import styled, { css } from 'styled-components'

interface Props extends ComponentPropsWithRef<'input'> {
  type?: never
  value: number
  min: number
  max: number
}

const Layout = styled.div`
  --color: #6e85b7;
  --thumb-width: 20px;
  --thumb-height: 42px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`

const Slider = styled.div`
  width: 100%;
`

const SliderThumb = styled.div<{ $now: string; $max: number; $min: number }>`
  width: calc(100% - var(--thumb-width));
  padding: 0 calc(var(--thumb-width) * 0.5);
  height: 1em;
  position: relative;
  color: var(--color);

  & span {
    width: ${({ $max }) => $max.toString().length}ch;
    transform: translateX(calc(var(--thumb-width) * -0.5));
    position: absolute;
    left: ${({ $now, $max, $min }) =>
      css`calc((${$now} - ${$min}) / (${$max} - ${$min}) * 100%)`};
    text-align: center;
    transform: translateX(calc(var(--thumb-width) * 0.5 - 50%));
  }
`

const css_Track = css`
  width: calc(100% - var(--thumb-width));
  height: 5px;
  cursor: pointer;
  box-shadow: none;
  background: #a6a9b6;
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
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: var(--color);
`

const MinValue = styled.span``

const MaxValue = styled.span``

export const RangeInput = ({ value, min, max, onChange, ...props }: Props) => {
  return (
    <Layout>
      <Slider>
        <SliderThumb aria-hidden={true} $now={`${value}`} $max={max} $min={min}>
          <span>{value}</span>
        </SliderThumb>
        <SliderTrack
          {...props}
          type='range'
          value={value}
          onChange={e => onChange && onChange(e)}
          min={min}
          max={max}
        />
      </Slider>
      <BetweenLabel aria-hidden={true}>
        <MinValue>{min}</MinValue>
        <MaxValue>{max}</MaxValue>
      </BetweenLabel>
    </Layout>
  )
}
