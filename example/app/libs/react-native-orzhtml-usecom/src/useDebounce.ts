import { useEffect, useRef, DependencyList } from 'react'

// 防抖
const useDebounce = (
  fn: () => void,
  ms = 30,
  deps: DependencyList = [],
) => {
  const timeoutRef = useRef<number | NodeJS.Timer>()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fn()
    }, ms)

    return () => {
      clearTimeout(timeoutId)
    }
  }, deps)

  const cancel = () => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = undefined
  }

  return [cancel]
}

export default useDebounce
