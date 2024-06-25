import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Stat: FC = () => {
  //Hooks 自定义hook
  const { loading, data } = useLoadQuestionData()

  return (
    <div>
      <p>Stat Page</p>
      {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}
    </div>
  )
}

export default Stat
