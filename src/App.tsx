import React from 'react'
import { RouterProvider } from 'react-router-dom'
import routerConfig from './router'
import 'antd/dist/reset.css'
import { TokenProvider } from './components/TokenContext'

function App() {
  return (
    <TokenProvider>
      <RouterProvider router={routerConfig} />
    </TokenProvider>
  )
}

export default App

//src/components 目录-组件
//src/page 目录-页面 (React 组件)

//业务 - 页面（跳转，切换，大面积的），组件（零件）
