import { NextPage } from 'next'
import { XyInput } from '../../components/control/XyInput'

type Props = {}

const XyInputDemoPage: NextPage<Props> = () => {
  return <XyInput coords={{ x: 0, y: 0 }} onChange={() => {}} />
}

export default XyInputDemoPage
