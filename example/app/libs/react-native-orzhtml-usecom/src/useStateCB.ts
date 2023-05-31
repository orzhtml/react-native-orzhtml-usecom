import { useState, useEffect, useRef, useCallback } from 'react'

import { CallbackFn, GetStateFn, SetStateFn } from '../types'

import { isFunction, isObject } from './utils'
import useUnmountedRef from './useUnmountedRef'

/**
 * 让你可以安全地使用 react 的 state，它的值就是你想要的值，
 * 而不是陈旧的值。并且也拥有了 callback 的能力。
 */
function useStateCB<T>(initialState: T | (() => T)): [GetStateFn<T>, SetStateFn<T>] {
  const [state, setState] = useState<Partial<T>>(initialState)
  const stateRef = useRef<T>(isFunction(initialState) ? initialState() : initialState)
  const callbackRef = useRef<CallbackFn | null>(null)
  const unmountedRef = useUnmountedRef()

  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(state)
      callbackRef.current = null
    }
  }, [state])

  const setStateWithCallback = useCallback((partialStates: Partial<T>, callback?: CallbackFn) => {
    /** 如果组件已卸载，请停止更新 */
    if (unmountedRef.current) return
    if (callback) {
      callbackRef.current = callback
    }
    /** 如果数据是 obj，只会新增不会删除覆盖 */
    const newState = isObject(stateRef.current) ? { ...stateRef.current, ...partialStates } : partialStates
    stateRef.current = newState as T
    setState(newState)
  }, [])

  const getState = useCallback(() => {
    return stateRef.current;
  }, []);

  return [getState, setStateWithCallback]
}

export default useStateCB
