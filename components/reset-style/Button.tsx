import styled from 'styled-components'

export const ResetStyleButton = styled.button`
  /** button要素のデフォルトスタイルを打ち消す */
  appearance: none;
  /** 背景色などはまだ残っているので上書き */
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  font-size: 1rem;
`
