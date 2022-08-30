import { useCallback, useState } from 'react'
// 强制重新渲染hook
// 递增一个state值，触发react进行渲染
function useUpdate () {
  const [, setState] = useState({})
  return useCallback(() => setState({}), [])
}

export default useUpdate
