import React, { FC } from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import styes from './Logo.module.scss'
import { Link } from 'react-router-dom'

const { Title } = Typography

const Logo: FC = () => {
  return (
    <div className={styes.container}>
      <Link to="/">
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>豆腐问卷</Title>
        </Space>
      </Link>
    </div>
  )
}
export default Logo
