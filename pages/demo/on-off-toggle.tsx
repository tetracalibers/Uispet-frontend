import { NextPage } from 'next'
import { useState } from 'react'
import styled from 'styled-components'
import { OnOffToggle } from '../../components/control/OnOffToggle'

const Centering = styled.div`
  width: 100%;
  height: 100vh;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

type Props = {}

const OnOffToggleDemoPage: NextPage<Props> = () => {
  const [value, setValue] = useState(false)

  return (
    <Centering>
      <OnOffToggle value={value} onChange={setValue} />
    </Centering>
  )
}

export default OnOffToggleDemoPage
