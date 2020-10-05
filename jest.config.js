module.exports = {
  roots: [
    './app/javascript/'
  ],
  clearMocks: true,
  restoreMocks: true,
  resetMocks: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!types/*.ts',
    '!packs/*.tsx',
    '!coverage/**/*',
    '!constants/*.ts'
  ],
  moduleDirectories: [
    'node_modules',
    '<rootDir>'
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'json',
    'node'
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect'
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$'
  ],
  testMatch: [
    '<rootDir>/**/__tests__/**/*.{ts,tsx}',
    '<rootDir>/**/*.{spec,test}.{js,jsx,ts,tsx}'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/config/webpack/'
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};
