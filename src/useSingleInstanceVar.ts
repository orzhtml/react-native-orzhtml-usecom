import {useCallback, useEffect, useRef} from 'react';

import {KeyOf} from '../types';

/** （推荐使用）将所有实例变量声明在一起，并以更接近实例变量的方式使用 */
function useSingleInstanceVar<T extends Record<string, any>>(
  initialValue: T,
): T {
  const instRef = useRef<T>(initialValue);
  const returnVal = useRef<T>({...initialValue});

  /** 实现一个响应式函数 */
  const defineProperty = useCallback((obj: T, key: KeyOf<T>) => {
    Object.defineProperty(obj, key, {
      get() {
        return instRef.current[key];
      },
      set(val) {
        instRef.current = {...instRef.current, [key]: val};
      },
    });
  }, []);

  useEffect(() => {
    Object.keys(returnVal.current).forEach(key => {
      if (key) {
        defineProperty(returnVal.current, key as KeyOf<T>);
      }
    });
  }, [defineProperty]);

  return returnVal.current;
}

export default useSingleInstanceVar;
