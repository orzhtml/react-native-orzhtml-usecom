import { useEffect, useRef, useCallback } from 'react';

function useTimeout() {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      clear();
    };
  }, []);

  const timeout = useCallback((fn: () => void, delay: number | undefined) => {
    clear();
    timerRef.current = setTimeout(() => {
      fn();
    }, delay);
  }, []);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return [timeout, clear] as const;
}

export default useTimeout;
