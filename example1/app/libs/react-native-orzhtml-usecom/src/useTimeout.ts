import { useEffect, useRef, useCallback } from 'react'

function useTimeout () {
  const timerRef = useRef<number | NodeJS.Timer>(0)

  useEffect(() => {
    return () => {
      clear()
    }
  }, [])

  const timeout = useCallback((fn: () => void, delay: number | undefined) => {
    timerRef.current = setTimeout(() => {
      fn()
    }, delay)
  }, [])

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current as NodeJS.Timer)
      timerRef.current = 0
    }
  }, [])

  return [timeout, clear]
}

export default useTimeout
