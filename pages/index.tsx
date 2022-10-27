import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <h1>UIspet</h1>
      <ul>
        <li>
          <Link href='/articles/css_triangle'>
            <a>CSSで三角形をつくる</a>
          </Link>
        </li>
        <li>
          <Link href='/articles/drip_button'>
            <a>重ね着shadowによる雫風ボタン</a>
          </Link>
        </li>
        <li>
          <Link href='/articles/color_space'>
            <a>色相環</a>
          </Link>
        </li>
        <li>
          <Link href='/articles/color_picker_demo'>
            <a>Color Picker Demo</a>
          </Link>
        </li>
        <li>
          <Link href='/demo/xyinput'>
            <a>XyInput Demo</a>
          </Link>
        </li>
        <li>
          <Link href='/generator/box-shadow'>
            <a>Box Shadow Generator</a>
          </Link>
        </li>
      </ul>
    </>
  )
}

export default Home
