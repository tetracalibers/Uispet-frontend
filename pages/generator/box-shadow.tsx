import { NextPage } from 'next'
import { useCallback, useState } from 'react'
import { BoxShadow } from '../../components/css-editor/BoxShadow'
import { Shadow } from '../../types/Shadow'

type Props = {}

/**
 * box-shadow: rgba(0, 0, 0, 0.2) 0px 60px 40px -7px;
 */

const BoxShadowGeneratorPage: NextPage<Props> = () => {
  const [boxShadow, setBoxShadow] = useState<Shadow>({
    color: '#00000033',
    offsetX: 0,
    offsetY: 60,
    blur: 40,
    spread: -7,
    inset: false,
  })

  const onShadowEdit = useCallback(
    <T extends keyof Shadow>(target: T, value: Shadow[T]) =>
      setBoxShadow(sh => ({ ...sh, [target]: value })),
    []
  )

  return <BoxShadow shadow={boxShadow} onChange={onShadowEdit} />
}

export default BoxShadowGeneratorPage
