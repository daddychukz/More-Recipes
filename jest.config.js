module.exports = {
  verbose: true,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/Template/',
    '/Server/',
    '/Client/src/app',
    '/Client/dist/',
    '/Client/src/static/',
    '/Client/coverage/',
    '/Client/src/reducers/index',
    '/Client/tests/mocks/',
    '/Client/src/store/configStore'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],
  rootDir: 'Client',
  roots: ['<rootDir>'],
  testEnvironment: 'jsdom',
  setupFiles: [
    '<rootDir>/tests/testSetup.js',
    '<rootDir>/tests/mocks/localStorage.js'
  ],
  moduleFileExtensions: [
    'js',
    'jsx'
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm)$':
      '<rootDir>/tests/mocks/fileMock.js',
    '\\.(css)$': '<rootDir>/tests/mocks/styleMock.js',
  }
};
