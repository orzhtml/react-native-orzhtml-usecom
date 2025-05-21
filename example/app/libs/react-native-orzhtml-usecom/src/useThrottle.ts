import {useCallback, useRef, useState, useMemo, useEffect} from 'react';

import {ThrottledFn, ThrottleOptions} from '../types';

function useThrottle<T extends (...args: any[]) => any>(
  func: T,
  config: number | ThrottleOptions,
): ThrottledFn<T> {
  const options = useMemo(() => {
    const defaults = {leading: true, trailing: true};
    return typeof config === 'number'
      ? {...defaults, delay: config}
      : {...defaults, ...config};
  }, [config]);

  // 状态存储
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const lastArgsRef = useRef<Parameters<T>>();
  const lastExecRef = useRef(0);
  const shouldTrailingRef = useRef(false);
  const [isPending, setIsPending] = useState(false);

  const execute = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      lastArgsRef.current = args;

      // 立即执行条件（leading）
      if (options.leading && now - lastExecRef.current >= options.delay) {
        lastExecRef.current = now;
        func(...args);
        shouldTrailingRef.current = false; // 已执行leading，暂不触发trailing
      } else {
        shouldTrailingRef.current = true; // 标记需要触发trailing
      }

      // 清理旧定时器
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // 始终设置新的定时器（用于处理trailing）
      timerRef.current = setTimeout(() => {
        if (
          options.trailing &&
          shouldTrailingRef.current &&
          lastArgsRef.current
        ) {
          lastExecRef.current = Date.now();
          func(...lastArgsRef.current);
        }
        timerRef.current = undefined;
        shouldTrailingRef.current = false;
        setIsPending(false);
      }, options.delay);

      setIsPending(true);
    },
    [func, options.delay, options.leading, options.trailing],
  );

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
    shouldTrailingRef.current = false;
    setIsPending(false);
  }, []);

  const flush = useCallback(() => {
    if (lastArgsRef.current) {
      cancel();
      func(...lastArgsRef.current);
      lastExecRef.current = Date.now();
    }
  }, [func, cancel]);

  // 组件卸载时清理
  useEffect(() => {
    return () => cancel();
  }, [cancel]);

  return useMemo(
    () => ({execute, cancel, flush, isPending}),
    [execute, cancel, flush, isPending],
  );
}

export default useThrottle;
