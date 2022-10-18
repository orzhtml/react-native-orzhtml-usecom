import { useState, useEffect, useRef, useCallback } from 'react'

import { getStateFn, setStateFn } from '../index.d'

import { isFunction, isObject } from './utils'
import useUnmountedRef from './useUnmountedRef'

/**
 * 让你可以安全地使用 react 的 state，它的值就是你想要的值，
 * 而不是陈旧的值。并且也拥有了 callback 的能力。
 * @returns
 */
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

  const newSetState = useCallback((partialStates: any, callback: any) => {
    /** 如果组件已卸载，请停止更新 */
    if (unmountedRef.current) return
    if (callback) {
      _callbackRef.current = callback
    }
    /** 如果数据是 obj，只会新增不会删除覆盖 */
    const newState = isObject(state) ? { ...state, ...partialStates } : partialStates
    _stateRef.current = newState
    setState(newState)
  }, [state])

  const getState = () => {
    return _stateRef.current
  }

  return [getState, newSetState]
}

export default useStateCB
