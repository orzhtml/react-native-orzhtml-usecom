import { useState, useEffect, useRef } from 'react'

import { getStateFn, setStateFn } from '../index.d'

import { isFunction } from './utils'
import useUnmountedRef from './useUnmountedRef'

// 让你可以安全地使用 react 的 state，它的值就是你想要的值，
// 而不是陈旧的值。并且也拥有了 callback 的能力。
function useStateCB<T> (initialState: T): [getStateFn<any>, setStateFn<any>] {
  const [state, setState] = useState<T>(initialState)
  const _stateRef = useRef(isFunction(initialState) ? initialState() : initialState)
  const _callbackRef = useRef<any>(null)
  const unmountedRef = useUnmountedRef()

  useEffect(() => {
    if (_callbackRef.current) {
      _callbackRef.current(state)
      _callbackRef.current = null
    }
  }, [state])

  const newSetState = (newState: any, callback: any) => {
    /** 如果组件已卸载，请停止更新 */
    if (unmountedRef.current) return
    if (callback) _callbackRef.current = callback
    _stateRef.current = newState
    setState(newState)
  }

  const getState = () => {
    return _stateRef.current
  }

  return [getState, newSetState]
}

export default useStateCB
