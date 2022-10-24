import styled, { css } from 'styled-components'

const degrees360 = [...new Array(360)].map((_, i) => i + 1)

const stops = [
  { deg: 0, rgb: '(255, 0, 0)' },
  { deg: 60, rgb: '(255, 255, 0)' },
  { deg: 120, rgb: '(0, 255, 0)' },
  { deg: 180, rgb: '(0, 255, 255)' },
  { deg: 240, rgb: '(0, 0, 255)' },
  { deg: 300, rgb: '(255, 0, 255)' },
]

const Layout = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 600px;
  overflow: hidden;
`

const Circle = styled.ul`
  list-style: none;
  position: relative;
  width: 300px;
  height: 300px;
  left: 115px;
  padding: 0;
  margin: 0;
`

const Triangle = styled.li<{ $i: number; $label?: string }>`
  width: 0;
  height: 0;
  position: absolute;
  border-style: solid;
  border-width: 115px 1px 0;
  transform-origin: 50% 100%;

  ${({ $i }) => css`
    transform: rotate(${$i}deg) translate3d(0, 0, 0);
    border-image: linear-gradient(to bottom, hsl(${$i}, 100%, 50%), #fff) 100% /
      115px 1px 0;
  `}

  ${({ $i, $label }) =>
    $label &&
    css`
      &::after {
        content: '${$label}';
        transform: rotate(${-1 * $i}deg)
          translate(
            ${Math.floor(Math.cos(($i - 90) * (Math.PI / 180)) * 150)}px,
            ${Math.floor(Math.sin(($i - 90) * (Math.PI / 180)) * 150)}px
          );
        display: inline-block;
        background-color: hsla(${$i}, 100%, 50%, 50%);
        border-radius: 1rem;
        padding: 0.25rem 0.5rem;
        white-space: nowrap;
      }
    `}
`

export const HueCircle = () => {
  return (
    <Layout>
      <Circle>
        {degrees360.map(num => (
          <Triangle key={num} $i={num} />
        ))}
      </Circle>
      <Circle>
        {stops.map(({ deg, rgb }) => (
          <Triangle key={deg} $i={deg} $label={rgb} />
        ))}
      </Circle>
    </Layout>
  )
}
