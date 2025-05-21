import {useEffect, useRef, useCallback} from 'react';

function useInterval() {
  const intervalRef = useRef<ReturnType<typeof setTimeout>>();
  const fnRef = useRef<Function>();

  // 保存最新回调
  const updateCallback = useCallback((fn: Function) => {
    if (typeof fn !== 'function') {
      throw new TypeError('useInterval: 回调函数必须是函数');
    }
    fnRef.current = fn;
  }, []);

  // 清除定时器
  const clear = useCallback(() => {
    intervalRef.current && clearInterval(intervalRef.current);
    intervalRef.current = undefined;
  }, []);

  // 核心设置逻辑
  const set = useCallback(
    (
      fn: Function,
      delay: number,
      options: {
        immediate?: boolean;
      } = {immediate: false},
    ) => {
      // 参数强制校验
      if (typeof fn !== 'function') {
        throw new TypeError('useTimeout: 第一个参数必须是函数');
      }
      // 参数校验
      if (typeof delay !== 'number' || isNaN(delay)) {
        throw new TypeError(`useTimeout: delay 必须是数字，当前收到 ${delay}`);
      }
      // 处理 delay 参数
      const safeDelay = Math.max(0, Number(delay) || 0);

      // 清理旧定时器
      clear();
      updateCallback(fn);

      // 立即执行首次调用
      if (options.immediate) {
        fnRef.current?.();
      }

      // 设置新定时器
      intervalRef.current = setInterval(() => {
        fnRef.current?.();
      }, safeDelay);
    },
    [clear, updateCallback],
  );

  // 组件卸载自动清理
  useEffect(() => clear, [clear]);

  return [set, clear] as const;
}

export default useInterval;
