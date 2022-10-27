import { NextPage } from 'next'
import { useState } from 'react'
import { XyInput } from '../../components/control/XyInput'

type Props = {}

const XyInputDemoPage: NextPage<Props> = () => {
  const [value, setValue] = useState({ x: 0, y: 0 })

  return (
    <XyInput
      value={value}
      onChange={setValue}
      max={{ x: 100, y: 100 }}
      min={{ x: -100, y: -100 }}
    />
  )
}

export default XyInputDemoPage
