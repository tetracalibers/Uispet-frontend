import styled from 'styled-components'
import { DollarProps } from '../../../types/DollarProps'

type Props = {
  size: number
}

const Demo = styled.div<DollarProps<Props>>`
  --size: ${({ $size }) => $size}px;

  width: var(--size);
  height: var(--size);
  border-top: 100px solid #f6bffb;
  border-bottom: 100px solid #8093e5;
  border-left: 100px solid #f8898e;
  border-right: 100px solid #d1eaaa;
  background-color: #bdc3c7;
  box-sizing: content-box;
`

export const BorderTriangleDemo = ({ size }: Props) => {
  return <Demo $size={size} />
}
