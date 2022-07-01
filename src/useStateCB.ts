import { useState, useEffect } from 'react'

import { getStateFn, setStateFn } from '../index.d'

import useSingleInstanceVar from './useSingleInstanceVar'

// 让你可以安全地使用 react 的 state，它的值就是你想要的值，
// 而不是陈旧的值。并且也拥有了 callback 的能力。
function useStateCB<T>(initialState: T): [getStateFn, setStateFn<T>] {
  const [state, setState] = useState<T>(initialState)
  const Instance = useSingleInstanceVar<{
    [p: string]: any;
  }>({
    state: initialState,
    callback: null
  })

  useEffect(() => {
    if (Instance.callback) {
      Instance.callback(state)
      Instance.callback = null
    }
  }, [state])

  const newSetState = (newState: any, callback: any) => {
    if (callback) Instance.callback = callback
    Instance.state = newState
    setState(newState)
  }

  const getState = () => {
    return Instance.state
  }

  return [getState, newSetState]
}

export default useStateCB
