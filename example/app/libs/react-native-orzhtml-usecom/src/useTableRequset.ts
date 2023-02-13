import { useEffect, useMemo, useState, useRef } from 'react'

// 列表 表格数据查询
function useTableRequset<T, R> (query: T, api: (arg0: any) => Promise<R | any>) {
  /* 是否是第一次请求 */
  const fisrtRequest = useRef(false)
  /* 保存分页信息 */
  const [pageOptions, setPageOptions] = useState({
    page: 1,
    pageSize: 10,
  })
  /* 保存表格数据 */
  const [tableData, setTableData] = useState({
    list: [],
    totalCount: 0,
    pageSize: 10,
    page: 1,
  })
  /* 请求数据 ,数据处理逻辑根后端协调着来 */
  const getList = useMemo(() => {
    return async (payload: any) => {
      if (!api) return
      const res = await api(payload || { ...query, ...pageOptions })
      setTableData(res)
      fisrtRequest.current = true
    }
  }, [])
  /* 改变分页，重新请求数据 */
  useEffect(() => {
    fisrtRequest.current && getList({
      ...query,
      ...pageOptions,
    })
  }, [pageOptions])
  /* 改变查询条件。重新请求数据 */
  useEffect(() => {
    getList({
      ...query,
      ...pageOptions,
      page: 1,
    })
  }, [query])
  /* 处理分页逻辑 */
  const handerChange = useMemo(() => (options: any) => setPageOptions({ ...options }), [])
  // 数据不变更的情况下直接重新刷新 例如第一页刷新
  // 也可以用来重置条件、分页查询，传入对应参数即可
  const handerRefresh = (options: any) => {
    getList({
      ...query,
      ...pageOptions,
      ...options,
    })
  }

  return [tableData, handerChange, handerRefresh, getList]
}

export default useTableRequset
