// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
      '^node-localstorage$': '/__mocks__/node-localstorage.js',
  },
  clearMocks: true,
  verbose: true,
};
