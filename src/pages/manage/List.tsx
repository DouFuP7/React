import React, { FC, useEffect, useState, useRef, useMemo } from 'react'
// import { useSearchParams } from 'react-router-dom'
import { Typography, Spin, Empty } from 'antd'
import QuestionCard from '../../components/QuestionCard'
import styles from './common.module.scss'
import { getQuestionListService } from '../../services/question'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import ListSearch from '../../components/ListSearch'
import { useSearchParams } from 'react-router-dom'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant'

const { Title } = Typography
const List: FC = () => {
  useTitle('豆腐问卷 - 我的问卷')

  const [started, setStarted] = useState(false) //是否已经开始加载（防抖有延时）
  const [page, setPage] = useState(1) // List内部的数据，不在url 参数中体现
  const [list, setList] = useState([]) //全部的列表数据，上划加载更多，累计
  const [total, setTotal] = useState(0)
  const haveMoreData = total > list.length //是否还有更多未加载的数据

  const [searchparams] = useSearchParams() //url参数，虽然没有page pageSize，但有keyword
  const keyword = searchparams.get(LIST_SEARCH_PARAM_KEY) || ''

  //keyword变化时候重置信息
  useEffect(() => {
    setStarted(false)
    setPage(1)
    setList([])
    setTotal(0)
  }, [keyword])

  //真正的加载函数
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      })
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result
        setList(list.concat(l)) //累计
        setTotal(total)
        setPage(page + 1)
      },
    }
  )

  //尝试去触发加载+防抖
  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (elem == null) return

      const domRect = elem.getBoundingClientRect()
      if (domRect == null) return

      const { bottom } = domRect
      //获取body的整个高度
      if (bottom <= document.body.clientHeight) {
        load() //真正加载数据
        setStarted(true)
      }
    },
    {
      wait: 1000,
    }
  )

  //1.当页面加载，或者url参数变化时，触发加载
  useEffect(() => {
    tryLoadMore() //加载第一页
  }, [searchparams])

  //2.当页面滚动时，要尝试触发加载
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore) // 防抖
    }

    return () => {
      window.removeEventListener('scroll', tryLoadMore) //解绑事件
    }
  }, [searchparams, haveMoreData])

  //LoadMore Elem
  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty description="暂无数据" />
    if (!haveMoreData) return <span>没有更多了...</span>
    return <span>开始加载下一页</span>
  }, [started, loading, haveMoreData, total])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>

      <div className={styles.content}>
        {/* 问卷列表 */}
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>

      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  )
}

export default List
