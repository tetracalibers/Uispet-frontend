import { useState } from 'react'

export const useSwitchOpen = () => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggleOpen = () => setIsOpen(prev => !prev)

  return { isOpen, open, close, toggleOpen }
}
