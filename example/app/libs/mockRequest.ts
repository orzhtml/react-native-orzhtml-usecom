type MockRequestConfig = {
  delay?: number; // 延迟时间（默认200-500ms随机）
  successRate?: number; // 成功概率（0-1，默认0.8）
  mockData?: any; // 自定义返回数据
};

export const mockRequest = <T = any>(
  config?: MockRequestConfig,
): Promise<T> => {
  return new Promise(resolve => {
    const {
      delay = Math.random() * 300 + 200, // 200-500ms随机延迟
      mockData = generateMockData(), // 默认生成随机数据
    } = config || {};

    setTimeout(() => {
      resolve({
        status: 200,
        data: mockData,
      } as T);
    }, delay);
  });
};

// 生成随机测试数据
const generateMockData = () => ({
  id: Math.floor(Math.random() * 1000),
  name: `Item-${Math.random().toString(36).substr(2, 5)}`,
  timestamp: new Date().toISOString(),
  value: Math.random() * 100,
});
