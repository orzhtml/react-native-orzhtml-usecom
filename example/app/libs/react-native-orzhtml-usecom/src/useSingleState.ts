import { useEffect, useRef } from 'react'

import { SetStateFn } from '../types'

import { isFunction } from './utils'
import useStateCB from './useStateCB'
import useUnmountedRef from './useUnmountedRef'

/**
 *（推荐使用）使用类似于 class 形式的 this.state 和 this.setState 的方式来使用 state。
 * 同样可以安全地使用 state，并且拥有 callback 能力
 */
function useSingleState<T>(initialState: T | (() => T)): [T, SetStateFn<T>] {
  const unmountedRef = useUnmountedRef();
  const [getState, setState] = useStateCB<Partial<T>>(initialState);
  const stateObj = useRef<Partial<T>>({ ...(isFunction(initialState) ? initialState() : initialState) });

  useEffect(() => {
    Object.keys(stateObj.current).forEach((key) => {
      defineProperty(key as keyof T);
    });
  }, []);

  const defineProperty = (key: keyof T) => {
    Object.defineProperty(stateObj.current, key, {
      get() {
        return getState()[key as keyof Partial<T>];
      },
    });
  };

  const newSetState: SetStateFn<T> = (partialStates, callback) => {
    if (unmountedRef.current) return;
    const newState = { ...stateObj.current, ...partialStates };
    stateObj.current = newState;
    setState(newState, callback);
  };

  return [stateObj.current as T, newSetState];
}

export default useSingleState;