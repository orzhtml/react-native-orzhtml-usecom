import {useRef, useCallback, useEffect} from 'react';

function useTimeout(): [(fn: Function, delay: number) => void, () => void] {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const fnRef = useRef<Function>();

  // 清理定时器（引用稳定）
  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  // 核心定时器
  const timeout = useCallback(
    (fn: Function, delay: number) => {
      // 参数强制校验
      if (typeof fn !== 'function') {
        throw new TypeError('useTimeout: 第一个参数必须是函数');
      }
      // 处理 delay 参数
      if (typeof delay !== 'number' || isNaN(delay)) {
        throw new TypeError(`useTimeout: delay 必须是数字，当前收到 ${delay}`);
      }
      // 处理 delay 参数
      const safeDelay = Math.max(0, Number(delay) || 0);

      // 清理旧定时器
      clear();

      // 保存最新回调
      fnRef.current = fn;

      // 设置新定时器
      timerRef.current = setTimeout(() => {
        fnRef.current?.();
      }, safeDelay);
    },
    [clear],
  );

  // 组件卸载自动清理
  useEffect(() => clear, [clear]);

  return [timeout, clear] as const;
}

export default useTimeout;
