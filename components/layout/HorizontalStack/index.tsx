import styled from 'styled-components'

export const HorizontalStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-evenly;
  align-items: center;

  & > * {
    flex-shrink: 0;
  }
`
