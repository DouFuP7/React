// PrivateRoute.tsx
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useTokenContext } from '../components/TokenContext'
import { getToken } from '../utils/user-token'

interface PrivateRouteProps {
  element: React.ReactElement
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { tokenState } = useTokenContext()
  const storedToken = getToken()

  if (!tokenState || tokenState !== storedToken) {
    // 如果没有 token 或 token 不匹配，则重定向到登录页面
    return <Navigate to="/login" />
  }

  return element
}

export default PrivateRoute
