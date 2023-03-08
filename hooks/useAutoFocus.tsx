import { useEffect, useRef } from 'react'

const useAutoFocus = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return inputRef
}

export default useAutoFocus
