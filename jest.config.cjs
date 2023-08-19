module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.(ts|tsx|js|jsx)$': [
      'babel-jest',
      {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          ['@babel/preset-typescript']
        ],
        plugins: ['@vue/babel-plugin-jsx']
      }
    ]
  },
  testMatch: ['<rootDir>/tests/**/*.spec.ts'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(lodash-es|other-es-lib))'],
  moduleFileExtensions: ['ts', 'js', 'jsx', 'tsx', 'json', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}
