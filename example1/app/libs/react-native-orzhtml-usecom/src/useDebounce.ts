import { useEffect, useRef } from 'react'

// 防抖
const useDebounce = (
  fn: () => void,
  ms = 30,
  deps = [],
) => {
  let timeout = useRef<number | NodeJS.Timer>(0)

  useEffect(() => {
    if (timeout.current) clearTimeout(timeout.current as NodeJS.Timer)
    timeout.current = setTimeout(() => {
      fn()
    }, ms)
  }, deps)

  const cancel = () => {
    clearTimeout(timeout.current as NodeJS.Timer)
    timeout.current = 0
  }

  return [cancel]
}

export default useDebounce
