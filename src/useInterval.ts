import { useEffect, useRef, useCallback } from 'react'

import { isNumber } from './utils'

/**
 * 使用定时器的 Hook。
 * 可以设置定时执行的回调函数，并提供清除定时器的方法。
 */
function useInterval() {
  const timerRef = useRef<number | NodeJS.Timer>(0)

  useEffect(() => {
    return () => {
      clear()
    }
  }, [])

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current as NodeJS.Timer)
      timerRef.current = 0
    }
  }, [])

  const interval = useCallback(
    (fn: () => void, delay: number | undefined, immediate?: boolean) => {
      if (!isNumber(delay) || delay < 0) return

      if (immediate) {
        fn()
      }

      timerRef.current = setInterval(() => {
        fn()
      }, delay)

      return clear
    },
    [clear]
  )

  return [interval, clear]
}

export default useInterval
