module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactBookeo',
      externals: {
        react: 'React'
      }
    }
  }
}
