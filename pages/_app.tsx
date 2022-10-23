import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta key='charset' name='charset' content='utf-8' />
        <meta
          key='viewport'
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=5'
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
