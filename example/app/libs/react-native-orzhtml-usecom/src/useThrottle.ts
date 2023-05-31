import { DependencyList, useEffect, useRef, useState } from 'react';

// 节流
const useThrottle = (
  fn: () => void,
  ms = 30,
  deps: DependencyList[] = [],
) => {
  const previous = useRef(0);
  const [time, setTime] = useState(ms);

  useEffect(() => {
    const handler = setTimeout(() => {
      const now = Date.now();
      if (now - previous.current > time) {
        fn();
        previous.current = now;
      }
    }, time);

    return () => {
      clearTimeout(handler);
    };
  }, deps);

  const cancel = () => {
    setTime(0);
  };

  return [cancel];
};

export default useThrottle;
