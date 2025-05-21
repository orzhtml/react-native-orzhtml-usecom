import {useCallback, useRef, useState, useMemo} from 'react';
import {DebounceFn, DebounceOptions} from '../types';

function useDebounce<T extends (...args: any[]) => any>(
  func: T,
  config: number | DebounceOptions,
): DebounceFn<T> {
  const options = useMemo(() => {
    const defaults = {leading: false, trailing: true};
    return typeof config === 'number'
      ? {...defaults, delay: config}
      : {...defaults, ...config};
  }, [config]);

  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const lastArgsRef = useRef<Parameters<T>>();
  const shouldTriggerTrailingRef = useRef(true);
  const [isPending, setIsPending] = useState(false);

  const execute = useCallback(
    (...args: Parameters<T>) => {
      lastArgsRef.current = args;

      // 当有定时器存在时清除旧任务
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        shouldTriggerTrailingRef.current = true; // 保留尾部执行权利
      }

      // Leading 立即执行逻辑
      if (options.leading && !timerRef.current) {
        func(...args);
        shouldTriggerTrailingRef.current = false; // 标记已执行头部
        setIsPending(true);
      }

      // 设置新的定时器（必须始终创建）
      timerRef.current = setTimeout(() => {
        // 尾部执行条件判断
        if (options.trailing && shouldTriggerTrailingRef.current) {
          func(...lastArgsRef.current!);
        }
        timerRef.current = undefined;
        shouldTriggerTrailingRef.current = true;
        setIsPending(false);
      }, options.delay);
    },
    [func, options.delay, options.leading, options.trailing],
  );

  const cancel = useCallback(() => {
    timerRef.current && clearTimeout(timerRef.current);
    timerRef.current = undefined;
    shouldTriggerTrailingRef.current = true;
    setIsPending(false);
  }, []);

  const flush = useCallback(() => {
    if (timerRef.current && lastArgsRef.current) {
      cancel();
      func(...lastArgsRef.current);
    }
  }, [func, cancel]);

  return useMemo(
    () => ({execute, cancel, flush, isPending}),
    [execute, cancel, flush, isPending],
  );
}

export default useDebounce;
