import { useEffect, useState } from 'react';

// 获取给定日期的下一个工作日（周一到周五）
function getNextWorkday(date: Date): Date {
  const day = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  // 如果是周六，则日期加2；如果是周日，则日期加1；否则日期不变
  if (day === 6) {
    date.setDate(date.getDate() + 2);
  } else if (day === 0) {
    date.setDate(date.getDate() + 1);
  }

  return date;
}

// 自定义 Hook 组件
function useWorkdayCalculator(initialDate: Date): Date {
  const [workday, setWorkday] = useState(initialDate);

  useEffect(() => {
    // 判断初始日期是否为工作日，如果不是则计算下一个工作日
    const initialDay = initialDate.getDay();
    if (initialDay === 0 || initialDay === 6) {
      const nextWorkday = getNextWorkday(initialDate);
      setWorkday(nextWorkday);
    }
  }, [initialDate]);

  return workday;
}

export default useWorkdayCalculator;
