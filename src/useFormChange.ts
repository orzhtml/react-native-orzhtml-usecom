import { useMemo, useState, useRef } from 'react'

/* 表单/表头搜素hooks */
function useFormChange<T> (initialState?: T) {
  const formData = useRef(initialState ? Object.assign({}, initialState) : {})
  const [, forceUpdate] = useState(null)

  const handerForm = useMemo(() => {
    /* 改变表单单元项 */
    const setFormItem = (keys: string, value: any) => {
      const form: any = formData.current
      form[keys] = value
      forceUpdate(value)
    }
    /* 重置表单 */
    const resetForm = () => {
      if (initialState) {
        // 如果有初始值，则重置返回初始值
        formData.current = initialState
        return
      }
      const current: any = formData.current
      for (let name in current) {
        current[name] = ''
      }
      forceUpdate(null)
    }
    return [setFormItem, resetForm]
  }, [])

  return [formData.current, ...handerForm]
}

export default useFormChange
