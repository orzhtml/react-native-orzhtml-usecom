import {useCallback, useState} from 'react';

/**
 * 强制重新渲染的 Hook。
 * 递增一个 state 值，触发 React 进行渲染。
 */
function useUpdate() {
  const [_, setSignal] = useState(0);

  return useCallback(() => {
    setSignal(prev => prev + 1); // 每次调用递增计数器
  }, []);
}

export default useUpdate;
