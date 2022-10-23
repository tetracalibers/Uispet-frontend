import { useCallback, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { CodeHighlight } from '../../contents/CodeHighlight'
import { nanoid } from 'nanoid'
import { HorizontalStack } from '../../layout/HorizontalStack'

const css_ResetButton = css`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
  font-size: 1rem;
`

const BaseButtonSample = styled.div`
  --size: 4rem;

  display: inline-block;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background-image: linear-gradient(
    315deg,
    rgba(4, 93, 233, 1) 0%,
    rgba(9, 198, 249, 1) 74%
  );
`

const dripShadows = [
  'inset 14px 0px 5px -10px rgba(77, 96, 139, .2)',
  'inset 13px 0px 2px -10px rgba(77, 96, 139, .2)',
  'inset 0px -3px 5px 0px rgba(250, 241, 220, .5)',
  'inset 0px -20px 10px 1px rgba(255, 255, 255, .3)',
  'inset -20px 10px 5px -20px rgba(77, 96, 139, .3)',
  'inset -20px 15px 10px -20px rgba(77, 96, 139, .2)',
  'inset 0px 20px 30px -5px rgba(77, 96, 139, .3)',
  '0px 2px 1px rgba(0, 0, 0, 0.06)',
  '0px 4px 2px, rgba(0, 0, 0, 0.09)',
  '0px 8px 4px, rgba(0, 0, 0, 0.09)',
  '0px 16px 8px, rgba(0, 0, 0, 0.09)',
  '0px 32px 16px, rgba(0, 0, 0, 0.09)',
]

const dripShadowRecord = dripShadows.reduce<Record<string, string>>(
  (prev, curr) => ({ ...prev, [nanoid()]: curr }),
  {}
)

const OptionCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #4d608b;
`

const ShowCase = styled.div`
  background-color: #4d608b;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  width: fit-content;
  margin: auto;
`

const OverflowScroll = styled.div`
  width: 100%;
  overflow: auto;
`

export const DripButtonArticle = () => {
  const [checkedShadow, setCheckedShadow] = useState<Record<string, string>>({})

  const onCheck = useCallback(
    (id: string, value: string) => {
      if (checkedShadow[id] !== undefined) {
        return setCheckedShadow(prev => {
          const clone = { ...prev }
          delete clone[id]
          return clone
        })
      }
      setCheckedShadow(prev => ({ ...prev, [id]: value }))
    },
    [checkedShadow]
  )

  return (
    <>
      <HorizontalStack>
        {Object.entries(dripShadowRecord).map(([id, sh]) => (
          <OptionCard key={sh}>
            <input
              type='checkbox'
              value={sh}
              checked={checkedShadow[id] !== undefined}
              onChange={e => onCheck(id, sh)}
            />
            <BaseButtonSample style={{ boxShadow: sh }} />
          </OptionCard>
        ))}
      </HorizontalStack>
      <ShowCase>
        <BaseButtonSample
          style={{ boxShadow: Object.values(checkedShadow).join(', ') }}
        />
      </ShowCase>
    </>
  )
}
