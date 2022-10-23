import { useState } from 'react'
import { CodeHighlight } from '../../contents/CodeHighlight'
import { RangeInput } from '../../control/RangeInput'
import { BorderTriangleDemo } from './Demo'

export const BorderTriangleArticle = () => {
  const [size, setSize] = useState(200)

  return (
    <>
      <h1>CSS Borderで三角形をつくる</h1>
      <label>
        width & height
        <RangeInput
          min={0}
          max={200}
          value={size}
          onChange={e => setSize(Number(e.target.value))}
        />
      </label>
      <BorderTriangleDemo size={size} />
      <CodeHighlight lang='css'>
        {`
          width: ${size}px;
          height: ${size}px;
          border-top: 100px solid #f6bffb;
          border-bottom: 100px solid #8093e5;
          border-left: 100px solid #f8898e;
          border-right: 100px solid #d1eaaa;
          background-color: #bdc3c7;
          box-sizing: content-box;
        `}
      </CodeHighlight>
    </>
  )
}
