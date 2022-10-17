import { useEffect, useRef } from 'react'

// （推荐使用）将所有实例变量声明在一起，并以更接近实例变量的方式使用
function useSingleInstanceVar<T> (initialValue: T): T {
  const instRef = useRef<any>(initialValue)
  const returnVal = useRef<any>({ ...initialValue })

  useEffect(() => {
    Object.keys(returnVal.current).forEach(key => {
      if (key) {
        Object.defineProperty(returnVal.current, key, {
          get () {
            return instRef.current[key]
          },
          set (val) {
            instRef.current = { ...instRef.current, [key]: val }
          },
        })
      }
    })
  }, [])

  return returnVal.current
}

export default useSingleInstanceVar
