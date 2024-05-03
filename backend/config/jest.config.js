

module.exports = {
  testEnvironment: 'node',
  bail: 0,
  // preset: '@shelf/jest-mongodb',
  mongodbMemoryServerOptions: {
    binary: {
      version: '4.0.3',
      skipMD5: true
    },
    autoStart: false,
    instance: {}
  }
}
