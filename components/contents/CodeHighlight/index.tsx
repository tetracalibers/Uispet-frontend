import { ReactNode, useEffect } from 'react'
import Prism from 'prismjs'

type BoxTypeSwitchProps = {
  isInline: boolean
  children: ReactNode
}

const BoxTypeSwitch = ({ isInline, children }: BoxTypeSwitchProps) => {
  return isInline ? <>{children}</> : <pre>{children}</pre>
}

type CodeHighlightProps = {
  lang: string
  children: string
  isInline?: boolean
}

export const CodeHighlight = ({
  lang,
  children,
  isInline = false,
}: CodeHighlightProps) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [children, lang, isInline])

  return (
    <BoxTypeSwitch isInline={isInline} data-language={lang}>
      <code className={'language-' + lang + ' ' + 'match-braces'}>
        {children}
      </code>
    </BoxTypeSwitch>
  )
}
