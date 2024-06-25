import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { Input } from 'antd'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '../constant'
const { Search } = Input

const ListSearch: FC = () => {
  const [value, setValue] = useState('')
  const nav = useNavigate()
  const { pathname } = useLocation()

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  //获取url参数，并设置在到input value中
  const [searchParams] = useSearchParams()
  useEffect(() => {
    //每当searchParams变化，都会执行
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(curVal)
  }, [searchParams])

  function handleSearch(value: string) {
    //跳转页面 增加url参数

    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    })
  }

  return (
    <Search
      size="large"
      allowClear
      placeholder="输入关键字"
      onSearch={handleSearch}
      onChange={handleChange}
      style={{ width: '260px' }}
      value={value}
    />
  )
}

export default ListSearch
