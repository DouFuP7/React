module.exports = {
  //commonjs
  devServer: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
}