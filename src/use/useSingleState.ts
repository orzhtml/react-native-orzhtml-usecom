import { useEffect, useRef } from 'react'

import { setSingleStateFn } from '../../index.d'

import useStateCB from './useStateCB'

// （推荐使用）使用类似于 class 形式的 this.state 和 this.setState 的方式来使用 state。
// 同样可以安全地使用 state，并且拥有 callback 能力
function useSingleState<T>(initialState?: T): [T, setSingleStateFn<T>] {
  const [getState, setState] = useStateCB<T>(initialState)
  const stateObj = useRef({ ...initialState }).current

  useEffect(() => {
    Object.keys(stateObj).forEach(key => {
      if (key) {
        Object.defineProperty(stateObj, key, {
          get() {
            return getState()[key]
          },
        })
      }
    })
  }, [])

  const newSetState = (partialStates: any, callback: any) => {
    setState({ ...getState(), ...partialStates }, callback)
  }

  return [stateObj, newSetState]
}

export default useSingleState
