module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactLoggingErrorBoundary',
      externals: {
        react: 'React'
      }
    }
  }
}
