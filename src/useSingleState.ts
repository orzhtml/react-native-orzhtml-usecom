import { useEffect, useRef } from 'react'

import { setSingleStateFn } from '../index.d'

import { isFunction } from './utils'
import useStateCB from './useStateCB'
import useUnmountedRef from './useUnmountedRef'

// （推荐使用）使用类似于 class 形式的 this.state 和 this.setState 的方式来使用 state。
// 同样可以安全地使用 state，并且拥有 callback 能力
function useSingleState<T> (initialState: T): [T, setSingleStateFn<T>] {
  const unmountedRef = useUnmountedRef()
  const [getState, setState] = useStateCB<T>(initialState)
  const stateObj = useRef({ ...(isFunction(initialState) ? initialState() : initialState) }).current

  useEffect(() => {
    Object.keys(stateObj).forEach(key => {
      if (key) {
        Object.defineProperty(stateObj, key, {
          get () {
            return getState()[key]
          },
        })
      }
    })
  }, [])

  const newSetState = (partialStates: any, callback: any) => {
    /** 如果组件已卸载，请停止更新 */
    if (unmountedRef.current) return
    setState({ ...getState(), ...partialStates }, callback)
  }

  return [stateObj, newSetState]
}

export default useSingleState
