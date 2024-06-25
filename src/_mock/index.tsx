import Mock from 'mockjs'

Mock.mock('/api/test', 'get', () => {
  return {
    errno: 0,
    data: {
      name: `豆腐皮${Date.now()}`,
    },
  }
})
