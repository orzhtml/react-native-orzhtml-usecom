import { useEffect, useRef, useCallback } from 'react'

import { isNumber } from './utils'

function useInterval() {
  const timerRef = useRef<number | NodeJS.Timer>(0)

  useEffect(() => {
    return () => {
      clear()
    }
  }, [])

  const interval = (
    fn: () => void,
    delay: number | undefined,
    immediate?: boolean
  ) => {
    if (!isNumber(delay) || delay < 0) return

    if (immediate) {
      fn()
    }

    timerRef.current = setInterval(() => {
      fn()
    }, delay)
  }

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current as NodeJS.Timer)
      timerRef.current = 0
    }
  }, [])

  return [interval, clear]
}

export default useInterval
