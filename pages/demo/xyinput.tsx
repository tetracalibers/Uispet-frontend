import { NextPage } from 'next'
import { useCallback, useState } from 'react'
import { XyInput } from '../../components/control/XyInput'
import { IndicatorDragEvent } from '../../types/Event'
import { getAreaXyCoords } from '../../utils/coords'

type Props = {}

const XyInputDemoPage: NextPage<Props> = () => {
  const [xy, setXy] = useState({ x: 0, y: 0 })

  const onMove = useCallback((e: IndicatorDragEvent) => {
    const { x, y, width, height } = getAreaXyCoords(e)
    setXy({
      x: (x / width) * 100,
      y: (y / height) * 100,
    })
  }, [])

  return <XyInput coords={xy} onChange={onMove} />
}

export default XyInputDemoPage
