import { useCallback, useState } from 'react'

/**
 * 强制重新渲染的 Hook。
 * 递增一个 state 值，触发 React 进行渲染。
 */
function useUpdate() {
  const [, setState] = useState({})

  return useCallback(() => {
    setState({})
  }, [])
}

export default useUpdate
