import {useState, useCallback, useRef, useEffect} from 'react';

import {MockRequestConfig, RequestState} from '../types';

type ApiResponse<T> = {
  status: number;
  data: T;
};

function useMockRequest<T = any>() {
  const [state, setState] = useState<RequestState<ApiResponse<T>>>({
    loading: false,
    error: null,
    data: null,
  });

  // 用于取消未完成的请求
  const abortControllerRef = useRef<AbortController>();

  // 生成随机测试数据
  const generateMockData = useCallback(
    () => ({
      id: Math.floor(Math.random() * 1000),
      name: `Item-${Math.random().toString(36).slice(2, 7)}`,
      timestamp: new Date().toISOString(),
      value: Math.random() * 100,
    }),
    [],
  );

  // 核心请求方法
  const mockRequest = useCallback(
    async (config?: MockRequestConfig<T>): Promise<ApiResponse<T>> => {
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        setState(prev => ({...prev, loading: true, error: null}));

        const {
          delay = Math.random() * 300 + 200,
          successRate = 0.8,
          mockData = generateMockData(),
        } = config || {};

        // 模拟请求结果
        const result = await new Promise<ApiResponse<T>>((resolve, reject) => {
          setTimeout(() => {
            if (controller.signal.aborted) {
              return;
            }

            Math.random() <= successRate
              ? resolve({
                  status: 200,
                  data: mockData,
                } as ApiResponse<T>)
              : reject(new Error('Request failed'));
          }, delay);
        });

        setState({loading: false, error: null, data: result});
        return result;
      } catch (error) {
        if (!controller.signal.aborted) {
          setState({loading: false, error: error as Error, data: null});
        }
        throw error;
      } finally {
        if (!controller.signal.aborted) {
          abortControllerRef.current = undefined;
        }
      }
    },
    [generateMockData],
  );

  // 取消请求方法
  const cancelRequest = useCallback(() => {
    abortControllerRef.current?.abort();
    setState(prev => ({...prev, loading: false}));
  }, []);

  // 组件卸载自动取消
  useEffect(() => {
    return () => cancelRequest();
  }, [cancelRequest]);

  return {
    ...state,
    mockRequest,
    cancelRequest,
  };
}

export default useMockRequest;
