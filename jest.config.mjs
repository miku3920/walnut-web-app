export default {
  moduleNameMapper: {
    '^@/factory.mjs$': '<rootDir>/src/factory.mjs',
  },
  moduleFileExtensions: [
    'mjs',
    'js',
  ],
  testEnvironment: 'jest-environment-jsdom',
  transform: {},
  testMatch: ['<rootDir>/test/**/*.mjs'],
}
