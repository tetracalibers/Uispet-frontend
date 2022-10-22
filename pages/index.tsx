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
      </ul>
    </>
  )
}

export default Home
