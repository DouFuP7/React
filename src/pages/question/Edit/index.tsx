import React, { FC } from 'react'
// import { useParams } from 'react-router-dom'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Edit: FC = () => {
  // const { id = '' } = useParams()

  //Hooks 自定义hook
  const { loading, data } = useLoadQuestionData()

  return (
    <div>
      <p>Edit Page</p>
      {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}
    </div>
  )
}

export default Edit
