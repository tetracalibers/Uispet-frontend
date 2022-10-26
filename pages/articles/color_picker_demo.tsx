import { NextPage } from 'next'
import { useState, useCallback } from 'react'
import { ColorPicker } from '../../components/control/ColorPicker'

type Props = {}

const ColorPickerArticle: NextPage<Props> = () => {
  const [color, setColor] = useState('#ffffff')

  const onColorChange = useCallback((color: string) => {
    setColor(color)
  }, [])

  return <ColorPicker color={color} onChange={onColorChange} />
}

export default ColorPickerArticle
