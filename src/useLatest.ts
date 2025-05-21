import {MutableRefObject, useRef, useEffect} from 'react';

/**
 * 返回当前最新值的 Hook，可以避免闭包问题。
 */
function useLatest<T>(value: T): MutableRefObject<T> {
  const ref = useRef<T>(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
}

export default useLatest;
