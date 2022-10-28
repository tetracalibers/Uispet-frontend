import { ComponentPropsWithRef } from 'react'
import styled from 'styled-components'

const Input = styled.input`
  font-family: inherit;
  font-size: 16px;
  appearance: none;
  padding: 0px 6px;
  border: none;
  border-bottom: 1.5px solid #7895b2;
  background-color: #fff;
  color: #354259;
  caret-color: #98a8f8;

  position: relative;
  padding: 0px 6px;
  text-align: right;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }

  &:active,
  &:focus {
    outline: none;
    box-shadow: rgb(136 165 191 / 26%) 5px 5px 0px 0px,
      rgb(255 255 255 / 80%) -6px -2px 16px 0px;
    padding-left: 12px;
    border: none;
  }
`

const EffectWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    transition: 0.4s;
    display: block;
    content: '';
  }

  &:focus-within::after {
    height: inherit;
    border: 2px solid rgba(246, 157, 250, 0.5);
    border-radius: 2px;
    margin: -2px;
    display: block;
  }
`

export const ResetStyleInput = ({
  ...props
}: ComponentPropsWithRef<'input'>) => {
  return (
    <EffectWrapper>
      <Input {...props} />
    </EffectWrapper>
  )
}
